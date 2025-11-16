from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from ..repository.comment_repository import *
from ..db import get_db
from ..dto.comment_schemas import PostComment, UpdateComment

router = APIRouter(prefix="/comment", tags=["comment"])

@router.get("/get_by_id/{comment_id}", status_code=status.HTTP_200_OK)
def get_by_id(comment_id:str, db: Session = Depends(get_db)):
    comment_id = validate_uuid(comment_id)
    return CommentRepository().get_by_id(db=db, id=comment_id)

@router.get("/get_by_post_id/{post_id}", status_code=status.HTTP_200_OK)
def get_by_post_id(post_id:str, db: Session = Depends(get_db)):
    post_id = validate_uuid(post_id)
    return CommentRepository().get_by_post_id(db=db, pid=post_id)

@router.get("/get_content/{comment_id}", status_code=status.HTTP_200_OK)
def get_content(comment_id:str, db: Session = Depends(get_db)):
    comment_id = validate_uuid(comment_id)
    return CommentRepository().get_comment_content(db=db, id=comment_id)

@router.get("/get_parent/{comment_id}", status_code=status.HTTP_200_OK)
def get_parent(comment_id:str, db: Session = Depends(get_db)):
    comment_id = validate_uuid(comment_id)
    
    parent_id = CommentRepository().get_parent_comment_id(db=db, id=comment_id)

    try:
        if parent_id != None and CommentRepository().get_by_id(db=db, id=parent_id).post_id != CommentRepository().get_by_id(db=db, id=comment_id).post_id:
            raise HTTPException(status_code=400, detail="Invalid Parent")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Parent")

    return parent_id


@router.get("/get_created_at/{comment_id}", status_code=status.HTTP_200_OK)
def get_created_at(comment_id:str, db: Session = Depends(get_db)):
    comment_id = validate_uuid(comment_id)
    return CommentRepository().get_created_at(db=db, id=comment_id)

@router.put("/update_comment_content/",status_code=status.HTTP_200_OK)
def update_comment_content(comment: UpdateComment, db: Session = Depends(get_db)):
    if comment.new_content == None:
        raise HTTPException(status_code=400, detail="Content cant be null")
    comment_id = validate_uuid(comment.comment_id)
    return CommentRepository().update_comment_content(db=db, id=comment_id, content=comment.new_content)


@router.post("/post_comment/",status_code=status.HTTP_200_OK)
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

@router.delete("/delete_comment/{comment_id}",status_code=status.HTTP_200_OK)
def delete_comment(comment_id:str, db: Session = Depends(get_db)):
    comment_id = validate_uuid(comment_id)
    return CommentRepository().delete_comment(db=db, id=comment_id)




def validate_uuid(to_validate:str):
    try:
        return uuid.UUID(to_validate)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")