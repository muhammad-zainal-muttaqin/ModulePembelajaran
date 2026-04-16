"""Training entry point.

Usage:
    python -m src.train --config configs/baseline.yaml --seed 42

Smoke test:
    python -m src.train --config configs/baseline.yaml --dry-run

Design rationale (see Bab 03):
- Everything that affects results flows from the YAML config.
- Seed is locked before any random op (dataset split is stable-seeded separately).
- Checkpoints carry git hash + config snapshot for traceability.
"""

from __future__ import annotations

import argparse
import csv
import json
import logging
import sys
import time
from pathlib import Path

import torch
from torch.utils.tensorboard import SummaryWriter
from tqdm import tqdm

from .data import build_loaders
from .losses import build_loss
from .models import build_model
from .utils import (
    RunMeta,
    count_parameters,
    git_hash,
    git_is_dirty,
    load_config,
    make_output_dir,
    save_config,
    set_seed,
)


def build_optimizer(params, cfg: dict) -> torch.optim.Optimizer:
    name = cfg["name"].lower()
    if name == "sgd":
        return torch.optim.SGD(
            params,
            lr=cfg["lr"],
            momentum=cfg.get("momentum", 0.9),
            weight_decay=cfg.get("weight_decay", 0.0),
            nesterov=cfg.get("nesterov", False),
        )
    if name in ("adam", "adamw"):
        cls = torch.optim.AdamW if name == "adamw" else torch.optim.Adam
        return cls(
            params,
            lr=cfg["lr"],
            weight_decay=cfg.get("weight_decay", 0.0),
        )
    raise ValueError(f"Unknown optimizer: {name}")


def build_scheduler(optimizer, cfg: dict, epochs: int):
    if not cfg:
        return None
    name = cfg.get("name", "none").lower()
    if name in ("none", "null"):
        return None
    if name == "cosine":
        return torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)
    if name == "step":
        return torch.optim.lr_scheduler.StepLR(
            optimizer, step_size=cfg.get("step_size", 10), gamma=cfg.get("gamma", 0.1)
        )
    raise ValueError(f"Unknown scheduler: {name}")


def evaluate(model, loader, loss_fn, device) -> tuple[float, float]:
    model.eval()
    total, correct, loss_sum = 0, 0, 0.0
    with torch.no_grad():
        for x, y in loader:
            x = x.to(device, non_blocking=True)
            y = torch.as_tensor(y).to(device, non_blocking=True).long().view(-1)
            logits = model(x)
            loss_sum += loss_fn(logits, y).item() * x.size(0)
            pred = logits.argmax(dim=1)
            correct += (pred == y).sum().item()
            total += x.size(0)
    return loss_sum / max(total, 1), correct / max(total, 1)


def train_one_epoch(model, loader, loss_fn, optimizer, device, grad_clip, logger, epoch, log_every):
    model.train()
    running_loss = 0.0
    running_correct = 0
    running_total = 0
    pbar = tqdm(loader, desc=f"epoch {epoch}", leave=False)
    for step, (x, y) in enumerate(pbar):
        x = x.to(device, non_blocking=True)
        y = torch.as_tensor(y).to(device, non_blocking=True).long().view(-1)
        logits = model(x)
        loss = loss_fn(logits, y)
        optimizer.zero_grad(set_to_none=True)
        loss.backward()
        if grad_clip is not None and grad_clip > 0:
            torch.nn.utils.clip_grad_norm_(model.parameters(), grad_clip)
        optimizer.step()

        running_loss += loss.item() * x.size(0)
        running_correct += (logits.argmax(1) == y).sum().item()
        running_total += x.size(0)

        if step % log_every == 0:
            pbar.set_postfix({
                "loss": f"{running_loss / running_total:.4f}",
                "acc": f"{running_correct / running_total:.4f}",
            })
            logger.debug(
                "epoch=%d step=%d loss=%.4f acc=%.4f",
                epoch, step, running_loss / running_total, running_correct / running_total,
            )
    return running_loss / max(running_total, 1), running_correct / max(running_total, 1)


def save_checkpoint(path: Path, model, optimizer, scheduler, meta: RunMeta, cfg: dict) -> None:
    payload = {
        "model_state": model.state_dict(),
        "optimizer_state": optimizer.state_dict(),
        "scheduler_state": scheduler.state_dict() if scheduler is not None else None,
        "meta": meta.to_dict(),
        "config": cfg,
    }
    torch.save(payload, path)


