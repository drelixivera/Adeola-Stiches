import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, MessageCircle, Eye } from 'lucide-react'
import ImageSkeleton from '../common/ImageSkeleton'

const GalleryItem = ({ 
  image, 
  index, 
  onClick,
  onShare,
  onQuote 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.05,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      onClick={() => onClick(index)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-warmBeige">
        {!isLoaded && <ImageSkeleton />}
        
        <img
          src={image.image}
          alt={image.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />

        {/* Featured Badge */}
        {image.featured && (
          <div className="absolute top-3 left-3 bg-gold text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            ★ Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gold shadow-md">
          {image.category}
        </div>

        {/* Quick Action Buttons - Visible on Hover */}
        <div className={`absolute bottom-3 left-3 right-3 flex justify-between transition-all duration-300 ${
          showDetails ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={(e) => { e.stopPropagation(); onShare(image) }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-gold hover:text-white transition-colors shadow-md"
            aria-label="Share"
          >
            <Share2 size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onQuote(image) }}
            className="bg-gold text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-terracotta transition-colors shadow-md flex items-center gap-1"
          >
            <MessageCircle size={14} />
            <span>Quote</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(index) }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-gold hover:text-white transition-colors shadow-md"
            aria-label="View details"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Mobile Tap Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full md:hidden">
          Tap to view
        </div>
      </div>

      {/* Image Details - Always visible on mobile, overlay on desktop */}
      <div className={`p-4 transition-all duration-300 ${
        showDetails ? 'bg-white' : 'bg-white'
      }`}>
        <h3 className="font-serif text-lg text-dark">{image.title}</h3>
        <p className="text-sm text-dark/60 line-clamp-2">{image.subcategory}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {image.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-cream text-dark/60 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Desktop Description - Visible on hover */}
        <div className={`mt-2 transition-all duration-300 overflow-hidden ${
          showDetails ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-sm text-dark/70 leading-relaxed line-clamp-2">
            {image.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default GalleryItem