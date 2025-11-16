from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db import get_db
from ..service.friend_service import FriendService
from ..models.users import User
from ..dependencies import get_current_user

router = APIRouter(prefix="/api/friend", tags=["friend"])
service = FriendService()

@router.post("/add-friend/{username_to_add}", status_code=status.HTTP_201_CREATED)
def add_friend(username_to_add: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        return service.add_friend(db, current_user.user_id, username_to_add)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    
@router.get("/get-all-friends", status_code=status.HTTP_200_OK)
def get_add_friends(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        return service.get_all_friends(db, current_user.user_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
@router.delete("/remove-friend/{username}", status_code=status.HTTP_200_OK)
def remove_friend(username: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        return service.delete_friend(db, current_user.user_id, username)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))