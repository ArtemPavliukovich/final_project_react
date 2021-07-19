import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = (props) => {
  const { name, isLink, ...rest } = props;
  
  return (
    <StylesButton {...rest} as={ isLink ? Link : 'button' } $isLink={ isLink }>
      { name }
    </StylesButton>
  );
};

const StylesButton = styled.button`
  display: block;
  font-weight: 600;
  cursor: pointer;
  width: ${({ width }) => width ?? '140px'};
  height: ${({ height }) => height ?? '40px'};
  border: ${({ border }) => border ?? '1px solid #fff'};
  background: ${({ bg }) => bg ?? 'none'};
  border-radius: ${({ $borderRadius }) => $borderRadius ?? 'none'};
  margin: ${({ margin }) => margin ?? '0'};
  color: ${({ color }) => color ?? 'inherit'};
  
  ${({ $isLink }) => $isLink && css`
    text-align: center;
    line-height: ${({ height }) => 
      height ? (+height.replace('px', '') - 2) + 'px' : '38px'
    };
  `};
`;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  isLink: PropTypes.bool.isRequired
};

export default Button;
