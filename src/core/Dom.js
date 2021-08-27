class Dom {
  /**
   * @constructor
   * @param {string | HTMLElement} selector
   */
  constructor(selector) {
    this.element =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  /**
   * Устанавливает внутреннее содержимое элемента
   * @param {string} html
   * @return {string | Dom} - элемент Dom или outerHTML
   */
  html(html = '') {
    if (typeof html === 'string') {
      this.element.innerHTML = html;
      return this;
    }

    return this.element.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  /**
   * Добавляет дочерний элемент
   * @param {Dom | HTMLElement} node
   * @return {Dom}
   */
  append(node) {
    if (node instanceof Dom) {
      node = node.element;
    }

    if (Element.prototype.append) {
      this.element.append(node);
    } else {
      this.element.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.element.closest(selector));
  }

  getCoords() {
    return this.element.getBoundingClientRect();
  }

  get data() {
    return this.element.dataset;
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  id(parse = true) {
    if (parse) {
      const parsed = this.element.dataset.id.split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.element.focus();
  }

  find(selector) {
    return $(this.element.querySelector(selector));
  }

  findAll(selector) {
    return [...this.element.querySelectorAll(selector)].map((el) => $(el));
  }

  css(styles = {}) {
    Object.keys(styles).forEach(
      (prop) => (this.element.style[prop] = styles[prop]),
    );
  }

  /**
   * Добавляет слушатель на событие переданное в качестве аргумента
   * @param {string} eventType - тип события
   * @param {function} callback - функция обработчик
   * @return {Dom}
   */
  on(eventType, callback) {
    this.element.addEventListener(eventType, callback);
    return this;
  }

  /**
   * Удаляет обработчик события
   * @param {string} eventType - тип события
   * @param {function} callback - функия обработчик
   * @return {Dom}
   */
  off(eventType, callback) {
    this.element.removeDOMListener(eventType, callback);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

/**
 * Создает элемент Dom
 * @param {string} tagName='div' - селектор
 * @param {string | Array<string>} classes - классы элемента в виде строки с пробелами или массива
 * @return {Dom|jQuery|HTMLElement}
 * @example
 * $.create('div', 'wrapper container');
 * $.create('h1', ['title', 'color--red']);
 */
$.create = (tagName = 'div', classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    if (typeof classes === 'string') {
      classes = classes.split(' ');
    }
    el.classList.add(...classes);
  }

  return $(el);
};
