import { useSearchParams, Link } from 'react-router-dom'
import { searchContent, groupSearchResults } from '../data/searchIndex'
import { 
  Search, Image, Scissors, Star, User, GraduationCap, 
  ArrowRight, XCircle
} from 'lucide-react'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  // If no query, show empty state
  if (!query || query.trim().length < 2) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <Search size={48} className="text-gold/30 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-dark mb-2">Search for anything</h2>
          <p className="text-dark/60 text-sm">
            Type at least 2 characters to search across the entire site.
          </p>
          <Link 
            to="/" 
            className="inline-block mt-6 text-gold hover:text-terracotta transition-colors"
          >
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  // Perform search
  const results = searchContent(query)
  const groupedResults = groupSearchResults(results)

  // Icon mapping for result types
  const iconMap = {
    gallery: <Image size={18} />,
    service: <Scissors size={18} />,
    testimonial: <Star size={18} />,
    about: <User size={18} />,
    apprenticeship: <GraduationCap size={18} />,
  }

  // Color mapping for result types
  const colorMap = {
    gallery: 'border-gold',
    service: 'border-terracotta',
    testimonial: 'border-warmBeige',
    about: 'border-gold/50',
    apprenticeship: 'border-gold/70',
  }

  // Badge color mapping
  const badgeColorMap = {
    gallery: 'bg-gold/10 text-gold',
    service: 'bg-terracotta/10 text-terracotta',
    testimonial: 'bg-warmBeige/50 text-dark',
    about: 'bg-gold/20 text-gold',
    apprenticeship: 'bg-gold/30 text-gold',
  }

  // calling the document title
  

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Search size={24} className="text-gold" />
          <h1 className="text-2xl md:text-3xl font-serif text-dark">
            Search Results
          </h1>
        </div>
        <p className="text-dark/60">
          Found <span className="font-medium text-gold-text">{results.length}</span> result{results.length !== 1 ? 's' : ''} 
          for "<span className="font-medium text-dark">{query}</span>"
          <Link 
            to="/" 
            className="ml-4 text-sm text-gold-text hover:text-terracotta transition-colors inline-flex items-center gap-1"
          >
            <XCircle size={14} />
            Clear search
          </Link>
        </p>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gold/40" />
          </div>
          <h3 className="text-xl font-serif text-dark mb-2">No results found</h3>
          <p className="text-dark/60 text-sm">
            We couldn't find anything matching "{query}". Try a different search term 
            or browse our categories below.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Link to="/gallery" className="text-sm text-gold-text hover:underline">Gallery</Link>
            <span className="text-dark/20">•</span>
            <Link to="/services" className="text-sm text-gold-text hover:underline">Services</Link>
            <span className="text-dark/20">•</span>
            <Link to="/testimonials" className="text-sm text-gold-text hover:underline">Testimonials</Link>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {groupedResults.map((group) => (
            <div key={group.type}>
              {/* Group Header */}
              <div className="flex items-center gap-2 mb-3 border-b border-gold/10 pb-2">
                <span className={`p-1 rounded ${badgeColorMap[group.type]}`}>
                  {iconMap[group.type]}
                </span>
                <h2 className="text-lg font-serif text-dark">
                  {group.label}
                </h2>
                <span className="text-sm text-dark/40">
                  ({group.items.length})
                </span>
              </div>

              {/* Group Items */}
              <div className="space-y-3">
                {group.items.map((item, index) => (
                  <Link
                    key={`${item.type}-${item.id}-${index}`}
                    to={item.url}
                    className={`block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${colorMap[item.type]}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Result Icon/Image */}
                      {item.image ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-cream">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-gold text-xl">
                            {item.type === 'about' && '👩‍🎨'}
                            {item.type === 'apprenticeship' && '👨‍🎓'}
                            {item.type === 'service' && '✂️'}
                            {item.type === 'testimonial' && '⭐'}
                            {item.type === 'gallery' && '🖼️'}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-dark hover:text-gold transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-dark/60 line-clamp-2 mt-0.5">
                          {item.snippet || item.content}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColorMap[item.type]}`}>
                            {item.type}
                          </span>
                          {item.category && (
                            <span className="text-xs text-dark/40">
                              {item.category}
                            </span>
                          )}
                          {item.location && (
                            <span className="text-xs text-dark/40">
                              📍 {item.location}
                            </span>
                          )}
                          <span className="text-xs text-gold/60 ml-auto inline-flex items-center gap-1">
                            View <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-cream">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-dark/50">
            Can't find what you're looking for? 
            <span className="hidden sm:inline"> </span>
            <Link to="/contact" className="text-gold-text hover:underline">
              Contact Adeola directly
            </Link>
          </p>
          <Link 
            to="/" 
            className="text-sm text-gold-text/60 hover:text-gold transition-colors flex items-center gap-1"
          >
            <span>← Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchResults