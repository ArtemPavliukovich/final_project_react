import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TMDb from '../api/tmdb';
import DeleteIcon from '../images/delete.svg';

const MovieCard = ({ movie, deleteCard }) => {
  const [ visibleCard, setVisibleCard ] = useState(true);
  const { user } = useSelector(state => state.user);

  const removeCard = () => {
    deleteCard(movie.id);
    setVisibleCard(false);
  };

  return (
    <>
      {visibleCard &&
        <StylesMovieCard>
          <Link 
            to={{
              pathname: `movie/${movie.id}`,
              state: movie
            }}
          >
            <img 
              src={ TMDb.getUrlImageMovie(movie.poster_path, 780) } 
              alt='постер фильма' 
            />
          </Link>
          <div>
            <h6>{ movie.title }</h6>
            <p>{ movie.vote_average * 10 }</p>
          </div>
          {user?.name === 'admin' && <ButtonDeleteCard onClick={ removeCard } />}
        </StylesMovieCard>
      }
    </>
  );
};

const StylesMovieCard = styled.div`
  width: calc(20% - 12px);
  padding: 10px;
  color: #e3f2fd;
  border: 1px solid gray;
  box-shadow: 8px 8px 8px #000;
  display: flex;
  flex-direction: column;
  position: relative;
  
  img {
    width: 100%;
    cursor: pointer;
    aspect-ratio: 2/3;
  }

  div {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    padding: 10px 8px 6px 8px;
    align-items: center;
  }

  h6 {margin-right: 10px;}

  p {
    font-size: 22px;
    border-radius: 50%;
  }

  @media (max-width: 1280px) {
    width: calc(25% - 11.25px);
  }

  @media (max-width: 1024px) {
    width: calc(33.33% - 10px);
  }

  @media (max-width: 768px) {
    width: calc(50% - 7.5px);
  }

  @media (max-width: 640px) {
    width: 85%;
    margin: 12px auto;
  }
`;

const ButtonDeleteCard = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  left: 16px;
  top: 16px;
  background: url(${DeleteIcon}) no-repeat center, #e0e0e0;
  border-radius: 50%;

  &:hover {
    background: url(${DeleteIcon}) no-repeat center, #bdbdbd;
  }
`;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    vote_average: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }).isRequired,
  deleteCard: PropTypes.func.isRequired
};

export default React.memo(MovieCard);
