from sqlalchemy.orm import Session
from ..models.users import User
from typing import Optional
from uuid import UUID

class UserRepository:

    def find_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()
    
    def find_by_username(self, db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()
    
    def find_users_by_ids(self, db: Session, user_ids: list[UUID]) -> list[User]:
        return db.query(User).filter(User.user_id.in_(user_ids)).all()

    def create_user(self, db: Session, user: User) -> None:
        db.add(user)
        db.commit()
        db.refresh(user)