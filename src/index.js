import './scss/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { Footer } from '@/components/footer/Footer';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { debounce, storage } from '@core/utils';
import { KEY_FOR_LOCAL } from '@/consts';
import { initialState } from '@/redux/initialState';

const store = createStore(rootReducer, initialState);

const stateListener = debounce((state) => {
  storage(KEY_FOR_LOCAL, state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table, Footer],
  store,
});

excel.render();
