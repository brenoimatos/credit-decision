from collections import defaultdict

from fastapi import HTTPException

from app.dal.policy_dal import PolicyDal


class PolicyService:
    def __init__(self, dal: PolicyDal):
        self.dal = dal

    async def get_policy(self, id: str):
        return await self.dal.get_policy(id)

    async def create_policy(self, policy: dict):
        return await self.dal.create_policy(policy)

    async def update_policy(self, id: str, policy_data: dict):
        if self._is_valid_policy(policy_data):
            return await self.dal.update_policy(id, policy_data)
    
    def _is_valid_policy(self, policy: dict):
        nodes = {node['id']: node for node in policy['nodes']}
        edges = policy['edges']
        
        is_valid, message = self._are_all_nodes_connected(nodes, edges)
        if not is_valid:
            raise HTTPException(status_code=400, detail=message) 

        is_valid, message = self._are_decision_nodes_proper(nodes, edges)
        if not is_valid:
            raise HTTPException(status_code=400, detail=message)
        return is_valid
    
    def _are_all_nodes_connected(self, nodes: dict, edges: list):
        connected_nodes = set()
        for edge in edges:
            connected_nodes.add(edge['source'])
            connected_nodes.add(edge['target'])
        return set(nodes.keys()).issubset(connected_nodes), 'Not all nodes are connected.'

    def _are_decision_nodes_proper(self, nodes: dict, edges: list):
        node_connections = defaultdict(lambda: {'incoming': 0, 'outgoing': 0})

        for edge in edges:
            node_connections[edge['source']]['outgoing'] += 1
            node_connections[edge['target']]['incoming'] += 1

        for node_id, node in nodes.items():
            if node['type'] == 'decision':
                if node_connections[node_id]['incoming'] != 1 or node_connections[node_id]['outgoing'] != 2:
                    return False, f'Decision node {node_id} does not have the proper number of incoming and outgoing edges.'

        return True, ''
