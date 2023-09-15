DECISION_TREE_MOCK = {
    "attribute": "age",
    "operator": ">=",
    "value": "25",
    "true": {
        "attribute": "income",
        "operator": ">=",
        "value": "600",
        "true": True,
        "false": False
    },
    "false": {
        "attribute": "age",
        "operator": ">=",
        "value": "18",
        "true": {
            "attribute": "income",
            "operator": ">=",
            "value": "2500",
            "true": True,
            "false": False
        },
        "false": False
    }
}