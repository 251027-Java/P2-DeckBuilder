import axios from 'axios';

// TODO: Configure Axios instance with base URL and interceptors
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
