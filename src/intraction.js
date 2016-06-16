// @flow
import ol from "openlayers";
import { assertInstanceOf } from "./util";
import { RotateFeatureEvent, RotateFeatureEventType } from "./event";
import rotateGeometry from "./rotate";

/**
 * @typedef {Object} InteractionOptions
 * @property {ol.Collection<ol.Feature>} features The features the interaction works on. Required.
 * @property {ol.style.Style | Array<ol.style.Style> | ol.style.StyleFunction | undefined} style  Style of the overlay.
 * @property {string} angleProperty Property name where to save current rotation angle. Default is  'angle'.
 * @property {string} anchorProperty Property name where to save current rotation anchor coordinates. Default is  'anchor'.
 */
var InteractionOptions;

const ANCHOR_KEY = 'anchor';
const ARROW_KEY = 'arrow';
const GHOST_KEY = 'ghost';

/**
 * Rotate interaction class.
 * Adds controls to rotate vector features.
 * Writes out total angle in radians (positive is counter-clockwise) to property for each feature.
 *
 * @class
 * @extends ol.interaction.Interaction
 * @author Vladimir Vershinin
 *
 * todo добавить опцию condition - для возможности переопределения клавиш
 * todo возможно добавить ghost feature для отображения начального угла
 */
export default class RotateFeatureInteraction extends ol.interaction.Pointer {
    /**
     * @param {InteractionOptions} options
     */
    constructor(options : InteractionOptions = {}) {
        super({
            handleEvent: RotateFeatureInteraction.handleEvent,
            handleDownEvent: handleDownEvent,
            handleUpEvent: handleUpEvent,
            handleDragEvent: handleDragEvent,
            handleMoveEvent: handleMoveEvent
        });

        /**
         * @type {ol.Collection.<ol.Feature>}
         * @private
         */
        this.features_ = options.features;

        assertInstanceOf(this.features_, ol.Collection);

        /**
         * @type {string}
         * @private
         */
        this.angleProperty_ = options.angleProperty || 'angle';
        /**
         * @type {string}
         * @private
         */
        this.anchorProperty_ = options.anchorProperty || 'anchor';
        /**
         * @type {ol.FeatureOverlay}
         * @private
         */
        this.overlay_ = new ol.FeatureOverlay({
            style: options.style || getDefaultStyle.call(this, this.angleProperty_)
        });
        /**
         * @type {string}
         * @private
         */
        this.previousCursor_ = undefined;
//        /**
//         * Rotated feature.
//         *
//         * @type {ol.Feature}
//         * @private
//         */
//        this.ghostFeature_ = undefined;
        /**
         * @type {ol.Feature}
         * @private
         */
        this.anchorFeature_ = undefined;
        /**
         * @type {ol.Feature}
         * @private
         */
        this.arrowFeature_ = undefined;
        /**
         * @type {ol.Coordinate}
         * @private
         */
        this.lastCoordinate_ = undefined;
        /**
         * @type {boolean}
         * @private
         */
        this.anchorMoving_ = false;
        /**
         * @type {ol.Extent}
         * @private
         */
        this.featuresExtent_ = undefined;

        this.features_.on('add', this.handleFeatureAdd_, this);
        this.features_.on('remove', this.handleFeatureRemove_, this);
    }

    /**
     * @param {ol.MapBrowserEvent} evt Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @this {RotateFeatureInteraction}
     * @public
     */
    static handleEvent(evt : ol.MapBrowserEvent) : boolean {
        // disable selection of inner features
        const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, feature => feature);
        if (
            ['click', 'singleclick'].includes(evt.type) &&
            foundFeature && [this.anchorFeature_, this.arrowFeature_].includes(foundFeature)
        ) {
            return false;
        }

        return ol.interaction.Pointer.handleEvent.call(this, evt);
    }

    /**
     * @param {ol.Map} map
     */
    setMap(map) {
        this.overlay_.setMap(map);
        super.setMap(map);

        if (map) {
            this.updateInteractionFeatures_();
        } else {
            this.reset_();
        }
    }

    /**
     * Creates or updates all interaction helper features.
     * @private
     */
    updateInteractionFeatures_() {
        if (!this.features_.getLength()) {
            this.reset_();

            return;
        }

        this.featuresExtent_ = getFeaturesExtent(this.features_);

        this.createOrUpdateAnchorFeature_();
        this.createOrUpdateArrowFeature_();
    }

    /**
     * @private
     */
    reset_() {
        [this.anchorFeature_, this.arrowFeature_].forEach(feature => {
            if (feature) {
                this.overlay_.removeFeature(feature);
            }
        });

        this.anchorFeature_ = this.arrowFeature_ =
            this.lastCoordinate_ = this.featuresExtent_ = undefined;
        this.anchorMoving_ = false;
    }

    /**
     * @private
     */
    createOrUpdateAnchorFeature_() {
        const firstFeature = this.features_.item(0);
        var coordinate, angle;

        if (firstFeature) {
            angle = firstFeature.get(this.angleProperty_) || 0;
            coordinate = firstFeature.get(this.anchorProperty_);
        }

        if (!coordinate || !coordinate.length) {
            coordinate = ol.extent.getCenter(this.featuresExtent_);
        }

        if (this.anchorFeature_) {
            this.anchorFeature_.getGeometry().setCoordinates(coordinate);
        } else {
            this.anchorFeature_ = new ol.Feature({
                geometry: new ol.geom.Point(coordinate),
                [ANCHOR_KEY]: true,
                [this.angleProperty_]: angle
            });
            this.overlay_.addFeature(this.anchorFeature_);

            this.features_.forEach(feature => feature.set(this.anchorProperty_, coordinate));
        }
    }

