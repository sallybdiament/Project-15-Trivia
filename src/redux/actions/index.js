export const STORE_PLAYER = 'STORE_PLAYER';
export const STORE_SCORE = 'STORE_SCORE';

export const storePlayer = (data) => ({
  type: STORE_PLAYER,
  payload: data,
});

export const storeScore = (payload) => ({
  type: STORE_SCORE,
  payload,
});
