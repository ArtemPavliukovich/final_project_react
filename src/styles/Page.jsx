import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Flex } from './index';

const Page = ({ value, ...rest }) => {
  return (
    <StylesPage {...rest} justify='center' alignItems='center'>
      <span>
        { value }
      </span>
    </StylesPage>
  );
};

const StylesPage = styled(Flex)`
  width: 36px;
  height: 36px;
  border: 2px solid #e50914;
  cursor: pointer;
  border-radius: 2px;
  margin: 0 6px;

  ${({ isActive }) => isActive && css`
    background: #ff5722;
  `};

  @media (max-width: 400px) {
    width: 30px;
    height: 30px;
  }
`;

Page.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool
};

Page.defaultProps = {
  isActive: false
};

export default Page;
