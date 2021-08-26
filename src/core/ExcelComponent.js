import { DomListener } from '@core/DomListener';

/**
 * Options of ExcelComponent.
 * @typedef {Object} ComponentOptions
 * @property {string} name - Имя компонента.
 * @property {Array<ListenerType>} listeners - Массив типов отслеживаемых событий .
 */

export class ExcelComponent extends DomListener {
  /**
   * @constructor
   * @param {Dom} $root - корневой элемент
   * @param {ComponentOptions} options - опции компонента
   */
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.prepare();
  }

  prepare() {
    // before mount
  }

  /**
   * Return layout components
   * @return {string}
   */
  toHTML() {
    return '';
  }

  /**
   * Метод эизненного цикла
   * Инициализация компонента
   */
  init() {
    this.initDOMListener();
  }

  /**
   * Метод жизненного цикла
   * Уничтожение компонента
   */
  destroy() {
    this.removeDOMListener();
  }
}