//    /**
//     * @private
//     */
//    createOrUpdateGhostFeature_() {
//        if (this.ghostFeature_) {
//            this.ghostFeature_.getGeometry().setGeometries(geometries);
//        } else {
//            this.ghostFeature_ = new ol.Feature({
//                geometry: new ol.geom.GeometryCollection(geometries),
//                [GHOST_KEY]: true
//            });
//            this.overlay_.addFeature(this.ghostFeature_);
//        }
//    }

    /**
     * @private
     */
    createOrUpdateArrowFeature_() {
        const firstFeature = this.features_.item(0);
        var coordinate, angle;

        if (firstFeature) {
            angle = firstFeature.get(this.angleProperty_) || 0;
            coordinate = firstFeature.get(this.anchorProperty_);
        }

        if (!coordinate || !coordinate.length) {
            coordinate = ol.extent.getCenter(this.featuresExtent_);
        }

        if (this.arrowFeature_) {
            this.arrowFeature_.getGeometry().setCoordinates(coordinate);
        } else {
            this.arrowFeature_ = new ol.Feature({
                geometry: new ol.geom.Point(coordinate),
                [ARROW_KEY]: true,
                [this.angleProperty_]: angle
            });
            this.overlay_.addFeature(this.arrowFeature_);
        }
    }

    /**
     * @param {ol.Feature} element
     * @this RotateFeatureInteraction
     * @private
     */
    handleFeatureAdd_({ element }) {
        assertInstanceOf(element, ol.Feature);

        this.updateInteractionFeatures_();
    }

    /**
     * @param {ol.Feature} element
     * @this RotateFeatureInteraction
     * @private
     */
    handleFeatureRemove_({ element }) {
        assertInstanceOf(element, ol.Feature);

        this.updateInteractionFeatures_();
    }
}

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {RotateFeatureInteraction}
 * @public
 */
RotateFeatureInteraction.handleEvent = function (evt : ol.MapBrowserEvent) : boolean {
    // disable selection of inner features
    const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, feature => feature);
    if (
        ['click', 'singleclick'].includes(evt.type) &&
        foundFeature && [this.anchorFeature_, this.arrowFeature_].includes(foundFeature)
    ) {
        return false;
    }

    return ol.interaction.Pointer.handleEvent.call(this, evt);
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
    if (
        foundFeature && !this.lastCoordinate_ &&
        (this.features_.getArray().includes(foundFeature) || foundFeature === this.arrowFeature_)
    ) {
        this.lastCoordinate_ = evt.coordinate;

        handleMoveEvent.call(this, evt);
        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.START, this.features_));

        return true;
    }
    // handle click & drag on rotation anchor feature
    else if (foundFeature && foundFeature === this.anchorFeature_) {
        this.anchorMoving_ = true;
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
    if (this.lastCoordinate_) {
        this.lastCoordinate_ = undefined;

        handleMoveEvent.call(this, evt);
        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.END, this.features_));

        return true;
    }
    // stop drag sequence of the anchors
    else if (this.anchorMoving_) {
        this.anchorMoving_ = false;
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
function handleDragEvent(evt : ol.MapBrowserEvent) : boolean {
    const newCoordinate = evt.coordinate;
    const anchorCoordinate = this.anchorFeature_.getGeometry().getCoordinates();

    const updateAngleProperty = (feature, angle) => feature.set(this.angleProperty_, ( feature.get(this.angleProperty_) || 0 ) + angle);

    // handle drag of features by angle
    if (this.lastCoordinate_) {
        // calculate vectors of last and current pointer positions
        const lastVector = [this.lastCoordinate_[0] - anchorCoordinate[0], this.lastCoordinate_[1] - anchorCoordinate[1]];
        const newVector = [newCoordinate[0] - anchorCoordinate[0], newCoordinate[1] - anchorCoordinate[1]];

        // calculate angle between last and current vectors (positive angle counter-clockwise)
        let angle = Math.atan2(lastVector[0] * newVector[1] - newVector[0] * lastVector[1], lastVector[0] * newVector[0] + lastVector[1] * newVector[1]);

        this.features_.forEach(feature => {
            rotateGeometry(feature.getGeometry(), angle, anchorCoordinate);
            updateAngleProperty(feature, angle);
        });

        [this.anchorFeature_, this.arrowFeature_].forEach(feature => updateAngleProperty(feature, angle));

        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.ROTATING, this.features_));

        this.lastCoordinate_ = evt.coordinate;
    }
    // handle drag of the anchor
    else if (this.anchorMoving_) {
        let deltaX = newCoordinate[0] - anchorCoordinate[0];
        let deltaY = newCoordinate[1] - anchorCoordinate[1];

        this.anchorFeature_.getGeometry().translate(deltaX, deltaY);
        this.arrowFeature_.getGeometry().translate(deltaX, deltaY);

        this.features_.forEach(feature => feature.set(this.anchorProperty_, newCoordinate));
    }
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleMoveEvent(evt : ol.MapBrowserEvent) : boolean {
    const elem = evt.map.getTargetElement();
    const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, feature => feature);

    const setCursor = (cursor, vendor = false) => {
        if (vendor) {
            elem.style.cursor = '-webkit-' + cursor;
            elem.style.cursor = '-moz-' + cursor;
        }

        elem.style.cursor = cursor;
    };

    if (this.lastCoordinate_) {
        this.previousCursor_ = elem.style.cursor;
        setCursor('grabbing', true);
    } else if (foundFeature && (this.features_.getArray().includes(foundFeature) || foundFeature === this.arrowFeature_)) {
        this.previousCursor_ = elem.style.cursor;
        setCursor('grab', true);
    } else if (foundFeature && foundFeature === this.anchorFeature_ || this.anchorMoving_) {
        this.previousCursor_ = elem.style.cursor;
        setCursor('crosshair');
    } else {
        setCursor(this.previousCursor_ || '');
        this.previousCursor_ = undefined;
    }
}

