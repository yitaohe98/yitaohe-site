#!/usr/bin/env python3
"""
Set the default (main) language for the site in config.toml.
Visitors to the root URL (/) will see this language first.

Usage:
  python util/set_default_lang.py zh   # Chinese as main
  python util/set_default_lang.py en   # English as main
  python util/set_default_lang.py cn   # same as zh

Run from the repository root (the directory containing config.toml).
"""

import re
import sys
from pathlib import Path
from typing import Optional


def find_config(path: Path) -> Optional[Path]:
    """Locate config.toml in path or a parent directory."""
    while path != path.parent:
        candidate = path / "config.toml"
        if candidate.is_file():
            return candidate
        path = path.parent
    return None


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python util/set_default_lang.py <zh|en|cn>", file=sys.stderr)
        return 1

    raw = sys.argv[1].strip().lower()
    if raw in ("cn", "zh"):
        lang = "zh"
    elif raw == "en":
        lang = "en"
    else:
        print("Language must be zh, en, or cn.", file=sys.stderr)
        return 1

    repo_root = Path(__file__).resolve().parent.parent
    config_path = find_config(repo_root)
    if not config_path:
        print("config.toml not found.", file=sys.stderr)
        return 1

    text = config_path.read_text(encoding="utf-8")
    pattern = re.compile(r'^defaultContentLanguage\s*=\s*"[^"]*"', re.MULTILINE)
    if not pattern.search(text):
        print("defaultContentLanguage not found in config.toml.", file=sys.stderr)
        return 1

    new_line = f'defaultContentLanguage = "{lang}"'
    new_text = pattern.sub(new_line, text, count=1)
    config_path.write_text(new_text, encoding="utf-8")

    label = "Chinese" if lang == "zh" else "English"
    print(f"Default language set to {lang} ({label}). Root (/) will now serve {label} first.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
