import { storage } from '@core/utils';

const initialState = storage('excel-store') || {
  colState: {},
  rowState: {},
};

export default initialState;
