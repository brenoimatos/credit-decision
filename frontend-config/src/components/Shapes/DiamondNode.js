import { Handle, Position, useStoreApi, useReactFlow } from 'reactflow';

const nodeStyle = {
  width: 76,
  height: 76
};

const diamondStyle = {
  width: 60,
  height: 60,
  transform: "translate(-50%, -50%) rotate(45deg)",
  background: "white",
  position: "absolute",
  left: "50%",
  top: "50%",
  border: "1px solid #222",
  borderRadius: 2
};

const inputStyle = {
    width: '60px',
    height: '10px',
    textAlign: 'center'
  };

const labelStyle = {
    zIndex: 10,
    position: "relative",
    fontSize: 12,
    display: "flex",
    flexDirection: "column",  // Mudança aqui para colocar os elementos em coluna
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  };

const handleStyle = {
  zIndex: 1
};

const options1 = [
    {
      value: 'age',
      label: 'Age',
    },
    {
      value: 'income',
      label: 'Income',
    },
  ];

const options2 = [
  {
    value: '=',
    label: '=',
  },
  {
    value: '!=',
    label: '!=',
  },
  {
    value: '>',
    label: '>',
  },
  {
    value: '>=',
    label: '>=',
  },
  {
    value: '<',
    label: '<',
  },
  {
    value: '<=',
    label: '<=',
  },
];
  
function InnerSelect({ value, nodeId, options }) {
    const { setNodes } = useReactFlow();
    const store = useStoreApi();
  
    const onChange = (evt) => {
      const { nodeInternals } = store.getState();
      setNodes(
        Array.from(nodeInternals.values()).map((node) => {
          if (node.id === nodeId) {
            node.data = {
              ...node.data,
              selected: evt.target.value,
            };
          }
          return node;
        })
      );
    };
  
    return (
      <select className="nodrag" onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  
  function onInputChange(evt, nodeId, setNodes, store) {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            inputValue: evt.target.value,
          };
        }
        return node;
      })
    );
  }
  
  function DiamondNode({ id, data }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  return (
    <div style={nodeStyle}>
      <Handle id="a" style={handleStyle} type="target" position={Position.Top} />
      <div style={diamondStyle} />
      <div style={labelStyle}>
        <InnerSelect value={data.selected1} nodeId={id} options={options1} />
        <InnerSelect value={data.selected2} nodeId={id} options={options2} />
        <input
          type="number"
          value={data.inputValue}
          onChange={(e) => onInputChange(e, id, setNodes, store)}
          className="nodrag"
          style={inputStyle}
        />
      </div>
      <Handle id="b" style={handleStyle} type="source" position={Position.Right} />
      <Handle id="c" style={handleStyle} type="source" position={Position.Bottom} />
    </div>
  );
}

export default DiamondNode;
