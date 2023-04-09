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
