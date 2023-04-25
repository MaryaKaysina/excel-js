import { ExcelComponent } from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  /**
   * Getter template this Component
   * @return {string} format state.
   */
  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  /**
   * Initial state
   * @param {object} [initialState={}]
   */
  initState(initialState = {}) {
    this.state = { ...initialState };
  }

  /**
   * Setter state
   * @param {object} newState
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.$root.html(this.template);
  }
}
