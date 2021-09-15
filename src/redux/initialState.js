import { DEFAULT_TITLE } from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  titleTable: DEFAULT_TITLE,
  styleState: {},
};

export function normalizeInitialState(state, id) {
  if (state) {
    return { ...defaultState, ...state, id };
  }

  return { ...defaultState, id };
}
