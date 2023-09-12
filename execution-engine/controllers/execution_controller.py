from fastapi import APIRouter, Depends, HTTPException, status
from models.customer_model import CustomerPayload
from services.execution_service import ExecutionService
from fastapi.encoders import jsonable_encoder
from deps.dependencies import get_execution_service

router = APIRouter()

@router.get("/{id}", response_model=str, response_description="Get a single execution")
async def get_execution(
    id: str,
    service: ExecutionService = Depends(get_execution_service)
):
    if (policy := await service.get_execution(id)) is not None:
        return policy
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Execution {id} not found")


@router.post("/", response_model=dict, response_description="Execute a policy")
async def execute_policy(
    policy_id: str,
    customer_payload: CustomerPayload,
    service: ExecutionService = Depends(get_execution_service)
):
    decision = await service.execute_engine(policy_id, jsonable_encoder(customer_payload))
    return decision