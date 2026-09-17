import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, Search, XCircle, Sparkles } from 'lucide-react'
import { navLinks } from '../../data/navLinks'
import { contactInfo } from '../../data/contactData'
import { useModal } from '../../context/ModalContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { openOrderModal } = useModal()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (searchOpen) {
      setSearchQuery('')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  // Close search when clicking outside or navigating away
  useEffect(() => {
    setSearchOpen(false)
    setSearchQuery('')
  }, [location.pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left Section - Hamburger + Logo (Mobile) */}
          <div className="flex items-center gap-2 md:gap-0">
            {/* Hamburger - Mobile Only */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-dark hover:text-gold transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Logo - Now left-aligned on mobile */}
            <Link 
              to="/" 
              className="font-serif text-xl md:text-2xl text-gold font-bold hover:text-terracotta transition-colors"
            >
              Adeola's Stitches
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs lg:text-sm font-medium transition-colors hover:text-gold relative group ${
                  location.pathname === link.path 
                    ? 'text-gold' 
                    : 'text-dark/70'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* Search Icon - Desktop */}
            <button
              onClick={toggleSearch}
              className="text-dark/70 hover:text-gold transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Custom Order Trigger - Desktop */}
            <button
              type="button"
              onClick={() => openOrderModal()}
              className="hidden lg:flex items-center gap-1.5 border border-gold/70 text-gold hover:bg-gold hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm"
            >
              <Sparkles size={13} />
              <span>Custom Order</span>
            </button>

            {/* WhatsApp CTA - Desktop */}
            <a 
              href={`https://wa.me/${contactInfo.phone}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gold text-white px-3.5 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium hover:bg-terracotta transition-colors shadow-sm"
            >
              <Phone size={14} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Right Section - Search Icon (Mobile Only) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleSearch}
              className="text-dark hover:text-gold transition-colors p-1"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide Down */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-cream">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    location.pathname === link.path 
                      ? 'bg-gold/10 text-gold' 
                      : 'text-dark/70 hover:bg-gold/5 hover:text-gold'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  closeMenu()
                  openOrderModal()
                }}
                className="flex items-center justify-center gap-2 border-2 border-gold text-gold hover:bg-gold hover:text-white px-6 py-2.5 rounded-full text-center text-sm font-semibold transition-colors mt-2"
              >
                <Sparkles size={16} />
                <span>Custom Order &amp; Measurements</span>
              </button>

              <a 
                href={`https://wa.me/${contactInfo.phone}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gold text-white px-6 py-2.5 rounded-full text-center text-sm font-medium hover:bg-terracotta transition-colors"
                onClick={closeMenu}
              >
                <Phone size={16} />
                <span>Contact on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Search Bar - Slide Down */}
        <div 
          className={`overflow-hidden transition-all duration-300 ${
            searchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-3 border-t border-cream">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for styles, services, or anything..."
                className="flex-1 px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm bg-white/80"
                autoFocus={searchOpen}
              />
              <button
                type="submit"
                className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-terracotta transition-colors"
                aria-label="Submit search"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                onClick={toggleSearch}
                className="text-dark/50 hover:text-dark transition-colors"
                aria-label="Close search"
              >
                <XCircle size={20} />
              </button>
            </form>
            <p className="text-xs text-dark/40 mt-2">
              Search across gallery, services, testimonials, and more.
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar