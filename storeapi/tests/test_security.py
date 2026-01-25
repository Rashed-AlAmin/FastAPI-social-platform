import pytest 
from storeapi.security import get_user,verify_password,get_password_hash

@pytest.mark.anyio
async def test_password_hashes():
    password="password"
    hashed=get_password_hash(password)
    assert verify_password(password,hashed)


@pytest.mark.anyio 
async def test_get_user(registered_user:dict):
    user=await get_user(registered_user["email"])

    assert user.email==registered_user["email"]

@pytest.mark.anyio
async def test_get_user_not_found():
    user=await get_user("test@example.com")
    assert user is None