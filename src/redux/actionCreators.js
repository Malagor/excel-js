import { ACTIONS } from '@/redux/actionTypes';

// Action Creators

export const tableResize = (payload) => {
  return {
    type: ACTIONS.TABLE_RESIZE,
    payload,
  };
};

export const changeText = (payload) => {
  return {
    type: ACTIONS.CHANGE_TEXT,
    payload,
  };
};

export const changeTitle = (payload) => {
  return {
    type: ACTIONS.CHANGE_TITLE,
    payload,
  };
};

export const changeStyle = (payload) => {
  return {
    type: ACTIONS.APPLY_STYLE,
    payload,
  };
};
