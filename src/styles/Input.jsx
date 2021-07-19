import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import{ formItemsStyles } from '../styles/styles';

const Input = (props) => {
  return <StylesInput {...props} />;
};

const StylesInput = styled.input`
  ${formItemsStyles};
  &[type='date']::before {
    width: ${({ placeholder }) => placeholder ? '100%' : 'auto'};
    content: attr(placeholder);
    color: #666666;
  }
`;

Input.propTypes = {
  isError: PropTypes.bool.isRequired
};

export default Input;