#!/usr/bin/env python3
"""
Кидаєш before_b64.txt і after_b64.txt у корінь проєкту,
запусти цей файл, щоб отримати assets/img/before.jpg та assets/img/after.jpg.
"""
from __future__ import annotations

import base64
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / "assets" / "img"
FILES = {
    "before_b64.txt": "before.jpg",
    "after_b64.txt": "after.jpg",
}


def decode_image(source_name: str, target_name: str) -> None:
    source = ROOT / source_name
    target = IMG_DIR / target_name

    if not source.exists():
        print(f"skip: {source_name} not found")
        return

    raw = source.read_text(encoding="utf-8").strip()
    if not raw:
        print(f"skip: {source_name} is empty")
        return

    try:
        target.write_bytes(base64.b64decode(raw))
    except Exception as exc:  # noqa: BLE001
        print(f"error: cannot decode {source_name}: {exc}")
        raise

    print(f"ok: wrote {target.relative_to(ROOT)}")


def main() -> int:
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, target_name in FILES.items():
        decode_image(source_name, target_name)
    return 0


if __name__ == "__main__":
    sys.exit(main())
