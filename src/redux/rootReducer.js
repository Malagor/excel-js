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
  console.log('Action', action);
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

    case ACTIONS.CHANGE_TEXT: {
      const { id, text } = action.payload;

      const newDataState = state.dataState
        ? { ...state.dataState, [id]: text }
        : { [id]: text };
      return {
        ...state,
        currentText: action.payload.text,
        dataState: newDataState,
      };
    }

    default:
      return state;
  }
}
