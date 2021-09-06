import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@/redux/actionCreators';
import { $ } from '@core/Dom';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  init() {
    super.init();
  }

  toHTML() {
    const { titleTable } = this.store.getState();
    return `
      <input type="text" class="input" id="table-title" value="${titleTable}" />

      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
