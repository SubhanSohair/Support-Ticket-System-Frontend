import React from 'react'
import TicketForm from '../components/TicketForm'
import BackButton from '../components/BackButton'

const Create = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#1e1e1e',
      }}
    >
      <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#f0f0f0' }}>
        Create a New Ticket
      </h2>
      <TicketForm />
      <BackButton />
    </div>
  )
}

export default Create
