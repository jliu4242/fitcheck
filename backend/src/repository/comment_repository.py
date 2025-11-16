from sqlalchemy import update
from sqlalchemy.orm import Session
from src.models.comments import Comment
from typing import Optional
import uuid

class CommentRepository:

    def get_by_user_id(self, db: Session, uid: uuid) -> Optional[Comment]:
        return db.query(Comment).filter(Comment.user_id == uid).first()
    
    def get_by_post_id(self, db: Session, pid: uuid) -> Optional[Comment]:
        return db.query(Comment).filter(Comment.post_id == pid).first()
    
    def get_comment_content(self, db: Session, cid: uuid):
        return db.query(Comment).filter(Comment.id == cid).first().comment_content
    
    def get_parent_comment_id(self, db: Session, cid: uuid):
        return db.query(Comment).filter(Comment.id == cid).first().parent_comment_id

    def get_created_at(self, db: Session, cid: uuid):
        return db.query(Comment).filter(Comment.id == cid).first().created_at

    def update_comment_content(self, db: Session, cid: uuid, content: str):
        command = update(Comment).where(Comment.comment_id == cid).values(comment_content=content)
        db.execute(command)
        db.commit()
        return True
        
    def create_comment(self, db: Session, comment: Comment) -> None:
        db.add(comment)
        db.commit()
        db.refresh(comment)
        return True