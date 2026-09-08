import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { contactInfo } from '../../data/contactData'

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show button after scrolling down 300px
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleOpen = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  const quickMessages = [
    { label: 'I want to place an order', message: 'I want to place an order for a custom outfit.' },
    { label: 'I want to learn fashion design', message: 'I am interested in your apprenticeship program.' },
    { label: 'I need alterations', message: 'I need alterations for a garment.' },
    { label: 'I have a general inquiry', message: 'I have a general inquiry about your services.' },
  ]

  const handleQuickMessage = (message) => {
    window.open(
      `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    )
    close()
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className="w-14 h-14 bg-gold rounded-full shadow-lg flex items-center justify-center hover:bg-terracotta transition-colors relative"
        aria-label="WhatsApp"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={28} className="text-white" />
        )}
      </button>

      {/* Quick Actions Popup */}
      <div className={`absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl p-3 w-64 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <p className="text-xs text-dark/50 mb-2 text-center">Quick replies</p>
        <div className="space-y-1.5">
          {quickMessages.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuickMessage(item.message)}
              className="w-full text-left text-sm text-dark/70 hover:bg-cream px-3 py-2 rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="border-t border-cream mt-2 pt-2">
          <a
            href={`https://wa.me/${contactInfo.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-sm text-gold font-medium hover:underline block"
          >
            Open WhatsApp →
          </a>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppButton