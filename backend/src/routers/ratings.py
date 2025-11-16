from fastapi import APIRouter, HTTPException, Request, Query
from uuid import UUID
from pydantic import BaseModel

router = APIRouter(prefix="/ratings", tags=["ratings"])

# ---------------------------  helpers --------------------------
def findavg(ratings) -> float:
    ratingSum = 0
    for i in double:
        ratingSum += i
    
    avg = ratingSum // len(ratings)
    return avg

# ---------------------------- Schemas ---------------------------

class CreateRatings(BaseModel):
    post_id: UUID
    rater_id: UUID
    rating_value: float

# ----------------------------- Routes ------------------------------

@router.post("/create-rating")
async def create_rating(data: CreateRatings, request: Request):
    query = (
        "INSERT INTO ratings (post_id, rater_id, rating_value) "
        "VALUES (%s, %s, %s) RETURNING rating_id"
    )
    
    async with request.app.state.pool.connection() as conn:
        async with conn.cursor() as cur:
            try:
                await cur.execute(
                    query, 
                    (
                        data.post_id,
                        data.rater_id,
                        data.rating_value,
                    ),
                )
                
                result = await cur.fetchone()
                rating_id = result[0]
                await conn.commit()
            except Exception as e:
                    print(f"Database error: {e}")
                    raise HTTPException(status_code=400, detail="Unable to create rating")
                
    return {"event_status": f"created event with id: {rating_id}"}

