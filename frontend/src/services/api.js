import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken, removeToken } from '../utils/tokenUtils'; // Utility functions for token management

// Create axios instance with the base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL.trim(),  // Use trim() in case there are accidental spaces
});




// Request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    
    const token = getToken(); // Retrieve token from storage
    console.log('Retrieved token:', token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to Authorization header
      console.log('Token attached to headers:', config.headers.Authorization); // Log the token to verify
    } else {
      console.log('No token found');
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error); // Handle request errors if needed
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response, // Return the response if the request was successful
  (error) => {
    const { response } = error;
    console.error('Response error:', response);
    
    // Handle 401 Unauthorized (e.g., expired or invalid token)
    if (response && response.status === 401) {
      toast.error('Session expired. Please log in again.'); // Notify user about session expiration
      removeToken(); // Remove token from storage
      window.location.href = '/login'; // Redirect user to login page
    }

    // Handle other errors and show an appropriate error message
    const errorMessage = response?.data?.error || 'An unknown error occurred. Please try again.';
    toast.error(errorMessage);

    return Promise.reject(error); // Always reject the error to handle it later
  }
 
  
);

export default api;
