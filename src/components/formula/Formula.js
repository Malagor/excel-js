import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  /**
   * @constructor
   * @param {Dom} $root
   */
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  /**
   * Возвращает html шаблон компонента
   * @return {string}
   */
  toHTML() {
    return `
     <div class="info">fx</div>
     <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  /**
   * Обработчик события "input"
   * @param {event} event
   */
  onInput(event) {
    console.log(this.$root);
    console.log('Formula: onInput', event.target.textContent.trim());
  }

  /**
   * Обработчик события "click"
   * @param {event} event
   */
  onClick(event) {
    console.log('Formula: onClick', event);
  }
}
