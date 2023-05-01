import { Page } from '@core/Page';
import { $ } from '@core/dom';
import sheets from './../assets/images/sheets.png';
import { createRecordsTable } from '@/components/dashboard/dashboard.function';

export class DashboardPage extends Page {
  getRoot() {
    const newId = Date.now().toString();
    return $.create('div', 'dashboard').html(
        `<div class="dashboard__header">
          <h1 class="dashboard__title">
            <img class="dashboard__img" src="${sheets}" alt="sheets">
            Excel
          </h1>
          <h2 class="dashboard__subtitle">Панель управления</h2>
        </div>
        <div class="dashboard__new">
          <div class="dashboard__container">
            <a href="#excel/${newId}" class="dashboard__create">
              <span class="material-icons">add</span>
            </a>
          </div>
        </div>
        <div class="dashboard__table">
          <div class="dashboard__container">
            ${createRecordsTable()}
          </div>
        </div>
      `
    );
  }
}
