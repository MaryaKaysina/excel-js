import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '@/redux/actions';
import { DEFAULT_TITLE } from '@/consts';
import { debounce } from '@core/utils';

export class Header extends ExcelComponent {
  static tagName = 'header';
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 500);
  }

  toHTML() {
    const title = this.store.getState().currentTitle || DEFAULT_TITLE;

    return `
      <label>
        <input type="text" class="input" value="${title}">
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

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
