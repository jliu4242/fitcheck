from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from .base import Base


class User(Base):
    __tablename__ = "users"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    profile_picture_url = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    posts = relationship("Post", back_populates="user", cascade="all, delete-orphan")
    ratings = relationship("Rating", back_populates="rater", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    friends = relationship(
        "User",
        secondary="friends",
        primaryjoin="User.user_id == friends.c.user_id",
        secondaryjoin="User.user_id == friends.c.friend_id",
        backref="befriended_by"
    )
    
    def __repr__(self):
        return f"<User(user_id={self.user_id}, username={self.username}, email={self.email})>"