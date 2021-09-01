export const ACTIONS = {
  TABLE_RESIZE: 'TABLE_RESIZE',
  CHANGE_TEXT: 'CHANGE_TEXT',
};

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
