from sqlalchemy.orm import Session
from ..models.average_ratings import AverageRating

class AverageRatingRepository:

    def create(self, db: Session, avg: AverageRating) -> None:
        db.add(avg)
        db.commit()
        db.refresh(avg)

    def get_by_post_id(self, db: Session, post_id) -> AverageRating:
        return db.query(AverageRating).filter(AverageRating.post_id == post_id).first()


    def update(self, db: Session, post_id, new_avg_value) -> None:
        average_rating = db.query(AverageRating).filter(AverageRating.post_id == post_id).first()
        if average_rating:
            average_rating.average_rating = new_avg_value
            db.merge(average_rating)
            db.commit()