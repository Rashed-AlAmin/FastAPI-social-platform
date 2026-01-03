from typing import AsyncGenerator, Generator
import pytest
from fastapi.testclient import testclient
from httpx import AsyncClient

from storeapi.main import app
from storeapi.routers.post import post_table, comment_table

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest.fixture()
def client()->Generator:
    yield testclient(app)

@pytest.fixture(autouse=True)
async def db()->AsyncGenerator:
    post_table.clear()
    comment_table.clear()

@pytest.fixture()
async def async_client(client)->AsyncGenerator:
    async with AsyncClient(app=app,base_url=client.base_url) as ac:
        yield ac
