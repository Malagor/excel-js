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

export function camelCaseToKebabCase(camelCase) {
  return camelCase.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}
function addPrevZero(num) {
  return num < 10 ? `0${num}` : num;
}

export function formatDate(num) {
  const date = new Date(num);
  const day = addPrevZero(date.getDate());
  const month = addPrevZero(date.getMonth());
  const year = date.getFullYear();
  const hh = addPrevZero(date.getHours());
  const mm = addPrevZero(date.getMinutes());
  const ss = addPrevZero(date.getSeconds());
  return `${day}.${month}.${year} - ${hh}:${mm}:${ss}`;
}
