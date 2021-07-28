import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Flex, Page } from '../styles/index';
import { changeSettingsPage } from '../store/actions';
import { COUNT_PAGE, NUM_MOVIES_PAGE } from '../constants/config';

const Paginator = ({ page, maxPage, numMovies, pageApi }) => {
  const dispatch = useDispatch();

  const setPage = (e) => {
    const value = +e.target.textContent;

    if (page !== value) {
      dispatch(changeSettingsPage({
        settings: {
          page: value,
          preloader: value * NUM_MOVIES_PAGE > numMovies && pageApi <= maxPage
        }
      }));
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {maxPage &&
        <StylesPaginator width='100%' justify='center' height='100%'>
          {page > COUNT_PAGE && maxPage !== COUNT_PAGE + 1 && 
            <Page value={ 1 } onClick={ setPage } />
          }
          {page > COUNT_PAGE && maxPage !== COUNT_PAGE + 1 && <p>{ '...' }</p>}
          {Array(COUNT_PAGE < maxPage ? COUNT_PAGE : maxPage).fill('').map((_, i) => {
            let value;

            if (page < maxPage) {
              value = page < COUNT_PAGE ? i + 1 : page - COUNT_PAGE + 2 + i;
            } else {
              value = page - ((maxPage > COUNT_PAGE ? COUNT_PAGE : maxPage) - 1 - i);
            }
            
            return (
              <Page 
                value={ value } 
                onClick={ setPage }
                key={ i }
                isActive={ page === value }
              />
            );
          })}
          {maxPage > COUNT_PAGE && maxPage - page > 2 && <p>{ '...' }</p>}
          {maxPage > COUNT_PAGE && maxPage - page > 1 && 
            <Page value={ maxPage } onClick={ setPage } />
          }
        </StylesPaginator>
      }
    </>
  );
};

const StylesPaginator = styled(Flex)`
  padding: 36px 0 12px 0;

  & > p {
    width: 20px;
    font-size: 20px;
    line-height: 44px;
    border: 2px solid transparent;
  }
`;

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  numMovies: PropTypes.number.isRequired,
  pageApi: PropTypes.number.isRequired, 
  maxPage: PropTypes.number
};

export default Paginator;
