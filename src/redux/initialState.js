import { DEFAULT_STYLES, DEFAULT_TITLE } from '@/consts';
import { clone } from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentTitle: DEFAULT_TITLE,
  currentStyles: DEFAULT_STYLES,
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentStyles: DEFAULT_STYLES,
  currentText: '',
});

export const normalizeInitialState = (state) => {
  return state ? normalize(state) : clone(defaultState);
};
