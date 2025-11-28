import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute component protects routes that require authentication.
 * If the user is authenticated, it renders the child component(s).
 * Otherwise, it redirects the user to the SignIn page.
 */
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated);

  // If authenticated, render the protected content
  if (isAuthenticated) {
    return children;
  }

  // If not authenticated, redirect to SignIn page
  return <Navigate to="/signin" replace />;
};

export default PrivateRoute;
