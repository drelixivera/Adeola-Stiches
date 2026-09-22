import { Link } from 'react-router-dom'
import { Scissors, Home, Image, MessageCircle, ArrowRight } from 'lucide-react'
import { contactInfo } from '../data/contactData'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const NotFound = () => {
  // calling use document title
  useDocumentTitle('Page Not Found')
  
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-gradient-to-b from-cream via-white to-cream">
      <div className="max-w-xl mx-auto text-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 text-gold mb-6 shadow-sm border border-gold/20 animate-pulse">
          <Scissors size={38} className="transform -rotate-45" />
        </div>

        <p className="text-sm font-semibold tracking-widest uppercase text-gold-text mb-2">
          404 — Page Not Found
        </p>

        <h1 className="text-4xl sm:text-5xl font-serif text-dark font-bold mb-4 leading-tight">
          This Pattern Isn’t in <br />
          <span className="text-gold">Our Atelier</span>
        </h1>

        <p className="text-dark/70 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The page or design you’re looking for might have been moved, renamed, or never existed. 
          Let’s get you back to the collection.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/gallery"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <Image size={18} />
            <span>Browse Gallery</span>
          </Link>
          <a
            href={`https://wa.me/${contactInfo.phone}?text=Hello%20Adeola!%20I%20got%20lost%20on%20your%20website%20and%20need%20assistance.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-dark/20 text-dark/80 hover:text-dark hover:border-gold transition-colors text-sm font-medium"
          >
            <MessageCircle size={18} className="text-green-600" />
            <span>Need Help? WhatsApp Us</span>
          </a>
        </div>

        {/* Helpful links */}
        <div className="pt-8 border-t border-gold/10">
          <p className="text-xs uppercase tracking-wider text-dark/50 mb-3 font-semibold">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/services" className="text-dark/70 hover:text-gold transition-colors inline-flex items-center gap-1">
              <span>Bespoke Services</span>
              <ArrowRight size={12} />
            </Link>
            <span className="text-gold/30">•</span>
            <Link to="/apprenticeship" className="text-dark/70 hover:text-gold transition-colors inline-flex items-center gap-1">
              <span>Apprenticeship Program</span>
              <ArrowRight size={12} />
            </Link>
            <span className="text-gold/30">•</span>
            <Link to="/contact" className="text-dark/70 hover:text-gold transition-colors inline-flex items-center gap-1">
              <span>Contact Atelier</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
