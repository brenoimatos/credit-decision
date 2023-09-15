POLICY_MOCK = {
    "name": "PolicyName",
    "nodes": [
        {
            "id": "dndnode_5",
            "type": "start",
            "position": {
                "x": 149.0457675840962,
                "y": -252.21283817870602
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
            "id": "dndnode_7",
            "type": "decision",
            "position": {
                "x": -34.585942984722635,
                "y": -94.77656017022237
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
            "id": "dndnode_29",
            "type": "decision",
            "position": {
                "x": 309.87156449649973,
                "y": -54.8439474775068
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
        },
        {
            "id": "dndnode_30",
            "type": "decision",
            "position": {
                "x": -56.1259903307095,
                "y": 125.46367144472126
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
            "id": "dndnode_31",
            "type": "decision",
            "position": {
                "x": 334.09199091888854,
                "y": 169.4192601372047
            },
            "data": {
                "label": "decision node",
                "attribute": "income",
                "operator": ">=",
                "inputValue": "2500",
                "selected": None
            },
            "width": 105.0,
            "height": 105.0
        },
        {
            "id": "dndnode_32",
            "type": "end",
            "position": {
                "x": 163.65195313170776,
                "y": 190.05147523775815
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
            "id": "dndnode_35",
            "type": "end",
            "position": {
                "x": 517.090768332493,
                "y": 243.87464506528895
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
            "id": "dndnode_36",
            "type": "end",
            "position": {
                "x": 361.90062866311274,
                "y": 388.3001507691631
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
            "id": "dndnode_37",
            "type": "end",
            "position": {
                "x": 508.24981667168015,
                "y": 6.803528212572992
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
            "id": "dndnode_38",
            "type": "end",
            "position": {
                "x": -52.195611031008696,
                "y": 324.4751917209582
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
            "id": "reactflow__edge-dndnode_7true-dndnode_30a",
            "source": "dndnode_7",
            "sourceHandle": "True",
            "target": "dndnode_30",
            "targetHandle": "a",
            "label": "True"
        },
        {
            "id": "reactflow__edge-dndnode_30false-dndnode_32b",
            "source": "dndnode_30",
            "sourceHandle": "False",
            "target": "dndnode_32",
            "targetHandle": "b",
            "label": "False"
        },
        {
            "id": "reactflow__edge-dndnode_31true-dndnode_36a",
            "source": "dndnode_31",
            "sourceHandle": "True",
            "target": "dndnode_36",
            "targetHandle": "a",
            "label": "True"
        },
        {
            "id": "reactflow__edge-dndnode_29true-dndnode_31a",
            "source": "dndnode_29",
            "sourceHandle": "True",
            "target": "dndnode_31",
            "targetHandle": "a",
            "label": "True"
        },
        {
            "id": "reactflow__edge-dndnode_7false-dndnode_29a",
            "source": "dndnode_7",
            "sourceHandle": "False",
            "target": "dndnode_29",
            "targetHandle": "a",
            "label": "False"
        },
        {
            "id": "reactflow__edge-dndnode_31false-dndnode_35b",
            "source": "dndnode_31",
            "sourceHandle": "False",
            "target": "dndnode_35",
            "targetHandle": "b",
            "label": "False"
        },
        {
            "id": "reactflow__edge-dndnode_29false-dndnode_37b",
            "source": "dndnode_29",
            "sourceHandle": "False",
            "target": "dndnode_37",
            "targetHandle": "b",
            "label": "False"
        },
        {
            "id": "reactflow__edge-dndnode_30true-dndnode_38a",
            "source": "dndnode_30",
            "sourceHandle": "True",
            "target": "dndnode_38",
            "targetHandle": "a",
            "label": "True"
        }
    ],
    "_id": "64fe4c4059f7f891749600c2"
}

FIRST_DECISION_NODE_ID_MOCK = "dndnode_7"

NODES_MOCK = [
    {
        "id": "dndnode_5",
        "type": "start",
        "position": {
            "x": 149.0457675840962,
            "y": -252.21283817870602
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
        "id": "dndnode_7",
        "type": "decision",
        "position": {
            "x": -34.585942984722635,
            "y": -94.77656017022237
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
        "id": "dndnode_29",
        "type": "decision",
        "position": {
            "x": 309.87156449649973,
            "y": -54.8439474775068
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
    },
    {
        "id": "dndnode_30",
        "type": "decision",
        "position": {
            "x": -56.1259903307095,
            "y": 125.46367144472126
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
        "id": "dndnode_31",
        "type": "decision",
        "position": {
            "x": 334.09199091888854,
            "y": 169.4192601372047
        },
        "data": {
            "label": "decision node",
            "attribute": "income",
            "operator": ">=",
            "inputValue": "2500",
            "selected": None
        },
        "width": 105.0,
        "height": 105.0
    },
    {
        "id": "dndnode_32",
        "type": "end",
        "position": {
            "x": 163.65195313170776,
            "y": 190.05147523775815
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
        "id": "dndnode_35",
        "type": "end",
        "position": {
            "x": 517.090768332493,
            "y": 243.87464506528895
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
        "id": "dndnode_36",
        "type": "end",
        "position": {
            "x": 361.90062866311274,
            "y": 388.3001507691631
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
        "id": "dndnode_37",
        "type": "end",
        "position": {
            "x": 508.24981667168015,
            "y": 6.803528212572992
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
        "id": "dndnode_38",
        "type": "end",
        "position": {
            "x": -52.195611031008696,
            "y": 324.4751917209582
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
    }
]

EDGES_MOCK = [
    {
        "id": "reactflow__edge-dndnode_5-dndnode_7a",
        "source": "dndnode_5",
        "sourceHandle": None,
        "target": "dndnode_7",
        "targetHandle": "a",
        "label": None
    },
    {
        "id": "reactflow__edge-dndnode_7true-dndnode_30a",
        "source": "dndnode_7",
        "sourceHandle": "true",
        "target": "dndnode_30",
        "targetHandle": "a",
        "label": "True"
    },
    {
        "id": "reactflow__edge-dndnode_30false-dndnode_32b",
        "source": "dndnode_30",
        "sourceHandle": "false",
        "target": "dndnode_32",
        "targetHandle": "b",
        "label": "False"
    },
    {
        "id": "reactflow__edge-dndnode_31true-dndnode_36a",
        "source": "dndnode_31",
        "sourceHandle": "true",
        "target": "dndnode_36",
        "targetHandle": "a",
        "label": "True"
    },
    {
        "id": "reactflow__edge-dndnode_29true-dndnode_31a",
        "source": "dndnode_29",
        "sourceHandle": "true",
        "target": "dndnode_31",
        "targetHandle": "a",
        "label": "True"
    },
    {
        "id": "reactflow__edge-dndnode_7false-dndnode_29a",
        "source": "dndnode_7",
        "sourceHandle": "false",
        "target": "dndnode_29",
        "targetHandle": "a",
        "label": "False"
    },
    {
        "id": "reactflow__edge-dndnode_31false-dndnode_35b",
        "source": "dndnode_31",
        "sourceHandle": "false",
        "target": "dndnode_35",
        "targetHandle": "b",
        "label": "False"
    },
    {
        "id": "reactflow__edge-dndnode_29false-dndnode_37b",
        "source": "dndnode_29",
        "sourceHandle": "false",
        "target": "dndnode_37",
        "targetHandle": "b",
        "label": "False"
    },
    {
        "id": "reactflow__edge-dndnode_30true-dndnode_38a",
        "source": "dndnode_30",
        "sourceHandle": "true",
        "target": "dndnode_38",
        "targetHandle": "a",
        "label": "True"
    }
]