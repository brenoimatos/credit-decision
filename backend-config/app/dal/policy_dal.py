from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase


class PolicyDal:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["policies"]

    async def get_policy(self, id: str):
        return await self.collection.find_one({"_id": ObjectId(id)})

    async def create_policy(self, policy_data: dict):
        await self.collection.insert_one(policy_data)
        return policy_data

    async def update_policy(self, id: str, policy_data: dict):
        update_result = await self.collection.update_one({"_id": ObjectId(id)}, {"$set": policy_data})
        print(f"Update Result: {update_result.modified_count} document(s) modified")
        return await self.get_policy(id)

