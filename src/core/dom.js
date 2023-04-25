import { DEFAULT_STYLES } from '@/consts';

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

  /**
   * Find element.
   * @param {string} selector
   * @return {HTMLElement} this element
   */
  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  /**
   * Find all elements.
   * @param {string} selector
   * @return {HTMLElement} this elements
   */
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  /**
   * Add CSS styles to element.
   * @param {object} styles default {}
   */
  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => this.$el.style[key] = styles[key]);
  }

  /**
   * Get CSS styles element.
   * @param {array} styles list of styles to get
   * @return {object} current styles
   */
  getStyles(styles) {
    return styles.reduce((result, style) => {
      result[style] = this.$el.style[style] || DEFAULT_STYLES[style];
      return result;
    }, {});
  }

  /**
   * Add CSS class to element.
   * @param {string} className
   * @return {HTMLElement} this elements
   */
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  /**
   * Remove CSS class to element.
   * @param {string} className
   * @return {HTMLElement} this elements
   */
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  /**
   * Add focus state to element.
   * @return {HTMLElement} this elements
   */
  focus() {
    this.$el.focus();
    return this;
  }

  /**
   * Get element's ID.
   * @param {boolean} isParse default false
   * @return {object | string} object with row's number and column's number
   * or string data attribute data-id
   */
  getId(isParse = false) {
    if (isParse) {
      const parsed = this.getId().split(':');
      return { row: +parsed[0], col: +parsed[1] };
    }
    return this.data.id;
  }

  /**
   * Replace text for element.
   * @param {string} text
   * @return {HTMLElement | string} this element or element's text
   */
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  /**
   * Getter/Setter element's attribute.
   * @param {string} name attribute
   * @param {string} value attribute
   * @return {HTMLElement} this element
   */
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
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
