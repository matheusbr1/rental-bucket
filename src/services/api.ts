import axios from 'axios'

export const sessionApi = axios.create({ 
  baseURL: process.env.REACT_APP_BASE_URL_API,
})

export const privateApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
  headers: { 'Content-Type': 'application/json' }
})