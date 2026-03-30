#!/usr/bin/env bash
# Use this if `npm run dev` exits immediately or the browser can't connect:
# Cursor/IDE terminals sometimes skip ~/.zshrc, so `node` stays on an old system install.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck disable=SC1091
  source "$NVM_DIR/nvm.sh"
fi

if [[ -f "$ROOT/.nvmrc" ]]; then
  nvm use || {
    echo ""
    echo "  No matching Node for .nvmrc. Install with:  nvm install"
    echo ""
    exit 1
  }
fi

echo ""
echo "Using: $(command -v node) — $(node -v)"
echo ""

exec npm run dev
