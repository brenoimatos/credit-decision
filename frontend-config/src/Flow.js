import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import DiamondNode from "./components/CustomNodes/DiamondNode";
import { initialEdges, initialNodes } from './utils/constants';
import Sidebar from './components/Sidebar';
import StartNode from './components/CustomNodes/StartNode';
import EndNode from './components/CustomNodes/EndNode';

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
    diamond: DiamondNode,
    start: StartNode,
    end: EndNode
  };


const BasicFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
  
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
    );
    const onConnect = useCallback((connection) => {
        const newConnection = { ...connection };
    
        if (connection.sourceHandle === 'true') {
            newConnection.label = 'True';
        } else if (connection.sourceHandle === 'false') {
            newConnection.label = 'False';
        }
        setEdges((eds) => addEdge(newConnection, eds));
    }, [setEdges]);
  
    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  
    const onDrop = useCallback(
      (event) => {
        event.preventDefault();
  
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = {
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        };
  
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };
  
        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowWrapper, setNodes]
    );
  
    return (
      <div className="dndflow">
        <ReactFlowProvider>
          <Sidebar />
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onDragOver={onDragOver}
              onDrop={onDrop}
              fitView
            />
          </div>
        </ReactFlowProvider>
      </div>
    );
};
  
  
export default BasicFlow;