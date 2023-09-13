import { Handle, Position, useStoreApi, useReactFlow } from 'reactflow'
import { attributeOptions, operatorOptions } from '../../utils/constants'
import { useEffect } from 'react'

const nodeStyle = {
  width: 105,
  height: 105,
}

const decisionStyle = {
  width: 80,
  height: 80,
  transform: 'translate(-50%, -50%) rotate(45deg)',
  background: '#eefc5e',
  position: 'absolute',
  left: '50%',
  top: '50%',
  border: '1px solid #222',
  borderRadius: 2,
}

const inputStyle = {
  width: '60px',
  height: '10px',
  textAlign: 'center',
}

const labelStyle = {
  zIndex: 10,
  position: 'relative',
  fontSize: 12,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}

const handleStyle = {
  zIndex: 1,
}

const updateNodeData = (nodeId, fieldName, fieldValue, setNodes, store) => {
  const { nodeInternals } = store.getState()
  setNodes(
    Array.from(nodeInternals.values()).map((node) => {
      if (node.id === nodeId) {
        node.data = {
          ...node.data,
          [fieldName]: fieldValue,
        }
      }
      return node
    })
  )
}

function InnerSelect({ value, nodeId, options, fieldName }) {
  const { setNodes } = useReactFlow()
  const store = useStoreApi()

  const onChange = (evt) => {
    updateNodeData(nodeId, fieldName, evt.target.value, setNodes, store)
  }

  return (
    <select className="nodrag" onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

function onInputChange(evt, nodeId, setNodes, store) {
  const { nodeInternals } = store.getState()
  setNodes(
    Array.from(nodeInternals.values()).map((node) => {
      if (node.id === nodeId) {
        node.data = {
          ...node.data,
          inputValue: evt.target.value,
        }
      }
      return node
    })
  )
}

function DecisionNode({ id, data }) {
  const { setNodes } = useReactFlow()
  const store = useStoreApi()
  useEffect(() => {
    if (!data.attribute) {
      updateNodeData(
        id,
        'attribute',
        attributeOptions[0].value,
        setNodes,
        store
      )
    }
    if (!data.operator) {
      updateNodeData(id, 'operator', operatorOptions[0].value, setNodes, store)
    }
  }, [id, setNodes, store, data])

  return (
    <div style={nodeStyle}>
      <Handle
        id="a"
        style={handleStyle}
        type="target"
        position={Position.Top}
      />
      <div style={decisionStyle} />
      <div style={labelStyle}>
        <InnerSelect
          value={data.attribute}
          nodeId={id}
          options={attributeOptions}
          fieldName="attribute"
        />
        <InnerSelect
          value={data.operator}
          nodeId={id}
          options={operatorOptions}
          fieldName="operator"
        />
        <input
          type="number"
          value={data.inputValue || ''}
          onChange={(e) => onInputChange(e, id, setNodes, store)}
          className="nodrag"
          style={inputStyle}
          placeholder="Value"
        />
      </div>
      <Handle
        id="false"
        style={handleStyle}
        type="source"
        position={Position.Right}
      />
      <Handle
        id="true"
        style={handleStyle}
        type="source"
        position={Position.Bottom}
      />
    </div>
  )
}

export default DecisionNode
