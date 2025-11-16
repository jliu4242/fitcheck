from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from ..repository.comment_repository import *
from ..db import get_db
from ..dto.comment_schemas import PostComment

router = APIRouter(prefix="/comment", tags=["comment"])

@router.get("/{comment_id}", status_code=status.HTTP_200_OK)
def get_by_id(comment_id:str, db: Session = Depends(get_db)):
    return CommentRepository().get_by_id(db=db, id=uuid.UUID(comment_id))

@router.get("/{user_id}", status_code=status.HTTP_200_OK)
def get_by_user_id(user_id:str, db: Session = Depends(get_db)):
    return CommentRepository().get_by_user_id(db=db, id=uuid.UUID(user_id))

@router.get("/{post_id}", status_code=status.HTTP_200_OK)
def get_by_post_id(post_id:str, db: Session = Depends(get_db)):
    return CommentRepository().get_by_user_id(db=db, id=uuid.UUID(post_id))

@router.post("/",status_code=status.HTTP_200_OK)
def post_comment(comment:PostComment, db: Session = Depends(get_db)):
    parent_id = None
    if comment.parent_id != "":
        try:
            parent_id=uuid.UUID(comment.parent_id)
        except ValueError:
            parent_id = None
    try:
        user_id=uuid.UUID(comment.user_id)
        post_id=uuid.UUID(comment.post_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")

    comment = CommentRepository().create_comment(db=db, 
                                    user_id=user_id, 
                                    post_id=post_id, 
                                    content=comment.content,
                                    parent_id=parent_id)
    return {"data":comment}

