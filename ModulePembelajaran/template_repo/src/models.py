"""Model definitions. Kept intentionally small.

`SimpleCNN` is the reference architecture used throughout Bab 01-03.
It has two clearly labeled conv blocks (`block1`, `block2`) so that labs
can reference them when practicing `freeze_until` semantics (Bab 02).
"""

from __future__ import annotations

from typing import Any

import torch
import torch.nn as nn


class SimpleCNN(nn.Module):
    """A two-block CNN for 32x32 RGB inputs.

    Blocks are named to support surgical freezing:
    - `block1`: first conv stage (low-level features)
    - `block2`: second conv stage (mid-level features)
    - `classifier`: global pool + linear head
    """

    def __init__(self, num_classes: int = 10):
        super().__init__()
        self.block1 = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.Conv2d(32, 64, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.block2 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 128, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Flatten(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.block1(x)
        x = self.block2(x)
        return self.classifier(x)


def apply_freeze(model: nn.Module, freeze_until: str | None) -> None:
    """Set `requires_grad=False` on every parameter in blocks up to `freeze_until`.

    Valid values: None (no freezing), "block1", "block2".
    This is illustrative; production code would support richer patterns.
    """
    if freeze_until is None:
        return
    order = ["block1", "block2"]
    if freeze_until not in order:
        raise ValueError(f"freeze_until must be one of {order} or None")
    frozen = set()
    for name in order:
        frozen.add(name)
        if name == freeze_until:
            break
    for name, module in model.named_children():
        if name in frozen:
            for p in module.parameters():
                p.requires_grad = False


def build_model(cfg: dict[str, Any]) -> nn.Module:
    name = cfg["name"].lower()
    if name == "simple_cnn":
        model = SimpleCNN(num_classes=cfg.get("num_classes", 10))
    else:
        raise ValueError(f"Unknown model: {name}")

    apply_freeze(model, cfg.get("freeze_until"))
    return model
