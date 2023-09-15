import pytest_asyncio
from asgi_lifespan import LifespanManager
from httpx import AsyncClient
from mongomock_motor import AsyncMongoMockClient

from app.main import app
from app.tests.mocks.initial_policy_mock import INITIAL_POLICY_IN
from app.utils.settings import config


@pytest_asyncio.fixture
async def client_test():
    async with LifespanManager(app):
        async with AsyncClient(app=app, base_url="http://test") as ac:
            app.mongodb = AsyncMongoMockClient()[config.DB_NAME + 'test']
            await app.mongodb[config.DB_COLLECTION].insert_one(INITIAL_POLICY_IN)
            yield ac
