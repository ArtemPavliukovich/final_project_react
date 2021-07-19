export const filterMovies = ({ apiMovies, excepts, adminMovies, year }) => {
  let movies = apiMovies;

  if (adminMovies) {
    movies = [
      ...Object.values(adminMovies)
        .map(el => el.movie)
        .filter(movie => {
          if (!movies.some(el => el.id === movie.id)) {
            return movie.year === year;
          } else {
            return false;
          }
        }), 
      ...movies
    ];
  }

  if (excepts) {
    movies = movies.filter(movie => 
      !Object.values(excepts).some(el => el.id === movie.id)
    );
  }

  return movies;
}