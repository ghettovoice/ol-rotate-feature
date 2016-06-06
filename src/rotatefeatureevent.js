// @flow
import olEvent from './event';

/**
 * @enum {string}
 */
export const RotateFeatureEventType = {
    /**
     * Triggered upon feature draw start
     * @event RotateFeatureEvent#rotatefeaturestart
     */
    START: 'rotatefeaturestart',
    /**
     * Triggered upon feature draw start
     * @event RotateFeatureEvent#rotatefeatureend
     */
    END: 'rotatefeatureend'
};

/**
 * Events emitted by RotateFeatureInteraction instances are instances of this type.
 *
 * @class
 * @extends {olEvent|ol.events.Event}
 * @author Vladimir Vershinin
 */
export default class RotateFeatureEvent extends olEvent {
    /**
     * @param {RotateFeatureEventType} type Type.
     * @param {ol.Feature} feature The feature drawn.
     */
    constructor(type, feature) {
        super(type);

        /**
         * The feature being drawn.
         * @type {ol.Feature}
         */
        this.feature = feature;
    }
}
