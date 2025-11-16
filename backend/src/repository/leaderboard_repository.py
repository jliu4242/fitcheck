from datetime import datetime
from sqlalchemy.orm import Session
from ..models.average_ratings import AverageRating
import uuid
from friend_repository import FriendRepository
from typing import Dict

class LeaderboardRepository:

    def get_leaderboard(self, db: Session, id: uuid.UUID) -> Dict[uuid.UUID, AverageRating]:
        current_date = datetime.now
        leaderboard = []

        friends = FriendRepository().find_all_friends(db=db, user_id=id)
        for friend in friends:
            friend_id = friend.friend_id
            ratings = db.query(AverageRating).filter(AverageRating.user_id==friend_id).all()
            for rating in ratings:
                if rating.created_at.date() == current_date.date():
                    leaderboard.append(rating)
                    break
        
        users_rating = db.query(AverageRating).filter(AverageRating.user_id==id).all()
        for rating in users_rating:
            if rating.created_at.date() == current_date.date():
                    leaderboard.append(rating)
                    break

        sorted_ratings = sorted(leaderboard, key=lambda x: x.average_rating, reverse=True)
        return sorted_ratings