from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Body, Form
from sqlalchemy.orm import Session
from ..db import get_db
from ..dto.post_schemas import PostResponse
from ..service.post_service import PostService
from ..models.users import User
from ..dependencies import get_current_user

router = APIRouter(prefix="/api/posts", tags=["post"])
service = PostService()


@router.post("/create", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
                    caption: str = Form(None), 
                    image: UploadFile = File(...),
                    db: Session = Depends(get_db), 
                    current_user: User = Depends(get_current_user)
                    ):
    try:
        print("endpoint reached")
        return await service.create_post(db, current_user.user_id, caption, image)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/{post_id}", response_model=PostResponse, status_code=status.HTTP_200_OK)
def get_post(
            post_id: str,
            db: Session = Depends(get_db), 
            current_user: User = Depends(get_current_user),
            ):
    try:
        return service.get_post(db, post_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.get("/all/{user_id}", response_model=list[PostResponse], status_code=status.HTTP_200_OK)
def get_all_posts(
            user_id: str,
            db: Session = Depends(get_db), 
            current_user: User = Depends(get_current_user),
            ):
    try:
        return service.get_all_posts(db, user_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.delete("/{post_id}", status_code=status.HTTP_200_OK)
def delete_post(
            post_id: str,
            db: Session = Depends(get_db), 
            current_user: User = Depends(get_current_user),
            ):
    try:
        return service.delete_post(db, current_user.user_id, post_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    