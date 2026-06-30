from schemas.analysis import AnalysisResponse
from services.ai_compliance_engine import ai_compliance_engine

async def analyze_contract(text: str) -> AnalysisResponse:
    return await ai_compliance_engine.analyze(text)