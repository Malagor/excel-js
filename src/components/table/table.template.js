import { DEFAULT_COLUMN_WIDTH, DEFAULT_ROW_HEIGHT } from '@/constants';

const CODES = {
  A: 65,
  Z: 90,
};

function getWidth(colState, idx) {
  return colState[idx] ? `${colState[idx]}px` : `${DEFAULT_COLUMN_WIDTH}px`;
}

function getHeight(rowState, idx) {
  return rowState[idx] ? `${rowState[idx]}px` : `${DEFAULT_ROW_HEIGHT}px`;
}

function toCell(row, state) {
  return (data, col) => {
    const id = `${row}:${col}`;

    return `
    <div class="cell" 
    contenteditable 
    style="width: ${data.width}"
    data-col=${col}
    data-id=${id}    
    >${state[id] || ''}</div>
  `;
  };
}

function toColumn({ data, index, width }) {
  return `
    <div class="column" data-type="resizable" data-col=${index} style="width: ${width}">
      ${data}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(info, content, rowState = {}) {
  const resize = info ? '<div class="row-resize" data-resize="row"></div>' : '';

  const rowHeight = getHeight(rowState, info - 1);

  return `
    <div class="row" 
        data-type="resizable"
        data-row=${info - 1}
        style="height: ${rowHeight}">
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

function withWidthFrom(dataState) {
  return (data, index) => {
    return {
      data,
      index,
      width: getWidth(dataState, index),
    };
  };
}

/**
 * Создает таблицу указанного размера
 * @param {number} rowsCount - количество строк таблицы
 * @param {State} state данные о высотах строк
 * @return {string}
 */
export function createTable(rowsCount, state) {
  const { rowState, colState, dataState } = state;
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(colState))
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(withWidthFrom(colState))
      .map(toCell(row, dataState))
      .join('');

    rows.push(createRow(row + 1, cells, rowState));
  }

  return rows.join('');
}
