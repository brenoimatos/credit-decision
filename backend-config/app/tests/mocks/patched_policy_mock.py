
from app.tests.mocks.initial_policy_mock import OBJECT_ID_STR

PATCHED_POLICY_IN = {
    "name": "PolicyName",
    "nodes": [
        {
            "id": "dndnode_5",
            "type": "start",
            "position": {
                "x": 193.00135627657966,
                "y": -149.05176267593873
            },
            "data": {
                "label": "start node",
                "attribute": None,
                "operator": None,
                "inputValue": None,
                "selected": None
            },
            "width": 101.0,
            "height": 51.0
        },
        {
            "id": "dndnode_6",
            "type": "decision",
            "position": {
                "x": -84.31315068423396,
                "y": 214.94228108313467
            },
            "data": {
                "label": "decision node",
                "attribute": "income",
                "operator": ">=",
                "inputValue": "600",
                "selected": None
            },
            "width": 105.0,
            "height": 105.0
        },
        {
            "id": "dndnode_7",
            "type": "decision",
            "position": {
                "x": 30.001860808314234,
                "y": 15.56093797621568
            },
            "data": {
                "label": "decision node",
                "attribute": "age",
                "operator": ">=",
                "inputValue": "25",
                "selected": None
            },
            "width": 105.0,
            "height": 105.0
        },
        {
            "id": "dndnode_11",
            "type": "end",
            "position": {
                "x": -110.70756654345479,
                "y": 451.04700333881385
            },
            "data": {
                "label": "end node",
                "attribute": None,
                "operator": None,
                "inputValue": None,
                "selected": True
            },
            "width": 101.0,
            "height": 51.0
        },
        {
            "id": "dndnode_14",
            "type": "end",
            "position": {
                "x": 163.0384610546077,
                "y": 266.490852669181
            },
            "data": {
                "label": "end node",
                "attribute": None,
                "operator": None,
                "inputValue": None,
                "selected": False
            },
            "width": 101.0,
            "height": 51.0
        },
        {
            "id": "dndnode_17",
            "type": "end",
            "position": {
                "x": 311.87762325317425,
                "y": 39.90776339857788
            },
            "data": {
                "label": "end node",
                "attribute": None,
                "operator": None,
                "inputValue": None,
                "selected": False
            },
            "width": 101.0,
            "height": 51.0
        }
    ],
    "edges": [
        {
            "id": "reactflow__edge-dndnode_5-dndnode_7a",
            "source": "dndnode_5",
            "sourceHandle": None,
            "target": "dndnode_7",
            "targetHandle": "a",
            "label": None
        },
        {
            "id": "reactflow__edge-dndnode_7true-dndnode_6a",
            "source": "dndnode_7",
            "sourceHandle": "True",
            "target": "dndnode_6",
            "targetHandle": "a",
            "label": "True"
        },
        {
            "id": "reactflow__edge-dndnode_6true-dndnode_11a",
            "source": "dndnode_6",
            "sourceHandle": "True",
            "target": "dndnode_11",
            "targetHandle": "a",
            "label": "True"
        },
        {
            "id": "reactflow__edge-dndnode_6false-dndnode_14b",
            "source": "dndnode_6",
            "sourceHandle": "False",
            "target": "dndnode_14",
            "targetHandle": "b",
            "label": "False"
        },
        {
            "id": "reactflow__edge-dndnode_7false-dndnode_17b",
            "source": "dndnode_7",
            "sourceHandle": "False",
            "target": "dndnode_17",
            "targetHandle": "b",
            "label": "False"
        }
    ]
}

PATCHED_POLICY_OUT = {
    **PATCHED_POLICY_IN,
    "_id": OBJECT_ID_STR,
}