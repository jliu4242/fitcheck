from ..repository.post_repository import PostRepository
from ..repository.average_rating_repository import AverageRatingRepository
from ..repository.friend_repository import FriendRepository
from sqlalchemy.orm import Session
from ..models.users import User
from ..service.jwt_service import JwtService
from ..service.image_service import ImageService
from ..dto.post_schemas import PostResponse
from fastapi import UploadFile, HTTPException, status
from uuid import UUID, uuid4
from ..models.posts import Post
from ..models.average_ratings import AverageRating

jwt_service = JwtService()
image_service = ImageService()

class PostService:

    def __init__(self):
        self.repo = PostRepository()
        self.average_rating_repo = AverageRatingRepository()
        self.friend_repo = FriendRepository()

    async def create_post(self, db: Session, user_id: UUID, caption: str, image: UploadFile) -> PostResponse:
        
        # check file type
        if image.content_type not in ["image/jpeg", "image/jpg", "image/png", "image/webp"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid file type"
            )
    
        # upload image
        file_bytes = await image.read()
        upload_result = image_service.upload_image_from_bytes(
            file_bytes,
            image.filename,
            folder="post_images"
        )

        # check if image was uploaded successfully
        if not upload_result["success"]:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=upload_result["error"]
            )
        
        # create post
        post = Post(
            user_id=user_id,
            image_url=upload_result["url"],
            caption=caption
        )
        self.repo.create_post(db, post)

        avg = AverageRating(
            user_id=user_id,
            post_id=post.post_id,
            created_at=post.created_at,
            average_rating=0
        )
        self.average_rating_repo.create(db, avg)

        return post
    
    def get_post(self, db: Session, post_id: str) -> PostResponse:
        post_uuid = ""
        try:
            post_uuid = UUID(post_id)
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail=str(e))

        post = self.repo.find_by_id(db, post_uuid)
        if not post:
            raise ValueError("Post not found")
        
        return post
    
    def get_all_posts(self, db: Session, user_id: str) -> list[PostResponse]:
        user_uuid = ""
        try:
            user_uuid = UUID(user_id)
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail=str(e))
        
        posts = self.repo.find_all_by_user_id(db, user_uuid)
        return posts
    
    def get_all_recent_posts(self, db: Session, user_id: UUID) -> list[PostResponse]:
        posts = self.repo.find_recent_by_user_id(db, user_id, self.friend_repo)
        return posts
    
    def delete_post(self, db: Session, user_id: UUID, post_id: str):
        post_uuid = ""
        try:
            post_uuid = UUID(post_id)
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail=str(e))
        
        post = self.repo.find_by_id(db, post_uuid)
        if not post:
            raise ValueError("Post not found")
        
        if not post.user_id == user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not authorized to delete this post.")
        
        # TODO: fix later
        # image_service.delete_image(post.image_url)
        self.repo.delete_post(db, post)

    