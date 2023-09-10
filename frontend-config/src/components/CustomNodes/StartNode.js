import React from 'react';
import { Handle, Position } from 'reactflow';

const ovalStyle = {
  width: '100px',
  height: '50px',
  background: '#D6D5E6',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #333'
};

const StartNode = () => {
  return (
    <div style={ovalStyle}>
      <Handle type="source" position={Position.Bottom} />
      Start
    </div>
  );
};

export default StartNode;
