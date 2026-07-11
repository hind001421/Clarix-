#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [ -d ".venv" ]; then
  echo "backend/.venv is not supported. Use ../.venv-backend so reload watches only source files."
  exit 1
fi

PYTHON_BIN=".venv-backend/bin/python"

if [ ! -x "$PYTHON_BIN" ]; then
  echo "Backend environment not found. Run: python3 -m venv .venv-backend && .venv-backend/bin/pip install -r backend/requirements.txt"
  exit 1
fi

"$PYTHON_BIN" -m uvicorn main:app --reload --reload-dir .
