import React from 'react'

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode start"
        onDragStart={(event) => onDragStart(event, 'start')}
        draggable
      >
        Start Node
      </div>
      <div
        className="dndnode decision"
        onDragStart={(event) => onDragStart(event, 'decision')}
        draggable
      >
        Decision Node
      </div>
      <div
        className="dndnode end"
        onDragStart={(event) => onDragStart(event, 'end')}
        draggable
      >
        End Node
      </div>
    </aside>
  )
}

export default Sidebar
