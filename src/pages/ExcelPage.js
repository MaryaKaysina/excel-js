import { Page } from '@core/Page';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '@/redux/initialState';
import { debounce, storage } from '@core/utils';
import { KEY_FOR_LOCAL } from '@/consts';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { Footer } from '@/components/footer/Footer';

const storageName = (param) => {
  return `${KEY_FOR_LOCAL}:${param}`;
};

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString();
    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));
    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table, Footer],
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
