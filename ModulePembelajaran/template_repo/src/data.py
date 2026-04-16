"""Data loading: CIFAR-10 (default) with optional PathMNIST support.

Design notes (see Bab 04):
- All preprocessing statistics are computed from the train split only.
  Test transforms use the same statistics but never recompute them.
- A `dry_run` mode returns tiny subsets so the pipeline can be smoke-tested
  without downloading full datasets.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import torch
from torch.utils.data import DataLoader, Subset, random_split
from torchvision import datasets, transforms


CIFAR10_MEAN = (0.4914, 0.4822, 0.4465)
CIFAR10_STD = (0.2470, 0.2435, 0.2616)


def _cifar10_transforms(train: bool, image_size: int, augment: bool) -> transforms.Compose:
    ops: list[Any] = []
    if train and augment:
        ops += [
            transforms.RandomCrop(image_size, padding=4),
            transforms.RandomHorizontalFlip(),
        ]
    ops += [
        transforms.Resize(image_size),
        transforms.ToTensor(),
        transforms.Normalize(CIFAR10_MEAN, CIFAR10_STD),
    ]
    return transforms.Compose(ops)


def _build_cifar10(cfg: dict[str, Any], dry_run: bool):
    root = cfg["root"]
    image_size = cfg.get("image_size", 32)
    augment = cfg.get("augment", True)

    train_tf = _cifar10_transforms(train=True, image_size=image_size, augment=augment)
    test_tf = _cifar10_transforms(train=False, image_size=image_size, augment=False)

    download = not dry_run  # avoid heavy download in smoke test
    try:
        train_full = datasets.CIFAR10(root, train=True, download=download, transform=train_tf)
        test_set = datasets.CIFAR10(root, train=False, download=download, transform=test_tf)
    except Exception as e:
        if dry_run:
            # In dry-run, fabricate a tiny in-memory dataset to avoid any download.
            return _fake_classification_dataset(image_size, num_classes=cfg.get("num_classes", 10))
        raise e

    val_split = cfg.get("val_split", 0.1)
    n_val = int(len(train_full) * val_split)
    n_train = len(train_full) - n_val
    gen = torch.Generator().manual_seed(0)  # stable split, independent of run seed
    train_set, val_set = random_split(train_full, [n_train, n_val], generator=gen)

    if dry_run:
        train_set = Subset(train_set, list(range(64)))
        val_set = Subset(val_set, list(range(32)))
        test_set = Subset(test_set, list(range(32)))

    return train_set, val_set, test_set


class _FakeImageDataset(torch.utils.data.Dataset):
    """In-memory dataset used only for dry-run smoke tests without any download."""

    def __init__(self, n: int, image_size: int, num_classes: int):
        self.images = torch.randn(n, 3, image_size, image_size)
        self.labels = torch.randint(0, num_classes, (n,))

    def __len__(self) -> int:
        return self.images.shape[0]

    def __getitem__(self, idx: int):
        return self.images[idx], int(self.labels[idx])


def _fake_classification_dataset(image_size: int, num_classes: int):
    train_set = _FakeImageDataset(64, image_size, num_classes)
    val_set = _FakeImageDataset(32, image_size, num_classes)
    test_set = _FakeImageDataset(32, image_size, num_classes)
    return train_set, val_set, test_set


def _build_pathmnist(cfg: dict[str, Any], dry_run: bool):
    """Optional dataset; requires `medmnist` extra. Not used in Lab 1-3."""
    try:
        import medmnist  # type: ignore
        from medmnist import INFO  # type: ignore
    except ImportError as e:
        raise ImportError(
            "PathMNIST requires the 'medical' extra: pip install -e '.[medical]'"
        ) from e

    info = INFO["pathmnist"]
    DataClass = getattr(medmnist, info["python_class"])
    image_size = cfg.get("image_size", 28)

    mean = (0.5, 0.5, 0.5)
    std = (0.5, 0.5, 0.5)
    train_tf = transforms.Compose([
        transforms.Resize(image_size),
        transforms.ToTensor(),
        transforms.Normalize(mean, std),
    ])
    test_tf = train_tf

    download = not dry_run
    train_set = DataClass(split="train", transform=train_tf, download=download)
    val_set = DataClass(split="val", transform=test_tf, download=download)
    test_set = DataClass(split="test", transform=test_tf, download=download)

    if dry_run:
        train_set = Subset(train_set, list(range(64)))
        val_set = Subset(val_set, list(range(32)))
        test_set = Subset(test_set, list(range(32)))

    return train_set, val_set, test_set


def build_datasets(cfg: dict[str, Any], dry_run: bool = False):
    """Dispatch by `cfg["name"]`. Returns (train, val, test) datasets."""
    name = cfg["name"].lower()
    if name == "cifar10":
        return _build_cifar10(cfg, dry_run)
    if name == "pathmnist":
        return _build_pathmnist(cfg, dry_run)
    raise ValueError(f"Unknown dataset: {name}")


def build_loaders(cfg: dict[str, Any], dry_run: bool = False):
    train_set, val_set, test_set = build_datasets(cfg, dry_run)

    batch_size = cfg.get("batch_size", 128)
    if dry_run:
        batch_size = min(batch_size, 8)  # ensure at least a few batches in smoke test
    num_workers = 0 if dry_run else cfg.get("num_workers", 2)

    train_loader = DataLoader(
        train_set, batch_size=batch_size, shuffle=True,
        num_workers=num_workers, drop_last=True, pin_memory=True,
    )
    val_loader = DataLoader(
        val_set, batch_size=batch_size, shuffle=False,
        num_workers=num_workers, pin_memory=True,
    )
    test_loader = DataLoader(
        test_set, batch_size=batch_size, shuffle=False,
        num_workers=num_workers, pin_memory=True,
    )
    return train_loader, val_loader, test_loader
