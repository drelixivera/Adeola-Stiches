import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { contactInfo } from '../../data/contactData'

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Show WhatsApp button after scrolling 250px or immediately on mobile
      setIsVisible(window.scrollY > 250)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close popup when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const quickMessages = [
    { label: '✨ Order custom outfit', message: 'Hello Adeola! I would like to place an order for a custom outfit.' },
    { label: '👗 Aso Ebi / Traditional inquiry', message: 'Hello Adeola! I have an upcoming event and would like to inquire about Aso Ebi styling.' },
    { label: '🎓 Apprenticeship program', message: "Hello Adeola! I'm interested in enrolling in your fashion design apprenticeship program." },
    { label: '✂️ Alterations & fitting', message: 'Hello Adeola! I need expert alterations and fitting for my clothing.' },
  ]

  const handleQuickMessage = (message) => {
    window.open(
      `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setIsOpen(false)
  }

  return (
    <div 
      ref={popupRef}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* Quick Inquiries Popover Menu */}
      <div 
        className={`absolute bottom-16 right-0 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gold/20 p-4 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-cream">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
              <MessageCircle size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-dark">Chat with Adeola</p>
              <p className="text-[11px] text-green-600 font-medium">● Online / Replies in 24h</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            className="text-dark/40 hover:text-dark p-1 rounded-full transition-colors"
            aria-label="Close message popup"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-[11px] text-dark/60 mt-3 mb-2 font-medium">
          Choose a quick inquiry or write directly:
        </p>

        <div className="space-y-1.5">
          {quickMessages.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickMessage(item.message)}
              className="w-full text-left text-xs text-dark/80 hover:text-dark hover:bg-gold/10 px-3 py-2 rounded-xl transition-all flex items-center justify-between group"
            >
              <span>{item.label}</span>
              <Send size={12} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <div className="border-t border-cream mt-3 pt-3">
          <a
            href={`https://wa.me/${contactInfo.phone}?text=Hello%20Adeola!%20I'd%20like%20to%20chat%20with%20you.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-2 px-3 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MessageCircle size={14} />
            <span>Open Direct WhatsApp Chat</span>
          </a>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={toggleOpen}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#1EBE5D] hover:scale-110 active:scale-95 transition-all duration-300 relative group focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Open WhatsApp options"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} className="text-white transition-transform rotate-90 duration-200" />
        ) : (
          <>
            <MessageCircle size={28} className="text-white fill-white" />
            {/* Notification ripple dot */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gold border-2 border-white"></span>
            </span>
          </>
        )}
      </button>
    </div>
  )
}

export default WhatsAppButton