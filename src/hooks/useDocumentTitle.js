import { useEffect } from 'react'

/**
 * Sets the document title for the current page.
 * Restores the previous title when the component unmounts (route change).
 *
 * @param {string} title - Page-specific title (e.g. "Creations Gallery")
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
      ? `${title} | Adeola Fashion Designer, Ibadan`
      : 'Adeola Fashion Designer | Bespoke Tailoring in Ibadan'

    return () => {
      document.title = prevTitle
    }
  }, [title])
}

export default useDocumentTitle