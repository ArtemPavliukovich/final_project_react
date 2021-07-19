export const CHANGE_SETTINGS_PAGE = 'CHANGE_SETTINGS_PAGE';
export const SET_DEFAULT_FILTER = 'SET_DEFAULT_FILTER';
export const DELETE_MOVIE = 'DELETE_MOVIE';

export const changeSettingsPage = ({ settings }) => ({
  type: CHANGE_SETTINGS_PAGE,
  payload: settings
});

export const setDefaultFilter = () => ({
  type: SET_DEFAULT_FILTER,
  payload: null
});

export const deleteMovie = ({ id }) => ({
  type: DELETE_MOVIE,
  payload: id
});