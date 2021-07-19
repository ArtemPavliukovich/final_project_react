import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Select, Button } from './index';
import { Flex } from '../styles/index';
import messages from '../constants/messages';
import routes from '../routers/routes';

const Filter = (props) => {
  const { user } = useSelector(state => state.user);

  return (
    <StylesBoxFilters padding='12px 24px 12px 0' height='100%'>
      <Select 
        items={ messages.filter.selection } 
        values={ props }
        actionName='selection'
        width='190px'
        margin='0 12px 0 0'
      />
      <Select 
        items={ messages.filter.years } 
        values={ props }
        actionName='year'
        scroll='scroll'
      />
      {user?.name === 'admin' && 
        <StylesButton 
          name={ messages.filter.buttonAddMovie }
          isLink={ true }
          to={ routes.addMovie }
          width='180px'
          margin='0 0 0 12px'
          height='auto'
        />
      }
    </StylesBoxFilters>
  );
};

const StylesBoxFilters = styled(Flex)`
  @media (max-width: 640px) {
    justify-content: space-between;
    padding: 12px 15%;
  }
`;

const StylesButton = styled(Button)`
  font-weight: normal;
  padding: 8px 0;
  border-color: red;

  @media (max-width: 640px) {
    width: 100%;
    margin: 0 0 12px 0;
  }
`;

Filter.propTypes = {
  selection: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired
};

export default Filter;
