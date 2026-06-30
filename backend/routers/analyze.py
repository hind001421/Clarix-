from fastapi import APIRouter

from schemas.analysis import AnalysisRequest, AnalysisResponse
from services.analysis_service import analyze_contract

router = APIRouter(prefix="/analyze", tags=["Analyze"])


@router.post("", response_model=AnalysisResponse)
async def analyze(request: AnalysisRequest):
    return await analyze_contract(request.text)
