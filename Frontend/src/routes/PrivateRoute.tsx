import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // const { isAuthenticated } = useAuthStore();
  //return isAuthenticated ? children : <Navigate to="/login" />;
  // TEMP: Disable auth check for development
  return children;
};

export default PrivateRoute;