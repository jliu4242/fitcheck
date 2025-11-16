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

class UserPublicResponse(BaseModel):
    username: str
    profile_picture_url: Optional[str] = None

class UserSearchResponse(BaseModel):
    user_id: str
    username: str
    email: str
    profile_picture_url: str | None
    
    class Config:
        from_attributes = True

class UsernameResponse(BaseModel):
    username: str