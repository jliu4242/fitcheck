from sqlalchemy.orm import Session
from src.models.users import User
from typing import Optional

class UserRepository:

    def find_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create_user(self, db: Session, user: User) -> None:
        db.add(user)
        db.commit()
        db.refresh(user)