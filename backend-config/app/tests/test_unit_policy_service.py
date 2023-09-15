import pytest

from app.services.policy_service import PolicyService
from app.tests.mocks.nodes_connection_mock import (
    MOCK_EDGES_CONNECTED,
    MOCK_EDGES_CONNECTED_DECISION_IMPROPER,
    MOCK_EDGES_DISCONNECTED,
    MOCK_NODES_DECISION_IMPROPER,
    MOCK_NODES_DECISION_PROPER,
)


@pytest.fixture
def policy_service():
    return PolicyService(None)

def test_are_all_nodes_connected_true(policy_service: PolicyService):
    is_valid, _ = policy_service._are_all_nodes_connected(MOCK_NODES_DECISION_PROPER, MOCK_EDGES_CONNECTED)
    assert is_valid
    
def test_are_all_nodes_connected_false(policy_service: PolicyService):
    is_valid, _ = policy_service._are_all_nodes_connected(MOCK_NODES_DECISION_PROPER, MOCK_EDGES_DISCONNECTED)
    assert not is_valid

def test_are_decision_nodes_proper_true(policy_service: PolicyService):
    is_valid, _ = policy_service._are_decision_nodes_proper(MOCK_NODES_DECISION_PROPER, MOCK_EDGES_CONNECTED)
    assert is_valid

def test_are_decision_nodes_proper_false(policy_service: PolicyService):
    is_valid, _ = policy_service._are_decision_nodes_proper(MOCK_NODES_DECISION_IMPROPER, MOCK_EDGES_CONNECTED_DECISION_IMPROPER)
    assert not is_valid