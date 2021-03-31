import React from 'react'
import AppBar from '../../components/AppBar'
import Table from '../../components/Table'

import { Container } from './styles'

const Dashboard: React.FC = () => {
  return (
    <Container>
      <AppBar />

      <Table />
    </Container>
  )
}

export default Dashboard