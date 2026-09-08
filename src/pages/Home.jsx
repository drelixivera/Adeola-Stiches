import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Scissors, Heart, Star, Clock, Award, Users, 
  Shield, Sparkles, MessageCircle, ArrowRight,
  ChevronDown
} from 'lucide-react'
import { galleryImages } from '../data/galleryData'
import { testimonialsData } from '../data/testimonialsData'
import { servicesData } from '../data/servicesData'
import { contactInfo } from '../data/contactData'

const Home = () => {
  // State for hero image loading
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)

  // Preload the hero image
  useEffect(() => {
    const img = new Image()
    img.src = 'https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg?auto=compress&cs=tinysrgb&w=1200&format=webp'
    img.onload = () => setIsHeroLoaded(true)
    img.onerror = () => setIsHeroLoaded(true)
    const timeout = setTimeout(() => setIsHeroLoaded(true), 3000)
    return () => clearTimeout(timeout)
  }, [])

  // Get featured gallery images
  const featuredImages = galleryImages.filter(img => img.featured).slice(0, 4)
  const displayImages = featuredImages.length > 0 ? featuredImages : galleryImages.slice(0, 4)

  // Get featured testimonials
  const featuredTestimonials = testimonialsData.slice(0, 3)

  // Get popular services
  const popularServices = servicesData.filter(s => s.popular).slice(0, 4)
  const displayServices = popularServices.length > 0 ? popularServices : servicesData.slice(0, 4)

  // Helper to render stars
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? 'text-gold fill-gold' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION WITH OPTIMIZED BACKGROUND ===== */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Blur Placeholder - Shows immediately */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg?auto=compress&cs=tinysrgb&w=100)',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            opacity: isHeroLoaded ? 0 : 1,
          }}
        />

        {/* Main Background Image - Loads in background with WebP */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-opacity duration-1000 ${
            isHeroLoaded ? 'opacity-100 animate-subtleZoom' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg?auto=compress&cs=tinysrgb&w=1200&format=webp)',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-dark/50" />
        </div>

        {/* Decorative Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Small badge - Fade in */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20 animate-fadeInUp">
              <Sparkles size={16} />
              <span>Nigerian Fashion Designer</span>
            </div>

            {/* Main Heading - Fade in with delay */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Where Every Stitch <br />
              <span className="text-gold">Tells a Story</span>
            </h1>

            {/* Subheading - Fade in with delay */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Crafting timeless, custom-made fashion that celebrates the beauty 
              and uniqueness of every individual. From Aso Ebi to bridal wear, 
              Adeola brings your vision to life.
            </p>

            {/* CTA Buttons - Fade in with delay */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <Link to="/gallery" className="btn-primary inline-flex items-center gap-2 justify-center">
                <span>View Our Work</span>
                <ArrowRight size={18} />
              </Link>
              <a 
                href={`https://wa.me/${contactInfo.phone}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-2 justify-center"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Indicator - Fade in with delay */}
            <p className="text-sm text-white/60 flex items-center justify-center gap-1 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <Shield size={14} className="text-gold" />
              <span>Trusted by 500+ happy clients across Nigeria</span>
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce z-10 hidden md:block">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 bg-white border-y border-gold/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-gold font-bold">10+</p>
              <p className="text-sm text-dark/50">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-gold font-bold">500+</p>
              <p className="text-sm text-dark/50">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-gold font-bold">100%</p>
              <p className="text-sm text-dark/50">Custom Made</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-gold font-bold">4.9⭐</p>
              <p className="text-sm text-dark/50">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED WORK SECTION ===== */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-gold font-medium text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
              Featured <span className="text-gold">Creations</span>
            </h2>
            <p className="text-dark/60 mt-2">
              A glimpse into the craftsmanship and attention to detail that defines every piece.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {displayImages.map((img) => (
              <Link 
                key={img.id} 
                to="/gallery"
                className="group relative overflow-hidden rounded-xl aspect-square bg-warmBeige"
              >
                <img 
                  src={img.image} 
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium px-3 py-1.5 bg-gold/90 rounded-full">
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/gallery" className="text-gold font-medium hover:text-terracotta transition-colors inline-flex items-center gap-1">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY ADEOLA SECTION ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-gold font-medium text-sm tracking-wider uppercase">Why Choose Adeola</span>
            <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
              Craftsmanship You <span className="text-gold">Can Trust</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-cream/50 hover:bg-cream transition-colors">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-lg text-dark mb-2">Expert Craftsmanship</h3>
              <p className="text-sm text-dark/60">Over a decade of experience perfecting the art of fashion design.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-cream/50 hover:bg-cream transition-colors">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-lg text-dark mb-2">Personalized Service</h3>
              <p className="text-sm text-dark/60">Every piece is designed specifically for you, with your vision in mind.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-cream/50 hover:bg-cream transition-colors">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-lg text-dark mb-2">Quality Guarantee</h3>
              <p className="text-sm text-dark/60">Premium fabrics and meticulous attention to every detail.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-cream/50 hover:bg-cream transition-colors">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-lg text-dark mb-2">Timely Delivery</h3>
              <p className="text-sm text-dark/60">Respecting deadlines without compromising on quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-16 bg-warmBeige">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-gold font-medium text-sm tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
              What Our <span className="text-gold">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gold/5">
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-dark/70 text-sm leading-relaxed italic">"{testimonial.quote.slice(0, 120)}..."</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-cream">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-medium text-dark text-sm">{testimonial.name}</p>
                    <p className="text-xs text-dark/50">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/testimonials" className="text-gold font-medium hover:text-terracotta transition-colors inline-flex items-center gap-1">
              Read All Testimonials <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES QUICK LINKS ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-gold font-medium text-sm tracking-wider uppercase">Services</span>
            <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
              What <span className="text-gold">She Offers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {displayServices.map((service) => {
              const iconMap = {
                'Scissors': '✂️',
                'Sparkles': '✨',
                'Heart': '❤️',
                'Briefcase': '💼',
                'Sun': '☀️',
                'Smile': '😊',
                'RefreshCw': '🔄',
                'GraduationCap': '🎓',
              }
              const emoji = iconMap[service.icon] || '👗'
              
              return (
                <Link 
                  key={service.id} 
                  to="/services"
                  className="bg-cream/50 hover:bg-cream rounded-xl p-5 text-center transition-all duration-300 hover:shadow-md border border-transparent hover:border-gold/20"
                >
                  <div className="text-3xl mb-2">{emoji}</div>
                  <h4 className="font-serif text-dark font-medium">{service.title}</h4>
                  <p className="text-xs text-gold font-medium mt-1">{service.price}</p>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Link to="/services" className="text-gold font-medium hover:text-terracotta transition-colors inline-flex items-center gap-1">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA BANNER ===== */}
      <section className="py-16 bg-dark">
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
                to="/gallery" 
                className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center gap-2 justify-center"
              >
                <span>View Gallery</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CSS ANIMATIONS ===== */}
      <style>{`
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-subtleZoom {
          animation: subtleZoom 20s ease-in-out infinite alternate;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 10px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Home