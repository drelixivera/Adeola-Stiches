import { useState } from 'react'
import { X, Star, Heart, MessageCircle, Sparkles } from 'lucide-react'
import { contactInfo } from '../../data/contactData'

const ReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [service, setService] = useState('Aso Ebi Collection')
  const [quote, setQuote] = useState('')

  if (!isOpen) return null

  const services = [
    'Aso Ebi Collection',
    'Bridal Collection',
    'Corporate Wear / Suit',
    'Custom Bespoke Dress',
    'Apprenticeship Program',
    'Alterations & Fitting',
    'Other'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const stars = '⭐'.repeat(rating)
    const msg = `🌟 *CLIENT REVIEW FOR ADEOLA FASHION DESIGNER* 🌟\n\n` +
      `👤 *Name:* ${name}\n` +
      `📍 *Location:* ${location || 'Nigeria'}\n` +
      `✂️ *Service:* ${service}\n` +
      `⭐ *Rating:* ${rating}/5 ${stars}\n\n` +
      `💬 *Review / Testimonial:*\n"${quote}"\n\n` +
      `_Submitted to Adeola Fashion Designer Website_`

    window.open(
      `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gold/30 p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-cream">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
              <Star size={18} className="fill-gold" />
            </div>
            <div>
              <h3 id="review-title" className="font-serif text-lg font-bold text-dark">
                Share Your Experience
              </h3>
              <p className="text-xs text-dark/60">
                Your feedback inspires our craftsmanship!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-dark/40 hover:text-dark p-1 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close review modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Star Rating Selection */}
          <div className="text-center py-2 bg-cream/50 rounded-xl border border-gold/10">
            <p className="text-xs text-dark/70 font-medium mb-1.5">How was your experience?</p>
            <div className="flex justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  aria-label={`Rate ${num} stars`}
                >
                  <Star
                    size={26}
                    className={`${
                      num <= (hoverRating || rating)
                        ? 'text-gold fill-gold drop-shadow-sm'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gold font-semibold mt-1">
              {rating === 5 ? 'Exceptional! 💖' : rating === 4 ? 'Very Good! ✨' : 'Good 👌'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-dark/70 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bukola Adeyemi"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gold/30 focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-dark/70 mb-1">
                Your City / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ibadan, Lagos, UK"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gold/30 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark/70 mb-1">
              Service Received
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gold/30 focus:outline-none focus:border-gold bg-white"
            >
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark/70 mb-1">
              Your Review &amp; Words for Adeola *
            </label>
            <textarea
              required
              rows={3}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Tell us what you loved about your outfit, fitting, or learning experience..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gold/30 focus:outline-none focus:border-gold"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-cream">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-dark/70 hover:text-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-1.5 shadow-md"
            >
              <MessageCircle size={15} />
              <span>Send Review on WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewModal
