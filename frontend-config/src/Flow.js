import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import DiamondNode from "./components/Shapes/DiamondNode";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 0 }
  },
  {
    id: "2",
    type: "diamond",
    data: { label: "Age" },
    position: { x: 300, y: 150 }
  },
  {
    id: "3",
    type: "diamond",
    data: { label: "Income" },
    position: { x: 300, y: 300 }
  },
  {
    id: "4",
    type: "output",
    data: { label: "End" },
    position: { x: 250, y: 450 }
  },
  
];

const nodeTypes = {
    diamond: DiamondNode,
  };

  const initialEdges = [
    { id: "e1-2", source: "1", sourceHandle: "a", target: "2", label: "Test label" },
    { id: "e2c-3", source: "2", sourceHandle: "c", target: "3", label: "Test label" }
  ];
  

const BasicFlow = () => {
    const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    />
  );
}
  
export default BasicFlow;