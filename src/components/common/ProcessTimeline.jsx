import { MessageSquare, Ruler, Scissors, PackageCheck, Sparkles, ArrowRight } from 'lucide-react'

const ProcessTimeline = ({ onOpenOrderModal }) => {
  const steps = [
    {
      step: '01',
      title: 'Consultation & Vision',
      subtitle: 'Share Your Inspiration',
      desc: 'Connect with Adeola on WhatsApp or in our atelier. Share your event details, style references, neckline ideas, and silhouettes.',
      icon: MessageSquare,
      accent: 'bg-gold/10 text-gold'
    },
    {
      step: '02',
      title: 'Fabric & Precision Fit',
      subtitle: 'Premium Selection',
      desc: 'Provide your own fabric or let Adeola source authentic Ankara, luxury lace, or imported suitings. Enter your measurements or come in for a fitting.',
      icon: Ruler,
      accent: 'bg-terracotta/10 text-terracotta'
    },
    {
      step: '03',
      title: 'Master Tailoring',
      subtitle: 'Handcrafted Precision',
      desc: 'Your garment is individually drafted, cut, and sewn with structural inner boning, neat French seams, and careful hand-finishing.',
      icon: Scissors,
      accent: 'bg-gold/10 text-gold'
    },
    {
      step: '04',
      title: 'Final Fitting & Delivery',
      subtitle: 'Celebration Ready',
      desc: 'Receive your perfectly finished outfit ready to turn heads. Available for studio pickup in Ibadan or door-to-door delivery across Nigeria and abroad.',
      icon: PackageCheck,
      accent: 'bg-green-600/10 text-green-600'
    }
  ]

  return (
    <section className="py-16 bg-cream/50 relative overflow-hidden" aria-label="Bespoke tailoring process">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold font-medium text-xs sm:text-sm tracking-widest uppercase inline-flex items-center gap-1.5">
            <Sparkles size={14} />
            The Bespoke Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-dark mt-2 mb-3">
            From Vision to <span className="text-gold">Masterpiece</span>
          </h2>
          <p className="text-dark/60 text-sm leading-relaxed">
            Every garment crafted in Adeola's studio undergoes a meticulous 4-step artisan process to guarantee an extraordinary fit and lasting luxury.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
          {steps.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div 
                key={item.step}
                className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gold/15 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Step Header with Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-gold/40 group-hover:text-gold transition-colors">
                      {item.step}
                    </span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.accent}`}>
                      <IconComponent size={22} />
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold tracking-wider uppercase text-gold block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-dark mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-dark/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-cream flex items-center justify-between text-xs text-gold font-medium">
                  <span>Step {index + 1} of 4</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Button */}
        {onOpenOrderModal && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="btn-primary inline-flex items-center gap-2 shadow-md hover:shadow-lg text-sm"
            >
              <span>Start Your Bespoke Order</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProcessTimeline
