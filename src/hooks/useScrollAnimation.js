import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Custom hook to easily trigger scroll animations with framer-motion.
 * @param {Object} options - useInView options (once, margin, amount)
 * @returns {Object} { ref, isInView, variants }
 */
export const useScrollAnimation = (options = { once: true, margin: '-80px' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, options)

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
      }
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.08
        }
      }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.94 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
      }
    }
  }

  return { ref, isInView, variants }
}

export default useScrollAnimation