def append_results(csv_path: Path, row: dict) -> None:
    exists = csv_path.exists()
    with open(csv_path, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(row.keys()))
        if not exists:
            writer.writeheader()
        writer.writerow(row)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", required=True, type=str)
    parser.add_argument("--seed", type=int, default=None, help="override config seed")
    parser.add_argument("--output_dir", type=str, default=None)
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="smoke test: tiny dataset, 1 epoch, no heavy downloads",
    )
    args = parser.parse_args(argv)

    cfg = load_config(args.config)
    if args.seed is not None:
        cfg["seed"] = args.seed

    seed = int(cfg.get("seed", 42))
    set_seed(seed)

    exp_name = cfg.get("experiment_name", Path(args.config).stem)
    if args.dry_run:
        exp_name = f"{exp_name}_dryrun"
        cfg["train"]["epochs"] = 1

    out_root = args.output_dir or cfg.get("output", {}).get("root", "./experiments")
    out_dir = make_output_dir(out_root, exp_name, seed)
    save_config(cfg, out_dir / "config.yaml")

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        handlers=[
            logging.FileHandler(out_dir / "train.log", encoding="utf-8"),
            logging.StreamHandler(sys.stdout),
        ],
    )
    logger = logging.getLogger("train")

    commit = git_hash()
    dirty = git_is_dirty()
    logger.info("experiment=%s seed=%d commit=%s dirty=%s out=%s",
                exp_name, seed, commit, dirty, out_dir)
    if dirty and not args.dry_run:
        logger.warning("working tree is dirty; results may be hard to reproduce")

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    logger.info("device=%s", device)
    if device.type == "cuda":
        logger.info("gpu=%s", torch.cuda.get_device_name(0))

    train_loader, val_loader, test_loader = build_loaders(cfg["data"], dry_run=args.dry_run)
    logger.info("train=%d val=%d test=%d",
                len(train_loader.dataset), len(val_loader.dataset), len(test_loader.dataset))

    model = build_model(cfg["model"]).to(device)
    logger.info("model=%s trainable_params=%d",
                cfg["model"]["name"], count_parameters(model))

    loss_fn = build_loss(cfg["loss"]).to(device)

    trainable_params = [p for p in model.parameters() if p.requires_grad]
    optimizer = build_optimizer(trainable_params, cfg["optim"])
    epochs = int(cfg["train"]["epochs"])
    scheduler = build_scheduler(optimizer, cfg.get("scheduler"), epochs)

    writer = SummaryWriter(log_dir=str(out_dir / "tb"))
    best_val = -1.0
    best_epoch = -1
    grad_clip = cfg["train"].get("grad_clip", 0)
    log_every = cfg["train"].get("log_every", 50)
    save_every = cfg["train"].get("save_every", 5)

    start = time.time()
    for epoch in range(1, epochs + 1):
        train_loss, train_acc = train_one_epoch(
            model, train_loader, loss_fn, optimizer, device,
            grad_clip, logger, epoch, log_every,
        )
        val_loss, val_acc = evaluate(model, val_loader, loss_fn, device)
        if scheduler is not None:
            scheduler.step()

        writer.add_scalar("loss/train", train_loss, epoch)
        writer.add_scalar("loss/val", val_loss, epoch)
        writer.add_scalar("acc/train", train_acc, epoch)
        writer.add_scalar("acc/val", val_acc, epoch)
        writer.add_scalar("lr", optimizer.param_groups[0]["lr"], epoch)

        logger.info(
            "epoch=%d train_loss=%.4f train_acc=%.4f val_loss=%.4f val_acc=%.4f",
            epoch, train_loss, train_acc, val_loss, val_acc,
        )

        meta = RunMeta(
            experiment_name=exp_name, seed=seed, commit=commit, dirty=dirty,
            epoch=epoch, metric_name="val_acc", metric_value=val_acc,
        )
        if val_acc > best_val:
            best_val = val_acc
            best_epoch = epoch
            save_checkpoint(out_dir / "ckpt_best.pt", model, optimizer, scheduler, meta, cfg)

        if epoch % save_every == 0 or epoch == epochs:
            save_checkpoint(out_dir / "ckpt_last.pt", model, optimizer, scheduler, meta, cfg)

    test_loss, test_acc = evaluate(model, test_loader, loss_fn, device)
    duration = time.time() - start
    logger.info(
        "done best_val_acc=%.4f best_epoch=%d test_acc=%.4f duration=%.1fs",
        best_val, best_epoch, test_acc, duration,
    )

    append_results(
        Path(out_root) / "results.csv",
        {
            "experiment_name": exp_name,
            "seed": seed,
            "commit": commit,
            "dirty": int(dirty),
            "epochs": epochs,
            "best_val_acc": f"{best_val:.4f}",
            "best_epoch": best_epoch,
            "test_acc": f"{test_acc:.4f}",
            "duration_sec": f"{duration:.1f}",
        },
    )

    summary = {
        "experiment_name": exp_name,
        "seed": seed,
        "commit": commit,
        "best_val_acc": best_val,
        "test_acc": test_acc,
        "duration_sec": duration,
    }
    with open(out_dir / "summary.json", "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    writer.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
