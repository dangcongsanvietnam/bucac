import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteDashboardAdmin = ({ element: Component }) => {
  const checkAuth = async () => {
    
  };

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth();
      setIsAuthenticated(isAuthenticated);
      setLoading(false);
    };

    authenticate();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRouteDashboardAdmin;
