/**
 * @typedef {Object} InteractionOptions
 * @property {ol.Collection<ol.Feature>} features The features the interaction works on. Required.
 * @property {ol.style.Style | Array<ol.style.Style> | ol.style.StyleFunction | undefined} style  Style of the overlay.
 * @property {number | undefined} angle Initial angle in radians (positive is counter-clockwise),
 *                                      applied for features already added to collection. Default is `0`.
 * @property {number[] | ol.Coordinate | undefined} anchor Initial anchor coordinate. Default is center of features extent.
 */
