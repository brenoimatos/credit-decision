import httpx
import pytest
import pytest_asyncio

from app.tests.mocks.policy_mock import POLICY_MOCK


@pytest_asyncio.fixture
async def mock_get(monkeypatch):
    async def mock_async_get(*args, **kwargs):
        mock_request = httpx.Request('GET', 'http://example.com')
        mock_response = httpx.Response(200, json=POLICY_MOCK)
        mock_response.request = mock_request
        return mock_response

    monkeypatch.setattr(httpx.AsyncClient, 'get', mock_async_get)

@pytest.mark.asyncio
async def test_execute_policy(client_test: httpx.AsyncClient, mock_get):
    response = await client_test.post(
        "/execution/",
        json={"age": 25, "income": 800},
    )
    
    assert response.status_code == 200
    assert {"decision": True} == response.json()
