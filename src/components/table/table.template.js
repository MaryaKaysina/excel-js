import {
  DEFAULT_HEIGHT_ROW,
  DEFAULT_WIDTH_COLUMN,
} from '@/consts';
import { toInlineStyles } from '@core/utils';
import { parseFormula } from '@core/parseFormula';

const CODES = {
  A: 65,
  Z: 90,
};

const getWidth = (state, index) => {
  if (!state) return DEFAULT_WIDTH_COLUMN + 'px';
  return (state[index] || DEFAULT_WIDTH_COLUMN) + 'px';
};

const getHeight = (state, index) => {
  if (!state) return DEFAULT_HEIGHT_ROW + 'px';
  return (state[index] || DEFAULT_HEIGHT_ROW) + 'px';
};

const toCell = (state, row) => {
  return (_, col) => {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id] || '';
    const styles = (toInlineStyles(state.stylesState[id]) || '')
        .concat(`; width: ${width}; min-width: ${width}`);

    return `
      <div
        class="cell"
        contenteditable
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        data-value="${data}"
        style="${styles}"
        spellcheck="false"
      >
      ${parseFormula(data)}
      </div>
    `;
  };
};

const toColumn = ({ col, index, width }) => {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}; min-width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `;
};

const createRow = (content, index, state) => {
  const rowInfo = index
    ? `${index}<div class="row-resize" data-resize="row"></div>`
    : '';
  const height = getHeight(state, index);

  return `
      <div
        class="row"
        data-type="resizable"
        data-row="${index}"
        style="height: ${height}; min-height: ${height}"
      >
        <div class="row-info">
          ${rowInfo}
        </div>
        <div class="row-data">${content}</div>
      </div>
    `;
};

const toChar = (_, index) => {
  return String.fromCharCode(CODES.A + index);
};

const withWidthFrom = (state) => {
  return (col, index) => {
    return {
      col, index, width: getWidth(state.colState, index),
    };
  };
};

export const createTable = (rowsCount = 15, state = {}) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(cols, null));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(cells, row + 1, state.rowState));
  }
  return rows.join('');
};
