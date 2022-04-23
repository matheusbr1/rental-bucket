import { AxiosError } from 'axios'
import { api } from 'services/api'

api.interceptors.response.use(response => response, (error: AxiosError) => {
  if (error.response?.status === 401) {
    // SignOut
  }

  return Promise.reject(error)
})