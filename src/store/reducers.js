import { combineReducers } from 'redux';
import { pageSettingsReducer } from './page/reducers';
import { userReducer } from './user/reducers';

const rootReducer = combineReducers({
  page: pageSettingsReducer,
  user: userReducer
});

export default rootReducer;