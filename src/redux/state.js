import { storage } from '@core/utils';

const state = storage('excel-store') || {
  colState: {},
  rowState: {},
};

export default state;
