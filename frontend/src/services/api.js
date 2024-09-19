import axios from 'axios';



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle global error messages
      const message =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'An unknown error occurred';
      return Promise.reject(message);
    }
  );

export default api;
