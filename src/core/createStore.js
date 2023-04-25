/**
 * Store's function constructor.
 * @param {function} rootReducer pure function returning new state
 * @param {object} [initialState={}] init state
 * @return {object} store's methods.
 */
export const createStore = (rootReducer, initialState = {}) => {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
};
