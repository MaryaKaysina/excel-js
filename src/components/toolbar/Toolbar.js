import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';
import { DEFAULT_STYLES } from '@/consts';

export class Toolbar extends ExcelStateComponent {
  static tagName = 'section';
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(DEFAULT_STYLES);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}
