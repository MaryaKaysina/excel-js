import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static tagName = 'section';
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

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
      <div id="formula" class="input" contenteditable spellcheck="false">
      </div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.data.value);
    });
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
