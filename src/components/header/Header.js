import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '@/redux/actions';
import { DEFAULT_TITLE, KEY_FOR_LOCAL } from '@/consts';
import { debounce } from '@core/utils';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static tagName = 'header';
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
        <button class="button" data-button="remove">
          <span class="material-icons" data-button="remove">
            delete_forever
          </span>
        </button>
        <button class="button" data-button="exit">
          <span class="material-icons" data-button="exit">
            exit_to_app
          </span>
        </button>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?');

      if (decision) {
        localStorage.removeItem(`${KEY_FOR_LOCAL}:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
