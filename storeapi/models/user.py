from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    id: int | None = None
    email: str
    username: str

class UserIn(BaseModel):
    email: str
    username: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserWithTimestamp(User):
    created_at: datetime