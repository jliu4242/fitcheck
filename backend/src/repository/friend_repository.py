from sqlalchemy.orm import Session
from typing import Optional
from ..models.friends import Friend

class FriendRepository():

    def add_freind(self, db: Session, curr_user_id, friend_to_add_id) -> None:
        friend = Friend(user_id=curr_user_id, friend_id=friend_to_add_id)
        db.add(friend)
        db.commit()
        db.refresh(friend)

    def remove_friend(self, db: Session, curr_user_id, friend_to_remove_id) -> None:
        friendship = db.query(Friend).filter(
            ((Friend.user_id == curr_user_id) & (Friend.friend_id == friend_to_remove_id)) |
            ((Friend.user_id == friend_to_remove_id) & (Friend.friend_id == curr_user_id))
        ).first()
        
        if friendship:
            db.delete(friendship)
            db.commit()

    def find_all_friends(self, db: Session, user_id) -> list[Friend]:
        return db.query(Friend).filter((Friend.user_id == user_id) | (Friend.friend_id == user_id)).all()

    def is_friended(self, db: Session, curr_user_id, friend_id) -> bool:
        friendship = db.query(Friend).filter(((Friend.user_id == curr_user_id) & (Friend.friend_id == friend_id) | 
                                              (Friend.user_id == friend_id) & (Friend.friend_id == curr_user_id))).first()
        return friendship is not None