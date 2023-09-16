import React, { useState, useEffect } from 'react'
import { patchPolicy } from '../api/policy'

const Sidebar = ({ nodes, edges }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const successMessage = 'Policy successfully saved!'

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [message])

  const handleSave = async () => {
    setIsLoading(true)
    const result = await patchPolicy(nodes, edges)

    if (result.success) {
      setMessage(successMessage)
    } else {
      setMessage(result.error)
    }

    setIsLoading(false)
  }

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside data-testid="sidebar">
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
            width: '50%',
          }}
        >
          {isLoading ? 'Saving...' : 'Save Policy'}
        </button>
        {message && (
          <div
            style={{
              padding: '10px',
              backgroundColor:
                message === successMessage ? '#4CAF50' : '#f44336', // green or red
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
      </div>
    </aside>
  )
}

export default Sidebar
