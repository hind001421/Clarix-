from fastapi import APIRouter

from src.backend.schemas.analysis import AnalysisRequest, AnalysisResponse
from src.backend.services.analysis_service import analyze_contract

router = APIRouter(prefix="/analyze", tags=["Analyze"])


@router.post("", response_model=AnalysisResponse)
async def analyze(request: AnalysisRequest):
    return await analyze_contract(request.text)
