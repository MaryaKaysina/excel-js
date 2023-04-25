import { getMethodName } from '@core/utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DOMListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  /**
   * Add listeners to element.
   * Method must implemented in Component
   */
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = `${this.name || ''} Component`;
        throw new Error(
            `Method ${method} is not implemented in ${name}`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  /**
   * Remove listeners to element.
   */
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

