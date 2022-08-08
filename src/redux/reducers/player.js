import { STORE_PLAYER } from '../actions/index';

const DEFAULT_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case STORE_PLAYER:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
      photoUrl: action.payload.photo,
    };
  default:
    return state;
  }
};

export default playerReducer;
