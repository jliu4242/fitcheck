from sqlalchemy.orm import Session
from ..models.posts import Post
from typing import Optional
from uuid import UUID
from ..repository.friend_repository import FriendRepository
from datetime import datetime, date

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

    def find_recent_by_user_id(self, db: Session, user_id: UUID, friend_repo: FriendRepository) -> list[Post]:
        friendships = friend_repo.find_all_friends(db, user_id)

        friend_ids = [
            f.friend_id if f.user_id == user_id else f.user_id
            for f in friendships
        ]
        print(friend_ids)

        today = datetime.now().date()

        posts_today = []
        for friend_id in friend_ids:
            post = self.get_latest_post(db, friend_id)
            
            if post and post.created_at.date() == today:
                posts_today.append(post)
        
        return posts_today
    
    def get_latest_post(self, db: Session, user_id: UUID) -> Optional[Post]:
        return db.query(Post).filter(Post.user_id == user_id).order_by(Post.created_at.desc()).first()