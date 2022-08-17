import React from 'react';
import { Box, Container } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { useHistory } from 'react-router-dom';
import FloatingButton from 'components/FloatingButton';

interface TableContainerProps {
  floatingButtonRoute?: string
}

const TableContainer: React.FC<TableContainerProps> = ({ floatingButtonRoute, children }) => {
  const { push } = useHistory()

  return (
    <Container style={{ marginTop: 64 }} >
      <AppBar />
      
      <Box 
        width='100%' 
        m='20px 0' 
        minHeight='calc(100vh - 84px)' 
        display='flex' 
        justifyContent='center' 
        alignItems='center'
      >
        {children}

        {floatingButtonRoute && (
          <FloatingButton onClick={() => push(floatingButtonRoute)} />
        )}
      </Box>
    </Container>
  )
}

export { TableContainer }