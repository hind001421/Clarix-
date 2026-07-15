from pydantic import BaseModel


class UploadResponse(BaseModel):
    filename: str
    content_type: str
    text: str
    character_count: int
