// @flow
import ol from "openlayers";
import { assert, assertInstanceOf } from "./util";
import { RotateFeatureEvent, RotateFeatureEventType } from "./rotatefeatureevent";
import rotateGeometry from "./rotate";

/**
 * @typedef {Object} RotateFeatureInteractionOptions
 * @property {ol.Collection<ol.Feature>} features The features the interaction works on. Required.
 * @property {ol.events.ConditionType | undefined} condition A function that takes an ol.MapBrowserEvent and returns a boolean
 *                                                             to indicate whether that event will be considered to rotate ghost feature.
 *                                                             Default is ol.events.condition.primaryAction.
 * @property {ol.style.Style | Array<ol.style.Style> | ol.style.StyleFunction | undefined} style  Style of the rotation overlay.
 * @property {number | undefined} pixelTolerance Pixel tolerance for considering the pointer close enough to a segment
 *                                                or vertex for editing. Default is 10.
 * @property {string} rotatePropertyNane Property name of the features. Used for exporting total angle value.
 */

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
    GEOMETRY_COLLECTION: 'GeometryCollection'
};
const ANCHOR_NAME = 'anchorFeature';
const GHOST_NAME = 'ghostFeature';
const BOUNDING_NAME = 'boundingFeature';

var previousCursor,
    /**
     * Rotated feature.
     *
     * @type {ol.Feature}
     * @private
     */
    ghostFeature,
    /**
     * @type {ol.Feature}
     * @private
     */
    anchorFeature,
    /**
     * @type {ol.Feature}
     * @private
     */
    boundingFeature,
    /**
     * @type {ol.FeatureOverlay}
     * @private
     */
    overlay,
    /**
     * @type {number}
     * @private
     */
    pixelTolerance = 10,
    /**
     * @type {ol.Coordinate}
     * @private
     */
    startCoordinate,
    /**
     * @type {ol.Coordinate}
     * @private
     */
    lastCoordinate,
    /**
     * @type {ol.Collection.<ol.Feature>}
     * @private
     */
    features,
    /**
     * @type {string}
     * @private
     */
    rotatePropertyName = 'rotateAngle',
    /**
     * @type {boolean}
     * @private
     */
    anchorMoving = false;

/**
 * Rotate interaction class.
 * Adds controls to rotate vector features.
 *
 * @class
 * @extends ol.interaction.Interaction
 * @author Vladimir Vershinin
 *
 * TODO Добавить bounding feature, типа как в фотошопе
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
            handleDragEvent: handleDragEvent,
            handleMoveEvent: handleMoveEvent
        });

        overlay = new ol.FeatureOverlay({
            style: options.style || RotateFeatureInteraction.getDefaultStyleFunction()
        });
        pixelTolerance = typeof options.pixelTolerance !== 'undefined' ? options.pixelTolerance : pixelTolerance;
        rotatePropertyName = options.rotatePropertyNane || rotatePropertyName;
        features = options.features;

        assert(features, 'Option features is required');

        createOrUpdateInteractionFeatures();

        features.on('add', handleFeatureAdd, this);
        features.on('remove', handleFeatureRemove, this);
    }

    /**
     * @param {ol.Map} map
     */
    setMap(map) {
        overlay.setMap(map);
        super.setMap(map);
    }
}

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {RotateFeatureInteraction}
 * @public
 */
RotateFeatureInteraction.handleEvent = function (evt : ol.MapBrowserEvent) : boolean {
    return ol.interaction.Pointer.handleEvent.call(this, evt);
};

/**
 * Creates default style function for interaction.
 *
 * @returns {ol.style.StyleFunction}
 * @public
 */
RotateFeatureInteraction.getDefaultStyleFunction = function ():ol.style.StyleFunction {
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
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDownEvent(evt : ol.MapBrowserEvent) : boolean {
    const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, feature => feature);

    // handle click & drag on features for rotation
    if (foundFeature && !lastCoordinate && features.getArray().includes(foundFeature)) {
        lastCoordinate = evt.coordinate;
        startCoordinate = evt.coordinate;

        handleMoveEvent.call(this, evt);
        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.START, features));

        return true;
    }
    // handle click & drag on rotation anchor feature
    else if (foundFeature === anchorFeature) {
        anchorMoving = true;
        handleMoveEvent.call(this, evt);

        return true;
    }

    return false;
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleUpEvent(evt : ol.MapBrowserEvent) : boolean {
    // stop drag sequence of features
    if (lastCoordinate) {
        lastCoordinate = undefined;
        startCoordinate = undefined;

        handleMoveEvent.call(this, evt);
        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.END, features));

        return true;
    }
    // stop drag sequence of the anchors
    else if (anchorMoving) {
        anchorMoving = false;
        handleMoveEvent.call(this, evt);

        return true;
    }

    return false;
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 * todo обработка коллекции с одной точкой! крутить иконку!
 */
