import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '../common/WhatsAppButton'
import MeasurementOrderModal from '../common/MeasurementOrderModal'
import { useModal } from '../../context/ModalContext'

const Layout = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { isOrderModalOpen, closeOrderModal, selectedService } = useModal()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream text-dark">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main" className="flex-grow pt-16 md:pt-20">
        {children}
      </main>

      {/* Global Luxury Footer */}
      <Footer />

      {/* Global Interactive WhatsApp Button with Quick Replies */}
      <WhatsAppButton />

      {/* Global Interactive Measurement & Custom Order Modal */}
      <MeasurementOrderModal
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
        initialService={selectedService}
      />

      {/* Global Scroll-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-gold/90 text-white shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-gold hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  )
}

export default Layout