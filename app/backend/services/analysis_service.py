from src.backend.schemas.analysis import AnalysisResponse
from src.backend.services.ai_compliance_engine import ai_compliance_engine

async def analyze_contract(text: str) -> AnalysisResponse:
    return await ai_compliance_engine.analyze(text)