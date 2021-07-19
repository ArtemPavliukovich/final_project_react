import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from './index';
import Firebase from '../api/firebase';
import { Flex } from '../styles/index';
import logo from '../images/logo.svg';
import messages from '../constants/messages';
import routes from '../routers/routes';
import { setDefaultFilter, setUser } from '../store/actions';

const checkPath = (event, path) => { 
  if (window.location.pathname === path) {
    event.preventDefault();
  }

  return window.location.pathname === path;
};

const Header = ({ userName }) => {
  const { header } = messages;
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const clickLogo = (e) => {
    if (!checkPath(e, routes.main)) {
      dispatch(setDefaultFilter());
    }
  };

  const exit = () => {
    Firebase.exit();
    dispatch(setUser(null));
  };
  
  return (
    <Flex justify='space-between' as='header' width='100%' alignItems='center' height='100%'>
      <Link to={ routes.main } onClick={ clickLogo }>
        <LogoImg src={ logo } alt='логотип' />
      </Link>
      <Flex alignItems='center'>
        {userName && <UserName>{ userName }</UserName>}
        {pathname === routes.autorization || pathname === routes.registration ? null : 
          <Button 
            name={ userName ? header.buttonSignOut : header.buttonSignIn }
            isLink={ !userName }
            {...(userName ? {} : {to: routes.autorization})}
            onClick={ (e) => userName ? exit() : checkPath(e, routes.autorization) }
            bg='#e50914'
            border='none'
            $borderRadius='4px'
          />
        }
      </Flex>
    </Flex>
  );
};

const LogoImg = styled.img`
  width: 60px;
`;

const UserName = styled.span`
  margin-right: 12px;
  width: 200px;
  overflow: hidden;
  text-align: right;

  @media (max-width: 480px) {
    width: 90px;
  }
`;

Header.propTypes = {
  userName: PropTypes.string.isRequired
};

export default Header;
