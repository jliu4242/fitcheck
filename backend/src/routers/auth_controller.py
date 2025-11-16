from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db import get_db
from ..dto.auth_schemas import SignupRequest, SignUpResponse, LoginRequest, LoginResponse
from ..service.auth_service import AuthService
from ..models.users import User
from ..dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])
service = AuthService()


@router.post("/signup", response_model=SignUpResponse, status_code=status.HTTP_201_CREATED)
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    try:
        return service.signup(db, data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))


@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    try:
        return service.login(db, data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))