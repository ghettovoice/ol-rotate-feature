const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : ''

export const MAC = ua.indexOf('macintosh') !== -1

export const WEBKIT = ua.indexOf('webkit') !== -1 && ua.indexOf('edge') == -1

export const mouseActionButton = function (mapBrowserEvent) {
  const originalEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent)
  return originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey)
}
