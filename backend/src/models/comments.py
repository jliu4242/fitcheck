from datetime import datetime
from sqlalchemy import Column, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from pydantic import BaseModel

from .base import Base


class Comment(Base):
    __tablename__ = "comments"
    
    comment_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    post_id = Column(UUID(as_uuid=True), ForeignKey("posts.post_id"), nullable=False)
    comment_content = Column(Text, nullable=False)
    parent_comment_id = Column(UUID(as_uuid=True), ForeignKey("comments.comment_id"), nullable=True, default=None)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="comments")
    post = relationship("Post", back_populates="comments")
    parent_comment = relationship("Comment", remote_side=[comment_id], backref="replies")
    
    def __repr__(self):
        return f"<Comment(comment_id={self.comment_id}, user_id={self.user_id}, post_id={self.post_id})>"
