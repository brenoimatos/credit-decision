from fastapi import APIRouter, Depends
from models.customer_model import CustomerPayload
from services.execution_service import ExecutionService
from fastapi.encoders import jsonable_encoder
from deps.dependencies import get_execution_service
from utils.settings import config

router = APIRouter()

@router.post("/", response_model=dict, response_description="Execute a policy")
async def execute_policy(
    customer_payload: CustomerPayload,
    policy_id: str = config.POLICY_ID,
    service: ExecutionService = Depends(get_execution_service)
):
    decision = await service.execute_engine(policy_id, jsonable_encoder(customer_payload))
    return decision