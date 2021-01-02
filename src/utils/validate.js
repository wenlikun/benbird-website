

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  let reg = /^[a-zA-Z0-9_-]{4,16}$/;
  return reg.test(str)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
