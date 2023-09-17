import React, { useState, useEffect, useCallback } from 'react'
import { Handle, Position, useReactFlow, useStoreApi } from 'reactflow'

const ovalStyle = {
  width: '100px',
  height: '50px',
  background: '#E6D5D6',
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #333',
}

const selectStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.55)',
  border: 'none',
}

const EndNode = ({ id, data }) => {
  const { setNodes } = useReactFlow()
  const store = useStoreApi()
  const [selected, setSelected] = useState(data.selected)

  const updateNodeData = useCallback(
    (selectedValue) => {
      const { nodeInternals } = store.getState()
      setNodes(
        Array.from(nodeInternals.values()).map((node) => {
          if (node.id === id) {
            node.data = {
              ...node.data,
              selected: selectedValue,
            }
          }
          return node
        })
      )
    },
    [id, setNodes, store]
  )

  useEffect(() => {
    if (selected === null || selected === undefined) {
      setSelected(true)
      updateNodeData(true)
    }
  }, [selected, updateNodeData])

  const handleChange = (evt) => {
    setSelected(evt.target.value)
    updateNodeData(evt.target.value)
  }

  useEffect(() => {
    updateNodeData(selected)
  }, [selected, updateNodeData])

  return (
    <div style={ovalStyle}>
      <Handle id="a" type="target" position={Position.Top} />
      <Handle id="b" type="target" position={Position.Left} />
      End
      <select onChange={handleChange} value={selected} style={selectStyle}>
        <option value={true}>True</option>
        <option value={false}>False</option>
      </select>
    </div>
  )
}

export default EndNode
