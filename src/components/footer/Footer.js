import { ExcelComponent } from '@core/ExcelComponent';

export class Footer extends ExcelComponent {
  static tagName = 'footer';
  static className = 'excel__footer';

  /**
   * Returning template component.
   * @return {HTMLElement} The x value.
   */
  toHTML() {
    return `
      <div class="buttons-group">
        <button class="button">
          Лист 1
        </button>
        <button class="button">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  }
}
