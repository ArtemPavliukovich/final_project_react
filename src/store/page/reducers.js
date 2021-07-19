import {
  CHANGE_SETTINGS_PAGE, 
  SET_DEFAULT_FILTER,
  DELETE_MOVIE
} from './actions';
import messages from '../../constants/messages';

const defaultState = {
  movies: [],
  preloader: true,
  page: 1,
  pageApi: 1,
  selection: messages.filter.selection[0],
  year: new Date().getFullYear(),
  maxPage: null,
  maxPageApi: 1000000
};

export const pageSettingsReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CHANGE_SETTINGS_PAGE:
      return {
        ...state,
        ...payload
      };
    case SET_DEFAULT_FILTER: 
      return {
        ...defaultState
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== payload)
      };
    default:
      return state;
  }
};