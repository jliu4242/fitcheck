import uuid
from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from ..repository.leaderboard_repository import LeaderboardRepository
from ..db import get_db
from ..dto.comment_schemas import PostComment, UpdateComment
from ..dependencies import get_current_user
from ..models.users import User

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])

@router.get("", status_code=status.HTTP_200_OK)
def get_leaderboard(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return LeaderboardRepository().get_leaderboard(db=db, id=current_user.user_id)