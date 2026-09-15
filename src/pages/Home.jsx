import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
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
  // ===== STATE =====
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)

  // ===== REFS FOR ANIMATIONS =====
  const statsRef = useRef(null)
  const featuredRef = useRef(null)
  const whyRef = useRef(null)
  const testimonialsRef = useRef(null)
  const servicesRef = useRef(null)
  const ctaRef = useRef(null)

  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const featuredInView = useInView(featuredRef, { once: true, margin: "-100px" })
  const whyInView = useInView(whyRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  // ===== EFFECTS =====
  // Preload hero image
  useEffect(() => {
    const img = new Image()
    img.src = 'https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg?auto=compress&cs=tinysrgb&w=1200&format=webp'
    img.onload = () => setIsHeroLoaded(true)
    img.onerror = () => setIsHeroLoaded(true)
    const timeout = setTimeout(() => setIsHeroLoaded(true), 3000)
    return () => clearTimeout(timeout)
  }, [])

  // ===== DATA =====
  const featuredImages = galleryImages.filter(img => img.featured).slice(0, 4)
  const displayImages = featuredImages.length > 0 ? featuredImages : galleryImages.slice(0, 4)
  const featuredTestimonials = testimonialsData.slice(0, 3)
  const popularServices = servicesData.filter(s => s.popular).slice(0, 4)
  const displayServices = popularServices.length > 0 ? popularServices : servicesData.slice(0, 4)

  // ===== HELPER FUNCTIONS =====
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? 'text-gold fill-gold' : 'text-gray-300'}
        aria-hidden="true"
      />
    ))
  }

  // ===== ANIMATION VARIANTS =====
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero banner"
      >
        {/* Background Image */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-opacity duration-1000 ${
            isHeroLoaded ? 'opacity-100 animate-subtleZoom' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg?auto=compress&cs=tinysrgb&w=1200&format=webp)',
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-dark/50" aria-hidden="true" />
        </div>

        {/* Blur Placeholder */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
            isHeroLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg?auto=compress&cs=tinysrgb&w=100)',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" aria-hidden="true" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Sparkles size={16} aria-hidden="true" />
              <span>Nigerian Fashion Designer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-4">
              Where Every Stitch <br />
              <span className="text-gold">Tells a Story</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
              Crafting timeless, custom-made fashion that celebrates the beauty 
              and uniqueness of every individual. From Aso Ebi to bridal wear, 
              Adeola brings your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/gallery" 
                className="btn-primary inline-flex items-center gap-2 justify-center hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                aria-label="View our gallery of creations"
              >
                <span>View Our Work</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a 
                href={`https://wa.me/${contactInfo.phone}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-2 justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <p className="text-sm text-white/60 flex items-center justify-center gap-1">
              <Shield size={14} className="text-gold" aria-hidden="true" />
              <span>Trusted by 500+ happy clients across Nigeria</span>
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 z-10 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-hidden="true"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section ref={statsRef} className="py-12 bg-white border-y border-gold/5" aria-label="Business statistics">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '10+', label: 'Years Experience', icon: Clock },
              { number: '500+', label: 'Happy Clients', icon: Users },
              { number: '100%', label: 'Custom Made', icon: Scissors },
              { number: '4.9⭐', label: 'Average Rating', icon: Star },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                variants={statsVariants}
                className="text-center hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-2"
                tabIndex={0}
                role="figure"
                aria-label={`${stat.number} ${stat.label}`}
              >
                <p className="text-3xl md:text-4xl font-serif text-gold font-bold">{stat.number}</p>
                <p className="text-sm text-dark/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== FEATURED WORK SECTION ===== */}
      <section ref={featuredRef} className="py-16 bg-cream" aria-label="Featured creations">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-gold font-medium text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
              Featured <span className="text-gold">Creations</span>
            </h2>
            <p className="text-dark/60 mt-2">
              A glimpse into the craftsmanship and attention to detail that defines every piece.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl mx-auto"
          >
            {displayImages.map((img, index) => (
              <motion.div 
                key={img.id} 
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl aspect-square bg-warmBeige"
              >
                <Link 
                  to="/gallery" 
                  className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-xl"
                  aria-label={`View ${img.title} in gallery`}
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
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="text-center mt-8"
          >
            <Link 
              to="/gallery" 
              className="text-gold font-medium hover:text-terracotta transition-colors inline-flex items-center gap-1 group focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="View full gallery"
            >
              View Full Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY ADEOLA SECTION ===== */}
      <section ref={whyRef} className="py-16 bg-white" aria-label="Why choose Adeola">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-gold font-medium text-sm tracking-wider uppercase">Why Choose Adeola</span>
            <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
              Craftsmanship You <span className="text-gold">Can Trust</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: Scissors, title: 'Expert Craftsmanship', desc: 'Over a decade of experience perfecting the art of fashion design.' },
              { icon: Heart, title: 'Personalized Service', desc: 'Every piece is designed specifically for you, with your vision in mind.' },
              { icon: Award, title: 'Quality Guarantee', desc: 'Premium fabrics and meticulous attention to every detail.' },
              { icon: Clock, title: 'Timely Delivery', desc: 'Respecting deadlines without compromising on quality.' },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
                className="text-center p-6 rounded-xl bg-cream/50 hover:bg-cream transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl"
                tabIndex={0}
                role="article"
                aria-label={item.title}
              >
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors duration-300" aria-hidden="true">
                  <item.icon size={28} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg text-dark mb-2">{item.title}</h3>
                <p className="text-sm text-dark/60">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section ref={testimonialsRef} className="py-16 bg-warmBeige" aria-label="Client testimonials">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-gold font-medium text-sm tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
              What Our <span className="text-gold">Clients Say</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id} 
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                tabIndex={0}
                role="article"
                aria-label={`Testimonial from ${testimonial.name}`}
              >
                <div className="flex items-center gap-1 mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-dark/70 text-sm leading-relaxed italic">"{testimonial.quote.slice(0, 120)}..."</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-cream">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium" aria-hidden="true">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-medium text-dark text-sm">{testimonial.name}</p>
                    <p className="text-xs text-dark/50">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            className="text-center mt-8"
          >
            <Link 
              to="/testimonials" 
              className="text-gold font-medium hover:text-terracotta transition-colors inline-flex items-center gap-1 group focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="Read all testimonials"
            >
              Read All Testimonials <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES QUICK LINKS ===== */}
      <section ref={servicesRef} className="py-16 bg-white" aria-label="Our services">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-gold font-medium text-sm tracking-wider uppercase">Services</span>
            <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
              What <span className="text-gold">She Offers</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {displayServices.map((service, index) => {
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
                <motion.div 
                  key={service.id} 
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
                >
                  <Link 
                    to="/services"
                    className="block bg-cream/50 hover:bg-cream rounded-xl p-5 text-center transition-all duration-300 hover:shadow-md border border-transparent hover:border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-xl"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <div className="text-3xl mb-2" aria-hidden="true">{emoji}</div>
                    <h4 className="font-serif text-dark font-medium">{service.title}</h4>
                    <p className="text-xs text-gold font-medium mt-1">{service.price}</p>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="text-center mt-8"
          >
            <Link 
              to="/services" 
              className="text-gold font-medium hover:text-terracotta transition-colors inline-flex items-center gap-1 group focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="View all services"
            >
              View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA BANNER ===== */}
      <section ref={ctaRef} className="py-16 bg-dark" aria-label="Call to action">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto text-center text-white"
          >
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
                className="bg-gold text-white px-8 py-3 rounded-full font-medium hover:bg-terracotta transition-colors inline-flex items-center gap-2 justify-center hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-dark"
                aria-label="Start your journey on WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Start Your Journey</span>
              </a>
              <Link 
                to="/gallery" 
                className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center gap-2 justify-center hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-dark"
                aria-label="View our gallery"
              >
                <span>View Gallery</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CSS ANIMATIONS ===== */}
      <style>{`
        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }

        @keyframes subtleZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-subtleZoom {
          animation: subtleZoom 20s ease-in-out infinite alternate;
        }

        /* Focus-visible for keyboard navigation */
        *:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 2px;
        }

        /* Skip to content link (for keyboard users) */
        .skip-to-content {
          position: absolute;
          top: -9999px;
          left: 50%;
          transform: translateX(-50%);
          background: #C9A84C;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0 0 0.5rem 0.5rem;
          z-index: 9999;
          font-weight: 600;
        }
        .skip-to-content:focus {
          top: 0;
        }
      `}</style>

      {/* ===== SKIP TO CONTENT LINK ===== */}
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>
    </div>
  )
}

export default Home