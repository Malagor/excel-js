import { ACTIONS } from '@/redux/actionCreators';

/**
 * @typedef Action
 * @type {object}
 * @property {string} type - type of action.
 * @property {Object} payload - data for action
 */

/**
 * @function rootReducer
 * @param {State} state
 * @param {Action} action
 * @return {State} new State
 */
export function rootReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TABLE_RESIZE: {
      const { type, data } = action.payload;
      // rowState or colState
      const field = `${type}State`;
      const newFieldState = state[field]
        ? { ...state[field], ...data }
        : { ...data };
      return {
        ...state,
        [field]: newFieldState,
      };
    }

    default:
      return state;
  }
}
