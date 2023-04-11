const CODES = {
  A: 65,
  Z: 90,
};

const toCell = (_, col) => {
  return `
      <div class="cell" contenteditable data-col="${col}"></div>
    `;
};

const toColumn = (content, index) => {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${content}
      <div class="col-resize" data-resize="column"></div>
    </div>
    `;
};

const createRow = (content, index) => {
  const rowInfo = index
    ? `${index} <div class="row-resize" data-resize="row"></div>`
    : '';

  return `
      <div class="row" data-type="resizable">
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

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols, null));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');

    rows.push(createRow(cells, i + 1));
  }
  return rows.join('');
};
