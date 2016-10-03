// @flow
/**
 * @enum {string}
 */
export const RotateFeatureEventType = {
    /**
     * Triggered upon feature rotate start.
     * @event RotateFeatureEvent#rotatestart
     */
    START: 'rotatestart',
    /**
     * Triggered upon feature rotation.
     * @event RotateFeatureEvent#rotating
     */
    ROTATING: 'rotating',
    /**
     * Triggered upon feature rotation end.
     * @event RotateFeatureEvent#rotateend
     */
    END: 'rotateend'
};

/**
 * Events emitted by RotateFeatureInteraction instances are instances of this type.
 *
 * @class
 * @author Vladimir Vershinin
 */
export class RotateFeatureEvent {
    /**
     * @param {RotateFeatureEventType} type Type.
     * @param {ol.Collection<ol.Feature>} features Rotated features.
     * @param {number} angle Angle in radians.
     * @param {ol.Coordinate} anchor Anchor position.
     */
    constructor(type, features, angle, anchor) {
        /**
         * @type {boolean}
         */
        this.propagationStopped = undefined;

        /**
         * The event type.
         * @type {RotateFeatureEventType}
         */
        this.type = type;

        /**
         * The features being rotated.
         * @type {ol.Collection<ol.Feature>}
         */
        this.features = features;
        /**
         * Current angle in radians.
         * @type {number}
         */
        this.angle = angle;
        /**
         * Current rotation anchor.
         * @type {number[] | ol.Coordinate}
         */
        this.anchor = anchor;
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
