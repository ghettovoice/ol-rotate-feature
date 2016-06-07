// @flow
import ol from 'openlayers';

/**
 * @enum {string}
 */
export const RotateFeatureEventType = {
    /**
     * Triggered upon feature draw start
     * @event RotateFeatureEvent#rotatestart
     */
    START: 'rotatefeaturestart',
    /**
     * Triggered upon feature draw start
     * @event RotateFeatureEvent#rotating
     */
    ROTATING: 'rotating',
    /**
     * Triggered upon feature draw start
     * @event RotateFeatureEvent#rotateend
     */
    END: 'rotatefeatureend'
};

/**
 * Events emitted by RotateFeatureInteraction instances are instances of this type.
 *
 * @class
 * @extends {ol.events.Event}
 * @author Vladimir Vershinin
 */
export class RotateFeatureEvent extends ol.events.Event {
    /**
     * @param {RotateFeatureEventType} type Type.
     * @param {ol.Collection<ol.Feature>} features Rotated features.
     */
    constructor(type, features) {
        super(type);

        /**
         * The feature being drawn.
         * @type {ol.Feature}
         */
        this.features = features;
    }
}
