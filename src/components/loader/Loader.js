import { $ } from '../../core/dom';

export class Loader {
  toHtml() {
    return $.create('div', 'loader').html(`
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      `);
  }
}
