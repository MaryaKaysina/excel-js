import { storage } from '@core/utils';
import { DEFAULT_STYLES, DEFAULT_TITLE, KEY_FOR_LOCAL } from '@/consts';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentTitle: DEFAULT_TITLE,
  currentStyles: DEFAULT_STYLES,
};

export const initialState = storage(KEY_FOR_LOCAL)
  ? storage(KEY_FOR_LOCAL)
  : defaultState;
