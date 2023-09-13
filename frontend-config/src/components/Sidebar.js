import React, { useState, useEffect } from 'react'
import { patchPolicy } from '../api/policy'

const Sidebar = ({ nodes, edges }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  useEffect(() => {
    if (messageType) {
      const timer = setTimeout(() => {
        setMessageType('')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [messageType])

  const handleSave = async () => {
    setIsLoading(true)
    const result = await patchPolicy(nodes, edges)

    setMessageType(result.success ? 'success' : 'error')
    setIsLoading(false)
  }

  const message =
    messageType === 'success'
      ? 'Policy successfully saved!'
      : 'Error saving the policy.'

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
      <button
        onClick={handleSave}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? 'grey' : 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        {isLoading ? 'Saving...' : 'Save Policy'}
      </button>
      {messageType && (
        <div
          style={{
            display: 'inline-block',
            padding: '10px',
            backgroundColor: messageType === 'success' ? '#4CAF50' : '#f44336', // green or red
            color: 'white',
            borderRadius: '5px',
            marginTop: '20px',
            textAlign: 'center',
            maxWidth: '50%',
          }}
        >
          {message}
        </div>
      )}
    </aside>
  )
}

export default Sidebar
