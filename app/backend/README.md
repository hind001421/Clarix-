# Clarix Backend

FastAPI backend for the Clarix AI Compliance Assistant.

## Setup

Run this once from the project root. The virtual environment must stay outside
`backend/` so `--reload-dir .` does not watch dependency files:

```bash
cd /Users/hind/Documents/Codex/2026-06-29/you-are-a-senior-ui-ux
python3 -m venv .venv-backend
.venv-backend/bin/pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
```

## Run

```bash
cd /Users/hind/Documents/Codex/2026-06-29/you-are-a-senior-ui-ux
backend/start.sh
```

`start.sh` uses `../.venv-backend/bin/python -m uvicorn main:app --reload --reload-dir .`.

## Endpoints

- `GET /` returns a friendly API status payload.
- `GET /health` returns backend status.
- `POST /upload` accepts PDF, DOCX, and TXT files and returns extracted text.
- `POST /analyze` accepts extracted text and returns structured Saudi compliance analysis JSON.

`services/ai_compliance_engine.py` contains the AI Compliance Engine. If `OPENAI_API_KEY` is not set, it returns a mock response for local development.

ChromaDB/RAG is intentionally not imported in the active runtime path. Future
notes live in `utils/future_rag.md`.

## Architecture

- `routers/` request handling and response models
- `services/` document extraction and AI Compliance Engine
- `schemas/` Pydantic request/response contracts
- `utils/` configuration and environment loading
- `models/` reserved for persistence models
