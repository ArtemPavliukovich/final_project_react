import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MovieOverview = ({ overview, isChange, setState }) => {
  const p = useRef(null);
  const textarea = useRef(null);

  return (
    <>
      {!isChange ? <p ref={ p }>{ overview }</p> :
        <Textarea
          ref={ textarea }
          height={(p.current ? p.current.offsetHeight + 45 : textarea.current.offsetHeight) + 'px'}
          value={ overview }
          onChange={(e) => setState(prev => ({
            ...prev,
            overview: e.target.value
          }))}
        />
      }
    </>
  );
};

const Textarea = styled.textarea`
  color: #a3a3a3;
  width: 100%;
  height: ${({height}) => height};
  border: 2px solid #90caf9;
  border-radius: 8px;
  padding: 10px;
  resize: none;
`;

MovieOverview.propTypes = {
  overview: PropTypes.string.isRequired,
  isChange: PropTypes.bool.isRequired,
  setState: PropTypes.func.isRequired
};

export default MovieOverview;
