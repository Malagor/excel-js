import { range } from '@core/utils';

const KEY = {
  TAB: 9,
  ENTER: 13,
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
};

/**
 * Проверяет, есть ли у таргета возможность ресайза
 * @param {MouseEvent} event
 * @return {boolean} возвращает true если у таргета есть датасет "resize"
 */
export function shouldResize(event) {
  return !!event.target.dataset.resize;
}

/**
 * Проверяет произошло ли событие мыши над ячейков таблички
 *
 * @param {MouseEvent} event
 * @return {boolean} вернет true если событие произошло над ячейкой таблицы
 */
export function isCell(event) {
  return !!event.target.dataset.id;
}

/**
 * Возвращает массив ячеек которые нужно выделить
 *
 * @param {Dom} $startCell ячейка начала выделенного диапазона - текущая
 * @param {Dom} $endCell ячейка конца выделенного диапазона - по которой клинула
 * @param {Dom} $root элемент таблицы
 * @return {Array<Dom>} возвращает массив ячеек которые попади в выделяемый диапазон
 */
export function findCellsForSelect($startCell, $endCell, $root) {
  const prev = $startCell.id();
  const next = $endCell.id();

  const rows = range(prev.row, next.row);
  const cols = range(prev.col, next.col);

  const idx = rows.reduce((acc, row) => {
    return cols.reduce((innerAcc, col) => {
      innerAcc.push(`${row}:${col}`);
      return innerAcc;
    }, acc);
  }, []);

  return idx.map((id) => $root.find([`[data-id="${id}"]`]));
}

export function isSelectKey(keyCode) {
  return Object.values(KEY).includes(keyCode);
}

/**
 * Обрабатывает выделение ячейки с помощью клавиатуры
 *
 * @param {Number} keyCode
 * @param {TableSelection} selection
 * @param {Dom} $root
 */
export function selectByKeys(keyCode, selection, $root) {
  const $current = selection.current;
  let { row, col } = $current.id();
  let nextCell;
  let id;

  switch (keyCode) {
    case KEY.TAB:
    case KEY.RIGHT:
      id = `${row}:${col + 1}`;
      nextCell = $root.find(`[data-id="${id}"]`);
      break;

    case KEY.ENTER:
    case KEY.DOWN:
      id = `${row + 1}:${col}`;
      nextCell = $root.find(`[data-id="${id}"]`);
      break;

    case KEY.UP:
      row = row - 1 < 0 ? 0 : row - 1;
      id = `${row}:${col}`;
      nextCell = $root.find(`[data-id="${id}"]`);
      break;

    case KEY.LEFT:
      col = col - 1 < 0 ? 0 : col - 1;
      id = `${row}:${col}`;
      nextCell = $root.find(`[data-id="${id}"]`);
      break;

    default:
      return;
  }

  selection.select(nextCell);
  nextCell.focus();
}
