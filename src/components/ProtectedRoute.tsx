import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useWeb3Auth } from '../contexts/Web3AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isConnected } = useWeb3Auth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-very-dark-green flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !isConnected) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;