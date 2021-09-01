export const ACTIONS = {
  TABLE_RESIZE: 'TABLE_RESIZE',
};

// Action Creators
export const tableResize = (payload) => {
  return {
    type: ACTIONS.TABLE_RESIZE,
    payload,
  };
};
