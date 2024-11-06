import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
function PrivateRoute({ element  }) {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  return userId ? element : <Navigate to="/login" state={{ from: location }} />;
}

PrivateRoute.propTypes = {
  element : PropTypes.node.isRequired,
};


export default PrivateRoute;