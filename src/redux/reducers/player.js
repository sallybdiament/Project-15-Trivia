import { STORE_PLAYER, STORE_SCORE } from '../actions/index';

const DEFAULT_STATE = {
  name: 'Anderson',
  assertions: 0,
  score: 10,
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
      score: 0,
    };
  case STORE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default playerReducer;
