import React from 'react';
import styled from 'styled-components';

const Flex = (props) => {
  return <StylesFlex {...props} />;
};

const StylesFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${props => props.width ?? 'auto'};
  height: ${props => props.height ?? 'auto'};
  flex-direction: ${props => props.direction ?? 'row'};
  align-items: ${props => props.alignItems ?? 'stretch'};
  justify-content: ${props => props.justify ?? 'flex-start'};
  padding: ${props => props.padding ?? '0'};
  flex-grow: ${props => props.grow ?? '0'};
`;

export default Flex;