import { NUM_MOVIES_PAGE } from '../constants/config';

export const calcMaxPage = ({ countApiMovies, excepts, adminMovies, year }) => {
  let countMovies = countApiMovies;
 
  if (excepts) {
    Object.values(excepts).forEach(el => {
      if (el.year === year) {
        countMovies -= 1;
      }
    });
  }
  
  if (adminMovies) {
    Object.values(adminMovies).forEach(el => {
      if (el.movie.year === year) {
        countMovies += 1;
      }
    });
  }
  
  return Math.ceil(countMovies / NUM_MOVIES_PAGE);
}