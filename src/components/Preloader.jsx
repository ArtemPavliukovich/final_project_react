import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex } from '../styles/index';

const Preloader = () => {
  return (
    <Flex alignItems='center' width='100%' grow='1' height='100%'>
      <Loader>
        <LoaderItemOne />
        <LoaderItemTwo />
        <LoaderItemThree />
      </Loader>
    </Flex>
  );
};

const Loader = styled.div`
  position: relative;
	left: calc(50% - 32px);
	width: 64px;
	height: 64px;
	border-radius: 50%;
	perspective: 800px;
`;

const animationItemOne = keyframes`
  0% {transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);}
	100% {transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);}
`;

const animationItemTwo = keyframes`
  0% {transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);}
	100% {transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);}
`;

const animationItemThree = keyframes`
  0% {transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);}
	100% {transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);}
`;

const LoaderItem = styled.div`
  position: absolute;
	width: 100%;
	height: 100%;
	box-sizing: border-box;	
	border-radius: 50%;	
`;

const LoaderItemOne = styled(LoaderItem)`
  left: 0%;
	top: 0%;
	animation: ${animationItemOne} 0.85s linear infinite;
	border-bottom: 3px solid rgb(255,255,255);
`;

const LoaderItemTwo = styled(LoaderItem)`
  right: 0%;
	top: 0%;
	animation: ${animationItemTwo} 0.85s linear infinite;
	border-right: 3px solid rgb(255,255,255);
`;

const LoaderItemThree = styled(LoaderItem)`
  right: 0%;
	bottom: 0%;
	animation: ${animationItemThree} 0.85s linear infinite;
	border-top: 3px solid rgb(255,255,255);
`;

export default Preloader;
