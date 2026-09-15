import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryImages } from '../data/galleryData'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Zoom, Thumbnails, Share, Fullscreen } from 'yet-another-react-lightbox/plugins'
import { 
  Filter, ChevronDown, Sparkles, MessageCircle, 
  Plus, Loader2, Image as ImageIcon, Tag, 
  Grid3x3, LayoutGrid, Heart,
  X, ChevronLeft, ChevronRight
} from 'lucide-react'
import { contactInfo } from '../data/contactData'

const Gallery = () => {
  // ===== STATE =====
  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Filters & Sorting
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  // Pagination
  const [visibleCount, setVisibleCount] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const ITEMS_PER_PAGE = 12

  // Search
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  // Refs
  const galleryRef = useRef(null)
  const filterBarRef = useRef(null)

  // ===== COMPUTED VALUES =====
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(galleryImages.map(img => img.category))]
    return cats
  }, [])

  const categoryCounts = useMemo(() => {
    const counts = {}
    categories.forEach(cat => {
      if (cat === 'All') {
        counts[cat] = galleryImages.length
      } else {
        counts[cat] = galleryImages.filter(img => img.category === cat).length
      }
    })
    return counts
  }, [categories])

  const filteredImages = useMemo(() => {
    let result = activeCategory === 'All' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === activeCategory)

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(img => 
        img.title.toLowerCase().includes(query) ||
        img.category.toLowerCase().includes(query) ||
        (img.subcategory && img.subcategory.toLowerCase().includes(query)) ||
        (img.tags && img.tags.some(tag => tag.toLowerCase().includes(query))) ||
        (img.description && img.description.toLowerCase().includes(query))
      )
    }

    switch(sortBy) {
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'oldest':
        result = [...result].sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'featured':
        result = [...result].sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1)
        break
      default:
        break
    }
    return result
  }, [activeCategory, sortBy, searchQuery])

  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount)
  }, [filteredImages, visibleCount])

  const hasMore = visibleCount < filteredImages.length

  // Get featured image for hero
  const featuredImage = galleryImages.find(img => img.featured) || galleryImages[0]

  // Prepare lightbox images
  const lightboxImages = galleryImages.map(img => ({ 
    src: img.image,
    title: img.title,
    description: img.description,
  }))

  // ===== HANDLERS =====
  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const handleShare = (image) => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: `Check out this amazing piece by Adeola Fashion Designer: ${image.title}`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied! Share it with your friends.')
    }
  }

  const handleQuote = (image) => {
    const message = `Hello Adeola! I'm interested in the "${image.title}" piece I saw on your gallery. Can I get a quote?`
    window.open(`https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const clearSearch = () => {
    setSearchParams({})
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const loadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredImages.length))
      setIsLoading(false)
    }, 600)
  }

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [activeCategory, sortBy, searchQuery])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  return (
    <div className="min-h-screen bg-cream" ref={galleryRef}>
      {/* ===== HERO BANNER ===== */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${featuredImage.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/50 to-dark/30" />
        </div>
        
        <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-16">
          <div className="container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-gold/20 backdrop-blur-sm text-gold px-4 py-1 rounded-full text-sm font-medium mb-3 border border-gold/30">
                ✨ Our Collection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2">
                Gallery of <span className="text-gold">Creations</span>
              </h1>
              <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
                Explore our collection of custom-made garments. Each piece tells a story of craftsmanship and dedication.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/80">
                  <ImageIcon size={14} />
                  {galleryImages.length} pieces
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/80">
                  <Tag size={14} />
                  {categories.length - 1} categories
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SEARCH RESULTS INFO ===== */}
      {searchQuery && (
        <div className="container mx-auto px-4 py-4">
          <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 border border-gold/20">
            <p className="text-sm text-dark/70">
              Showing results for: <span className="font-medium text-gold">"{searchQuery}"</span>
              {' '}({filteredImages.length} {filteredImages.length === 1 ? 'result' : 'results'})
              <button 
                onClick={clearSearch}
                className="ml-2 text-gold hover:text-terracotta transition-colors font-medium"
              >
                ✕ Clear
              </button>
            </p>
          </div>
        </div>
      )}

      {/* ===== STICKY FILTER BAR ===== */}
      <div 
        ref={filterBarRef}
        className="sticky top-16 md:top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gold/5 shadow-sm"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Category Filters - Desktop */}
            <div className="hidden md:flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    if (searchQuery) clearSearch()
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gold text-white shadow-md'
                      : 'bg-cream/50 text-dark/60 hover:bg-gold/10 hover:text-gold'
                  }`}
                >
                  {category} 
                  <span className="text-xs ml-0.5 opacity-60">
                    ({categoryCounts[category]})
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Filter Dropdown */}
            <div className="md:hidden flex-1">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between bg-cream/50 border border-gold/20 rounded-lg px-3 py-2 text-sm text-dark/70"
              >
                <span className="flex items-center gap-2">
                  <Filter size={16} />
                  {activeCategory}
                  {searchQuery && (
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                      Searching
                    </span>
                  )}
                </span>
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl p-2 border border-gold/10 z-50">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category)
                        setShowFilters(false)
                        if (searchQuery) clearSearch()
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === category
                          ? 'bg-gold text-white'
                          : 'hover:bg-cream text-dark/70'
                      }`}
                    >
                      {category} ({categoryCounts[category]})
                    </button>
                  ))}
                  {searchQuery && (
                    <button
                      onClick={() => {
                        clearSearch()
                        setShowFilters(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-gold hover:bg-cream transition-colors mt-1 border-t border-cream"
                    >
                      ✕ Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream/50 border border-gold/20 rounded-lg px-3 py-1.5 text-sm text-dark/70 focus:outline-none focus:border-gold"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ===== GALLERY GRID ===== */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {visibleImages.length > 0 ? (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4 max-w-7xl mx-auto"
            >
              {visibleImages.map((image, index) => {
                const realIndex = galleryImages.findIndex(img => img.id === image.id)
                // Random height variation for masonry effect
                const heightClass = ['h-64', 'h-72', 'h-80', 'h-96', 'h-[28rem]', 'h-[32rem]'][index % 6]
                
                return (
                  <motion.div
                    key={image.id}
                    variants={itemVariants}
                    layout
                    className="break-inside-avoid mb-3 md:mb-4 group cursor-pointer relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={() => openLightbox(realIndex)}
                  >
                    <div className={`relative ${heightClass} bg-warmBeige overflow-hidden`}>
                      <img 
                        src={image.image} 
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Featured Badge */}
                      {image.featured && (
                        <div className="absolute top-3 left-3 bg-gold text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg z-10">
                          ⭐ Featured
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gold shadow-lg z-10">
                        {image.category}
                      </div>

                      {/* Hover Overlay Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                        <h3 className="text-white font-serif text-lg md:text-xl font-bold mb-0.5">
                          {image.title}
                        </h3>
                        <p className="text-white/80 text-xs md:text-sm mb-3 line-clamp-2">
                          {image.subcategory || image.category}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-white/80 text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            Explore →
                          </span>
                        </div>
                      </div>

                      {/* Tags - visible on hover */}
                      <div className="absolute bottom-3 right-3 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                        {image.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* ===== LOAD MORE BUTTON ===== */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gold px-8 py-3.5 rounded-full font-medium hover:bg-gold hover:text-white transition-all duration-300 border-2 border-gold/30 hover:border-gold shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                      <span>Show More</span>
                      <span className="text-xs opacity-60">
                        ({visibleCount} of {filteredImages.length})
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* ===== VIEW ALL INDICATOR ===== */}
            {!hasMore && visibleImages.length > 0 && (
              <div className="text-center mt-10">
                <p className="text-sm text-dark/40 flex items-center justify-center gap-2">
                  <span>✨</span>
                  You've seen all {filteredImages.length} pieces
                  {searchQuery && ` (filtered by "${searchQuery}")`}
                </p>
              </div>
            )}
          </>
        ) : (
          /* ===== EMPTY STATE ===== */
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={32} className="text-gold/40" />
            </div>
            <p className="text-dark/60">
              {searchQuery 
                ? `No results found for "${searchQuery}"`
                : 'No images in this category yet.'}
            </p>
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="mt-4 text-gold hover:underline font-medium"
              >
                View all images
              </button>
            )}
            {!searchQuery && activeCategory !== 'All' && (
              <button 
                onClick={() => {
                  setActiveCategory('All')
                  if (searchQuery) clearSearch()
                }}
                className="mt-4 text-gold hover:underline"
              >
                View all images
              </button>
            )}
          </div>
        )}
      </div>

      {/* ===== LIGHTBOX ===== */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={lightboxImages}
        plugins={[Zoom, Thumbnails, Share, Fullscreen]}
        thumbnails={{
          position: 'bottom',
          width: 80,
          height: 60,
          border: 1,
          borderRadius: 4,
          padding: 4,
          gap: 8,
        }}
        carousel={{
          padding: '16px',
          spacing: '8px',
          imageFit: 'contain',
        }}
        render={{
          slideInfo: ({ slide }) => (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-center max-w-md">
              <h3 className="font-serif text-lg">{slide.title}</h3>
              <p className="text-sm text-white/80">{slide.description}</p>
            </div>
          ),
        }}
      />

      {/* ===== CALL TO ACTION ===== */}
      <section className="py-16 bg-dark mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Ready to Create Something <span className="text-gold">Beautiful?</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Let's bring your fashion vision to life. From consultation to creation, 
              Adeola will guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/${contactInfo.phone}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gold text-white px-8 py-3 rounded-full font-medium hover:bg-terracotta transition-colors inline-flex items-center gap-2 justify-center"
              >
                <MessageCircle size={18} />
                <span>Start Your Journey</span>
              </a>
              <Link 
                to="/services" 
                className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center gap-2 justify-center"
              >
                <span>View Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery