/**
 *
 * @param {String} str
 * @return {String | Number}
 */
export function parse(str = '') {
  if (str.startsWith('=')) {
    try {
      return eval(str.slice(1));
    } catch (e) {
      return str;
    }
  }
  return str;
}
