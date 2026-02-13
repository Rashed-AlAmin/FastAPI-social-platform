from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class UserPostIn(BaseModel):
    body: str

class UserPost(UserPostIn):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    image_url: Optional[str] = None
    created_at: datetime

class UserPostWithLikes(UserPost):
    model_config = ConfigDict(from_attributes=True)
    likes: int
    username: str  # Add username

class CommentIn(BaseModel):
    body: str
    post_id: int

class Comment(CommentIn):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    username: str  # Add username
    created_at: datetime

class UserPostWithComments(BaseModel):
    post: UserPostWithLikes
    comments: list[Comment]

class PostLikeIn(BaseModel):
    post_id: int

class PostLike(PostLikeIn):
    id: int
    user_id: int