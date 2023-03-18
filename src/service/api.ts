import axios from 'axios'
import { LOCAL_STORE } from '../contains'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,

  headers: {
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORE.TOKEN)}`,
    // ,
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export default api
