import httpx
import pytest_asyncio
from asgi_lifespan import LifespanManager

from app.main import app


@pytest_asyncio.fixture
async def client_test():
    async with LifespanManager(app):
        async with httpx.AsyncClient(app=app, base_url="http://test") as ac:
            yield ac

