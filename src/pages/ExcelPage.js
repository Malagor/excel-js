import { Page } from '@core/Page/Page';
import { debounce, storage } from '@core/utils';

import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Formula } from '@/components/formula/Formula';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Excel } from '@/components/excel/Excel';

import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import initialState from '@/redux/initialState';

export class ExcelPage extends Page {
  getRoot() {
    console.log('params', this.params);
    const store = createStore(rootReducer, initialState);

    const stateListener = debounce((appStore) => {
      console.log('App store', appStore);
      storage('excel-store', appStore);
    }, 500);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
