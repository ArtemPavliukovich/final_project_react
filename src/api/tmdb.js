import messages from '../constants/messages';
import NoPhoto from '../images/no-photo.svg';

const BASE_URL_GET_MOVIES = 'https://api.themoviedb.org/3/discover/movie?';
const BASE_URL_GET_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?';
const BASE_URL_GET_IMAGE = 'https://image.tmdb.org/t/p';

const API_SELECTION_VALUES = {
  [messages.filter.selection[0]]: 'vote_average.desc',
  [messages.filter.selection[1]]: 'release_date.desc',
  [messages.filter.selection[2]]: 'release_date.asc'
};

export default class TMDb {
  static getMovies ({ selection, pageApi, year }) {
    return fetch(BASE_URL_GET_MOVIES + new URLSearchParams({
      api_key: '7d28238477cac3bff05c27d00fd14cd0',
      language: 'ru-RUS',
      'vote_count.gte': '5',
      region: 'RU',
      include_adult: false,
      include_video: false,
      sort_by: API_SELECTION_VALUES[selection],
      page: pageApi,
      primary_release_year: year,
      year: year,
      'primary_release_date.lte': `${year}-12-31`
    }))
      .then(response => response.json());
  }

  static getGenres () {
    return fetch(BASE_URL_GET_GENRES + new URLSearchParams({
      api_key: '7d28238477cac3bff05c27d00fd14cd0',
      language: 'ru-RUS'
    }))
      .then(response => response.json());
  }

  static getUrlImageMovie (path, size) {
    // по умолчанию считаем что админ будет встравлять путь с http
    if (path && path.includes('http')) {
      return path;
    } else {
      return path ? BASE_URL_GET_IMAGE + `/w${size}` + path : NoPhoto;
    }
  }
};