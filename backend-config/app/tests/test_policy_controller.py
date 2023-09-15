import pytest
from httpx import AsyncClient

from app.tests.mocks.initial_policy_mock import INITIAL_POLICY_OUT, OBJECT_ID_STR
from app.tests.mocks.patched_policy_mock import PATCHED_POLICY_IN, PATCHED_POLICY_OUT

pytestmark = pytest.mark.asyncio

async def test_policy_get(client_test: AsyncClient):
    response = await client_test.get(f"policy/{OBJECT_ID_STR}")
    assert response.status_code == 200
    assert response.json() == INITIAL_POLICY_OUT


async def test_policy_patch(client_test: AsyncClient):
    response = await client_test.patch(f"policy/{OBJECT_ID_STR}", json=PATCHED_POLICY_IN)
    
    assert response.status_code == 200
    assert response.json() == PATCHED_POLICY_OUT
    