import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.function';

export class Table extends ExcelComponent {
  static tagName = 'section';
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  /**
   * Returning template component.
   * @return {HTMLElement} The x value.
   */
  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (!shouldResize(event)) return;
    resizeHandler(this.$root, event);
  }
}
