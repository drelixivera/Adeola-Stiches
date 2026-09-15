import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonialsData } from '../data/testimonialsData'

const Testimonials = () => {
  // State for carousel on mobile
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  // Get unique services for filtering
  const services = ['All', ...new Set(testimonialsData.map(t => t.service))]
  const [activeService, setActiveService] = useState('All')

  // Filter testimonials
  const filteredTestimonials = activeService === 'All'
    ? testimonialsData
    : testimonialsData.filter(t => t.service === activeService)

  // Calculate average rating
  const totalRating = filteredTestimonials.reduce((sum, t) => sum + t.rating, 0)
  const avgRating = filteredTestimonials.length > 0 
    ? (totalRating / filteredTestimonials.length).toFixed(1) 
    : 0

  // Get testimonials for carousel (max 3 on mobile)
  const carouselItems = filteredTestimonials.slice(currentIndex, currentIndex + 3)

  const nextSlide = () => {
    if (currentIndex + 3 < filteredTestimonials.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(Math.max(0, filteredTestimonials.length - 3))
    }
  }

  // Render star ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'text-gold fill-gold' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-gold font-medium text-sm tracking-wider uppercase">
          Client Stories
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-dark mt-2 mb-4">
          What Our <span className="text-gold">Clients Say</span>
        </h1>
        <p className="text-dark/60">
          Real experiences from real clients. Discover why people trust Adeola 
          with their fashion needs.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-serif text-gold font-bold">
              {testimonialsData.length}
            </p>
            <p className="text-sm text-dark/60">Reviews</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-serif text-gold font-bold">
              {avgRating}
            </p>
            <p className="text-sm text-dark/60">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-serif text-gold font-bold">
              {new Set(testimonialsData.map(t => t.service)).size}
            </p>
            <p className="text-sm text-dark/60">Services Used</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-serif text-gold font-bold">
              100%
            </p>
            <p className="text-sm text-dark/60">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Service Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => {
              setActiveService(service)
              setCurrentIndex(0)
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeService === service
                ? 'bg-gold text-white shadow-md'
                : 'bg-white/50 text-dark/60 hover:bg-gold/10 border border-gold/20'
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gold/5"
          >
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {renderStars(testimonial.rating)}
            </div>

            {/* Quote */}
            <div className="relative">
              <Quote size={20} className="text-gold/30 absolute -top-1 -left-1" />
              <p className="text-dark/70 text-sm leading-relaxed pl-6">
                "{testimonial.quote}"
              </p>
            </div>

            {/* Client Info */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-cream">
              {testimonial.image ? (
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium">
                  {testimonial.initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-dark text-sm">{testimonial.name}</p>
                <p className="text-xs text-dark/50">
                  {testimonial.location} • {testimonial.service}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-16">
          <p className="text-dark/60">No testimonials in this category yet.</p>
          <button 
            onClick={() => setActiveService('All')}
            className="mt-4 text-gold hover:underline"
          >
            View all reviews
          </button>
        </div>
      )}

      {/* Carousel Controls - Mobile Only */}
      {filteredTestimonials.length > 3 && (
        <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gold hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-dark/50">
            {currentIndex + 1} - {Math.min(currentIndex + 3, filteredTestimonials.length)} of {filteredTestimonials.length}
          </span>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gold hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-20 bg-warmBeige rounded-2xl p-8 md:p-12 text-center border border-gold/10">
        <h2 className="text-2xl md:text-3xl font-serif text-dark mb-3">
          Ready to Be Our Next Happy Client?
        </h2>
        <p className="text-dark/60 mb-6">
          Join our growing community of satisfied clients. Let's create something 
          beautiful for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
          </Link>
          <Link
            to="/gallery"
            className="btn-outline inline-flex items-center justify-center"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Testimonials