// @flow
import ol from "openlayers";
import { assert, assertInstanceOf } from "./util";
import rotateGeometry from './rotate';

/**
 * @enum {string}
 */
const GEOMETRY_TYPE = {
    POINT: 'Point',
    MULTI_POINT: 'MultiPoint',
    LINE_STRING: 'LineString',
    MULTI_LINE_STRING: 'MultiLineString',
    POLYGON: 'Polygon',
    MULTI_POLYGON: 'MultiPolygon',
    CIRCLE: 'Circle',
    GEOMETRY_COLLECTION: 'GeometryCollection',
};
const ANCHOR_NAME = 'anchorFeature';
const GHOST_NAME = 'ghostFeature';
const BOUNDING_NAME = 'boundingFeature';

/* TODO
При добавлении первого фечера в this.features_ создаем ghost feature и circle feature для кручения
pointerdown на circle feature + pointerdrag кручение rotatestart event
pointerup фиксация реальных фечеров - rotateend event
если объект один и это точка, и есть иконка и центр в координате точки то крутим иконку!
    иначе крутим геометрию относительно координаты
МОЖЕТ СДЕЛАТЬ ВСЕ БЕЗ БОУНДИНГ ФЕЧЕРА, СОБЫТИЯ ПРЯМ НА ГОСТ ФЕЧЕРЕ
*/

/**
 * @typedef {Object} RotateFeatureInteractionOptions
 * @property {ol.Collection<ol.Feature>} features The features the interaction works on. Required.
 * @property {ol.events.ConditionType | undefined} condition A function that takes an ol.MapBrowserEvent and returns a boolean
 *                                                             to indicate whether that event will be considered to rotate ghost feature.
 *                                                             Default is ol.events.condition.primaryAction.
 * @property {ol.style.Style | Array<ol.style.Style> | ol.style.StyleFunction | undefined} style  Style of the rotation overlay.
 * @property {number | undefined} pixelTolerance Pixel tolerance for considering the pointer close enough to a segment
 *                                                or vertex for editing. Default is 10.
 */

/**
 * Rotate interaction class.
 * Adds controls to rotate vector features.
 *
 * @class
 * @extends ol.interaction.Interaction
 * @author Vladimir Vershinin
 */
export default class RotateFeatureInteraction extends ol.interaction.Pointer {
    /**
     * @param {RotateFeatureInteractionOptions} options
     */
    constructor(options : RotateFeatureInteractionOptions = {}) {
        super({
            handleEvent: RotateFeatureInteraction.handleEvent,
            handleDownEvent: handleDownEvent,
            handleUpEvent: handleUpEvent,
            handleDragEvent: handleDragEvent
        });

        /**
         * Rotated feature.
         *
         * @type {ol.Feature}
         * @private
         */
        this.ghostFeature_ = null;

        /**
         * @type {ol.Feature}
         * @private
         */
        this.anchorFeature_ = null;

        /**
         * @type {ol.Feature}
         * @private
         */
        this.boundingFeature_ = null;

        /**
         * @type {ol.FeatureOverlay}
         * @private
         */
        this.overlay_ = new ol.FeatureOverlay({
            style: typeof options.style !== 'undefined' ? options.style : RotateFeatureInteraction.getDefaultStyleFunction()
        });

        /**
         * @type {number}
         * @private
         */
        this.pixelTolerance_ = typeof options.pixelTolerance !== 'undefined' ? options.pixelTolerance : 10;

        /**
         * @type {ol.Collection.<ol.Feature>}
         * @private
         */
        this.features_ = options.features;
        assert(this.features_, 'Option features is required');

        this.createOrUpdateInteractionFeatures_();

        this.features_.on('add', this.handleFeatureAdd_, this);
        this.features_.on('remove', this.handleFeatureRemove_, this);
    }

    /**
     * @param {ol.Map} map
     */
    setMap(map) {
        this.overlay_.setMap(map);

        super.setMap(map);
    }

    /**
     * Creates or updates all interaction helper features.
     *
     * @private
     */
    createOrUpdateInteractionFeatures_() {
        this.createOrUpdateGhostFeature_(this.features_.getArray());

        const ghostExtent = this.ghostFeature_.getGeometry().getExtent();

        this.createOrUpdateAnchorFeature_(ol.extent.getCenter(ghostExtent));
//        this.createOrUpdateBoundingFeature_(ghostExtent);
    }

    /**
     * @param {ol.Coordinate} anchor
     * @private
     */
    createOrUpdateAnchorFeature_(anchor : ol.Coordinate) {
        if (this.anchorFeature_) {
            this.anchorFeature_.getGeometry().setCoordinates(anchor);
        } else {
            this.anchorFeature_ = new ol.Feature({
                geometry: new ol.geom.Point(anchor),
                [ANCHOR_NAME]: true
            });

            this.overlay_.addFeature(this.anchorFeature_);
        }
    }

    /**
     * @param {ol.Feature[]} features
     * @private
     */
    createOrUpdateGhostFeature_(features : Array<ol.Feature>) {
        const geometries = features.map(feature => feature.getGeometry().clone());

        if (this.ghostFeature_) {
            this.ghostFeature_.getGeometry().setGeometries(geometries);
        } else {
            this.ghostFeature_ = new ol.Feature({
                geometry: new ol.geom.GeometryCollection(geometries),
                [GHOST_NAME]: true
            });

            this.overlay_.addFeature(this.ghostFeature_);
        }
    }

