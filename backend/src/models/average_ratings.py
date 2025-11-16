from datetime import datetime
from sqlalchemy import Column, Float, DateTime, ForeignKey, UniqueConstraint, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from .base import Base


class AverageRating(Base):
    __tablename__ = "average_ratings"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    post_id = Column(UUID(as_uuid=True), ForeignKey("posts.post_id"), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    average_rating = Column(Float, nullable=False)
    
    # Relationships
    user = relationship("User")
    post = relationship("Post")
    
    __table_args__ = (
        UniqueConstraint("user_id", "post_id", name="uq_user_post_rating"),
        Index("idx_user_post_rating", "user_id", "post_id"),
    )
    
    def __repr__(self):
        return f"<AverageRating(user_id={self.user_id}, post_id={self.post_id}, average_rating={self.average_rating})>"