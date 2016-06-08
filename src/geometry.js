import { assert } from "./util";

/**
 * @enum {string}
 */
export const GeometryLayout = {
    XY: 'XY',
    XYZ: 'XYZ',
    XYM: 'XYM',
    XYZM: 'XYZM'
};

/**
 * @enum {string}
 */
export const GeometryType = {
    POINT: 'Point',
    MULTI_POINT: 'MultiPoint',
    LINE_STRING: 'LineString',
    MULTI_LINE_STRING: 'MultiLineString',
    POLYGON: 'Polygon',
    MULTI_POLYGON: 'MultiPolygon',
    GEOMETRY_COLLECTION: 'GeometryCollection'
};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {ol.Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
export function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
    assert(coordinate.length == stride);
    var i, ii;
    for (i = 0, ii = coordinate.length; i < ii; ++i) {
        flatCoordinates[offset++] = coordinate[i];
    }
    return offset;
}


/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array.<ol.Coordinate>} coordinates Coordinates.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
export function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
    var i, ii;
    for (i = 0, ii = coordinates.length; i < ii; ++i) {
        var coordinate = coordinates[i];
        assert(coordinate.length == stride);
        var j;
        for (j = 0; j < stride; ++j) {
            flatCoordinates[offset++] = coordinate[j];
        }
    }
    return offset;
}


/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array.<Array.<ol.Coordinate>>} coordinatess Coordinatess.
 * @param {number} stride Stride.
 * @param {Array.<number>=} opt_ends Ends.
 * @return {Array.<number>} Ends.
 */
export function deflateCoordinatess(flatCoordinates, offset, coordinatess, stride, opt_ends) {
    var ends = opt_ends !== undefined ? opt_ends : [];
    var i = 0;
    var j, jj;
    for (j = 0, jj = coordinatess.length; j < jj; ++j) {
        var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
        ends[i++] = end;
        offset = end;
    }
    ends.length = i;
    return ends;
}


/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array.<Array.<Array.<ol.Coordinate>>>} coordinatesss Coordinatesss.
 * @param {number} stride Stride.
 * @param {Array.<Array.<number>>=} opt_endss Endss.
 * @return {Array.<Array.<number>>} Endss.
 */
export function deflateCoordinatesss(flatCoordinates, offset, coordinatesss, stride, opt_endss) {
    var endss = opt_endss !== undefined ? opt_endss : [];
    var i = 0;
    var j, jj;
    for (j = 0, jj = coordinatesss.length; j < jj; ++j) {
        var ends = deflateCoordinatess(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
        endss[i++] = ends;
        offset = ends[ends.length - 1];
    }
    endss.length = i;
    return endss;
}

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Array.<ol.Coordinate>=} opt_coordinates Coordinates.
 * @return {Array.<ol.Coordinate>} Coordinates.
 */
export function inflateCoordinates(flatCoordinates, offset, end, stride, opt_coordinates) {
    var coordinates = opt_coordinates != undefined ? opt_coordinates : [];
    var i = 0;
    var j;
    for (j = offset; j < end; j += stride) {
        coordinates[i++] = flatCoordinates.slice(j, j + stride);
    }
    coordinates.length = i;
    return coordinates;
}


/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array.<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array.<Array.<ol.Coordinate>>=} opt_coordinatess Coordinatess.
 * @return {Array.<Array.<ol.Coordinate>>} Coordinatess.
 */
export function inflateCoordinatess(flatCoordinates, offset, ends, stride, opt_coordinatess) {
    var coordinatess = opt_coordinatess != undefined ? opt_coordinatess : [];
    var i = 0;
    var j, jj;
    for (j = 0, jj = ends.length; j < jj; ++j) {
        var end = ends[j];
        coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
        offset = end;
    }
    coordinatess.length = i;
    return coordinatess;
}


/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array.<Array.<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array.<Array.<Array.<ol.Coordinate>>>=} opt_coordinatesss
 *     Coordinatesss.
 * @return {Array.<Array.<Array.<ol.Coordinate>>>} Coordinatesss.
 */
