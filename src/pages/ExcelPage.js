import { Page } from '@core/Page/Page';
import { debounce, storage } from '@core/utils';

import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Formula } from '@/components/formula/Formula';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Excel } from '@/components/excel/Excel';

import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '@/redux/initialState';

function storageName(param) {
  return 'excel:' + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));

    const store = createStore(
      rootReducer,
      normalizeInitialState(state, params),
    );

    const stateListener = debounce((appStore) => {
      console.log('App store', appStore);
      storage(storageName(params), appStore);
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
