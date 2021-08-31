export const ACTIONS = {
  COL_RESIZE: 'COL_RESIZE',
  ROW_RESIZE: 'ROW_RESIZE',
};

export const colResize = (payload) => {
  return {
    type: ACTIONS.COL_RESIZE,
    payload,
  };
};

export const rowResize = (payload) => {
  return {
    type: ACTIONS.ROW_RESIZE,
    payload,
  };
};
