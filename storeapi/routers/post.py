import logging
from enum import Enum
from typing import Annotated

import sqlalchemy
from fastapi import APIRouter, Depends, HTTPException

from storeapi.database import comment_table, database, like_table, post_table, user_table
from storeapi.models.post import (
    Comment,
    CommentIn,
    PostLike,
    PostLikeIn,
    UserPost,
    UserPostIn,
    UserPostWithComments,
    UserPostWithLikes,
)
from storeapi.models.user import User
from storeapi.security import get_current_user

router = APIRouter()

logger = logging.getLogger(__name__)

select_post_and_likes = (
    sqlalchemy.select(
        post_table.c.id,
        post_table.c.body,
        post_table.c.user_id,
        post_table.c.image_url,
        post_table.c.created_at,
        sqlalchemy.func.count(like_table.c.id).label("likes"),
        sqlalchemy.func.coalesce(user_table.c.username, "Unknown").label("username"),
    )
    .select_from(
        post_table
        .outerjoin(like_table, post_table.c.id == like_table.c.post_id)
        .outerjoin(user_table, post_table.c.user_id == user_table.c.id)
    )
    .group_by(post_table.c.id, user_table.c.username)
)

async def find_post(post_id: int):
    logger.info(f"finding post with id {post_id}")
    query = post_table.select().where(post_table.c.id == post_id)
    logger.debug(query)
    return await database.fetch_one(query)

@router.post("/post", response_model=UserPost, status_code=201)
async def create_post(
    post: UserPostIn, current_user: Annotated[User, Depends(get_current_user)]
):
    logger.info("creating post")
    data = {**post.model_dump(), "user_id": current_user.id}
    query = post_table.insert().values(data)
    last_record_id = await database.execute(query)
    
    # Fetch the created post to get all fields including created_at
    created_post = await find_post(last_record_id)
    return created_post

class PostSorting(str, Enum):
    new = "new"
    old = "old"
    most_likes = "most_likes"

@router.get("/post", response_model=list[UserPostWithLikes])
async def get_all_post(sorting: PostSorting = PostSorting.new):
    logger.info("getting all the post")

    if sorting == PostSorting.new:
        query = select_post_and_likes.order_by(post_table.c.id.desc())
    elif sorting == PostSorting.old:
        query = select_post_and_likes.order_by(post_table.c.id.asc())
    elif sorting == PostSorting.most_likes:
        query = select_post_and_likes.order_by(sqlalchemy.desc("likes"))

    logger.debug(query)
    return await database.fetch_all(query)

@router.post("/comment", response_model=Comment, status_code=201)
async def create_comment(
    comment: CommentIn, current_user: Annotated[User, Depends(get_current_user)]
):
    logger.info("creating comments")
    post = await find_post(comment.post_id)
    if not post:
        raise HTTPException(status_code=404, detail="post not found")
    
    data = {**comment.model_dump(), "user_id": current_user.id}
    query = comment_table.insert().values(data)
    last_record_id = await database.execute(query)
    
    # Fetch the created comment to get all fields including created_at and username
    comment_query = (
        sqlalchemy.select(comment_table, user_table.c.username)
        .select_from(comment_table.join(user_table))
        .where(comment_table.c.id == last_record_id)
    )
    created_comment = await database.fetch_one(comment_query)
    
    return created_comment

@router.get("/post/{post_id}/comment", response_model=list[Comment])
async def get_all_comment_on_post(post_id: int):
    logger.info("Getting comments on post")
    query = (
        sqlalchemy.select(comment_table, user_table.c.username)
        .select_from(comment_table.join(user_table))
        .where(comment_table.c.post_id == post_id)
    )
    logger.debug(query)
    return await database.fetch_all(query)

@router.get("/post/{post_id}", response_model=UserPostWithComments)
async def get_post_with_comments(post_id: int):
    logger.info("Getting post and its comments")
    query = select_post_and_likes.where(post_table.c.id == post_id)
    logger.debug(query)
    post = await database.fetch_one(query)
    if not post:
        raise HTTPException(status_code=404, detail="post not found")
    return {
        "post": post,
        "comments": await get_all_comment_on_post(post_id),
    }

@router.post("/like", response_model=PostLike, status_code=201)
async def like_post(
    like: PostLikeIn, current_user: Annotated[User, Depends(get_current_user)]
):
    logger.info("liking post")
    post = await find_post(like.post_id)
    if not post:
        raise HTTPException(status_code=404, detail="post not found")
    data = {**like.model_dump(), "user_id": current_user.id}
    query = like_table.insert().values(data)
    logger.debug(query)
    last_record_id = await database.execute(query)
    return {**data, "id": last_record_id}

@router.delete("/post/{post_id}", status_code=204)
async def delete_post(
    post_id: int, current_user: Annotated[User, Depends(get_current_user)]
):
    logger.info(f"deleting post {post_id}")
    post = await find_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="post not found")
    
    # Check if user owns the post
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="not authorized to delete this post")
    
    # Delete likes first (foreign key constraint)
    delete_likes = like_table.delete().where(like_table.c.post_id == post_id)
    await database.execute(delete_likes)
    
    # Delete comments
    delete_comments = comment_table.delete().where(comment_table.c.post_id == post_id)
    await database.execute(delete_comments)
    
    # Delete post
    query = post_table.delete().where(post_table.c.id == post_id)
    await database.execute(query)
    return None

@router.put("/post/{post_id}", response_model=UserPost)
async def update_post(
    post_id: int,
    post_update: UserPostIn,
    current_user: Annotated[User, Depends(get_current_user)],
):
    logger.info(f"updating post {post_id}")
    post = await find_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="post not found")
    
    # Check if user owns the post
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="not authorized to edit this post")
    
    query = (
        post_table.update()
        .where(post_table.c.id == post_id)
        .values(body=post_update.body)
    )
    await database.execute(query)
    
    # Return updated post
    updated_post = await find_post(post_id)
    return updated_post

@router.get("/user/{user_id}/posts", response_model=list[UserPostWithLikes])
async def get_user_posts(user_id: int):
    logger.info(f"getting posts for user {user_id}")
    query = select_post_and_likes.where(post_table.c.user_id == user_id).order_by(
        post_table.c.id.desc()
    )
    return await database.fetch_all(query)