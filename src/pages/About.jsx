import { Link } from 'react-router-dom'
import { Award, Heart, Scissors, Users } from 'lucide-react'
import { contactInfo } from '../data/contactData'
import momPhoto from '../assets/images/adeola-profile.jpg'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const About = () => {
  //calling useDocumentTitle
  useDocumentTitle('About Adeola')
  
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section with Image */}
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Image Section */}
<div className="order-2 md:order-1">
  <div className="relative">
    {/* Mom's Photo */}
    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-gold/20 bg-warmBeige">
      <img 
        src={momPhoto}
        alt="Adeola - Fashion Designer"
        className="w-full h-auto object-contain"
      />
    </div>
    {/* Decorative accents */}
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/10 rounded-full -z-10" />
    <div className="absolute -top-4 -left-4 w-16 h-16 bg-terracotta/10 rounded-full -z-10" />
  </div>
</div>

        {/* Text Section */}
        <div className="order-1 md:order-2">
          <span className="text-gold-text font-medium text-sm tracking-wider uppercase">
            About Adeola
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-dark mt-2 mb-6">
            Crafting Dreams, <br />
            <span className="text-gold">One Stitch at a Time</span>
          </h1>
          <p className="text-dark/70 leading-relaxed mb-4">
            Adeola's journey into fashion design began over a decade ago in the heart of Nigeria. 
            What started as a passion for fabrics and colors quickly evolved into a mission to help 
            people express their unique style through custom-made clothing.
          </p>
          <p className="text-dark/70 leading-relaxed mb-4">
            Trained by master tailors who passed down generations of craftsmanship, Adeola combines 
            traditional techniques with modern design sensibilities. Every piece she creates is more 
            than just clothing — it's a statement of identity, a celebration of culture, and a 
            testament to the beauty of handcrafted fashion.
          </p>
          <p className="text-dark/70 leading-relaxed mb-6">
            From vibrant Aso Ebi to elegant bridal wear, from sharp corporate suits to effortless 
            everyday styles, Adeola approaches every project with the same dedication: to make you 
            look and feel extraordinary.
          </p>
          
          <Link to="/contact" className="btn-primary inline-flex items-center justify-center">
            Start Your Custom Order
          </Link>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="text-center mb-12">
          <span className="text-gold-text font-medium text-sm tracking-wider uppercase">
            What She Stands For
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2">
            Her Values, <span className="text-gold">Your Confidence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/60 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={28} className="text-gold" />
            </div>
            <h3 className="font-serif text-xl text-dark mb-2">Quality First</h3>
            <p className="text-dark/60 text-sm">
              Only the finest fabrics and meticulous attention to detail
            </p>
          </div>

          <div className="bg-white/60 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors size={28} className="text-gold" />
            </div>
            <h3 className="font-serif text-xl text-dark mb-2">Custom Fit</h3>
            <p className="text-dark/60 text-sm">
              Every garment is tailored specifically to your body
            </p>
          </div>

          <div className="bg-white/60 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={28} className="text-gold" />
            </div>
            <h3 className="font-serif text-xl text-dark mb-2">Personal Touch</h3>
            <p className="text-dark/60 text-sm">
              She works closely with each client to understand their vision
            </p>
          </div>

          <div className="bg-white/60 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-gold" />
            </div>
            <h3 className="font-serif text-xl text-dark mb-2">Cultural Pride</h3>
            <p className="text-dark/60 text-sm">
              Celebrating Nigerian fashion and craftsmanship
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto mt-20 bg-gold/5 rounded-2xl p-8 md:p-12 text-center border border-gold/20">
        <h2 className="text-2xl md:text-3xl font-serif text-dark mb-3">
          Ready to Bring Your Vision to Life?
        </h2>
        <p className="text-dark/60 mb-6">
          Let's create something beautiful together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-primary inline-flex items-center justify-center">
            Get Started
          </Link>
          <a 
            href={`https://wa.me/${contactInfo.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default About