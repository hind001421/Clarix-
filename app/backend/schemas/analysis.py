from pydantic import BaseModel, Field


class AnalysisRequest(BaseModel):
    text: str = Field(..., min_length=1)


class RiskItem(BaseModel):
    risk_title: str
    risk_level: str
    description: str
    recommendation: str
    suggested_rewrite: str


class AnalysisResponse(BaseModel):
    compliance_score: int = Field(..., ge=0, le=100)
    risks: list[RiskItem]