function handleDragEvent(evt : ol.MapBrowserEvent) : boolean {
    const newCoordinate = evt.coordinate;
    const anchorCoordinate = anchorFeature.getGeometry().getCoordinates();

    // handle drag of features by angle
    if (lastCoordinate) {
        // calculate vectors of last and current pointer positions
        const lastVector = [lastCoordinate[0] - anchorCoordinate[0], lastCoordinate[1] - anchorCoordinate[1]];
        const newVector = [newCoordinate[0] - anchorCoordinate[0], newCoordinate[1] - anchorCoordinate[1]];

        // calculate angle between last and current vectors as a clockwise angle
        let angle = Math.atan2(lastVector[0] * newVector[1] - newVector[0] * lastVector[1], lastVector[0] * newVector[0] + lastVector[1] * newVector[1]);

        features.forEach(feature => {
            rotateGeometry(feature.getGeometry(), angle, anchorCoordinate);
            feature.set(rotatePropertyName, (feature.get(rotatePropertyName) || 0) + angle);
        });

        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.ROTATING, features));

        lastCoordinate = evt.coordinate;
    }
    // handle drag of the anchor
    else if (anchorMoving) {
        let deltaX = newCoordinate[0] - anchorCoordinate[0];
        let deltaY = newCoordinate[1] - anchorCoordinate[1];

        anchorFeature.getGeometry().translate(deltaX, deltaY);
    }
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleMoveEvent(evt:ol.MapBrowserEvent):boolean {
    const elem = evt.map.getTargetElement();
    const foundFeature = map.forEachFeatureAtPixel(evt.pixel, feature => feature);

    if (foundFeature || lastCoordinate) {
        var isSelected = false;

        if (features && features.getArray().includes(foundFeature)) {
            isSelected = true;
        }

        previousCursor = elem.style.cursor;

        // WebKit browsers don't support the grab icons without a prefix
        elem.style.cursor = lastCoordinate ? '-webkit-grabbing' : (isSelected ? '-webkit-grab' : 'pointer');

        // Thankfully, attempting to set the standard ones will silently fail,
        // keeping the prefixed icons
        elem.style.cursor = lastCoordinate ? 'grabbing' : (isSelected ? 'grab' : 'pointer');
    } else {
        elem.style.cursor = previousCursor || '';
        previousCursor = undefined;
    }
}

/**
 * Creates or updates all interaction helper features.
 * @private
 */
function createOrUpdateInteractionFeatures() {
    const geometries = features.getArray().map(feature => feature.getGeometry());
    const extent = new ol.geom.GeometryCollection(geometries).getExtent();

//        createOrUpdateGhostFeature(geometries);
    createOrUpdateAnchorFeature(ol.extent.getCenter(extent));
//        createOrUpdateBoundingFeature(extent);
}

/**
 * @param {ol.Coordinate} anchor
 * @private
 */
function createOrUpdateAnchorFeature(anchor:ol.Coordinate) {
    if (anchorFeature) {
        anchorFeature.getGeometry().setCoordinates(anchor);
    } else {
        anchorFeature = new ol.Feature({
            geometry: new ol.geom.Point(anchor),
            [ANCHOR_NAME]: true
        });

        overlay.addFeature(anchorFeature);
    }
}

/**
 * @param {ol.geom.SimpleGeometry[]} geometries
 * @private
 */
function createOrUpdateGhostFeature(geometries:Array<ol.geom.SimpleGeometry>) {
    if (ghostFeature) {
        ghostFeature.getGeometry().setGeometries(geometries);
    } else {
        ghostFeature = new ol.Feature({
            geometry: new ol.geom.GeometryCollection(geometries),
            [GHOST_NAME]: true
        });

        overlay.addFeature(ghostFeature);
    }
}

/**
 * @param {ol.Extent} extent
 * @private
 */
function createOrUpdateBoundingFeature(extent:ol.Extent) {
    const coordinates = [
        [extent[0], extent[1]],
        [extent[0], extent[3]],
        [extent[2], extent[3]],
        [extent[2], extent[1]]
    ];

    if (boundingFeature) {
        boundingFeature.getGeometry().setCoordinates(coordinates);
    } else {
        boundingFeature = new ol.Feature({
            geometry: new ol.geom.MultiPoint(coordinates),
            [BOUNDING_NAME]: true
        });

        overlay.addFeature(boundingFeature);
    }
}

/**
 * @param {ol.Feature} element
 * @this RotateFeatureInteraction
 * @private
 */
function handleFeatureAdd({ element }) {
    assertInstanceOf(element, ol.Feature);

    createOrUpdateGhostFeature(features);
}

/**
 * @param {ol.Feature} element
 * @this RotateFeatureInteraction
 * @private
 */
function handleFeatureRemove({ element }) {
    assertInstanceOf(element, ol.Feature);

    createOrUpdateGhostFeature(features);
}

/**
 * @returns {Object.<string, Array.<ol.style.Style>>}
 * @private
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
