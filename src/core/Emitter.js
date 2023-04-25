export class Emitter {
  constructor() {
    this.listeners = {};
  }

  /**
   * Add emit for listeners.
   * @param {string} eventName name type of Event
   * @param {*} args arguments for callback function
   * @return {boolean} this element.
   */
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) return false;

    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });

    return true;
  }

  /**
   * Add subscribe for listener.
   * @param {string} eventName name type of Event
   * @param {function} fn callback function
   * @return {function} remove subscribe for this listener
   */
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return () => {
      this.listeners[eventName] = this.listeners[eventName]
          .filter((listener) => listener !== fn);
    };
  }
}
