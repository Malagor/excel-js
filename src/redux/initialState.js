import { storage } from '@core/utils';
import { DEFAULT_TITLE } from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  titleTable: DEFAULT_TITLE,
  styleState: {},
};

const initialState = storage('excel-store')
  ? { ...defaultState, ...storage('excel-store') }
  : { ...defaultState };

export default initialSta