/**
 * Stores the click position when toggling theme, so the transition can
 * originate from the toggle button instead of the screen center.
 */
let lastOrigin = null

export function setThemeTransitionOrigin(clientX, clientY) {
  lastOrigin = { x: clientX, y: clientY }
}

export function consumeThemeTransitionOrigin() {
  const o = lastOrigin
  lastOrigin = null
  return o
}
