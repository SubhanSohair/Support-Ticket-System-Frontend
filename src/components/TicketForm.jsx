import React, { useState } from 'react'
import API from '../services/api'
import './TicketForm.css'

const TicketForm = () => {
  const [form, setForm] = useState({ title: '', description: '', assigned_to: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await API.post('/tickets', form)
      setSuccess('Ticket created successfully!')
      setForm({ title: '', description: '', assigned_to: '' })
    } catch (err) {
      setError('Failed to create ticket. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ticket-form-container">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="assigned_to"
          placeholder="Assigned To (optional)"
          value={form.assigned_to}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Ticket'}
        </button>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  )
}

export default TicketForm
