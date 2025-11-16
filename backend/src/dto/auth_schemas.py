from typing import Optional
from pydantic import BaseModel, EmailStr

"""

Request DTOs

"""

class SignupRequest(BaseModel):
    email: EmailStr
    username: str
    password: str
    profile_picture_url: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

"""

Response DTOs

"""

class SignUpResponse(BaseModel):
    pass

class LoginResponse(BaseModel):
    accessToken: str