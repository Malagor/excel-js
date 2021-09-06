export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
  }

  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(TableSelection.className);
  }

  selectGroup($cellsArray = []) {
    this.clear();
    this.group = [...$cellsArray];
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }

  get selectedIds() {
    return this.group.map(($cell) => $cell.id());
  }

  clear() {
    this.group.forEach((el) => {
      el.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  applyStyle(style) {
    this.group.forEach(($cell) => {
      $cell.css(style);
    });
  }
}
