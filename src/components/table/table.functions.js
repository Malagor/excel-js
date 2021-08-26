/**
 * Проверяет, есть ли у таргета возможность ресайза
 * @param {MouseEvent} event
 * @return {boolean} возвращает true если у таргета есть датасет "resize"
 */
export function shouldResize(event) {
  return !!event.target.dataset.resize;
}
