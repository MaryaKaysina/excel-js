import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static tagName = 'section';
  static className = 'excel__table';

  /**
   * Returning template component.
   * @return {HTMLElement} The x value.
   */
  toHTML() {
    return createTable(20);
  }
}
