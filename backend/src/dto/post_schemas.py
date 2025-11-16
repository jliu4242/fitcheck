from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

"""

Request DTOs

"""



"""

Response DTOs

"""

class PostResponse(BaseModel):
    post_id: UUID
    user_id: UUID
    image_url: str
    caption: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True