from ..repository.friend_repository import FriendRepository
from ..repository.user_repository import UserRepository
from sqlalchemy.orm import Session
from uuid import UUID
from fastapi import HTTPException, status
from ..dto.user_schemas import UserPublicResponse

class FriendService:

    def __init__(self):
        self.repo = FriendRepository()
        self.user_repo = UserRepository()

    def add_friend(self, db: Session, curr_user_id: UUID, username_to_add: str) -> None:
        friend_to_add = self.user_repo.find_by_username(db, username_to_add)
        if not friend_to_add:
            raise ValueError("Friend to add not found")
        
        is_friended = self.repo.is_friended(db, curr_user_id, friend_to_add.user_id)
        if is_friended:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already friended")

        self.repo.add_freind(db, curr_user_id, friend_to_add.user_id)

    def get_all_friends(self, db: Session, user_id: UUID) -> list[UserPublicResponse]:
        friendships = self.repo.find_all_friends(db, user_id)

        friend_ids = [
            f.friend_id if f.user_id == user_id else f.user_id 
            for f in friendships
        ]

        friends = self.user_repo.find_users_by_ids(db, friend_ids)

        return [
            UserPublicResponse(
                username=friend.username,
                profile_picture_url=friend.profile_picture_url
            )
            for friend in friends
        ]
    
    def delete_friend(self, db: Session, curr_user_id: UUID, username_to_delete: str) -> None:
        friend_to_delete = self.user_repo.find_by_username(db, username_to_delete)
        if not friend_to_delete:
            raise ValueError("Friend to delete not found")
        
        is_friended = self.repo.is_friended(db, curr_user_id, friend_to_delete.user_id)
        if not is_friended:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Users are not friended")
        
        self.repo.remove_friend(db, curr_user_id, friend_to_delete.user_id)
    