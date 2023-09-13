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
import { getPolicy } from './api/policy'

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
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [message, setMessage] = useState(null)

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
    } else {
      setMessage('Failed to fetch policy')
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

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left - 40,
        y: event.clientY - reactFlowBounds.top - 40,
      })

      const newNode = {
        id: newId,
        type,
        position,
        data: { label: `${type} node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [currentId, reactFlowInstance]
  )
  // This is for to be able to update the True or False labels in decision node after connecting.
  const nodes_with_edges = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      edges: edges,
    },
  }))
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar nodes={nodes} edges={edges} />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          {message && (
            <div
              style={{
                display: 'inline-block',
                padding: '10px',
                backgroundColor: '#f44336', // red for error
                color: 'white',
                borderRadius: '5px',
                marginTop: '20px',
                textAlign: 'center',
              }}
            >
              {message}
            </div>
          )}
          <ReactFlow
            nodes={nodes_with_edges}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
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
