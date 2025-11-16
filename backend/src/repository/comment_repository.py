from sqlalchemy import DateTime, update
from sqlalchemy.orm import Session
from ..models.comments import Comment
from ..models.users import User
from ..models.posts import Post
from typing import Optional
import uuid

class CommentRepository:

    def get_by_id(self, db: Session, id: uuid) -> Optional[Comment]:
        try:   
            return db.query(Comment).filter(Comment.comment_id == id).first()
        except Exception:
            return None
    
    def get_by_user_id(self, db: Session, uid: uuid) -> Optional[Comment]:
        return db.query(Comment).filter(Comment.user_id == uid).all()
    
    def get_by_post_id(self, db: Session, pid: uuid) -> Optional[Comment]:
        return db.query(Comment).filter(Comment.post_id == pid).all()
    
    def get_comment_content(self, db: Session, cid: uuid) -> Optional[Comment]:
        return db.query(Comment).filter(Comment.id == cid).first().comment_content
    
    def get_parent_comment_id(self, db: Session, cid: uuid):
        return db.query(Comment).filter(Comment.id == cid).first().parent_comment_id

    def get_created_at(self, db: Session, cid: uuid) -> Optional[DateTime]:
        return db.query(Comment).filter(Comment.id == cid).first().created_at

    def update_comment_content(self, db: Session, cid: uuid, content: str):
        command = update(Comment).where(Comment.comment_id == cid).values(comment_content=content)
        db.execute(command)
        db.commit()
        return True
        
    def create_comment(self, db: Session, user_id: uuid, post_id: uuid, parent_id: uuid, content:str) -> None:
        comment = Comment(user_id=user_id, post_id=post_id, comment_content=content, parent_comment_id=parent_id)

        comment.user_id=user_id
        comment.post_id=post_id
        comment.comment_content = content

        db.add(comment)
        db.commit()
        db.refresh(comment)
        return comment