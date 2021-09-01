/**
 * @typedef State
 * @type {object}
 * @property {Object} rowState
 * @property {Object} colState
 * @property {Object} dataState
 * @property {Object} currentText
 */

/**
 * This callback is displayed as a global member.
 * @callback subscribeCallback
 * @param {State} state
 */

/**
 * @typedef stateInterface
 * @type {object}
 * @property {subscribe} subscribe
 * @property {method} dispatch
 * @property {method} getState
 */

/**
 *
 * @param {rootReducer} rootReducer
 * @param {State} initialState
 * @return {Object}
 */
export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  let listeners = [];

  return {
    /**
     * @function subscribe
     * @param {subscribeCallback} fn
     * @return {{}}
     */
    subscribe(fn) {
      listeners.push(fn);

      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn);
        },
      };
    },

    /**
     * Изменяет стейт и опопвещает подписчиков
     * @param {Action} action
     */
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    /**
     * Возвращает текущее состояние стейта
     * @return {State} стейт
     */
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
}
