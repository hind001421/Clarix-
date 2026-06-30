from io import BytesIO
from pathlib import Path

from fastapi import HTTPException, UploadFile

PDF_CONTENT_TYPE = "application/pdf"
DOCX_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
TXT_CONTENT_TYPE = "text/plain"

SUPPORTED_CONTENT_TYPES = {
    PDF_CONTENT_TYPE,
    DOCX_CONTENT_TYPE,
    TXT_CONTENT_TYPE,
}

SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".txt"}


def is_supported_upload(file: UploadFile) -> bool:
    content_type = file.content_type or ""
    suffix = Path(file.filename or "").suffix.lower()
    return content_type in SUPPORTED_CONTENT_TYPES or suffix in SUPPORTED_EXTENSIONS


async def extract_text_from_upload(file: UploadFile) -> str:
    contents = await file.read()

    if not contents:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    content_type = file.content_type or ""
    suffix = Path(file.filename or "").suffix.lower()

    if content_type == PDF_CONTENT_TYPE or suffix == ".pdf":
        return extract_pdf_text(contents)

    if content_type == DOCX_CONTENT_TYPE or suffix == ".docx":
        return extract_docx_text(contents)

    if content_type == TXT_CONTENT_TYPE or suffix == ".txt":
        return extract_txt_text(contents)

    raise HTTPException(
        status_code=400,
        detail="Only PDF, DOCX, and TXT files are supported for text extraction.",
    )


def extract_pdf_text(contents: bytes) -> str:
    try:
        import pdfplumber

        with pdfplumber.open(BytesIO(contents)) as pdf:
            pages = [page.extract_text() or "" for page in pdf.pages]
    except Exception as exc:
        raise HTTPException(status_code=422, detail="Could not read PDF file.") from exc

    text = "\n\n".join(page.strip() for page in pages if page.strip())

    if not text:
        raise HTTPException(status_code=422, detail="No readable text found in PDF.")

    return text


def extract_docx_text(contents: bytes) -> str:
    try:
        from docx import Document

        document = Document(BytesIO(contents))
        paragraphs = [paragraph.text.strip() for paragraph in document.paragraphs]
    except Exception as exc:
        raise HTTPException(status_code=422, detail="Could not read DOCX file.") from exc

    text = "\n\n".join(paragraph for paragraph in paragraphs if paragraph)

    if not text:
        raise HTTPException(status_code=422, detail="No readable text found in DOCX.")

    return text


def extract_txt_text(contents: bytes) -> str:
    try:
        text = contents.decode("utf-8").strip()
    except UnicodeDecodeError as exc:
        raise HTTPException(status_code=422, detail="TXT file must be encoded as UTF-8.") from exc

    if not text:
        raise HTTPException(status_code=422, detail="No readable text found in TXT.")

    return text
