from typing import Dict, List, Union
from fastapi import HTTPException
from dal.execution_dal import ExecutionDal
from dal.policy_remote_dal import PolicyRemoteDal

class ExecutionService:
    def __init__(self, dal: ExecutionDal, policy_remote_dal: PolicyRemoteDal):
        self.dal = dal
        self.policy_remote_dal = policy_remote_dal

    async def get_execution(self, id: str):
        return await self.dal.get_execution(id)
    
    async def execute_engine(self, policy_id: str, customer_payload: dict) -> dict:
        policy = await self.policy_remote_dal.get_policy(policy_id)
        if not policy:
            raise HTTPException(status_code=404, detail="Policy not found")
        first_decision_node_id = self._find_first_decision_node_id(policy['nodes'], policy['edges'])
        decision_tree = self._build_decision_tree(first_decision_node_id, policy['nodes'], policy['edges'])
        decision = self._evaluate_decision_tree(decision_tree, customer_payload)
        return {'decision': decision}
    
    def _find_first_decision_node_id(self, nodes: List[dict], edges: List[dict]):
        start_node = next(node for node in nodes if node['data']['label'] == 'start node')
        edge_from_start = next(edge for edge in edges if edge['source'] == start_node['id'])
        return edge_from_start['target']

    def _build_decision_tree(self, node_id: str, nodes: List[Dict], edges: List[Dict]):
        node = next(node for node in nodes if node['id'] == node_id)
        node_type = node['data']['label']
        
        if node_type == 'decision node':
            true_node_id = next((edge['target'] for edge in edges if edge['source'] == node_id and edge.get('label') == 'True'), None)
            false_node_id = next((edge['target'] for edge in edges if edge['source'] == node_id and edge.get('label') == 'False'), None)
            
            true_subtree = self._build_decision_tree(true_node_id, nodes, edges) if true_node_id else None
            false_subtree = self._build_decision_tree(false_node_id, nodes, edges) if false_node_id else None
            
            return {
                'attribute': node['data']['attribute'],
                'operator': node['data']['operator'],
                'value': node['data']['inputValue'],
                'true': true_subtree,
                'false': false_subtree
            }
        elif node_type == 'end node':
            # Return the final value based on selection
            return node['data'].get('selected')
    
    def _evaluate_decision_tree(self, decision_tree: dict, customer_payload: dict) -> Union[bool, dict]:
        if isinstance(decision_tree, bool):
            return decision_tree
        
        attribute = decision_tree['attribute']
        operator = decision_tree['operator']
        value = decision_tree['value']
        
        expression = f"{customer_payload[attribute]} {operator} {value}"
        
        if eval(expression):
            return self._evaluate_decision_tree(decision_tree['true'], customer_payload)
        else:
            return self._evaluate_decision_tree(decision_tree['false'], customer_payload)

