from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from .base import Base


class Rating(Base):
    __tablename__ = "ratings"
    
    rating_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    post_id = Column(UUID(as_uuid=True), ForeignKey("posts.post_id"), nullable=False)
    rater_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    rating_value = Column(Integer, nullable=False)
    
    # Relationships
    post = relationship("Post", back_populates="ratings")
    rater = relationship("User", back_populates="ratings")
    
    __table_args__ = (
        UniqueConstraint("post_id", "rater_id", name="uq_post_rater"),
        Index("idx_post_rater", "post_id", "rater_id"),
    )
    
    def __repr__(self):
        return f"<Rating(rating_id={self.rating_id}, post_id={self.post_id}, rating_value={self.rating_value})>"