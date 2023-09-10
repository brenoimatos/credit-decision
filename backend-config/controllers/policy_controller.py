from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from models.policy_model import PolicyRead, PolicyCreate
from services.policy_service import PolicyService
from deps.dependencies import get_policy_service

router = APIRouter()

@router.post("/", response_model=PolicyRead, response_description="Add new policy")
async def create_policy(
    policy_data: PolicyCreate = Body(...),
    service: PolicyService = Depends(get_policy_service)
):
    policy_data = jsonable_encoder(policy_data)
    new_policy = await service.create_policy(policy_data)
    if new_policy:
        return new_policy
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Policy could not be created")

@router.get("/{id}", response_model=PolicyRead, response_description="Get a single policy")
async def read_policy(
    id: str,
    service: PolicyService = Depends(get_policy_service)
):
    if (policy := await service.get_policy(id)) is not None:
        return policy
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Policy {id} not found")

@router.patch("/{id}", response_model=PolicyRead, response_description="Update a policy")
async def update_policy(
    id: str,
    policy_data: PolicyCreate = Body(...),
    service: PolicyService = Depends(get_policy_service)
):
    policy_data = jsonable_encoder(policy_data)
    if (updated_policy := await service.update_policy(id, policy_data)) is not None:
        return updated_policy
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Policy {id} not found")
