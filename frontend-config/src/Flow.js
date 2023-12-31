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

const Flow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [message, setMessage] = useState(null)

  const fetchPolicyData = async () => {
    const result = await getPolicy()
    if (result.success) {
      const data = result.data
      setNodes(data.nodes)
      setEdges(data.edges)
      const maxId = Math.max(
        ...data.nodes.map((node) => parseInt(node.id.split('_')[1], 10)),
        0
      )
      setCurrentId(maxId + 1)
    } else {
      setMessage(result.error)
    }
  }

  useEffect(() => {
    fetchPolicyData()
  }, [])

  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes)
      setNodes(updatedNodes)
      // This is needed for remove the edges when the associated node is removed.
      const nodeIds = new Set(updatedNodes.map((n) => n.id))

      const updatedEdges = edges.filter(
        (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)
      )

      if (updatedEdges.length !== edges.length) {
        setEdges(updatedEdges)
      }
    },
    [nodes, edges]
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
  // This is needed to be able to update the True or False labels in decision node after connecting.
  const nodesWithEdges = nodes.map((node) => ({
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
            nodes={nodesWithEdges}
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

export default Flow
