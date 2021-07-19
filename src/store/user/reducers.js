import { SET_USER } from './actions';

const defaultState = {
  user: undefined
};

export const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        user: payload
      };
    default:
      return state;
  }
};