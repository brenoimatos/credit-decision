from bson import ObjectId

OBJECT_ID_STR = '64fe4c4059f7f891749600c3'

POLICY_MOCK_COMMON = {
    "name": "PolicyName",
    "nodes": [{
        "id": "dndnode_5",
        "type": "start",
        "position": {
            "x": 129.20197670206556,
            "y": -176.60149476493348
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
    }, {
        "id": "dndnode_6",
        "type": "decision",
        "position": {
            "x": -13.263841612615977,
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
    }, {
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
    }, {
        "id": "dndnode_8",
        "type": "decision",
        "position": {
            "x": 387.6517901843813,
            "y": 273.37039040570585
        },
        "data": {
            "label": "decision node",
            "attribute": "income",
            "operator": ">=",
            "inputValue": "2505",
            "selected": None
        },
        "width": 105.0,
        "height": 105.0
    }, {
        "id": "dndnode_9",
        "type": "decision",
        "position": {
            "x": 369.07510470942054,
            "y": 53.11033307595678
        },
        "data": {
            "label": "decision node",
            "attribute": "age",
            "operator": ">=",
            "inputValue": "18",
            "selected": None
        },
        "width": 105.0,
        "height": 105.0
    }, {
        "id": "dndnode_10",
        "type": "end",
        "position": {
            "x": 650.6403913865544,
            "y": 254.51742297598315
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
    }, {
        "id": "dndnode_11",
        "type": "end",
        "position": {
            "x": -46.90818696894064,
            "y": 439.44711614344766
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
    }, {
        "id": "dndnode_12",
        "type": "end",
        "position": {
            "x": 414.4879501832338,
            "y": 459.164553960725
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
    }, {
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
    }, {
        "id": "dndnode_16",
        "type": "end",
        "position": {
            "x": 657.1459750737532,
            "y": 91.7354023881686
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
    }],
    "edges": [{
        "id": "reactflow__edge-dndnode_5-dndnode_7a",
        "source": "dndnode_5",
        "sourceHandle": None,
        "target": "dndnode_7",
        "targetHandle": "a",
        "label": None
    }, {
        "id": "reactflow__edge-dndnode_7true-dndnode_6a",
        "source": "dndnode_7",
        "sourceHandle": "True",
        "target": "dndnode_6",
        "targetHandle": "a",
        "label": "True"
    }, {
        "id": "reactflow__edge-dndnode_6true-dndnode_11a",
        "source": "dndnode_6",
        "sourceHandle": "True",
        "target": "dndnode_11",
        "targetHandle": "a",
        "label": "True"
    }, {
        "id": "reactflow__edge-dndnode_6false-dndnode_14b",
        "source": "dndnode_6",
        "sourceHandle": "False",
        "target": "dndnode_14",
        "targetHandle": "b",
        "label": "False"
    }, {
        "id": "reactflow__edge-dndnode_7false-dndnode_9a",
        "source": "dndnode_7",
        "sourceHandle": "False",
        "target": "dndnode_9",
        "targetHandle": "a",
        "label": "False"
    }, {
        "id": "reactflow__edge-dndnode_9true-dndnode_8a",
        "source": "dndnode_9",
        "sourceHandle": "True",
        "target": "dndnode_8",
        "targetHandle": "a",
        "label": "True"
    }, {
        "id": "reactflow__edge-dndnode_8false-dndnode_10b",
        "source": "dndnode_8",
        "sourceHandle": "False",
        "target": "dndnode_10",
        "targetHandle": "b",
        "label": "False"
    }, {
        "id": "reactflow__edge-dndnode_8true-dndnode_12a",
        "source": "dndnode_8",
        "sourceHandle": "True",
        "target": "dndnode_12",
        "targetHandle": "a",
        "label": "True"
    }, {
        "id": "reactflow__edge-dndnode_9false-dndnode_16b",
        "source": "dndnode_9",
        "sourceHandle": "False",
        "target": "dndnode_16",
        "targetHandle": "b",
        "label": "False"
    }]
}

INITIAL_POLICY_IN = {
    **POLICY_MOCK_COMMON,
    "_id": ObjectId(OBJECT_ID_STR),
}

INITIAL_POLICY_OUT = {
    **POLICY_MOCK_COMMON,
    "_id": OBJECT_ID_STR
}