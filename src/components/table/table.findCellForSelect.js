import { getCellId } from '@/components/table/table.functions';

export function findCellsForSelect($startCell, $endCell, $root) {
  const cellsArray = [];
  const [prevRow, prevCol] = getCellId($startCell);
  const [nextRow, nextCol] = getCellId($endCell);

  const start = {
    row: Math.min(prevRow, nextRow),
    col: Math.min(prevCol, nextCol),
  };
  const end = {
    row: Math.max(prevRow, nextRow),
    col: Math.max(prevCol, nextCol),
  };

  cellsArray.push($startCell);
  for (let row = start.row; row <= end.row; row += 1) {
    for (let col = start.col; col <= end.col; col += 1) {
      const cell = $root.find(`[data-id="${row}:${col}"]`);
      cellsArray.push(cell);
    }
  }

  return cellsArray;
}
