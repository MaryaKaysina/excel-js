import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static tagName = 'section';
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  /**
   * Returning template component.
   * @return {HTMLElement} The x value.
   */
  toHTML() {
    return `
      <div class="info">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable
          displaystyle="true"
          columnalign="left"
          columnspacing="0em 2em 0em"
          rowspacing="3pt">
              <mtd>
                <mi>f</mi>
                <mo stretchy="false">(</mo>
                <mi>x</mi>
                <mo stretchy="false">)</mo>
              </mtd>
          </mtable>
        </math>
      </div>
      <label>
        <input type="text" class="input" spellcheck="false">
      </label>
    `;
  }

  /**
   * Listener on event "input".
   * @param {Event} event
   */
  onInput(event) {
    console.log(this.$root);
    console.log('Formula: onInput', event.target.value.trim());
  }

  /**
   * Listener on event "click".
   * @param {Event} event
   */
  onClick(event) {
    console.log(this.$root);
  }
}
