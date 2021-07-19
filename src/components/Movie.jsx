import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Preloader, MovieOverview } from './index';
import TMDb from '../api/tmdb';
import Firebase from '../api/firebase';
import { Flex } from '../styles/index';
import DeleteIcon from '../images/delete.svg';
import PencilIcon from '../images/pen.svg';
import { isVoted, setVote, deleteVote } from '../common/voteMovie';
import { changeSettingsPage } from '../store/actions';
import { RATINGS, GENRES_RUS } from '../constants/config';

const Movie = ({ location }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const movie = location.state;
  const { user } = useSelector(state => state.user);
  const [ state, setState ] = useState({
    isChangeOverview: false,
    overview: movie.overview,
    initialOverview: movie.overview,
    genresMovie: null
  });
  
  useEffect(() => {
    let isMounted = true;
    Promise.all([TMDb.getGenres(), Firebase.getOverviews()])
      .then(data => {
        if (isMounted) {
          let adminOverview = null;
          
          const genres = data[0].genres.filter(genre => 
            movie.genre_ids.some(id => id === genre.id)
          );
          
          if (data[1]) {
            const arrOverview = Object.values(data[1]).filter(el => el.id === movie.id);
            
            if (arrOverview.length) {
              adminOverview = arrOverview.sort((a, b) => b.date - a.date)[0].overview;
            }
          }

          setTimeout(() => {
            setState(prev => ({
              ...prev,
              overview: adminOverview ?? movie.overview,
              initialOverview: adminOverview ?? movie.overview,
              genresMovie: genres.map(genre => genre.name)
            }));
          }, 50); // нужно для плавности прелодера
        }
      });

    return (() => isMounted = false);
  }, [movie.genre_ids, movie.id, movie.overview]);

  const setRate = (e) => {
    if (user) {
      if (isVoted(movie.id)) {
        if (window.confirm('Вы уже оценили данный фильм! Хотите отменить свой голос?')) {
          deleteVote(movie.id);
          setState(prev => ({...prev}));
          alert('Ваш голос отменён!');
        }
      } else {
        setVote({
          id: movie.id,
          value: e.target.textContent.trim()
        });
        alert('Спасибо, Ваш голос учтён!');
        setState(prev => ({...prev}));
      }
    } else {
      alert('Для оценки фильма, пожалуйста, авторизируйтесь!');
    }
  };

  const changeOverview = () => {
    if (state.isChangeOverview && state.initialOverview !== state.overview.trim()) { 
      Firebase.setOverviewMovie({
        id: movie.id,
        overview: state.overview.trim(), 
        date: Date.now()
      });
    }

    setState(prev => ({
      ...prev,
      isChangeOverview: !prev.isChangeOverview
    }));
  };

  const removeMovie = () => {
    dispatch(changeSettingsPage({
      settings: { idDeletedMovie: movie.id }
    }));
    history.replace('/');
  };
  
  return (
    <>
      {!state.genresMovie ? <Preloader /> : 
        <StylesMovie 
          bg={ TMDb.getUrlImageMovie(movie.backdrop_path, 1280) } 
          direction='column'
          grow='1'
        >
          <BoxMovieInfo>
            <h1>{ movie.title.toUpperCase() }</h1>
            <p>{ `Дата Релиза: ${movie.release_date}` }</p>
            <p>
              {`Жанр: ${state.genresMovie.map(genre => GENRES_RUS[genre].name).reduce((sum, genre, i) => 
                sum + genre + (i === state.genresMovie.length - 1 ? '' : ', '), '')}` 
              }
            </p>
            <p>{ `Рейтинг: ${movie.vote_average * 10}` }</p>
            <p>{ `Количество голосов: ${isVoted(movie.id) ? movie.vote_count + 1 : movie.vote_count}` }</p>
            <MovieOverview 
              overview={ state.overview } 
              isChange={ state.isChangeOverview }
              setState={ setState }
            />
            <div>
              { RATINGS.map(el => <span key={ el } onClick={ setRate }>{ el }</span>) }
            </div>
          </BoxMovieInfo>
          {user?.name === 'admin' && 
            <AdminPanel direction='column'>
              <button onClick={ changeOverview } />
              <button onClick={ removeMovie } />
            </AdminPanel>
          }
        </StylesMovie>
      }
    </>
  );
};

const StylesMovie = styled(Flex)`
  background: ${({ bg }) => `url(${bg}) no-repeat center bottom / cover`};
  margin: 20px -30px -20px -30px;
  position: relative; 

  &::after {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to right,#181818 10%,rgba(23,23,23,.98) 20%,
      rgba(23,23,23,.97) 25%,rgba(23,23,23,.95) 35%,rgba(23,23,23,.94) 40%,
      rgba(23,23,23,.92) 45%,rgba(23,23,23,.9) 50%,rgba(23,23,23,.87) 55%,
      rgba(23,23,23,.82) 60%,rgba(23,23,23,.75) 65%,rgba(23,23,23,.63) 70%,
      rgba(23,23,23,.45) 75%,rgba(23,23,23,.27) 80%,rgba(23,23,23,.15) 85%,
      rgba(23,23,23,.08) 90%,rgba(23,23,23,.03) 95%, rgba(23,23,23,0) 100%);
  }

  @media (max-width: 640px) {
    margin: 20px -20px -20px -20px;
  }
`;

const BoxMovieInfo = styled.div`
  position: relative;
  z-index: 2;
  min-width: 300px;
  max-width: 600px;
  margin: 100px 0 0 100px;
  color: #a3a3a3;

  & > * {
    margin-bottom: 12px;
    word-wrap: break-word;
  }

  h1 {
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    color: #fff;
    margin-bottom: 36px;
  }

  span {
    display: inline-block;
    width: 36px;
    color: white;
    cursor: pointer;
    padding: 6px;
    background: #e50914;
    margin: 24px 10px;
    text-align: center;
    border-radius: 3px;
  }

  span:first-child {margin-left: 0;}
  span:hover {background: #424242;}

  @media (max-width: 768px) {
    margin: 100px auto 0 auto;
  }

  @media (max-width: 640px) {
    width: auto;
    padding: 0 20px;

    & > div {
      width: 280px;
      margin-top: 24px;
    }

    span {margin-top: 0;}
    span:nth-child(6) {margin-left: 0;}
  }
`;

const AdminPanel = styled(Flex)`
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 3;

  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }

  button:hover {opacity: 0.7;}

  button:first-child {
    background: url(${PencilIcon}) no-repeat center / 60%, #e50914;
    margin-bottom: 12px;
  }

  button:last-child {
    background: url(${DeleteIcon}) no-repeat center / 60%, #e50914;
  }

  @media (max-width: 640px) {
    flex-direction: row;
    button:last-child {margin-left: 12px;}
  }
`;

Movie.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      backdrop_path: PropTypes.string,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
      vote_average: PropTypes.number.isRequired,
      vote_count: PropTypes.number.isRequired,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired
    }).isRequired
  }).isRequired
};

export default Movie;
