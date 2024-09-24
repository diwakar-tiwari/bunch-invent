import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from './tokenUtils'; // Ensure this utility retrieves the token correctly

const PrivateRoute = () => {
  const token = getToken(); // Retrieve the token from local storage

  // Check if the token exists and is valid
  return token ? <Outlet /> : <Navigate to="/login" replace />; // Redirect to login if no token
};

export default PrivateRoute;
