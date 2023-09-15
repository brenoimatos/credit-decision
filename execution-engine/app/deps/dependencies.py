import httpx
from fastapi import Depends

from app.dal.policy_remote_dal import PolicyRemoteDal
from app.services.execution_service import ExecutionService


async def get_client() -> httpx.AsyncClient:
    try:
        client = httpx.AsyncClient()
        yield client

    finally:
        await client.aclose()

async def get_policy_remote_dal(client: httpx.AsyncClient = Depends(get_client)) -> PolicyRemoteDal:
    yield PolicyRemoteDal(client)

async def get_execution_service(
        policy_remote_dal: PolicyRemoteDal = Depends(get_policy_remote_dal)
) -> ExecutionService:
    yield ExecutionService(policy_remote_dal)
