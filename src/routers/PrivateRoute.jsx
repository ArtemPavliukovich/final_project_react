import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, redirectPath, isAdmin, ...rest }) => {
  const { user } = useSelector(state => state.user);

  return (
    <Route {...rest} render={() => {
      if ((isAdmin && user?.name === 'admin') || (!isAdmin && !user)) {
        return <Component />;
      } else {
        return <Redirect to={ redirectPath } />;
      }
    }}/>
  );
};

PrivateRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired
};

export default PrivateRoute;