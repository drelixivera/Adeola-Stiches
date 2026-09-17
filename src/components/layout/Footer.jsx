import { Link } from 'react-router-dom'
import { 
  Scissors, Phone, Mail, MapPin, Clock, 
  Heart, ArrowRight, MessageCircle 
} from 'lucide-react'
import { contactInfo } from '../../data/contactData'

const InstagramIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Adeola', path: '/about' },
    { name: 'Creations Gallery', path: '/gallery' },
    { name: 'Bespoke Services', path: '/services' },
    { name: 'Apprenticeship Program', path: '/apprenticeship' },
    { name: 'Client Testimonials', path: '/testimonials' },
    { name: 'Contact Studio', path: '/contact' },
  ]

  const serviceLinks = [
    { name: 'Aso Ebi & Traditional Wear', path: '/services' },
    { name: 'Bridal Couture', path: '/services' },
    { name: 'Corporate Suits & Sets', path: '/services' },
    { name: 'Custom Bespoke Tailoring', path: '/services' },
    { name: 'Alterations & Fitting', path: '/services' },
  ]

  return (
    <footer className="bg-[#242424] text-cream/80 pt-16 pb-8 border-t border-gold/10 mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Bio (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-gold font-serif text-2xl font-bold hover:text-terracotta transition-colors">
              <Scissors size={24} className="text-gold transform -rotate-45" />
              <span>Adeola's Stitches</span>
            </Link>
            <p className="text-sm text-cream/70 leading-relaxed max-w-sm">
              Crafting timeless, custom-made Nigerian fashion that celebrates the beauty and individuality of every client. Where every stitch tells a story.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-white flex items-center justify-center transition-colors text-cream/80"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-white flex items-center justify-center transition-colors text-cream/80"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://wa.me/${contactInfo.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-white flex items-center justify-center transition-colors text-cream/80"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-white text-base font-semibold tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-cream/70 hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="text-gold/40 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Creations (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif text-white text-base font-semibold tracking-wide">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((s, idx) => (
                <li key={idx}>
                  <Link 
                    to={s.path}
                    className="text-cream/70 hover:text-gold transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Studio (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-white text-base font-semibold tracking-wide">
              Studio & Contact
            </h3>
            <div className="space-y-2.5 text-sm text-cream/70">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold shrink-0 mt-1" />
                <span>{contactInfo.location}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-gold shrink-0 mt-1" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-gold transition-colors">
                  {contactInfo.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-gold shrink-0 mt-1" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-gold transition-colors truncate">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-gold shrink-0 mt-1" />
                <span>{contactInfo.workingHours.weekdays}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${contactInfo.phone}?text=Hello%20Adeola!%20I'd%20like%20to%20consult%20with%20you%20about%20a%20custom%20piece.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-gold text-white hover:bg-terracotta transition-colors shadow-sm"
              >
                <MessageCircle size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {currentYear} Adeola Fashion Designer. All rights reserved.</p>
          
          <div className="flex gap-4 text-xs">
            <Link to="/contact" className="hover:text-gold transition-colors">Privacy & Inquiries</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-gold transition-colors">Heritage</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer