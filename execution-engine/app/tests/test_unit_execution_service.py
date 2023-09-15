import pytest

from app.services.execution_service import ExecutionService
from app.tests.mocks.decision_tree_mock import DECISION_TREE_MOCK
from app.tests.mocks.policy_mock import (
    EDGES_MOCK,
    FIRST_DECISION_NODE_ID_MOCK,
    NODES_MOCK,
)


@pytest.fixture
def policy_service():
    return ExecutionService(None)

def test_find_first_decision_node_id(policy_service: ExecutionService):
    first_decision_node_id = policy_service._find_first_decision_node_id(NODES_MOCK, EDGES_MOCK)
    assert first_decision_node_id == FIRST_DECISION_NODE_ID_MOCK

def test_build_decision_tree(policy_service: ExecutionService):
    decision_tree = policy_service._build_decision_tree(FIRST_DECISION_NODE_ID_MOCK, NODES_MOCK, EDGES_MOCK)
    assert decision_tree == DECISION_TREE_MOCK

def test_decision_first_age_true_income_true(policy_service: ExecutionService):
    decision = policy_service._evaluate_decision_tree(
        DECISION_TREE_MOCK,
        {"age": 25, "income": 800}
    )
    assert decision is True

def test_decision_first_age_true_income_false(policy_service: ExecutionService):
    decision = policy_service._evaluate_decision_tree(
        DECISION_TREE_MOCK,
        {"age": 30, "income": 500}
    )
    assert decision is False

def test_decision_first_age_false_second_age_true_income_true(policy_service: ExecutionService):
    decision = policy_service._evaluate_decision_tree(
        DECISION_TREE_MOCK,
        {"age": 20, "income": 2500}
    )
    assert decision is True

def test_decision_first_age_false_second_age_true_income_false(policy_service: ExecutionService):
    decision = policy_service._evaluate_decision_tree(
        DECISION_TREE_MOCK,
        {"age": 20, "income": 2000}
    )
    assert decision is False

def test_decision_first_age_false_second_age_false(policy_service: ExecutionService):
    decision = policy_service._evaluate_decision_tree(
        DECISION_TREE_MOCK,
        {"age": 17, "income": 3000}
    )
    assert decision is False

