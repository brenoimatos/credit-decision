from fastapi import Depends, Request

from app.dal.policy_dal import PolicyDal
from app.services.policy_service import PolicyService


def get_policy_dal(request: Request):
    return PolicyDal(request.app.mongodb)

def get_policy_service(dal: PolicyDal = Depends(get_policy_dal)) -> PolicyService:
    return PolicyService(dal)
