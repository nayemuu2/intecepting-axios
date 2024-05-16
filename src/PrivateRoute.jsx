import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function PrivateRoute({ children }) {
  const { auth, setAuth } = useAuth();

  if (auth.accessToken) {
    return children;
  } else {
    // Use the `replace` prop to replace the current entry in the history
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
