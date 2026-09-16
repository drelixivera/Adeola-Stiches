import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Scissors, GraduationCap, Clock, Award, Users, 
  CheckCircle, MessageCircle, BookOpen, TrendingUp,
  Star, ArrowRight
} from 'lucide-react'
import { contactInfo } from '../data/contactData'

const Apprenticeship = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    let message = `Hello Adeola! My name is ${formData.name}. I'm interested in your apprenticeship program.`
    if (formData.email) message += `\n📧 Email: ${formData.email}`
    if (formData.phone) message += `\n📞 Phone: ${formData.phone}`
    if (formData.message) message += `\n\n${formData.message}`
    window.open(
    `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`,
    '_blank'
  )
    setIsSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 3000)
}

  const handleQuickApply = () => {
    const message = "Hello Adeola! I'm interested in your apprenticeship program. Can you tell me more about it?"
    window.open(
      `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  // Program highlights
  const highlights = [
    {
      icon: Scissors,
      title: 'Hands-On Training',
      description: 'Learn by doing. Practical, real-world experience from day one.'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'From pattern making to business management — everything you need.'
    },
    {
      icon: TrendingUp,
      title: 'Business Skills',
      description: 'Learn how to turn your passion into a profitable business.'
    },
    {
      icon: Users,
      title: 'Personal Mentorship',
      description: 'One-on-one guidance from an experienced fashion professional.'
    }
  ]

  // What you'll learn
  const curriculum = [
    'Pattern making and drafting',
    'Cutting and stitching techniques',
    'Fabric selection and sourcing',
    'Garment construction',
    'Fitting and alterations',
    'Quality control',
    'Business management',
    'Customer service skills'
  ]

  // Testimonials from apprentices
  const apprenticeTestimonials = [
    {
      name: 'Tunde Balogun',
      location: 'Port Harcourt',
      quote: 'I completed Adeola\'s apprenticeship program and it was life-changing. She not only taught me how to sew but also how to run a fashion business. Her mentorship and patience are unmatched. I now run my own successful tailoring business!',
      rating: 5
    },
    {
      name: 'Chioma Nwosu',
      location: 'Lagos',
      quote: 'Adeola is an incredible teacher. She breaks down complex techniques into simple, understandable steps. I went from knowing nothing about sewing to being able to create complete outfits. Highly recommend!',
      rating: 5
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-gold font-medium text-sm tracking-wider uppercase">
          Apprenticeship Program
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-dark mt-2 mb-4">
          Learn Fashion <span className="text-gold">Design</span>
        </h1>
        <p className="text-dark/60 text-lg">
          Start your journey in fashion design with hands-on training from an 
          experienced professional.
        </p>
      </div>

      {/* Program Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
        {highlights.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gold/5">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-lg text-dark mb-2">{item.title}</h3>
              <p className="text-sm text-dark/60">{item.description}</p>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Program Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Program Overview */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-dark mb-4">Program Overview</h2>
              <p className="text-dark/70 leading-relaxed mb-4">
                Adeola's Fashion Design Apprenticeship is a comprehensive program designed 
                to take you from beginner to competent fashion designer. Whether you're 
                starting from scratch or looking to refine your skills, this program 
                provides the training you need.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-dark/50">Duration</p>
                  <p className="text-dark font-medium">6-12 months (flexible)</p>
                </div>
                <div>
                  <p className="text-sm text-dark/50">Format</p>
                  <p className="text-dark font-medium">Hands-on practical training</p>
                </div>
                <div>
                  <p className="text-sm text-dark/50">Certificate</p>
                  <p className="text-dark font-medium">Completion certificate provided</p>
                </div>
                <div>
                  <p className="text-sm text-dark/50">Start Date</p>
                  <p className="text-dark font-medium">Rolling admission</p>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-dark mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {curriculum.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-dark/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apprentice Testimonials */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-dark mb-4">From Our Apprentices</h2>
              <div className="space-y-4">
                {apprenticeTestimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-gold pl-4 py-2">
                    <div className="flex items-center gap-1 mb-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < testimonial.rating ? 'text-gold fill-gold' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className="text-dark/70 text-sm italic">"{testimonial.quote}"</p>
                    <p className="text-sm text-dark font-medium mt-1">
                      — {testimonial.name}, {testimonial.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Apply / Contact */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Apply Card */}
              <div className="bg-gold/10 rounded-2xl p-6 border border-gold/20">
                <h3 className="font-serif text-xl text-dark mb-2">Ready to Apply?</h3>
                <p className="text-sm text-dark/60 mb-4">
                  Take the first step toward your fashion design career.
                </p>
                <button
                  onClick={handleQuickApply}
                  className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3 rounded-full font-medium hover:bg-terracotta transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>Apply Now</span>
                </button>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="font-serif text-lg text-dark mb-3">Request More Info</h4>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-cream rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-cream rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
                    placeholder="Email (optional)"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-cream rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
                    placeholder="Phone Number"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-cream rounded-lg focus:outline-none focus:border-gold transition-colors resize-none text-sm"
                    placeholder="Your message..."
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gold text-white py-2.5 rounded-lg font-medium hover:bg-terracotta transition-colors text-sm"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="bg-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-serif mb-3">
            Start Your Fashion Journey Today
          </h2>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Whether you want to start a business or master the art of fashion design, 
            Adeola's apprenticeship program will give you the skills and confidence to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleQuickApply}
              className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta transition-colors"
            >
              <MessageCircle size={18} />
              <span>Apply Now</span>
            </button>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              <span>View Her Work</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Apprenticeship