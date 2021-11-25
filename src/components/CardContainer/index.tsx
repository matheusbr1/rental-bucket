import React from 'react'
import { styled } from '@material-ui/core'

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  margin: '20px 0',
  width: 768,
  boxShadow: '0px 1px 20px rgba(0, 0, 0, 0.14)',
  borderRadius: 10,
  padding: 25,
  '& form': {
    margin: '5% 0 15% 0',
    '& .grid': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10
    }
  },
  '& .floating-buttons': {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 25,
    left: 25,
    right: 25,
    '& .group': {
      display: 'flex'
    }
  }
}))

const CardContainer: React.FC = ({ children }) => (
  <Container>
    {children}
  </Container>
)

export default CardContainer