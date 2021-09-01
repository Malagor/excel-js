import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  /**
   * @constructor
   * @param {Dom} $root
   * @param {Object} options объект опций
   */
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('table:select', this.changeFormula(this.$formula));

    this.$subscribe((state) => {
      this.$formula.text(state.currentText);
    });
  }

  changeFormula = ($formula) => {
    return ($cell) => {
      $formula.text($cell.text());
    };
  };

  /**
   * Возвращает html шаблон компонента
   * @return {string}
   */
  toHTML() {
    return `
     <div class="info">fx</div>
     <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  /**
   * Обработчик события "input"
   * @param {event} event
   */
  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    const { key } = event;
    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
