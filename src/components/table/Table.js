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
import { parse } from '@core/parse';

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
    this.$on('formula:input', (value) => {
      console.log('formula:input', parse(value));
      this.selection.current.attr('data-value', value).text(parse(value));
      this.updateTextInStore(value);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(
        actions.changeStyle({
          ids: this.selection.selectedIds,
          style,
        }),
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  toHTML() {
    return createTable(25, this.store.getState());
  }

  updateTextInStore(text) {
    const id = this.selection.current.id();
    this.$dispatch(actions.changeText({ id, text }));
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
    }
  }

  onKeydown(event) {
    const { keyCode } = event;

    if (isSelectKey(keyCode) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $nextCell = this.$root.find(nextSelectedCellId(keyCode, id));

      this.selectCell($nextCell);
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
