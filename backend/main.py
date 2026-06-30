from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import analyze, upload

app = FastAPI(
    title="Clarix API",
    description="AI Compliance Assistant backend for Saudi business contracts.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(analyze.router)


@app.get("/")
async def root():
    return {
        "name": "Clarix API",
        "status": "ok",
        "health": "/health",
        "docs": "/docs",
    }


@app.get("/health")
async def health_check():
    return {"status": "ok"}
