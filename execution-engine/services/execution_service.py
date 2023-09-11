from dal.policy_dal import PolicyDal

class ExecutionService:
    def __init__(self, dal: PolicyDal):
        self.dal = dal

    async def get_policy(self, id: str):
        return await self.dal.get_policy(id)

