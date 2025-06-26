import React, { useState } from 'react'
import API from '../services/api'
import TicketStatusUpdater from '../components/TicketStatusUpdater'
import BackButton from '../components/BackButton'

const Update = () => {
  const [ticketId, setTicketId] = useState('')
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTicket = async () => {
    if (!ticketId) return
    setLoading(true)
    setError(null)
    try {
      const res = await API.get('/tickets')
      const found = res.data.find((t) => t.id.toString() === ticketId)
      if (!found) throw new Error('Ticket not found.')
      setTicket(found)
    } catch {
      setError('Ticket not found.')
      setTicket(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return '#4caf50'
      case 'in_progress':
        return '#2196f3'
      case 'closed':
        return '#ffb300'
      default:
        return '#999'
    }
  }

  const getCardColor = (status) => {
    switch (status) {
      case 'open':
        return '#e8f5e9'
      case 'in_progress':
        return '#e3f2fd'
      case 'closed':
        return '#fffde7'
      default:
        return '#fdfdfd'
    }
  }

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
        Update Ticket by ID
      </h2>

      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '30px',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 8px 18px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '60%',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={fetchTicket}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Fetch
        </button>

        {loading && <p style={{ marginTop: '10px' }}>Loading ticket...</p>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>

      {ticket && (
        <li
          className="ticket-card"
          style={{
            borderLeft: `8px solid ${getStatusColor(ticket.status)}`,
            backgroundColor: getCardColor(ticket.status),
          }}
        >
          <h3>{ticket.title}</h3>
          <p className="ticket-meta">
            Created: {new Date(ticket.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Description:</strong> {ticket.description}
          </p>
          <div className="ticket-meta-line">
            <span
              className="status-badge"
              style={{ backgroundColor: getStatusColor(ticket.status) }}
            >
              {ticket.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className="assigned-label">
              Assigned To: {ticket.assigned_to || 'Unassigned'}
            </span>
          </div>
          <TicketStatusUpdater ticket={ticket} onStatusChange={fetchTicket} />
        </li>
      )}

      <BackButton />
    </div>
  )
}

export default Update
