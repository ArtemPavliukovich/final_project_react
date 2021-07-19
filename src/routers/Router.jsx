import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import PrivateRoute from './PrivateRoute';
import routes from './routes';
import { AddMovie, NotFound, Home, Movie, Autorization, Registration } from '../components/index';

const Router = () => {
  return (
    <Switch>
      <Route exact path={ routes.main } component={ Home } />
      <Route exact path={ routes.movie } component={ Movie } />
      <PrivateRoute 
        exact 
        path={ routes.autorization } 
        component={ Autorization } 
        isAdmin={ false }
        redirectPath={ routes.main } 
      />
      <PrivateRoute 
        exact 
        path={ routes.registration } 
        component={ Registration } 
        isAdmin={ false }
        redirectPath={ routes.main } 
      />
      <PrivateRoute 
        exact 
        path={ routes.addMovie } 
        component={ AddMovie } 
        isAdmin={ true }
        redirectPath={ routes.notFound } 
      />
      <Route exact path={ routes.notFound } component={ NotFound } />
      <Redirect from='*' to={ routes.notFound } />
    </Switch>
  );
};

export default Router;
