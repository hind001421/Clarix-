import json

from schemas.analysis import AnalysisResponse
from utils.config import settings


SAUDI_COMPLIANCE_CONTEXT = """
Saudi compliance focus areas for this MVP:

1. AML / KYC:
Contracts should include customer identity verification, due diligence, record keeping,
and monitoring of suspicious transactions.

2. PDPL:
Contracts should clarify the purpose of personal data processing, consent where required,
data protection responsibilities, retention, and confidentiality.

3. SAMA-related compliance:
Financial service contracts should include clear responsibility, risk management,
customer protection, confidentiality, and regulatory compliance obligations.

4. CMA-related compliance:
Contracts related to investment or securities activities should consider disclosure,
conflict of interest, transparency, and client protection obligations.
"""


class AIComplianceEngine:
    def __init__(self):
        self.client = None

    def _get_client(self):
        if not settings.openai_api_key:
            return None

        if self.client is None:
            from openai import AsyncOpenAI

            self.client = AsyncOpenAI(api_key=settings.openai_api_key)

        return self.client

    async def analyze(self, contract_text: str) -> AnalysisResponse:
        client = self._get_client()

        if not client:
            return self._mock_response()

        response = await client.responses.create(
            model=settings.openai_model,
            input=[
                {
                    "role": "system",
                    "content": (
                        "You are Clarix, an AI Compliance Assistant for Saudi businesses. "
                        "Your role is to identify compliance risks in contracts and policies. "
                        "Focus on Saudi regulatory areas such as AML, KYC, PDPL, SAMA, and CMA. "
                        "You are not a legal advisor and must not guarantee legal compliance. "
                        "Return JSON only. Do not include markdown, prose, or citations."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        "Analyze the uploaded contract using the Saudi compliance context below.\n\n"
                        f"Saudi Compliance Context:\n{SAUDI_COMPLIANCE_CONTEXT}\n\n"
                        "Required JSON fields:\n"
                        "- compliance_score\n"
                        "- risks[].risk_level\n"
                        "- risks[].risk_title\n"
                        "- risks[].description\n"
                        "- risks[].recommendation\n"
                        "- risks[].suggested_rewrite\n\n"
                        "Risk levels must be one of: High, Medium, Low.\n"
                        "Descriptions must be clear and business-friendly.\n"
                        "Recommendations must be practical.\n"
                        "Suggested rewrites must be contract-ready clauses.\n\n"
                        f"Contract text:\n{contract_text}"
                    ),
                },
            ],
            text={
                "format": {
                    "type": "json_schema",
                    "name": "saudi_compliance_analysis",
                    "schema": self._json_schema(),
                    "strict": True,
                }
            },
        )

        raw_json = response.output_text
        return AnalysisResponse.model_validate(json.loads(raw_json))

    def _json_schema(self) -> dict:
        return {
            "type": "object",
            "additionalProperties": False,
            "required": ["compliance_score", "risks"],
            "properties": {
                "compliance_score": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 100,
                },
                "risks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "additionalProperties": False,
                        "required": [
                            "risk_level",
                            "risk_title",
                            "description",
                            "recommendation",
                            "suggested_rewrite",
                        ],
                        "properties": {
                            "risk_level": {"type": "string"},
                            "risk_title": {"type": "string"},
                            "description": {"type": "string"},
                            "recommendation": {"type": "string"},
                            "suggested_rewrite": {"type": "string"},
                        },
                    },
                },
            },
        }

    def _mock_response(self) -> AnalysisResponse:
        return AnalysisResponse(
            compliance_score=84,
            risks=[
                {
                    "risk_level": "High",
                    "risk_title": "Missing AML / KYC Clause",
                    "description": (
                        "The contract does not clearly require customer identity verification, "
                        "due diligence, or monitoring of suspicious activity."
                    ),
                    "recommendation": (
                        "Add a clause requiring customer verification, record keeping, "
                        "and suspicious transaction monitoring."
                    ),
                    "suggested_rewrite": (
                        "The parties shall verify customer identity, retain KYC evidence, "
                        "perform due diligence, and monitor suspicious transactions in accordance "
                        "with applicable Saudi AML requirements."
                    ),
                },
                {
                    "risk_level": "Medium",
                    "risk_title": "Incomplete Data Privacy Clause",
                    "description": (
                        "The contract does not clearly define how personal data will be collected, "
                        "processed, protected, or retained."
                    ),
                    "recommendation": (
                        "Add a data protection clause covering purpose limitation, consent, "
                        "confidentiality, retention, and data security."
                    ),
                    "suggested_rewrite": (
                        "Personal data shall be collected and processed only for clear contractual "
                        "purposes, protected using appropriate safeguards, retained only as necessary, "
                        "and handled in accordance with applicable Saudi data protection requirements."
                    ),
                },
            ],
        )


ai_compliance_engine = AIComplianceEngine()
