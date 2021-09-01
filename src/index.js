import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Formula } from '@/components/formula/Formula';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import initialState from '@/redux/initialState';
import { storage } from '@core/utils';

const store = createStore(rootReducer, initialState);

store.subscribe((appStore) => {
  console.log('App store', appStore);
  storage('excel-store', appStore);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
