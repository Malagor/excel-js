import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resizer';
import { $ } from '@core/Dom';
import {
  findCellsForSelect,
  isCell,
  shouldResize,
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $el = this.$root.find('[data-id="0:0"]');
    this.selection.select($el);
  }

  toHTML() {
    return createTable(25);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
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
        this.selection.select($el);
      }
    }
  }
}
