import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Phone, Mail, MapPin, Clock, 
  MessageCircle, Send, CheckCircle2, ArrowRight
} from 'lucide-react'
import { contactInfo } from '../data/contactData'

// Lucide React doesn't have Instagram/Facebook as default exports
// We'll create simple SVG icons or use the ones that exist
const InstagramIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = `Hello Adeola! My name is ${formData.name}. ${formData.message}`
    window.open(
      `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    )
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const quickInquiries = [
    {
      label: 'I want to place an order',
      message: 'I want to place an order for a custom outfit.',
    },
    {
      label: 'I want to learn fashion design',
      message: 'I am interested in your apprenticeship program.',
    },
    {
      label: 'I need alterations',
      message: 'I need alterations for a garment.',
    },
    {
      label: 'I have a general inquiry',
      message: 'I have a general inquiry about your services.',
    },
  ]

  const handleQuickInquiry = (message) => {
    window.open(
      `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-gold font-medium text-sm tracking-wider uppercase">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-dark mt-2 mb-4">
          Let's <span className="text-gold">Connect</span>
        </h1>
        <p className="text-dark/60">
          Ready to create something beautiful? Reach out to Adeola and let's bring 
          your fashion vision to life.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info - Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* WhatsApp Card - Primary CTA */}
            <div className="bg-gold/10 rounded-2xl p-6 border border-gold/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h3 className="font-serif text-xl text-dark">WhatsApp</h3>
              </div>
              <p className="text-dark/70 text-sm mb-4">
                Fastest way to reach Adeola. Response within 24 hours.
              </p>
              <a
                href={`https://wa.me/${contactInfo.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gold text-white w-full py-3 rounded-full font-medium hover:bg-terracotta transition-colors"
              >
                <MessageCircle size={18} />
                <span>Chat Now</span>
              </a>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif text-lg text-dark mb-4">Contact Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-dark/50">Phone</p>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-dark hover:text-gold transition-colors"
                    >
                      {contactInfo.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-dark/50">Email</p>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-dark hover:text-gold transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-dark/50">Location</p>
                    <p className="text-dark">{contactInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-dark/50">Working Hours</p>
                    <p className="text-dark text-sm">{contactInfo.workingHours.weekdays}</p>
                    <p className="text-dark text-sm">{contactInfo.workingHours.saturday}</p>
                    <p className="text-dark/50 text-sm">{contactInfo.workingHours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif text-lg text-dark mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href={contactInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-cream rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={contactInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-cream rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={contactInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-cream rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="font-serif text-xl text-dark mb-2">Send a Message</h3>
              <p className="text-dark/60 text-sm mb-6">
                Fill out the form below and Adeola will get back to you within 24 hours.
              </p>

              {/* Quick Inquiry Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {quickInquiries.map((inquiry, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickInquiry(inquiry.message)}
                    className="text-xs bg-cream text-dark/70 px-3 py-1.5 rounded-full hover:bg-gold hover:text-white transition-colors"
                  >
                    {inquiry.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-cream rounded-lg focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark/70 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-cream rounded-lg focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your email (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark/70 mb-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-cream rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell Adeola about your project, ideas, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3 rounded-lg font-medium hover:bg-terracotta transition-colors"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send via WhatsApp</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-dark/40 text-center">
                  By submitting, you'll open WhatsApp to send your message directly to Adeola.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-16 bg-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-serif mb-3">
            Ready to Make a Statement?
          </h2>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Every piece of clothing tells a story. Let Adeola help you tell yours 
            through beautifully crafted, custom-made fashion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${contactInfo.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta transition-colors"
            >
              <MessageCircle size={18} />
              <span>Start Your Journey</span>
            </a>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              <span>View Gallery</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact