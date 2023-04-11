/**
 * Class Dom.
 * @param {string|HTMLElement} selector selector as string or DOM node.
 */
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  /**
   * Get/set innerHTML Element's.
   * @param {string} html
   * @return {HTMLElement} this element.
   */
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  /**
   * Clear innerHTML Element's.
   * @return {HTMLElement} this element.
   */
  clear() {
    this.html('');
    return this;
  }

  /**
   * Add event listener for Element.
   * @param {string} eventType name type of Event
   * @param {function} callback
   * @return {HTMLElement} this element.
   */
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
    return this;
  }

  /**
   * Remove event listener for Element.
   * @param {string} eventType name type of Event
   * @param {function} callback
   * @return {HTMLElement} this element.
   */
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
    return this;
  }

  /**
   * Append HTML-Element's.
   * @param {HTMLElement} node
   * @return {HTMLElement} this element.
   */
  append(node) {
    if (node instanceof Dom) node = node.$el;

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  /**
   * Find element.
   * @param {string} selector
   * @return {HTMLElement} this element.
   */
  closest(selector) {
    return $(this.$el.closest(selector));
  }

  /**
   * Get element's coordinates.
   * @return {object} with element's coordinates.
   */
  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  /**
   * Getter element's data-attributes.
   * @return {object} dataset.
   */
  get data() {
    return this.$el.dataset;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => this.$el.style[key] = styles[key]);
  }

  addClass(classList) {
    this.$el.classList.add(classList);
  }

  removeClass(classList) {
    this.$el.classList.remove(classList);
  }
}

export const $ = (selector) => {
  return new Dom(selector);
};

/**
 * Returning HTMLElement.
 * @param {string} tagName tag creating Element.
 * @param {string} classes classes list creating Element.
 * @return {HTMLElement} HTMLElement with classes.
 */
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) el.classList.add(classes);
  return $(el);
};
