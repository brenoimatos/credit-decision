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
  background: '#EDEDED',
  position: 'absolute',
  left: '50%',
  top: '50%',
  border: '1px solid #222',
  borderRadius: 2,
}

const handleLabelRightStyle = {
  position: 'absolute',
  right: '-55px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '15px',
}

const handleLabelBottomStyle = {
  position: 'absolute',
  bottom: '-40px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '15px',
}

const inputStyle = {
  width: '60px',
  height: '10px',
  textAlign: 'center',
  border: 'none',
  outline: 'none',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
}

const labelStyle = {
  position: 'relative',
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

  const dropdownStyle = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  }

  const onChange = (evt) => {
    updateNodeData(nodeId, fieldName, evt.target.value, setNodes, store)
  }

  return (
    <select
      className="nodrag"
      onChange={onChange}
      value={value}
      data-testid={`${fieldName}-select`}
      style={dropdownStyle}
    >
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

  const isHandleRightConnected = data.edges.some(
    (edge) => edge.source === id && edge.sourceHandle === 'false'
  )
  const isHandleBottomConnected = data.edges.some(
    (edge) => edge.source === id && edge.sourceHandle === 'true'
  )

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
          data-testid="attribute-select"
        />
        <InnerSelect
          value={data.operator}
          nodeId={id}
          options={operatorOptions}
          fieldName="operator"
          data-testid="operator-select"
        />
        <input
          type="number"
          value={data.inputValue || ''}
          onChange={(e) => onInputChange(e, id, setNodes, store)}
          className="nodrag"
          style={inputStyle}
          placeholder="Value"
          data-testid="input-value"
        />
      </div>
      <Handle
        id="false"
        style={handleStyle}
        type="source"
        position={Position.Right}
      />
      {!isHandleRightConnected && (
        <div style={handleLabelRightStyle}>False</div>
      )}
      <Handle
        id="true"
        style={handleStyle}
        type="source"
        position={Position.Bottom}
      />
      {!isHandleBottomConnected && (
        <div style={handleLabelBottomStyle}>True</div>
      )}
    </div>
  )
}

export default DecisionNode
