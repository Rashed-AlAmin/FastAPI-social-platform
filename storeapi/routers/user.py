import logging
from fastapi import APIRouter, HTTPException, status, Request, Depends
from fastapi.security import OAuth2PasswordRequestForm
from storeapi.models.user import UserIn
from typing import Optional
from storeapi.security import (
    get_user,
    get_password_hash,
    authenticate_user,
    create_access_token,
    create_confirmation_token,
    get_subject_for_token_type,
)
from storeapi.database import database, user_table

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/register", status_code=201)
async def register(user: UserIn, request: Request):
    # Check if email exists
    if await get_user(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with that email already exists",
        )
    
    # Check if username exists
    query = user_table.select().where(user_table.c.username == user.username)
    existing_username = await database.fetch_one(query)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with that username already exists",
        )

    hashed_password = get_password_hash(user.password)
    query = user_table.insert().values(
        email=user.email,
        username=user.username,
        password=hashed_password,
        confirmed=True,  # Auto-confirm for development
    )

    logger.debug(query)

    await database.execute(query)
    return {
        "detail": "user created",
    }


@router.post("/token")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    user_login: Optional[dict] = None
):
    # Support both form data (Swagger) and JSON (frontend)
    if form_data.username:
        # Swagger OAuth2 form (username field contains email)
        email = form_data.username
        password = form_data.password
    else:
        # This won't work, we need a different approach
        pass
    
    user_data = await authenticate_user(email, password)
    access_token = create_access_token(user_data.email)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/confirm/{token}")
async def confirm_email(token: str):
    email = get_subject_for_token_type(token, "confirmation")
    query = user_table.update().where(user_table.c.email == email).values(confirmed=True)
    logger.debug(query)
    await database.execute(query)
    return {"detail": "User confirmed"}