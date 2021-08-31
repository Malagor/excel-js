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
  const { payload, type } = action;
  switch (type) {
    case ACTIONS.COL_RESIZE:
      return {
        ...state,
        colState: {
          ...state.colState,
          ...payload,
        },
      };
    case ACTIONS.ROW_RESIZE:
      return {
        ...state,
        rowState: {
          ...state.rowState,
          ...payload,
        },
      };
    default:
      return state;
  }
}
