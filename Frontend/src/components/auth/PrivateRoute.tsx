import React from 'react';
import { Navigate } from 'react-router-dom';

// TODO: Create protected route component for authenticated pages
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // TODO: Check authentication status from store
  const isAuthenticated = true; // Placeholder - replace with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
