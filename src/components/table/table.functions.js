/**
 * Проверяет, есть ли у таргета возможность ресайза
 * @param {MouseEvent} event
 * @return {boolean} возвращает true если у таргета есть датасет "resize"
 */
export function shouldResize(event) {
  return !!event.target.dataset.resize;
}

export function isCell(event) {
  return !!event.target.dataset.id;
}

export function getCellId($el) {
  return $el.data.id.split(':').map((item) => Number(item));
}
