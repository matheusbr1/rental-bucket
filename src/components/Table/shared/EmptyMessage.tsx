import { Box, Typography } from '@material-ui/core'

interface EmptyMessageProps {
  tableName: string
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ tableName }) => {
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

export { EmptyMessage }