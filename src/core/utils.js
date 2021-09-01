/**
 * Делает первую букву строки заглавной
 *
 * @param {string} string строка
 * @return {string} таже строка но с заглавной первой буквой
 * @example
 * capitalize('hello'); // 'Hello'
 */
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Возвращает массив чисел в диапазон между start и end включяя эти значения. Порядок параметров не важен.
 *
 * @param {Number} start начало диапазона
 * @param {Number} end конец диапазона
 * @return {Number[]} массив чисел от start до end включительно
 * @example
 * range(1, 3); // [1, 2, 3]
 * range(3, 1); // [1, 2, 3]
 */
export function range(start, end) {
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new Error(
      `Arguments should by Number. [${start}] type is ${typeof start}, [${end}] type is ${typeof end}`,
    );
  }

  if (end < start) {
    [start, end] = [end, start];
  }

  return Array(end - start + 1)
    .fill('')
    .map((_, idx) => start + idx);
}

export function storage(key, data = null) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
