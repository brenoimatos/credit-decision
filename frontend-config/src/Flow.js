import React, { useCallback, useState, useRef, useEffect } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import 'reactflow/dist/style.css'
import DecisionNode from './components/CustomNodes/DecisionNode'
import Sidebar from './components/Sidebar'
import StartNode from './components/CustomNodes/StartNode'
import EndNode from './components/CustomNodes/EndNode'
import { getPolicy, patchPolicy } from './api/policy'

const nodeTypes = {
  decision: DecisionNode,
  start: StartNode,
  end: EndNode,
}

const BasicFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [currentId, setCurrentId] = useState(0)

  const fetchPolicyData = async () => {
    const policyData = await getPolicy()
    if (policyData) {
      setNodes(policyData.nodes)
      setEdges(policyData.edges)

      const maxId = Math.max(
        ...policyData.nodes.map((node) => parseInt(node.id.split('_')[1], 10)),
        0
      )
      setCurrentId(maxId + 1)
    }
  }

  useEffect(() => {
    fetchPolicyData()
  }, [])

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect = useCallback((connection) => {
    const newConnection = { ...connection }
    newConnection.label = connection.sourceHandle === 'true' ? 'True' : 'False'
    setEdges((eds) => addEdge(newConnection, eds))
  }, [])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const newId = `dndnode_${currentId}`
      setCurrentId(currentId + 1)

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }

      const newNode = {
        id: newId,
        type,
        position,
        data: { label: `${type} node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [currentId]
  )

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <button onClick={() => patchPolicy(nodes, edges)}>Save Policy</button>
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
  )
}

export default BasicFlow
