import { Box, Typography } from '@material-ui/core'

interface EmptyTableMessageProps {
  tableName: string
}

const EmptyTableMessage: React.FC<EmptyTableMessageProps> = ({ tableName }) => {
  return (
    <Box>
      <Typography variant='h3' align='center' >
        Não existem {tableName} cadastrados!
      </Typography>
      <Typography variant='h4' align='center'>
        Cadastre um novo para começar!
      </Typography>
    </Box>
  )
}

export { EmptyTableMessage }