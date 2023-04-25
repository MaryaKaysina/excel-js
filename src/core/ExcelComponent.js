import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.store = options.store;

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
  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }

  /**
   * Dispatch methods in store
   * @param {object} action action type
   * @param {void} ...args callback function's arguments.
   */
  $dispatch(action) {
    this.store.dispatch(action);
  }

  /**
   * Changed attr in components
   */
  storeChanged() {
  }

  /**
   * Check key store is watching in component
   * @param {string} key in store
   * @return {boolean} this key is watching.
   */
  isWatching(key) {
    return this.subscribe.includes(key);
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
