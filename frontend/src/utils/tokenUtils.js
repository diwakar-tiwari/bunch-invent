// tokenUtils.js

export const getToken = () => {
  const token = localStorage.getItem('token'); // Or sessionStorage, depending on where you're storing it
  console.log('Token from localStorage:', token); // Add this for debugging
  return token;
  };
  
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  