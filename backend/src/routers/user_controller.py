from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db import get_db
from ..service.auth_service import AuthService
from ..models.users import User
from ..dependencies import get_current_user
from sqlalchemy import func, or_
from ..dto.user_schemas import UserSearchResponse, UsernameResponse

router = APIRouter(prefix="/api/users", tags=["auth"])
service = AuthService()

@router.get("/{user_id}", response_model=UsernameResponse)
def get_user_by_id(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = service.repo.find_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UsernameResponse(username=user.username)


@router.get("/search/{query}", response_model=list[UserSearchResponse], status_code=status.HTTP_200_OK)
def search_users(
    query: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Search for users by username or email"""
    
    if not query or len(query.strip()) < 1:
        raise HTTPException(status_code=400, detail="Search query cannot be empty")
    
    # Search query with fuzzy matching
    search_term = f"%{query.lower()}%"
    
    users = db.query(User).filter(
        or_(
            func.lower(User.username).ilike(search_term),
            func.lower(User.email).ilike(search_term)
        ),
        User.user_id != current_user.user_id
    ).limit(5).all()
    
    if not users:
        return []
    
    return [
        UserSearchResponse(
            user_id=str(user.user_id),
            username=user.username,
            email=user.email,
            profile_picture_url=user.profile_picture_url
        )
        for user in users
    ]