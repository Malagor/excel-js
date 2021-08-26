import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resizer';
import { $ } from '@core/Dom';
import { isCell, shouldResize } from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { findCellsForSelect } from '@/components/table/table.findCellForSelect';

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
        const cellsArray = findCellsForSelect(
          this.selection.group[0],
          $el,
          this.$root,
        );
        this.selection.selectGroup(cellsArray);
      } else {
        this.selection.select($el);
      }
    }
  }
}
