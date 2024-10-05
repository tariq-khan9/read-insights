// components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './../services/AuthContext';

const ProtectedRoute = () => {
  const { auth } = useAuth();

  // Check if the user is authenticated
  if (!auth || !auth.jwt) {
    return <Navigate to='/login' replace />;
  }


  // If authenticated and role is authorized, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
