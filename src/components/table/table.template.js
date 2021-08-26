const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row) {
  return (_, col) => {
    return `
    <div class="cell" 
    contenteditable 
    data-col=${col}
    data-id=${row}:${col}
    ></div>
  `;
  };
}

function toColumn(content, idx) {
  return `
    <div class="column" data-type="resizable" data-col=${idx}>
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(info, content) {
  const resize = info ? '<div class="row-resize" data-resize="row"></div>' : '';

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${info ? info : ''}
        ${resize}
      </div>
      <div class="row-data">${content || ''}</div>
     </div>
  `;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

/**
 * Создает таблицу указанного размера
 * @param {number} rowsCount - количество строк таблицы
 * @return {string}
 */
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(row)).join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
