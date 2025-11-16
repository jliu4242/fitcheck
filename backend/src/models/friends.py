from sqlalchemy import Column, ForeignKey, UniqueConstraint, Index
from sqlalchemy.dialects.postgresql import UUID
import uuid

from base import Base


class Friend(Base):
    __tablename__ = "friends"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    friend_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    
    __table_args__ = (
        UniqueConstraint("user_id", "friend_id", name="uq_user_friend"),
        Index("idx_user_friend", "user_id", "friend_id"),
    )
    
    def __repr__(self):
        return f"<Friend(user_id={self.user_id}, friend_id={self.friend_id})>"