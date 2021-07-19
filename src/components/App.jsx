import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader, Header } from './index';
import Router from '../routers/Router';
import Firebase from '../api/firebase';
import { setUser } from '../store/actions';
import { Wrapper } from '../styles/index';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  
  useEffect(() => {
    const startInit = Date.now();
    Firebase.init();
    Firebase.isAutorization()
      .then(() => {
        const MIN_TIME_LOAD = 500;
        const endInit = Date.now();
        let timeLoad = 0;
        
        if (endInit - startInit < MIN_TIME_LOAD) {
          timeLoad = MIN_TIME_LOAD - (endInit - startInit);
        }
        
        setTimeout(() => {
          const user = !Firebase.getUser() ? null : {
            name: Firebase.getUser().displayName
          };
          dispatch(setUser(user));
        }, timeLoad);
      });
  }, [dispatch]);

  return (
    <Wrapper>
      {user === undefined ? <Preloader /> :
        <>
          <Header userName={ user ? user.name : '' } />
          <Router />
        </>
      }
    </Wrapper>
  );
};

export default App;