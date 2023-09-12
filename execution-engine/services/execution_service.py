from fastapi import HTTPException
from dal.execution_dal import ExecutionDal
from dal.policy_remote_dal import PolicyRemoteDal

class ExecutionService:
    def __init__(self, dal: ExecutionDal, policy_remote_dal: PolicyRemoteDal):
        self.dal = dal
        self.policy_remote_dal = policy_remote_dal

    async def get_execution(self, id: str):
        return await self.dal.get_execution(id)
    
    async def execute_engine(self, policy_id: str, customer_payload: dict) -> dict:
        policy = await self.policy_remote_dal.get_policy(policy_id)
        if not policy:
            raise HTTPException(status_code=404, detail="Policy not found")

        # Aqui, você faz a lógica para avaliar se o customer_payload passa pela policy
        # Isso é um exemplo. Você terá que adaptar isso às regras reais.
        if customer_payload.get('age') >= policy.get('min_age') and customer_payload.get('income') >= policy.get('min_income'):
            return {"decision": True}
        return {"decision": False}

