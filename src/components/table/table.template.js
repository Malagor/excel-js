import {
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_STYLES,
} from '@/constants';
import { camelCaseToKebabCase } from '@core/utils';
import { parse } from '@core/parse';

const CHAR_CODES = {
  A: 'A'.charCodeAt(0),
  Z: 'Z'.charCodeAt(0),
};

function getWidth(colState, idx) {
  return colState[idx] ? `${colState[idx]}px` : `${DEFAULT_COLUMN_WIDTH}px`;
}

function getHeight(rowState, idx) {
  return rowState[idx] ? `${rowState[idx]}px` : `${DEFAULT_ROW_HEIGHT}px`;
}

function toInlineStyles(styleState, id) {
  let styles = { ...DEFAULT_STYLES };

  if (styleState[id]) {
    styles = Object.assign(styles, styleState[id]);
  }

  return Object.keys(styles)
    .map((key) => {
      const dash = camelCaseToKebabCase(key);
      return `${[dash]}:${styles[key]}`;
    })
    .join(';');
}

function toCell(row, state) {
  const { dataState, styleState } = state;
  return (data, col) => {
    const id = `${row}:${col}`;
    const styles = toInlineStyles(styleState, id);
    return `
    <div class="cell" 
    contenteditable
    style="${styles}; width: ${data.width}"
    data-col=${col}
    data-id=${id}
    data-value=${dataState[id] || ''}
    >${parse(dataState[id] || '')}</div>
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
  return String.fromCharCode(CHAR_CODES.A + idx);
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
  const { rowState, colState } = state;
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
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
      .map(toCell(row, state))
      .join('');

    rows.push(createRow(row + 1, cells, rowState));
  }

  return rows.join('');
}
