from typing import List, Optional
from pydantic import BaseModel, Field
import pydantic


class PositionModel(BaseModel):
    x: float
    y: float

class NodeDataModel(BaseModel):
    label: str
    attribute: Optional[str] = Field(None)
    operator: Optional[str] = Field(None)
    inputValue: Optional[str] = Field(None)
    selected: Optional[bool] = Field(None)


class NodeModel(BaseModel):
    id: str
    type: str
    position: PositionModel
    data: NodeDataModel
    width: Optional[float]
    height: Optional[float]

class EdgeModel(BaseModel):
    id: str
    source: str
    sourceHandle: Optional[str]
    target: str
    targetHandle: Optional[str]
    label: Optional[str] = Field(None)

class PolicyRead(BaseModel):
    id: str = Field(alias='_id')
    name: str
    nodes: List[NodeModel]
    edges: List[EdgeModel]

    @pydantic.validator('id', pre=True, always=True)
    def convert_id(cls, id):
        return str(id) if id else id

    
