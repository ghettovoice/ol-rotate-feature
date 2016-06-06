/**
 * Polyfill of OpenLayers 3 new Event system.
 * Use it for old versions.
 */
// @flow
/**
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * @see {@link https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface}
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link ol.events.EventTarget}.
 *
 * @constructor
 * @implements {oli.events.Event}
 * @param {string} type Type.
 * @param {Object=} opt_target Target.
 */
class olEvent {
    constructor(type, opt_target) {
        /**
         * @type {boolean}
         */
        this.propagationStopped = undefined;

        /**
         * The event type.
         * @type {string}
         */
        this.type = type;

        /**
         * The event target.
         * @type {Object}
         */
        this.target = opt_target || null;
    }

    /**
     * Stop event propagation.
     * @function
     */
    preventDefault() {
        this.propagationStopped = true;
    }

    /**
     * Stop event propagation.
     * @function
     */
    stopPropagation() {
        this.propagationStopped = true;
    }
}

/**
 * @param {Event|ol.events.Event} evt Event
 */
olEvent.stopPropagation = function (evt) {
    evt.stopPropagation();
};


/**
 * @param {Event|ol.events.Event} evt Event
 */
olEvent.preventDefault = function (evt) {
    evt.preventDefault();
};

export default olEvent;
