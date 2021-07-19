import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDispatch, batch } from 'react-redux';
import { setDefaultFilter, changeSettingsPage } from '../store/actions';
import ArrowUp from '../images/chevron_up.svg';
import ArrowDown from '../images/chevron_down.svg';

const Select = ({ items, values, actionName, ...rest }) => {
  const [ open, setOpen ] = useState(false);
  const dispatch = useDispatch();
  
  const setSettingsPage = (e) => {
    if (values[actionName] !== (+e.target.dataset.value || e.target.dataset.value)) {
      setOpen(false);
      batch(() => {
        dispatch(setDefaultFilter());
        dispatch(changeSettingsPage({
          settings: {
            ...values,
            [actionName]: +e.target.dataset.value || e.target.dataset.value
          }
        }));
      });
    }
  };

  return (
    <StylesSelect {...rest} isOpen={ open }>
      <p onClick={() => setOpen(!open)}>
        { values[actionName] }
      </p>
      <ul>
        {items.map(item => (
          <li 
            key={ item } 
            onClick={ setSettingsPage } 
            data-value={ item } 
            data-active={ (+item || item) === values[actionName] }
          >
            { item }
          </li>
        ))}
      </ul>
    </StylesSelect>
  );
};

const StylesSelect = styled.div`
  position: relative;
  text-align: center;
  z-index: 2;
  width: ${({ width }) => width ?? '100px'};
  margin: ${({ margin }) => margin ?? '0'};
  background: ${({ isOpen }) => 
    `url(${isOpen ? ArrowUp : ArrowDown}) no-repeat center right / 30px`
  };

  ul {
    opacity: 0;
    width: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    z-index: 10;
    max-height: 200px;
    background: #181818;
    overflow-y: ${({ scroll }) => scroll ?? 'visible'};

    ${({ isOpen }) => isOpen && css`
      width: 100%;
      opacity: 1;
      transition: opacity 0.3s ease 0s;
    `};
  }

  li, p {
    border: 1px solid red;
    color: #eeeeee;
    cursor: pointer;
    padding: ${({ padding }) => padding ?? '8px 10px'};
  }

  li {
    ${({ isOpen }) => !isOpen && css`
      display: none;
    `};
  }

  li[data-active=true] {background: #e50914;}
  li:hover {background: rgba(255, 255, 255, 0.1);}

  @media (max-width: 640px) {
    width: 100%;
    margin: 0 0 20px 0;

    &:nth-child(2) {
      z-index: 1;
    }
  }
`;

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  actionName: PropTypes.string.isRequired,
  values: PropTypes.shape({
    selection: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  }).isRequired
};

export default Select;
