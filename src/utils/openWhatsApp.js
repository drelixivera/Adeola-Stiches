/**
 * Opens a WhatsApp URL in a way that works on both desktop and mobile.
 *
 * On desktop: opens in a new tab via window.open.
 * On mobile:  navigates the current tab, because iOS Safari and Android Chrome
 *             block window.open() calls that come from within async handlers
 *             (form submits, timers, promises) as unsolicited popups.
 *
 * @param {string} url - Full WhatsApp URL (e.g. https://wa.me/234...?text=...)
 */
export const openWhatsApp = (url) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    window.location.href = url
  } else {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

export default openWhatsApp