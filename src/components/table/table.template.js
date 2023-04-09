const CODES = {
  A: 65,
  Z: 90,
};

const toCell = () => {
  return `
      <input type="text" spellcheck="false" class="cell" />
    `;
};

const toColumn = (content) => {
  return `
      <div class="column">${content}</div>
    `;
};

const createRow = (content, index) => {
  return `
      <div class="row">
        <div class="row-info">${index ? index : ''}</div>
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
