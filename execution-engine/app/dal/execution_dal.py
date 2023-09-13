from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from typing import Optional, List

class ExecutionDal:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["execution_history"]

    async def create_execution(self, data: dict) -> dict:
        result = await self.collection.insert_one(data)
        return str(result)

    async def get_execution(self, id: str) -> Optional[dict]:
        return await self.collection.find_one({"_id": ObjectId(id)})

    async def update_execution(self, id: str, data: dict) -> int:
        result = await self.collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        return result.modified_count

    async def delete_execution(self, id: str) -> bool:
        result = await self.collection.delete_one({"_id": ObjectId(id)})
        return bool(result.deleted_count)

    async def get_all_executions(self) -> List[dict]:
        cursor = self.collection.find({})
        return [doc async for doc in cursor]
