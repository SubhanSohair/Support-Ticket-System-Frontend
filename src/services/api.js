import axios from 'axios'

const API = axios.create({
  baseURL: 'https://your-vercel-backend.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default API
