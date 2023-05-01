import { storage, toFormatDate } from '@core/utils';

const toHTML = (key) => {
  const model = storage(key);
  const id = key.split(':')[1];

  return `
    <li class="dashboard__record">
      <a href="#excel/${id}">${model.currentTitle}</a>
      <strong>${toFormatDate(model.openedDate)}</strong>
    </li>
  `;
};

const getAllKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }

  return keys;
};

export const createRecordsTable = () => {
  const keys = getAllKeys();

  if (keys.length === 0) {
    return `
      <p class="dashboard__record--not-found">
        Вы пока не создали ни одной таблицы
      </p>
    `;
  }

  keys.sort((a, b) => {
    return Date.parse(storage(b).openedDate)
      - Date.parse(storage(a).openedDate);
  });

  return `
    <div class="dashboard__list-header">
      <span>Название</span>
      <span>Дата последнего открытия</span>
    </div>
    <ul class="dashboard__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
};
