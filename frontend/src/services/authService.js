import axios from 'axios'
import api from './api'

// Set up the base URL for axios
const API_URL = 'http://localhost:5000/api/auth';
const API1_URL =  'http://localhost:5000/api';

// Register user
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Login user
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const productsAPI = async () => {
  return await api.get(`${API1_URL}/products`);
};

