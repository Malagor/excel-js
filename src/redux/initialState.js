import { storage } from '@core/utils';

const initialState = storage('excel-store') || {
  colState: {},
  rowState: {},
  dataState: {}, // {0:1}: 'ksndfkjsn'
  currentText: '',
};

export default initialState;
