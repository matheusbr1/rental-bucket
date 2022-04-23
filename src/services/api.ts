import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const token = cookies.get('rentalbucket.token')

export const api = axios.create({
  baseURL: 'http://localhost:3334',
  headers: {
    Authorization: `Bearer ${token}`
  }
})
