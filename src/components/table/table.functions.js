import { range } from '@core/utils';

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
