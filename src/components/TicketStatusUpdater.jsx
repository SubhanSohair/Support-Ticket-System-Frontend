import React, { useState } from 'react'
import API from '../services/api'

const TicketStatusUpdater = ({ ticket, onStatusChange }) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = async (e) => {
    const newStatus = e.target.value
    setUpdating(true)
    setError(null)

    try {
      await API.put(`/tickets/${ticket.id}`, { status: newStatus })
      onStatusChange()  // refresh list
    } catch (err) {
      setError('Failed to update status.')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <label>Status: </label>
      <select value={ticket.status} onChange={handleChange} disabled={updating}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default TicketStatusUpdater
