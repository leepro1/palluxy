import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ auth, children }) => {
  const isAuthenticated = sessionStorage.getItem('access');

  if (auth) {
    return isAuthenticated === null || isAuthenticated === 'false' ? (
      <Navigate to="/signin" />
    ) : (
      children
    );
  } else {
    return isAuthenticated === null || isAuthenticated === 'false' ? (
      children
    ) : (
      <Navigate to="/" />
    );
  }
};

AuthGuard.propTypes = {
  auth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
