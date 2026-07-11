# Raqeeb Demo

Raqeeb is an AI Compliance Assistant for Saudi businesses. This hackathon demo
includes a React + Tailwind frontend, a FastAPI backend, Arabic/English support,
and contract text extraction for PDF, DOCX, and TXT files.

## Project Structure

```text
backend/
  main.py
  routers/
  services/
  schemas/
  utils/
  requirements.txt
  README.md
raqeeb/
  src/
    components/
    services/
    styles.css
    main.jsx
```

## Backend Setup

Run this once. The virtual environment must stay outside `backend/` so Uvicorn
reload watches only source files:

```bash
cd backend
python3 -m venv .venv-backend
.venv-backend/bin/pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
```

## Run Backend

```bash
cd backend
backend/start.sh
```

The backend runs on `http://127.0.0.1:8000`.

python3 -m venv .venv-backend

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env  #not needed
```

## Run Frontend

```bash
cd frontend
npm run dev
```

The frontend uses `VITE_API_BASE_URL=http://127.0.0.1:8000`.

## Demo Flow

1. Open the landing page.
2. Switch Arabic/English to show RTL/LTR support.
3. Upload a PDF, DOCX, or TXT contract.
4. Click Upload to extract text.
5. Click Analyze Contract.
6. Review dashboard score, risks, recommendations, timeline, and recent analysis.
7. Open AI Chat and ask the example compliance questions.

## Notes

- Without `OPENAI_API_KEY`, `/analyze` returns a mock compliance result.
- With `OPENAI_API_KEY`, `/analyze` uses the AI Compliance Engine.
- ChromaDB/RAG is intentionally future work and not imported at runtime.
