from fastapi import APIRouter, status, Depends
from ..dependencies import get_current_user
from ..models.users import User

router = APIRouter(tags=["test"])

@router.get("/", status_code=status.HTTP_200_OK)
def test():
    return "Hello, world!"

@router.get("/protected", status_code=status.HTTP_200_OK)
def test(current_user: User = Depends(get_current_user)):
    return "You have visited a protected endpoint!"