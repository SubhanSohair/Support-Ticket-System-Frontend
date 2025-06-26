import React, { useEffect, useState } from 'react'
import API from '../services/api'
import './StatsSummary.css'

const statusColors = {
  open: '#4caf50',
  in_progress: '#03a9f4',
  closed: '#ff9800'
}

const StatsSummary = () => {
  const [stats, setStats] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await API.get('/stats')
      setStats(res.data)
    } catch {
      setError('Failed to load stats.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="stats-container">
      <h2>Ticket Summary</h2>
      {loading && <p>Loading stats...</p>}
      {error && <p className="error-msg">{error}</p>}

      <div className="stats-grid">
        {['open', 'in_progress', 'closed'].map((status) => {
          const stat = stats.find((s) => s.status === status)
          return (
            <div
              key={status}
              className="stat-card"
              style={{ backgroundColor: statusColors[status] }}
            >
              <h3>{status.replace('_', ' ').toUpperCase()}</h3>
              <p>{stat?.count || 0}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatsSummary
