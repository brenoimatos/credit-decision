export const initialNodes = [
    {
      id: "1",
      type: "start",
      data: { label: "Start" },
      position: { x: 250, y: 0 }
    },
    {
      id: "2",
      type: "diamond",
      data: { label: "Age" },
      position: { x: 300, y: 150 }
    },
    {
      id: "3",
      type: "diamond",
      data: { label: "Income" },
      position: { x: 300, y: 300 }
    },
    {
      id: "4",
      type: "end",
      data: { label: "End" },
      position: { x: 250, y: 450 }
    },
    
  ];

export const initialEdges = [
{ id: "e1-2", source: "1", sourceHandle: "a", target: "2" },
{ id: "e2t-3", source: "2", sourceHandle: "true", target: "3", label: "True" },
{ id: "e3t-4", source: "3", sourceHandle: "true", target: "4", label: "True" }
];