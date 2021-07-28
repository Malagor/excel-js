import { capitalize } from '@core/utils';

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

/**
 * A number, or a string containing a number.
 * @typedef {string} ListenerType
 */

export class DomListener {
  /**
   * @constructor
   * @param {Dom} $root - корневой элемент
   * @param {Array<ListenerType>} listeners - массив типов событий для слушателей
   */
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  /**
   * Назначение случателей для компонента
   * Массив типов отслеживаеммых событий передается в качестве опций при создании компонента
   */
  initDOMListener() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(
          `Method "${method}" is not implemented in "${this.name}" Component`,
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  /**
   * Удаление слушателей компонента
   */
  removeDOMListener() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      this.$root.off(listener, this[method]);
    });
  }
}
