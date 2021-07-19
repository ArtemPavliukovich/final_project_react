import React from 'react';
import styled from 'styled-components';

const Wrapper = (props) => {
  return <StylesWrapper {...props} />;
};

const StylesWrapper = styled.div`
  min-width: 320px;
  max-width: 1440px;
  margin: 0 auto;
  background: #181818;
  padding: 20px 30px;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: #fff;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

export default Wrapper;
