from uuid import UUID
from pydantic import BaseModel

class RatingData(BaseModel):
    post_id: str | UUID | None
    rating_value: float

class RatingResponse(BaseModel):
    post_id: UUID
    rater_id: UUID
    rating_value: float