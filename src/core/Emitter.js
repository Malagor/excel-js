export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей
  /**
   * Уведомляет слушателей о событии вызывая колбек с переданными аргументами
   *
   * @param {string} eventName Наименование события
   * @param {object} args Data
   * @return {boolean} Вернет true если все в порядке, иначе false
   */
  emit(eventName, ...args) {
    const listeners = this.listeners[eventName];
    if (listeners && Array.isArray(listeners)) {
      listeners.forEach((listener) => listener(...args));
      return true;
    }
    return false;
  }

  // on, listener
  // Подписываемся на уведомления
  // Добавляем нового слушателя
  /**
   * Подписываемся на событие и передаем колбек для отработки
   *
   * @param {String} eventName Event name for subscribing
   * @param {function} fn Callback
   * @return {function} возвращает функцию с помощью которой можно отписаться от события
   */
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);

    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn,
      );
    };
  }
}
