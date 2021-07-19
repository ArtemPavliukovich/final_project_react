import React from 'react';
import { useSelector } from 'react-redux';
import { Filter, Movies, Paginator } from './index';
import { Flex } from '../styles/index';

const Home = () => {
  const page = useSelector(state => state.page);
  
  return (
    <Flex width='100%' grow='1' direction='column'>
      <Filter year={ page.year } selection={ page.selection } />
      <Movies pageSettings={ page } />
      <Paginator 
        page={ page.page } 
        maxPage={ page.maxPage }
        numMovies={ page.movies.length }
        pageApi={ page.pageApi }
      />
    </Flex>
  );
};

export default Home;
