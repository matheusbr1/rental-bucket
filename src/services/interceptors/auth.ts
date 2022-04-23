import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signOut } from 'redux/user/user.actions'
import { api } from 'services/api'

interface AuthInterceptorProps {
  children: React.ReactElement<any, any> | null
}

const AuthInterceptor: React.FC<AuthInterceptorProps> = ({ children }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar: snackbar } = useSnackbar()
   
   api.interceptors.response.use(response => response, (error: AxiosError) => {
    if (error.response?.status === 401) {
      dispatch(signOut())
      snackbar('Sessão expirada, faça login novamente', { variant: 'info' })
    }
  
    return Promise.reject(error)
  })

  return children
}

export { AuthInterceptor }