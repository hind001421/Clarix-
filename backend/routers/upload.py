from fastapi import APIRouter, File, HTTPException, UploadFile

from schemas.upload import UploadResponse
from services.document_service import extract_text_from_upload, is_supported_upload

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("", response_model=UploadResponse)
async def upload_contract(file: UploadFile = File(...)):
    if not is_supported_upload(file):
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOCX, and TXT files are supported for text extraction.",
        )

    extracted_text = await extract_text_from_upload(file)

    return UploadResponse(
        filename=file.filename or "contract.pdf",
        content_type=file.content_type or "application/octet-stream",
        text=extracted_text,
        character_count=len(extracted_text),
    )
