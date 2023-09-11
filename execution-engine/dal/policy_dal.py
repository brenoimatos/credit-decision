from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId



class PolicyDal:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["policies"]

    async def get_policy(self, id: str):
        return await self.collection.find_one({"_id": ObjectId(id)})
