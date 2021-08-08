const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function toColumn(content) {
  return `
    <div class="column" data-type="resizable">
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

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
