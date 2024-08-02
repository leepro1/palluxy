// 혹시 로그인해야만 접근할 수 있는 페이지가 있다면
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