/**
 * @param {string} angleProperty
 * @returns {ol.style.StyleFunction}
 * @this {RotateFeatureInteraction}
 * @private
 */
function getDefaultStyle(angleProperty : string) : ol.style.StyleFunction {
    const white = [255, 255, 255, 0.8];
    const blue = [0, 153, 255, 0.8];
    const transparent = [255, 255, 255, 0.01];
    const width = 2;

    const styles = {
        [ANCHOR_KEY]: [
            new ol.style.Style({
                image: new ol.style.RegularShape({
                    fill: new ol.style.Fill({
                        color: [0, 153, 255, 0.8]
                    }),
                    stroke: new ol.style.Stroke({
                        color: blue,
                        width: 1
                    }),
                    radius: 4,
                    points: 6
                }),
                zIndex: Infinity
            })
        ],
        [ARROW_KEY]: [
            new ol.style.Style({
                fill: new ol.style.Fill({
                    color: transparent
                }),
                stroke: new ol.style.Stroke({
                    color: white,
                    width: width + 2
                }),
                text: new ol.style.Text({
                    font: '12px sans-serif',
                    offsetX: 20,
                    offsetY: -20,
                    fill: new ol.style.Fill({
                        color: 'blue'
                    }),
                    stroke: new ol.style.Stroke({
                        color: white,
                        width: width + 1
                    })
                }),
                zIndex: Infinity
            }),
            new ol.style.Style({
                fill: new ol.style.Fill({
                    color: transparent
                }),
                stroke: new ol.style.Stroke({
                    color: blue,
                    width
                }),
                zIndex: Infinity
            })
        ]
    };

    return function (feature, resolution) {
        var style;
        const angle = feature.get(angleProperty) || 0;

        switch (true) {
            case feature.get(ANCHOR_KEY):
                style = styles[ANCHOR_KEY];
                style[0].getImage().setRotation(-angle);

                return style;
            case feature.get(ARROW_KEY):
                style = styles[ARROW_KEY];

                const coordinates = feature.getGeometry().getCoordinates();
                // generate arrow polygon
                const geom = new ol.geom.Polygon([
                    [
                        [coordinates[0], coordinates[1] - 6 * resolution],
                        [coordinates[0] + 8 * resolution, coordinates[1] - 12 * resolution],
                        [coordinates[0], coordinates[1] + 30 * resolution],
                        [coordinates[0] - 8 * resolution, coordinates[1] - 12 * resolution],
                        [coordinates[0], coordinates[1] - 6 * resolution],
                    ]
                ]);

                // and rotate it according to current angle
                rotateGeometry(geom, angle, coordinates);
                style[0].setGeometry(geom);
                style[1].setGeometry(geom);
                style[0].getText().setText(Math.round(-angle * 180 / Math.PI) + '°');

                return style;
        }
    };
}

/**
 * @param {ol.Collection<ol.Feature> | Array<ol.Feature>} features
 * @returns {ol.Extent}
 * @private
 */
function getFeaturesExtent(features : ol.Collection<ol.Feature> | Array<ol.Feature>) {
    return new ol.geom.GeometryCollection(
        ( Array.isArray(features) ? features : features.getArray() ).map(feature => feature.getGeometry())
    ).getExtent();
}
