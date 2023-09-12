from fastapi import Depends, Request
from dal.execution_dal import ExecutionDal
from dal.policy_remote_dal import PolicyRemoteDal
from services.execution_service import ExecutionService
import httpx


async def get_client() -> httpx.AsyncClient:
    try:
        client = httpx.AsyncClient()
        yield client

    finally:
        await client.aclose()

async def get_policy_remote_dal(client: httpx.AsyncClient = Depends(get_client)) -> PolicyRemoteDal:
    yield PolicyRemoteDal(client)


async def get_execution_dal(request: Request) -> ExecutionDal:
    yield ExecutionDal(request.app.mongodb)

async def get_execution_service(
        dal: ExecutionDal = Depends(get_execution_dal),
        policy_remote_dal: PolicyRemoteDal = Depends(get_policy_remote_dal)
) -> ExecutionService:
    yield ExecutionService(dal, policy_remote_dal)




