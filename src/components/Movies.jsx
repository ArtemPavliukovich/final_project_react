import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, batch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Preloader, MovieCard } from './index';
import TMDb from '../api/tmdb';
import Firebase from '../api/firebase';
import { Flex } from '../styles/index';
import { filterMovies } from '../common/filterMovies';
import { calcMaxPage } from '../common/calcMaxPage';
import { changeSettingsPage, deleteMovie, } from '../store/actions';
import { NUM_MOVIES_PAGE } from '../constants/config';

const Movies = ({ pageSettings }) => {
  const dispatch = useDispatch();

  const { 
    page, 
    movies, 
    pageApi, 
    year, 
    selection, 
    preloader, 
    maxPage,
    maxPageApi,
    idDeletedMovie
  } = pageSettings;

  const countApiMovies = useRef({ 
    year: null,
    value: null || +sessionStorage.getItem('countApiMovies')
  }); // это надо чтобы динамически при удалении фильмов пересчитать maxPage
  
  const deleteCard = useCallback((id) => {
    const movie = { id, year };
    Promise.all([
      Firebase.getDeleteMovies(),
      Firebase.getAdminMovies()
    ])
      .then(data => {
        if (!data[0] || !Object.values(data[0]).some(el => el.id === id)) {
          Firebase.deleteMovie(movie).then(() => {
            batch(() => {
              const newMaxPage = calcMaxPage({
                countApiMovies: countApiMovies.current.value,
                adminMovies: data[1],
                year: year,
                excepts: !data[0] ? { movie } : { ...data[0], movie }
              });
              
              if (newMaxPage !== maxPage) {
                dispatch(changeSettingsPage({
                  settings: {
                    maxPage: newMaxPage,
                    page: page === maxPage ? newMaxPage : page
                  }
                }));
              }

              if (idDeletedMovie) {
                dispatch(changeSettingsPage({
                  settings: { idDeletedMovie: null }
                }));
              }
    
              dispatch(deleteMovie({ id }));
            });
          });
        }
      });
  }, [dispatch, year, maxPage, page, idDeletedMovie]);
 
  useEffect(() => {
    let isMouted = true;
  
    if (movies.length < NUM_MOVIES_PAGE * page && pageApi <= maxPageApi) {
      Promise.all([
        TMDb.getMovies({ pageApi, year, selection }),
        Firebase.getDeleteMovies(),
        Firebase.getAdminMovies()
      ])
        .then(data => {
          if (isMouted) {
            const apiMovies = [...movies, ...data[0].results];

            const allMovies = filterMovies({
              apiMovies: apiMovies, 
              excepts: data[1], 
              adminMovies: data[2],
              year: year
            });
            
            if (
              allMovies.length >= NUM_MOVIES_PAGE * page || 
              (page === maxPage && maxPage <= pageApi)
            ) {
              dispatch(changeSettingsPage({
                settings: {
                  movies: allMovies,
                  pageApi: pageApi <= maxPageApi || !maxPage ? pageApi + 1 : pageApi,
                  preloader: false,
                  maxPageApi: data[0].total_pages,
                  maxPage: calcMaxPage({
                    countApiMovies: data[0].total_results,
                    excepts: data[1],
                    adminMovies: data[2],
                    year: year
                  })
                }
              }));
            } else {
              dispatch(changeSettingsPage({
                settings: {
                  movies: allMovies,
                  pageApi: pageApi <= maxPageApi || !maxPage ? pageApi + 1 : pageApi,
                  maxPageApi: data[0].total_pages,
                  preloader: true
                }
              }));
            }

            if (countApiMovies.current.year !== year) {
              countApiMovies.current = {
                year: year,
                value: data[0].total_results
              };
            }
          }
        });  
    }

    return (() => {
      isMouted = false;
      sessionStorage.setItem('countApiMovies', countApiMovies.current.value);
    });
  }, [page, year, selection, pageApi, dispatch, movies, maxPage, maxPageApi, deleteCard]);

  useEffect(() => {
    if (idDeletedMovie) {
      deleteCard(idDeletedMovie);
    }
  }, [deleteCard, idDeletedMovie]);

  return (
    <>
      {preloader ? <Preloader /> : 
        <FlexGap width='100%'>
          {movies.slice((page - 1) * NUM_MOVIES_PAGE, NUM_MOVIES_PAGE * page).map(movie => {
            if (movie) {
              return (
                <MovieCard 
                  movie={ movie }
                  key={ movie.id }
                  deleteCard={ deleteCard }
                />
              );
            } else {
              return null;
            }
          })}
        </FlexGap>
      }
    </>
  );
};

const FlexGap = styled(Flex)`
  gap: 15px;
`;

Movies.propTypes = {
  pageSettings: PropTypes.shape({
    selection: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    pageApi: PropTypes.number.isRequired,
    preloader: PropTypes.bool.isRequired,
    movies: PropTypes.array.isRequired
  }).isRequired
};

export default Movies;
