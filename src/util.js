/**
 * This file is part of ol-rotate-feature package.
 * @module ol-rotate-feature
 * @license MIT
 * @author Vladimir Vershinin
 */

/**
 * @param {boolean} condition
 * @param {string} message
 * @throws Error
 */
export function assert (condition, message = '') {
  message = [ 'Assertion failed', message ].join(': ')

  if (!condition) {
    throw new Error(message)
  }
}

/**
 * @param {*} arg
 * @returns {*}
 */
export function identity (arg) {
  return arg
}

/**
 * @param {...*} args
 * @return {*}
 */
export function coalesce (...args) {
  return args.filter(value => value != null).shift()
}

const counters = {}
/**
 * @param {string} [prefix]
 * @return {number}
 */
export function uniqId (prefix = '') {
  const ns = prefix || 'default'
  counters[ ns ] = counters[ ns ] == null ? 0 : counters[ ns ]

  return String(prefix) + (++counters[ ns ])
}

export function includes (arr, value) {
  return arr.indexOf(value) !== -1
}

export function isArray (val) {
  return val::Object.prototype.toString() === '[object Array]'
}
