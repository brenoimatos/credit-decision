import React, { useState, useEffect, useCallback} from 'react';
import { Handle, Position, useReactFlow, useStoreApi } from 'reactflow';

const ovalStyle = {
  width: '100px',
  height: '50px',
  background: '#E6D5D6',
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #333'
};



const EndNode = ({ id }) => {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [selected, setSelected] = useState('True');

  const updateNodeData = useCallback((selectedValue) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            selected: selectedValue,
          };
        }
        return node;
      })
    );
  }, [id, setNodes, store]);
  

  const handleChange = (evt) => {
    setSelected(evt.target.value);
    updateNodeData(evt.target.value);
  };
  
  useEffect(() => {
    updateNodeData(selected);
  }, [selected, updateNodeData]);

  return (
    <div style={ovalStyle}>
      <Handle id="a" type="target" position={Position.Top} />
      <Handle id="b" type="target" position={Position.Left} />
      End
      <select onChange={handleChange} value={selected}>
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
      
    </div>
  );
};

export default EndNode;
