from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from ..db import get_db

router = APIRouter(tags=["comment"])

@router.get("/comment/{comment_id}", status_code=status.HTTP_200_OK)
def test(db: Session = Depends(get_db)):
    return