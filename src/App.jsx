import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'
import View from './pages/View'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <h1 className="main-title">Support Ticket System</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
