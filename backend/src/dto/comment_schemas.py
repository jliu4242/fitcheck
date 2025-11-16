from typing import Optional
from pydantic import BaseModel, EmailStr


class PostComment(BaseModel):
    user_id:str
    post_id:str
    content:str
    parent_id:str