from pydantic import BaseModel

class CustomerPayload(BaseModel):
    age: int
    income: int
