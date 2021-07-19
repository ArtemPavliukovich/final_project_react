import React from 'react';
import styled from 'styled-components';
import NotFoundImage from '../images/not-found.jpg';

const NotFound = () => <StylesNotFound />;

const StylesNotFound = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100vh;
  background: url(${NotFoundImage}) no-repeat center / 50%, white;

  @media (max-width: 1024px) {
    background: url(${NotFoundImage}) no-repeat center / 75%, white;
  }

  @media (max-width: 640px) {
    background: url(${NotFoundImage}) no-repeat center / 100%, white;
  }
`;

export default NotFound;
