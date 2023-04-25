import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
  isCell,
  matrix,
  nextSelector,
  shouldResize,
} from '@/components/table/table.function';
import { TableSelection } from '@/components/table/TableSelection';
import { DEFAULT_STYLES, INIT_CELL } from '@/consts';
import * as actions from '@/redux/actions';
import { parseFormula } from '@core/parseFormula';

export class Table extends ExcelComponent {
  static tagName = 'section';
  static className = 'excel__table';
  static initCell = INIT_CELL;

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find(Table.initCell);
    this.selectCell($cell);

    this.$on('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parseFormula(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyles({
        value,
        ids: this.selection.selectorIds,
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      if (data.value <= 0) return;
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn(e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.getId(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.getId(),
      value,
    }));
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}


