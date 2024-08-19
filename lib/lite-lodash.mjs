/**
 *
 * @param {string} str
 * @return {string}
 */
export function toCamelCase(str) {
  return str.replace(/\s(\w)/, (p, m1) => {
    return m1.toUpperCase();
  });
}
