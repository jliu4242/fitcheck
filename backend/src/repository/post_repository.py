from sqlalchemy.orm import Session
from ..models.posts import Post
from typing import Optional

class PostRepository:

    def find_by_id(self, db: Session, post_id) -> Optional[Post]:
        return db.query(Post).filter(Post.post_id == post_id).first()
    
    def find_all_by_user_id(self, db: Session, user_id) -> list[Post]:
        return db.query(Post).filter(Post.user_id == user_id).order_by(Post.created_at.desc()).all()

    def create_post(self, db: Session, post: Post) -> None:
        db.add(post)
        db.commit()
        db.refresh(post)

    def delete_post(self, db: Session, post: Post) -> None:
        db.delete(post)
        db.commit()