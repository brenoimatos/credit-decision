from fastapi import APIRouter, Depends, HTTPException, status
from models.policy_model import PolicyRead
from services.execution_service import ExecutionService
from deps.dependencies import get_execution_service

router = APIRouter()

@router.get("/{id}", response_model=PolicyRead, response_description="Get a single policy")
async def read_policy(
    id: str,
    service: ExecutionService = Depends(get_execution_service)
):
    if (policy := await service.get_policy(id)) is not None:
        return policy
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Policy {id} not found")

