from sqlalchemy import DateTime, update
from sqlalchemy.orm import Session
from ..models.comments import Comment
from ..models.users import User
from ..models.posts import Post
from typing import Optional
import uuid
from fastapi import HTTPException

class CommentRepository:

    def get_by_id(self, db: Session, id: uuid.UUID) -> Optional[Comment]:
        try:   
            return db.query(Comment).filter(Comment.comment_id == id).first()
        except Exception:
            raise HTTPException(status_code=404,detail="Comment doesnt exist")
    
    def get_by_post_id(self, db: Session, pid) -> list[Comment]:
        print(db.query(Comment).filter(Comment.post_id == pid).all())
        return db.query(Comment).filter(Comment.post_id == pid).all()
    
    def get_comment_content(self, db: Session, id: uuid.UUID) -> Optional[Comment]:
        return db.query(Comment).filter(Comment.comment_id == id).first().comment_content
    
    def get_parent_comment_id(self, db: Session, id: uuid.UUID):
        return db.query(Comment).filter(Comment.comment_id == id).first().parent_comment_id

    def get_created_at(self, db: Session, id: uuid.UUID) -> Optional[DateTime]:
        return db.query(Comment).filter(Comment.comment_id == id).first().created_at

    def update_comment_content(self, db: Session, id: uuid.UUID, content: str):
        comment = db.query(Comment).filter(Comment.comment_id == id).first()
        if not comment:
            raise HTTPException(status_code=404,detail="Comment doesnt exist")
        comment.comment_content=content
        db.commit()
        try:   
            return db.query(Comment).filter(Comment.comment_id == id).first()
        except Exception:
            return None
        
    def create_comment(self, db: Session, user_id: uuid.UUID, post_id: uuid.UUID, parent_id: uuid, content:str) -> None:
        comment = Comment(user_id=user_id, post_id=post_id, comment_content=content, parent_comment_id=parent_id)

        comment.user_id=user_id
        comment.post_id=post_id
        comment.comment_content = content

        db.add(comment)
        db.commit()
        db.refresh(comment)
        return comment
    
    def delete_comment(self, db: Session, id: uuid.UUID):
        comment = db.query(Comment).filter(Comment.comment_id == id).first()
        if not comment:
            raise HTTPException(status_code=404, detail="Comment not found")
        
        db.delete(comment)
        db.commit()
        return {"detail":"Successfully deleted"}