/**
 * Polyfill of OpenLayers 3 ol.geom.SimpleGeometry.prototype.rotate method.
 * Use it for old versions.
 */
// @flow
import ol from "openlayers";
import { deflateGeometryCoordinates, getStrideForLayout, setGeometryCoordinatesFromFlatCoordinates } from './geometry';

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} angle Angle.
 * @param {Array.<number>} anchor Rotation anchor point.
 * @param {Array.<number>=} opt_dest Destination.
 * @return {Array.<number>} Transformed coordinates.
 * @link https://github.com/openlayers/ol3/blob/v3.16.0/src/ol/geom/flat/transformflatgeom.js#L48
 */
export function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var anchorX = anchor[0];
    var anchorY = anchor[1];
    var i = 0;

    for (let j = offset; j < end; j += stride) {
        var deltaX = flatCoordinates[j] - anchorX;
        var deltaY = flatCoordinates[j + 1] - anchorY;

        dest[i++] = anchorX + deltaX * cos - deltaY * sin;
        dest[i++] = anchorY + deltaX * sin + deltaY * cos;

        for (let k = j + 2; k < j + stride; ++k) {
            dest[i++] = flatCoordinates[k];
        }
    }

    if (opt_dest && dest.length != i) {
        dest.length = i;
    }

    return dest;
}

/**
 * @param {ol.geom.GeometryCollection | ol.geom.SimpleGeometry} geometry
 * @param {number} angle
 * @param {ol.Coordinate} anchor
 */
export default function rotateGeometry(geometry : ol.geom.GeometryCollection | ol.geom.SimpleGeometry, angle: number, anchor: ol.Coordinate) {
    if (geometry instanceof ol.geom.GeometryCollection) {
        let geometries = geometry.getGeometries();

        for (let i = 0, l = geometries.length; i < l; ++i) {
            rotateGeometry(geometries[i], angle, anchor);
        }
    } else {
        const flatCoordinates = [];
        const offsetOrEnds = deflateGeometryCoordinates(geometry, flatCoordinates);

        if (flatCoordinates) {
            rotate(flatCoordinates, 0, flatCoordinates.length, getStrideForLayout(geometry.getLayout()), angle, anchor, flatCoordinates);
            setGeometryCoordinatesFromFlatCoordinates(geometry, flatCoordinates, offsetOrEnds);
        }
    }

    geometry.changed();
}
