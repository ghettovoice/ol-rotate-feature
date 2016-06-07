// @flow
import ol from "openlayers";
import { assertInstanceOf } from "./util";
import { RotateFeatureEvent, RotateFeatureEventType } from "./rotatefeatureevent";

/**
 * @typedef {Object} RotateFeatureInteractionOptions
 * @property {ol.Collection<ol.Feature>} features The features the interaction works on. Required.
 * @property {ol.style.Style | Array<ol.style.Style> | ol.style.StyleFunction | undefined} style  Style of the overlay.
 * @property {string} angleProperty Property name of the features where to save current angle. Used for exporting total angle value. Default is  'angle'.
 */

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
 * todo возможно добавить ghost feature для отображения начального угла
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
         * @type {ol.layer.Vector}
         * @private
         */
        this.overlay_ = new ol.layer.Vector({
            style: options.style || getDefaultStyle.call(this, this.angleProperty_),
            source: new ol.source.Vector({
                features: new ol.Collection()
            })
        });
        /**
         * @type {string}
         * @private
         */
        this.previousCursor_ = undefined;
        /**
         * Rotated feature.
         *
         * @type {ol.Feature}
         * @private
         */
        this.ghostFeature_ = undefined;
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

        this.features_.on('add', this.handleFeatureAdd_, this);
        this.features_.on('remove', this.handleFeatureRemove_, this);
    }

    /**
     * @param {ol.Map} map
     */
    setMap(map) {
        this.overlay_.setMap(map);
        super.setMap(map);
        this.createOrUpdateInteractionFeatures_();
    }

    /**
     * Creates or updates all interaction helper features.
     * @private
     */
    createOrUpdateInteractionFeatures_() {
        const geometries = this.features_.getArray().map(feature => feature.getGeometry());
        const extent = new ol.geom.GeometryCollection(geometries).getExtent();
        const anchorCoordinate = ol.extent.getCenter(extent);

//        this.createOrUpdateGhostFeature_(geometries);
        this.createOrUpdateAnchorFeature_(anchorCoordinate);
        this.createOrUpdateArrowFeature_(anchorCoordinate);
    }

    /**
     * @param {ol.Coordinate} coordinate
     * @private
     */
    createOrUpdateAnchorFeature_(coordinate : ol.Coordinate) {
        if (this.anchorFeature_) {
            this.anchorFeature_.getGeometry().setCoordinates(coordinate);
        } else {
            this.anchorFeature_ = new ol.Feature({
                geometry: new ol.geom.Point(coordinate),
                [ANCHOR_KEY]: true
            });
            this.overlay_.getSource().addFeature(this.anchorFeature_);
        }
    }

    /**
     * @param {ol.geom.SimpleGeometry[]} geometries
     * @private
     */
    createOrUpdateGhostFeature_(geometries : Array<ol.geom.SimpleGeometry>) {
        if (this.ghostFeature_) {
            this.ghostFeature_.getGeometry().setGeometries(geometries);
        } else {
            this.ghostFeature_ = new ol.Feature({
                geometry: new ol.geom.GeometryCollection(geometries),
                [GHOST_KEY]: true
            });
            this.overlay_.getSource().addFeature(this.ghostFeature_);
        }
    }

    /**
     * @param {ol.Coordinate} coordinate
     * @private
     */
    createOrUpdateArrowFeature_(coordinate : ol.Coordinate) {
        if (this.arrowFeature_) {
            this.arrowFeature_.getGeometry().setCoordinates(coordinate);
        } else {
            this.arrowFeature_ = new ol.Feature({
                geometry: new ol.geom.Point(coordinate),
                [ARROW_KEY]: true
            });
            this.overlay_.getSource().addFeature(this.arrowFeature_);
        }
    }

    /**
     * @param {ol.Feature} element
     * @this RotateFeatureInteraction
     * @private
     */
    handleFeatureAdd_({ element }) {
        assertInstanceOf(element, ol.Feature);

        this.createOrUpdateInteractionFeatures_();
    }

    /**
     * @param {ol.Feature} element
     * @this RotateFeatureInteraction
     * @private
     */
    handleFeatureRemove_({ element }) {
        assertInstanceOf(element, ol.Feature);

        this.createOrUpdateInteractionFeatures_();
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
        (this.features_.getArray().includes(foundFeature)) || foundFeature === this.arrowFeature_
    ) {
        this.lastCoordinate_ = evt.coordinate;

        handleMoveEvent.call(this, evt);
        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.START, this.features_));

        return true;
    }
    // handle click & drag on rotation anchor feature
    else if (foundFeature === this.anchorFeature_) {
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
            feature.getGeometry().rotate(angle, anchorCoordinate);
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
    } else if (this.features_.getArray().includes(foundFeature) || foundFeature === this.arrowFeature_) {
        this.previousCursor_ = elem.style.cursor;
        setCursor('grab', true);
    } else if (foundFeature === this.anchorFeature_ || this.anchorMoving_) {
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
                zIndex: 10
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
                })
            }),
            new ol.style.Style({
                fill: new ol.style.Fill({
                    color: transparent
                }),
                stroke: new ol.style.Stroke({
                    color: blue,
                    width
                })
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

                const coordinate = feature.getGeometry().getCoordinates();
                // generate arrow polygon
                const geom = new ol.geom.Polygon([
                    [
                        [coordinate[0], coordinate[1] - 6 * resolution],
                        [coordinate[0] + 8 * resolution, coordinate[1] - 12 * resolution],
                        [coordinate[0], coordinate[1] + 30 * resolution],
                        [coordinate[0] - 8 * resolution, coordinate[1] - 12 * resolution],
                        [coordinate[0], coordinate[1] - 6 * resolution],
                    ]
                ]);
                // and rotate it according to current angle
                geom.rotate(angle, coordinate);
                style[0].setGeometry(geom);
                style[1].setGeometry(geom);
                style[0].getText().setText(Math.round(-angle * 180 / Math.PI) + '°');

                return style;
        }
    };
}
