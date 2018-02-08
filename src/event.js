/**
 * This file is part of ol-rotate-feature package.
 * @module ol-rotate-feature
 * @license MIT
 * @author Vladimir Vershinin
 */
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
}

/**
 * Events emitted by RotateFeatureInteraction instances are instances of this type.
 *
 * @class
 * @author Vladimir Vershinin
 */
export default class RotateFeatureEvent {
  /**
   * @param {string} type Type.
   * @param {ol.Collection<ol.Feature>} features Rotated features.
   * @param {number} angle Angle in radians.
   * @param {ol.Coordinate} anchor Anchor position.
   */
  constructor (type, features, angle, anchor) {
    /**
     * @type {boolean}
     * @private
     */
    this.propagationStopped_ = false

    /**
     * The event type.
     * @type {string}
     * @private
     */
    this.type_ = type

    /**
     * The features being rotated.
     * @type {ol.Collection<ol.Feature>}
     * @private
     */
    this.features_ = features
    /**
     * Current angle in radians.
     * @type {number}
     * @private
     */
    this.angle_ = angle
    /**
     * Current rotation anchor.
     * @type {ol.Coordinate}
     * @private
     */
    this.anchor_ = anchor
  }

  /**
   * @type {boolean}
   */
  get propagationStopped () {
    return this.propagationStopped_
  }

  /**
   * @type {RotateFeatureEventType}
   */
  get type () {
    return this.type_
  }

  /**
   * @type {ol.Collection<ol.Feature>}
   */
  get features () {
    return this.features_
  }

  /**
   * @type {number}
   */
  get angle () {
    return this.angle_
  }

  /**
   * @type {ol.Coordinate}
   */
  get anchor () {
    return this.anchor_
  }

  /**
   * Prevent event propagation.
   */
  preventDefault () {
    this.propagationStopped_ = true
  }

  /**
   * Stop event propagation.
   */
  stopPropagation () {
    this.propagationStopped_ = true
  }
}
