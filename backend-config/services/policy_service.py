from dal.policy_dal import PolicyDal

class PolicyService:
    def __init__(self, dal: PolicyDal):
        self.dal = dal

    async def get_policy(self, id: str):
        return await self.dal.get_policy(id)

    async def create_policy(self, policy: dict):
        return await self.dal.create_policy(policy)

    async def update_policy(self, id: str, policy_data: dict):
        return await self.dal.update_policy(id, policy_data)
