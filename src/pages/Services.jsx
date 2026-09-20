import { useState } from 'react'
import { Link } from 'react-router-dom'
import { servicesData } from '../data/servicesData'
import { 
  Scissors, Sparkles, Heart, Briefcase, 
  Sun, Smile, RefreshCw, GraduationCap,
  CheckCircle, Phone, MessageCircle,
  ChevronDown, ChevronUp
} from 'lucide-react'
import { contactInfo } from '../data/contactData'
import { useModal } from '../hooks/useModal'
import ProcessTimeline from '../components/common/ProcessTimeline'
import FAQAccordion from '../components/common/FAQAccordion'

// Map icon names to components
const iconMap = {
  Scissors: Scissors,
  Sparkles: Sparkles,
  Heart: Heart,
  Briefcase: Briefcase,
  Sun: Sun,
  Smile: Smile,
  RefreshCw: RefreshCw,
  GraduationCap: GraduationCap,
}

// Maps service card titles → matching option in MeasurementOrderModal's Step 1
const SERVICE_TO_GARMENT = {
  'Custom Tailoring': 'Bespoke Custom Dress',
  'Aso Ebi & Traditional Wear': 'Aso Ebi & Traditional',
  'Bridal Collection': 'Bridal Couture',
  'Corporate & Office Wear': 'Corporate & Office Suit',
  'Casual & Everyday Wear': 'Everyday Casual Chic',
  "Children's Fashion": "Children's Fashion",
  'Alterations & Repairs': 'Alterations & Repairs',
  'Apprenticeship Program': 'Apprenticeship / Learning',
}

const Services = () => {
  const [expandedService, setExpandedService] = useState(null)
  const { openOrderModal } = useModal()

  // Get unique categories for filtering
  const categories = ['All', ...new Set(servicesData.map(s => s.category))]
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter services based on active category
  const filteredServices = activeCategory === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory)

  // Toggle expanded view for mobile
  const toggleExpand = (id) => {
    setExpandedService(expandedService === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-gold font-medium text-sm tracking-wider uppercase">
          What She Offers
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-dark mt-2 mb-4">
          Services <span className="text-gold">&amp; Expertise</span>
        </h1>
        <p className="text-dark/60">
          From custom tailoring to fashion apprenticeships, explore the range of 
          professional services Adeola offers.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gold text-white shadow-md'
                : 'bg-white/50 text-dark/60 hover:bg-gold/10 border border-gold/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredServices.map((service) => {
          const IconComponent = iconMap[service.icon] || Scissors
          const isExpanded = expandedService === service.id
          const isPopular = service.popular

          return (
            <div
              key={service.id}
              className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border ${
                isPopular ? 'border-gold/50' : 'border-transparent'
              }`}
            >
              {/* Service Header - Always Visible */}
              <div className="p-6 cursor-pointer" onClick={() => toggleExpand(service.id)}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPopular ? 'bg-gold text-white' : 'bg-gold/10 text-gold'
                  }`}>
                    <IconComponent size={24} />
                  </div>

                  {/* Title and Price */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-xl text-dark">
                        {service.title}
                      </h3>
                      {isPopular && (
                        <span className="bg-gold text-white text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gold font-medium mt-1">
                      {service.price}
                    </p>
                    <p className="text-sm text-dark/60 mt-1 line-clamp-2 md:hidden">
                      {service.description}
                    </p>
                  </div>

                  {/* Mobile Expand Toggle */}
                  <div className="md:hidden">
                    {isExpanded ? (
                      <ChevronUp size={20} className="text-dark/40" />
                    ) : (
                      <ChevronDown size={20} className="text-dark/40" />
                    )}
                  </div>
                </div>

                {/* Description - Visible on desktop always, mobile only when expanded */}
                <div className={`mt-3 transition-all duration-300 ${
                  isExpanded ? 'block' : 'hidden md:block'
                }`}>
                  <p className="text-dark/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features - Visible when expanded on mobile, always on desktop */}
              <div className={`px-6 pb-6 transition-all duration-300 ${
                isExpanded ? 'block' : 'hidden md:block'
              }`}>
                <div className="border-t border-cream pt-4">
                  <h4 className="text-sm font-medium text-dark mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-dark/70">
                        <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => openOrderModal(SERVICE_TO_GARMENT[service.title] || service.title)}
                      className="flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-terracotta transition-colors"
                    >
                      <MessageCircle size={16} />
                      <span>Request Quote</span>
                    </button>
                    <a
                      href={`https://wa.me/${contactInfo.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-gold text-gold px-4 py-2 rounded-full text-sm font-medium hover:bg-gold hover:text-white transition-colors"
                    >
                      <Phone size={16} />
                      <span>Call to Inquire</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <p className="text-dark/60">No services in this category yet.</p>
          <button 
            onClick={() => setActiveCategory('All')}
            className="mt-4 text-gold hover:underline"
          >
            View all services
          </button>
        </div>
      )}

      {/* Bespoke Journey Timeline */}
      <ProcessTimeline onOpenOrderModal={() => openOrderModal()} />

      {/* FAQ Accordion */}
      <FAQAccordion />

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-20 bg-warmBeige rounded-2xl p-8 md:p-12 text-center border border-gold/10">
        <h2 className="text-2xl md:text-3xl font-serif text-dark mb-3">
          Not Sure What You Need?
        </h2>
        <p className="text-dark/60 mb-6">
          Let's have a conversation. Adeola will listen to your ideas and help you 
          create the perfect piece.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${contactInfo.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>
          <Link
            to="/gallery"
            className="btn-outline inline-flex items-center justify-center"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Services