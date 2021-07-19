import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorInput = ({ text }) => {
  return (
    <StylesError>
      { text }
    </StylesError>
  );
};

const StylesError = styled.p`
  color: #d50000;
  margin-bottom: 18px;
  margin-top: -18px;
  padding-left: 10px;
  font-size: 12px;
`;

ErrorInput.propTypes = {
  text: PropTypes.string.isRequired
};

export default ErrorInput;
