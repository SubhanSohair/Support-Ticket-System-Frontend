import React from 'react'
import TicketList from '../components/TicketList'
import BackButton from '../components/BackButton'

const View = () => {
  return (
    <div style={{ padding: '20px' }}>
      <TicketList readonly={true} />
      <BackButton />
    </div>
  )
}

export default View
