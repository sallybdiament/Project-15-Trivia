import { STORE_PHOTO } from '../actions/index';

const DEFAULT_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case STORE_PHOTO:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  default:
    return state;
  }
};

export default playerReducer;
