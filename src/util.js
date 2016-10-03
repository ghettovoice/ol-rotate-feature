// @flow
/**
 * @param {boolean} condition
 * @param {string} message
 * @throws Error
 */
export function assert(condition:boolean, message = '') {
    message = ['Assertion failed', message].join(': ');

    if (!condition) {
        throw new Error(message);
    }
}

/**
 * Checks if the value is an instance of the user-defined type.
 *
 * @param {*} value
 * @param {*} type
 * @throws Error
 */
export function assertInstanceOf(value, type) {
    assert(value instanceof type, `Expected instanceof ${getValueType(type)} but got ${getValueType(value)}.`);
}

/**
 * Null function. Do nothing.
 */
export function noop() {}

/**
 * @param {*} arg
 * @returns {*}
 */
export function identity(arg) {
    return arg;
}

/**
 * Returns the type of a value. If a constructor is passed, and a suitable
 * string cannot be found, 'unknown type name' will be returned.
 *
 * @param {*} value
 * @returns string
 */
export function getValueType(value) : string {
    if (value instanceof Function) {
        return value.name || 'unknown type name';
    } else if (value instanceof Object) {
        return value.constructor.name || Object.prototype.toString.call(value);
    } else {
        return value === null ? 'null' : typeof value;
    }
}

/**
 * @param {...*} values
 * @return {*}
 */
export function coalesce(...values) {
    return values.find(value => value != null);
}
