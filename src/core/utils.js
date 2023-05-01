/**
 * Format string to capitalize.
 * @param {string} string text
 * @return {string} format string or param (if not string).
 */
export const capitalize = (string) => {
  if (typeof string !== 'string') return string;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * Format event's name.
 * @param {string} eventName event's name
 * @return {string} formatting to event's name.
 */
export const getMethodName = (eventName) => {
  return `on${capitalize(eventName)}`;
};

/**
 * Creating array between two numbers.
 * @param {number} start number start array
 * @param {number} end number end array
 * @return {array} formatting to event's name.
 */
export const range = (start, end) => {
  if (start > end) [end, start] = [start, end];

  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
};

/**
 * Getter / Setter for localStorage.
 * @param {string} key localStorage
 * @param {object} data localStorage
 * @return {object | null} get data from localStorage or set localStorage.
 */
export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Compare any two params.
 * @param {*} a localStorage
 * @param {*} b localStorage
 * @return {boolean} is equal two params.
 */
export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
};

/**
 * Formatter CamelCase to DashCase in CSS styles.
 * @param {string} str CSS rule in CamelCase
 * @return {string} CSS rule in DashCase.
 */
export const camelCaseToDash = (str) => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

/**
 * Formatter object styles in CSS inline styles.
 * @param {object} [styles={}] CSS rule in CamelCase
 * @return {string} CSS rule inline.
 */
export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles)
      .map((key) => `${camelCaseToDash(key)}: ${styles[key]}`)
      .join('; ');
};

/**
 * Scheduling function to be triggered at a specific time.
 * @param {Function} fn target function
 * @param {number} wait timer in ms
 * @return {Function}
 */
export const debounce = (fn, wait) => {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Create clone object.
 * @param {object} obj target object
 * @return {object} new object
 */
export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Formatting date.
 * @param {object} date
 * @return {object} new object
 */
export const toFormatDate = (date) => {
  return new Date(date).toLocaleDateString()
    + ' '
    + new Date(date).toLocaleTimeString();
};

/**
 * Default action should not be taken as it normally would be.
 * @param {Event} event
 */
export const preventDefault = (event) => {
  event.preventDefault();
};
