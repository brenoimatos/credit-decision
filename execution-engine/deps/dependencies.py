from fastapi import Depends, Request
from dal.policy_dal import PolicyDal
from services.execution_service import ExecutionService

def get_policy_dal(request: Request):
    return PolicyDal(request.app.mongodb)

def get_execution_service(dal: PolicyDal = Depends(get_policy_dal)) -> ExecutionService:
    return ExecutionService(dal)
