import { range } from '@core/utils';

export const shouldResize = (event) => {
  return event.target.dataset.resize;
};

export const isCell = (event) => {
  return event.target.dataset.type === 'cell';
};

export const matrix = ($target, $current) => {
  const target = $target.getId(true);
  const current = $current.getId(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
};

export const nextSelector = (key, { row, col }) => {
  const MIN_VALUE = 0;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col > MIN_VALUE ? col-- : col;
      break;
    case 'ArrowUp':
      row > MIN_VALUE ? row-- : row;
      break;
  }

  return `[data-id="${row}:${col}"]`;
};
