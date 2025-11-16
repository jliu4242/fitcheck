from ..repository.ratings_repository import RatingsRepository
from ..repository.average_rating_repository import AverageRatingRepository
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
        self.average_ratings_repo = AverageRatingRepository()
        
    def create_rating(self, db: Session, user_id: UUID, post_id: UUID, rating_value: float) -> RatingResponse:
        if self.repo.exists(db, post_id, user_id):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="You have already rated this post"
            )

        # create rating
        rating = Rating(
            rater_id = user_id,
            post_id = post_id,
            rating_value = rating_value
        )

        self.repo.create_rating(db, rating)
        avg = self.findavg(self.get_all_ratings(db, str(post_id)))
        self.average_ratings_repo.update(db, post_id, avg)
        
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
        
    def findavg(self, ratings) -> float:
        ratingSum = 0
        for rating in ratings:
            ratingSum += rating.rating_value
        
        avg = ratingSum // len(ratings)
        return avg