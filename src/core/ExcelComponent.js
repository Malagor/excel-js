import { DomListener } from '@core/DomListener';

/**
 * Options of ExcelComponent.
 * @typedef {Object} ComponentOptions
 * @property {string} name - Имя компонента
 * @property {store}
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
    this.store = options.store;
    this.subscribe = options.subscribe || [];

    this.emitter = options.emitter;
    this.unsubscribers = [];

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

  $emit(event, ...data) {
    this.emitter.emit(event, ...data);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Сюда приходят только изменения по тем полям, на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
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
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
