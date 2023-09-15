from typing import Optional

import httpx
from fastapi import HTTPException

from app.utils.settings import config


class PolicyRemoteDal:
    def __init__(self, client: httpx.AsyncClient):
        self.async_client = client

    async def get_policy(self, policy_id: str) -> Optional[dict]:
        try:
            response = await self.async_client.get(f"{config.POLICY_API}/{policy_id}")
            response.raise_for_status()
            policy_data = response.json()
            return policy_data
        except httpx.HTTPError as err:
            raise HTTPException(status_code=502, detail=f"An error occurred while fetching the policy: {err}")