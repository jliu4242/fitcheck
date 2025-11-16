from sqlalchemy.orm import Session
from ..models.ratings import Rating
from typing import Optional

class RatingsRepository:
    
    def find_by_id(self, db: Session, user_id) -> Optional[bool]:
        return db.query(Ratings).filter(Ratings.user_id == user_id).first()
    
    def find_all_by_post_id(self, db: Session, post_id) -> list[Rating]:
        return db.query(Rating).filter(Rating.post_id == post_id).all()
    
    def create_rating(self, db: Session, rating: Rating) -> None:
        db.add(rating)
        db.commit()
        db.refresh(rating)