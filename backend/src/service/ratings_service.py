from ..repository.ratings_repository import RatingsRepository
from sqlalchemy.orm import Session
from ..models.users import User
from ..service.jwt_service import JwtService
from ..dto.rating_schema import RatingResponse
from fastapi import HTTPException, status
from uuid import UUID, uuid4
from ..models.ratings import Rating

jwt_service = JwtService()

class RatingsService():
    
    def __init__(self):
        self.repo = RatingsRepository()
        
    def create_rating(self, db: Session, user_id: UUID, post_id: UUID, rating_value: float) -> RatingResponse:
        
        # create rating
        rating = Rating(
            rater_id = user_id,
            post_id = post_id,
            rating_value = rating_value
        )
        self.repo.create_rating(db, rating)
        
        return rating
    
    def get_all_ratings(self, db: Session, post_id: str):
        post_uuid = ""
        try:
            post_uuid = UUID(post_id)
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail=str(e))

        ratings = self.repo.find_all_by_post_id(db, post_id)
        if not ratings:
            raise ValueError("Post not found")
        
        return ratings
        