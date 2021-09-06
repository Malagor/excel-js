import { ACTIONS } from '@/redux/actionTypes';

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
      return {
        ...state,
        [field]: value(state, field, data),
      };
    }

    case ACTIONS.CHANGE_TEXT: {
      const { id, text } = action.payload;
      return {
        ...state,
        currentText: action.payload.text,
        dataState: value(state, 'dataState', { [id]: text }),
      };
    }

    case ACTIONS.CHANGE_TITLE:
      return {
        ...state,
        titleTable: action.payload,
      };

    case ACTIONS.APPLY_STYLE: {
      const { ids, style } = action.payload;

      const newStyles = ids.reduce(
        (res, id) => {
          res[id] = value(res, id, style);
          return res;
        },
        { ...(state.styleState || {}) },
      );

      return {
        ...state,
        styleState: newStyles,
      };
    }

    default:
      return state;
  }
}

function value(state, field, payload) {
  return state[field] ? { ...state[field], ...payload } : { ...payload };
}
