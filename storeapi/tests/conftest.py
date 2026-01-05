from typing import AsyncGenerator
import pytest
#from fastapi.testclient import TestClient
from httpx import AsyncClient,ASGITransport

from storeapi.main import app
from storeapi.routers.post import post_table, comment_table

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

# @pytest.fixture()
# def client()->Generator:
#     yield TestClient(app)

@pytest.fixture(autouse=True)
async def db()->AsyncGenerator:
    post_table.clear()
    comment_table.clear()
    yield

@pytest.fixture()
async def async_client()->AsyncGenerator:
    async with AsyncClient(transport=ASGITransport(app=app),
    base_url="http://test") as ac:
        yield ac
