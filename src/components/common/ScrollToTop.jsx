import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop component ensures that navigating between pages
 * automatically resets the scroll position to the top of the new page.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant on route change avoids disorienting animation during page swap
    })
  }, [pathname])

  return null
}

export default ScrollToTop
