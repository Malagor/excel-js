import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resizer';
import { $ } from '@core/Dom';
import {
  findCellsForSelect,
  isCell,
  isSelectKey,
  nextSelectedCellId,
  shouldResize,
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import * as actions from '@/redux/actionCreators';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    this.$dispatch({ type: 'TEST' });
  }

  toHTML() {
    const { rowState, colState } = this.store.getState();
    return createTable(25, rowState, colState);
  }

  async resizeTable(event) {
    try {
      const payload = await resizeHandler(event, this.$root);
      this.$dispatch(actions.tableResize(payload));
    } catch (e) {
      console.warn('Не удалось изменить размер ячеек', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $el = $(event.target);

      if (event.shiftKey) {
        const $cells = findCellsForSelect(
          this.selection.current,
          $el,
          this.$root,
        );

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($el);
      }
      this.$emit('table:click', $el);
    }
  }

  onKeydown(event) {
    const { keyCode } = event;

    if (isSelectKey(keyCode) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id();
      const $nextCell = this.$root.find(nextSelectedCellId(keyCode, id));

      this.selectCell($nextCell);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
