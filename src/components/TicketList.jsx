import React, { useEffect, useState } from 'react'
import API from '../services/api'
import TicketStatusUpdater from './TicketStatusUpdater'
import './TicketList.css'

const statuses = ['all', 'open', 'in_progress', 'closed']

const TicketList = ({ readonly = false }) => {
  const [tickets, setTickets] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTickets = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = statusFilter === 'all' ? '/tickets' : `/tickets?status=${statusFilter}`
      const res = await API.get(url)
      setTickets(res.data)
    } catch {
      setError('Could not load tickets.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [statusFilter])

// Background color of card
const getCardColor = (status) => {
  switch (status) {
    case 'open':
      return '#e8f5e9' // light green
    case 'in_progress':
      return '#e3f2fd' // light blue
    case 'closed':
      return '#fffde7' // light yellow
    default:
      return '#fdfdfd'
  }
}

// Badge + border color
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

  const formatDate = (iso) => {
    const date = new Date(iso)
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <div className="ticket-list-container">
      <h2>Tickets</h2>

      <div className="filter-buttons">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={statusFilter === status ? 'active' : ''}
          >
            {status.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p>Loading tickets...</p>}
      {error && <p className="error-msg">{error}</p>}
      {!loading && !tickets.length && <p>No tickets found.</p>}

      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="ticket-card"
            style={{
              borderLeft: `8px solid ${getStatusColor(ticket.status)}`,
              backgroundColor: getCardColor(ticket.status)
            }}
          >
            <h3>{ticket.title}</h3>
            <p className="ticket-meta">Created: {formatDate(ticket.created_at)}</p>

            <p><strong>Description:</strong> {ticket.description}</p>

            <div className="ticket-meta-line">
              <span className="status-badge" style={{ backgroundColor: getStatusColor(ticket.status) }}>
                {ticket.status.replace('_', ' ').toUpperCase()}
              </span>
              <span className="assigned-label">
                Assigned To: {ticket.assigned_to || 'Unassigned'}
              </span>
            </div>

            {!readonly && (
              <TicketStatusUpdater ticket={ticket} onStatusChange={fetchTickets} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TicketList
