/*!
 * Locale — Bootstrap 6 directory template
 */

import { initBase, onReady } from './base.js'

const bindRange = (rangeId, outId, format) => {
  const range = document.getElementById(rangeId)
  const out = document.getElementById(outId)
  if (!range || !out) return

  const sync = () => { out.textContent = format(range.value) }
  range.addEventListener('input', sync)
  sync()
}

/* Hovering a listing highlights its map pin */
const initMapSync = () => {
  const pins = document.querySelectorAll('.map-pin')
  const listings = document.querySelectorAll('.listing')
  if (!pins.length || !listings.length) return

  listings.forEach((listing, i) => {
    const pin = pins[i]
    if (!pin) return

    const on = () => {
      pins.forEach((p) => p.classList.remove('is-active'))
      pin.classList.add('is-active')
    }

    listing.addEventListener('mouseenter', on)
    listing.addEventListener('focusin', on)
  })
}

/* Global image loading optimization */
const initImageLoading = () => {
  const images = document.querySelectorAll('img')

  images.forEach((img) => {
    /*
     * Images that already specify loading="eager" or loading="lazy"
     * are left exactly as they are.
     */
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy')
    }

    /*
     * Decode images asynchronously where supported so large images
     * don't block the page from becoming interactive.
     */
    if ('decoding' in img && !img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async')
    }
  })
}

onReady(() => {
  initBase()
  bindRange('ratingRange', 'ratingOut', (v) => Number(v).toFixed(1))
  initMapSync()
  initImageLoading()
})