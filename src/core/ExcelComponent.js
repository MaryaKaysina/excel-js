import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  /**
   * Component's settings before init
   */
  prepare() {
  }

  /**
   * Returning template component.
   * @return {HTMLElement} The x value.
   */
  toHTML() {
    return '';
  }

  /**
   * Emit listeners about an event eventName
   * @param {string} eventName name event.
   * @param {void} ...args callback function's arguments.
   */
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  /**
   * Subscribe an event eventName
   * @param {string} eventName name event.
   * @param {void} fn callback function.
   */
  $subscribe(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }

  /**
   * Init component & add DOM listeners
   */
  init() {
    this.initDOMListeners();
  }

  /**
   * Remove component & remove DOM listeners
   */
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
