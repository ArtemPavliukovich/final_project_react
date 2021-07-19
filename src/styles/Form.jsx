import React from 'react';
import styled from 'styled-components';

const Form = (props) => {
  return <StylesForm {...props} />;
};

const StylesForm = styled.form`
  background: #eeeeee;
  margin-top: 12px;
  padding: 20px;
  border-radius: 3px;
  width: 320px;
  box-shadow: inset 0px 0px 16px #800000, 8px 8px 10px black;

  h1 {
    color: black;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
  }

  @media (max-width: 640px) {
    width: 300px;
  }
`;

export default Form;