    /**
     * @param {ol.Extent} extent
     * @private
     */
    createOrUpdateBoundingFeature_(extent : ol.Extent) {
        const coordinates = [
            [extent[0], extent[1]],
            [extent[0], extent[3]],
            [extent[2], extent[3]],
            [extent[2], extent[1]]
        ];

        if (this.boundingFeature_) {
            this.boundingFeature_.getGeometry().setCoordinates(coordinates);
        } else {
            this.boundingFeature_ = new ol.Feature({
                geometry: new ol.geom.MultiPoint(coordinates),
                [BOUNDING_NAME]: true
            });

            this.overlay_.addFeature(this.boundingFeature_);
        }
    }

    /**
     * @param {ol.Feature} element
     * @private
     */
    handleFeatureAdd_({ element }) {
        assertInstanceOf(element, ol.Feature);

        this.createOrUpdateGhostFeature_(this.features_);
    }

    /**
     * @param {ol.Feature} element
     * @private
     */
    handleFeatureRemove_({ element }) {
        assertInstanceOf(element, ol.Feature);

        this.createOrUpdateGhostFeature_(this.features_);
    }
}

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {RotateFeatureInteraction}
 */
RotateFeatureInteraction.handleEvent = function (evt : ol.MapBrowserEvent) : boolean {
    return ol.interaction.Pointer.handleEvent.call(this, evt);
};

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDownEvent(evt : ol.MapBrowserEvent) : boolean {
    console.log('down');
    if (this.ghostFeature_) {

    }

    return true;
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleUpEvent(evt : ol.MapBrowserEvent) : boolean {
    console.log('up');
    return false;
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDragEvent(evt : ol.MapBrowserEvent) : boolean {
    console.log('drag');
}

/**
 * Creates default style function for interaction.
 *
 * @returns {ol.style.StyleFunction}
 */
RotateFeatureInteraction.getDefaultStyleFunction = function () : ol.style.StyleFunction {
    const styles = getDefaultStyles();

    return function (feature) {
        switch (true) {
            case feature.get(ANCHOR_NAME) && (ANCHOR_NAME in styles):
                return styles[ANCHOR_NAME];
            case feature.get(GHOST_NAME) && (GHOST_NAME in styles):
                return styles[GHOST_NAME];
            case feature.get(BOUNDING_NAME) && (BOUNDING_NAME in styles):
                return styles[BOUNDING_NAME];
            default:
                return styles[feature.getGeometry().getType()];
        }
    };
};

/**
 * @returns {Object.<string, Array.<ol.style.Style>>}
 */
function getDefaultStyles() : Object<string, Array<ol.style.Style>> {
    /** @type {Object<string, Array<ol.style.Style>>} */
    const styles = Object.create(null);
    const white = [255, 255, 255, 1];
    const blue = [0, 153, 255, 1];
    const width = 3;

    styles[GEOMETRY_TYPE.POLYGON] = styles[GEOMETRY_TYPE.MULTI_POLYGON] = [
        new ol.style.Style({
            fill: new ol.style.Fill({
                color: [255, 255, 255, 0.5]
            })
        }),
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: white,
                width: width + 2
            })
        }),
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: blue,
                width: width
            })
        })
    ];

    styles[GEOMETRY_TYPE.LINE_STRING] = styles[GEOMETRY_TYPE.MULTI_LINE_STRING] = [
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: white,
                width: width + 2
            })
        }),
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: blue,
                width: width
            })
        })
    ];

    styles[GEOMETRY_TYPE.CIRCLE] = styles[GEOMETRY_TYPE.POLYGON].concat(styles[GEOMETRY_TYPE.LINE_STRING]);

    styles[GEOMETRY_TYPE.POINT] = styles[GEOMETRY_TYPE.MULTI_POINT] = [
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: width * 2,
                fill: new ol.style.Fill({
                    color: blue
                }),
                stroke: new ol.style.Stroke({
                    color: white,
                    width: width / 2
                })
            }),
            zIndex: Infinity
        })
    ];

    styles[GEOMETRY_TYPE.GEOMETRY_COLLECTION] = styles[GEOMETRY_TYPE.POLYGON].concat(styles[GEOMETRY_TYPE.POINT]);

    styles[ANCHOR_NAME] = [
        new ol.style.Style({
            image: new ol.style.RegularShape({
                fill: new ol.style.Fill({
                    color: white
                }),
                stroke: new ol.style.Stroke({
                    color: white,
                    width: width + 2
                }),
                points: 4,
                radius: 6,
                radius2: 0,
                angle: 0
            })
        }),
        new ol.style.Style({
            image: new ol.style.RegularShape({
                fill: new ol.style.Fill({
                    color: white
                }),
                stroke: new ol.style.Stroke({
                    color: blue,
                    width: width
                }),
                points: 4,
                radius: 6,
                radius2: 0,
                angle: 0
            })
        })
    ];

    return styles;
}
