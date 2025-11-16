from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Body, Form
from sqlalchemy.orm import Session
from ..db import get_db
from ..dto.rating_schema import RatingResponse, RatingData
from ..service.ratings_service import RatingsService
from ..models.ratings import Rating
from ..models.users import User
from ..dependencies import get_current_user

router = APIRouter(prefix="/ratings", tags=["ratings"])
service = RatingsService()

# ---------------------------  helpers --------------------------

@router.post("/create-rating", response_model=RatingResponse, status_code=status.HTTP_201_CREATED)
async def create_rating (
                    ratingData: RatingData,
                    db: Session = Depends(get_db),
                    current_user: User = Depends(get_current_user),
                ):
    try:
        return service.create_rating(db, current_user.user_id, ratingData.post_id, ratingData.rating_value)
    except Exception as e:
        print(f"Full error: {type(e).__name__}")
        print(f"Error details: {str(e)}")
        print(f"Error args: {e.args}")
        raise
    
@router.get("/all/{post_id}")
def get_ratings_avg(
                post_id: str,
                db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user),
                ):
        try:
            avg = service.findavg(service.get_all_ratings(db, post_id))
            return avg
        except Exception as e:
            print(f"Full error: {type(e).__name__}")
            print(f"Error details: {str(e)}")
            print(f"Error args: {e.args}")
            raise
    
    


