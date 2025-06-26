import React from 'react'
import { useNavigate } from 'react-router-dom'
import StatsSummary from '../components/StatsSummary'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-wrapper">

      <div className="home-buttons">
        <button onClick={() => navigate('/create')}>Create Ticket</button>
        <button onClick={() => navigate('/update')}>Update Ticket</button>
        <button onClick={() => navigate('/view')}>View Tickets</button>
      </div>

      <div className="summary-wrapper">
        <StatsSummary />
      </div>
    </div>
  )
}

export default Home