export function inflateCoordinatesss(flatCoordinates, offset, endss, stride, opt_coordinatesss) {
    var coordinatesss = opt_coordinatesss != undefined ? opt_coordinatesss : [];
    var i = 0;
    var j, jj;
    for (j = 0, jj = endss.length; j < jj; ++j) {
        var ends = endss[j];
        coordinatesss[i++] = inflateCoordinatess(flatCoordinates, offset, ends, stride, coordinatesss[i]);
        offset = ends[ends.length - 1];
    }
    coordinatesss.length = i;
    return coordinatesss;
}

/**
 * @param {ol.geom.GeometryLayout} layout Layout.
 * @return {number} Stride.
 */
export function getStrideForLayout(layout : ol.geom.GeometryLayout) {
    if (layout == GeometryLayout.XY) {
        return 2;
    } else if (layout == GeometryLayout.XYZ) {
        return 3;
    } else if (layout == GeometryLayout.XYM) {
        return 3;
    } else if (layout == GeometryLayout.XYZM) {
        return 4;
    } else {
        throw new Error('unsupported layout: ' + layout);
    }
}

/**
 * @param {ol.geom.SimpleGeometry} geometry
 * @param {Array<number>} flatCoordinates Destination array.
 * @returns {Array|number} Result of deflate is offset or array of stop indexes.
 */
export function deflateGeometryCoordinates(geometry : ol.geom.SimpleGeometry, flatCoordinates : Array<number>) {
    const stride = getStrideForLayout(geometry.getLayout());
    const coordinates = geometry.getCoordinates();
    var result;

    switch (true) {
        case geometry.getType() === GeometryType.POINT:
            result = deflateCoordinate(flatCoordinates, 0, coordinates, stride);
            break;
        case [GeometryType.MULTI_POINT, GeometryType.LINE_STRING].includes(geometry.getType()):
            result = deflateCoordinates(flatCoordinates, 0, coordinates, stride);
            break;
        case [GeometryType.MULTI_LINE_STRING, GeometryType.POLYGON].includes(geometry.getType()):
            result = deflateCoordinatess(flatCoordinates, 0, coordinates, stride);
            flatCoordinates.length = result.length === 0 ? 0 : result[result.length - 1];
            break;
        case geometry.getType() === GeometryType.MULTI_POLYGON:
            result = deflateCoordinatesss(flatCoordinates, 0, coordinates, stride);

            if (result.length === 0) {
                flatCoordinates.length = 0;
            } else {
                let lastEnds = result[result.length - 1];
                flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
            }
            break;
    }

    return result;
}

/**
 * @param {ol.geom.SimpleGeometry} geometry
 * @param {Array<number>} flatCoordinates
 * @param {Array | number} offsetOrEnds
 */
export function setGeometryCoordinatesFromFlatCoordinates(geometry : ol.geom.SimpleGeometry, flatCoordinates : Array<number>, offsetOrEnds : Array | number) {
    const coordinates = [];
    const stride = getStrideForLayout(geometry.getLayout());

    switch (true) {
        case geometry.getType() === GeometryType.POINT:
            geometry.setCoordinates(flatCoordinates.slice(flatCoordinates.length - offsetOrEnds));
            break;
        case [GeometryType.MULTI_POINT, GeometryType.LINE_STRING].includes(geometry.getType()):
            inflateCoordinates(flatCoordinates, 0, offsetOrEnds, stride, coordinates);
            geometry.setCoordinates(coordinates);
            break;
        case [GeometryType.MULTI_LINE_STRING, GeometryType.POLYGON].includes(geometry.getType()):
            inflateCoordinatess(flatCoordinates, 0, offsetOrEnds, stride, coordinates);
            geometry.setCoordinates(coordinates);
            break;
        case geometry.getType() === GeometryType.MULTI_POLYGON:
            inflateCoordinatesss(flatCoordinates, 0, offsetOrEnds, stride, coordinates);
            geometry.setCoordinates(coordinates);
            break;
    }

    return coordinates;
}
