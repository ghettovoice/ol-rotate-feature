/**
 * This file is part of ol-rotate-feature package.
 * @module ol-rotate-feature
 * @license MIT
 * @author Vladimir Vershinin
 */
import RotateFeatureInteraction from "./interaction"

// for backward compatibility
if (typeof window !== 'undefined' && window.ol) {
  window.ol.interaction.RotateFeature = RotateFeatureInteraction
}

export default RotateFeatureInteraction
