import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        ⬅ Back to Home
      </button>
    </div>
  )
}

export default BackButton
