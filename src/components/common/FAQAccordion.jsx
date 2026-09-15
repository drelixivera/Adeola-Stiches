import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react'
import { contactInfo } from '../../data/contactData'

const FAQAccordion = () => {
  const [openId, setOpenId] = useState(1)
  const [activeCategory, setActiveCategory] = useState('All')

  const faqs = [
    {
      id: 1,
      category: 'Orders & Fitting',
      q: 'How long does custom tailoring take?',
      a: 'Standard bespoke orders usually take between 7 to 14 business days depending on design complexity and embellishments. Bridal gowns and large group Aso Ebi orders are best planned 3 to 6 weeks in advance. Express rush orders (3 to 5 days) are available on request!'
    },
    {
      id: 2,
      category: 'Delivery & Shipping',
      q: 'Do you make outfits for clients outside Ibadan or abroad?',
      a: 'Yes, absolutely! Over 40% of our clients reside in Lagos, Abuja, Port Harcourt, and diaspora destinations (the UK, US, Canada, Europe). We guide you through simple, precise video/virtual measurement instructions and ship door-to-door using trusted courier services.'
    },
    {
      id: 3,
      category: 'Fabric',
      q: 'Can I provide my own fabric, or do you source fabrics?',
      a: 'Both options are welcome. You are free to bring or dispatch your own Ankara, lace, or silk to our studio. Alternatively, Adeola can recommend and source premium fabrics directly from top markets in Ibadan and Lagos on your behalf.'
    },
    {
      id: 4,
      category: 'Orders & Fitting',
      q: 'What happens if my outfit requires minor adjustments after delivery?',
      a: 'Every piece created by Adeola is tailored with generous internal seam allowances. If any fine-tuning is needed, we provide complimentary fitting adjustments at our atelier or coordinate with you to ensure 100% satisfaction.'
    },
    {
      id: 5,
      category: 'Apprenticeship',
      q: 'Who is eligible for the fashion design apprenticeship program?',
      a: 'Anyone passionate about fashion design! We train complete beginners with zero sewing experience, as well as intermediate tailors looking to master professional pattern drafting, structural corsetry, and business management. Flexible 6-month and 12-month cohorts are available.'
    },
    {
      id: 6,
      category: 'Orders & Fitting',
      q: 'What are your payment terms?',
      a: 'We typically require a 70% deposit before cutting fabric and commencement of production, with the remaining 30% balance due upon completion and satisfactory final fitting.'
    }
  ]

  const categories = ['All', 'Orders & Fitting', 'Delivery & Shipping', 'Fabric', 'Apprenticeship']

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === activeCategory)

  const toggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="py-16 bg-white" aria-label="Frequently asked questions">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-gold font-medium text-xs sm:text-sm tracking-widest uppercase inline-flex items-center gap-1.5">
            <HelpCircle size={14} />
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2 mb-3">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-dark/60 text-sm">
            Everything you need to know about our bespoke services, fittings, and training.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-white shadow-sm'
                  : 'bg-cream text-dark/70 hover:bg-gold/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-gold bg-cream/30 shadow-sm' : 'border-gold/15 bg-white hover:border-gold/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-sm sm:text-base font-semibold text-dark">
                    {faq.q}
                  </span>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-gold text-white rotate-180' : 'bg-cream text-dark/60'
                  }`}>
                    <ChevronDown size={16} />
                  </span>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-gold/10 text-xs sm:text-sm text-dark/75 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Help Banner */}
        <div className="max-w-xl mx-auto mt-10 p-5 rounded-2xl bg-cream border border-gold/20 text-center">
          <p className="text-xs font-semibold text-dark mb-2">Have a question that isn't answered here?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${contactInfo.phone}?text=Hello%20Adeola!%20I%20have%20a%20question%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle size={14} />
              <span>Ask on WhatsApp</span>
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
            >
              <Phone size={14} />
              <span>Call the Studio</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQAccordion
