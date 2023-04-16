import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static tagName = 'header';
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  /**
   * Returning template component.
   * @return {HTMLElement} The x value.
   */
  toHTML() {
    return `
      <label>
        <input type="text" class="input" value="Новая таблица">
      </label>
      <div class="buttons-group">
        <button class="button">
          <span class="material-icons">delete_forever</span>
        </button>
        <button class="button">
          <span class="material-icons">exit_to_app</span>
        </button>
      </div>
    `;
  }
}
