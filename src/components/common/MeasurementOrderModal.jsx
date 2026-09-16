import { useState, useEffect } from 'react'
import { 
  X, Scissors, Sparkles, CheckCircle2, 
  ArrowRight, ArrowLeft, Ruler, Calendar, 
  User, MapPin, MessageCircle, Copy, Check, Info 
} from 'lucide-react'
import { contactInfo } from '../../data/contactData'

const MeasurementOrderModal = ({ isOpen, onClose, initialService = '' }) => {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [showTips, setShowTips] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    garmentType: initialService || 'Aso Ebi & Traditional Wear',
    fabricStatus: 'I have my own fabric',
    fabricDetails: '',
    measurementType: 'custom', // 'custom' | 'standard' | 'studio'
    standardSize: 'M (UK 12 / US 8)',
    // Measurements (inches)
    bust: '',
    waist: '',
    hips: '',
    shoulder: '',
    sleeve: '',
    length: '',
    // Client details
    clientName: '',
    clientPhone: '',
    clientLocation: 'Ibadan',
    eventDate: '',
    specialNotes: '',
  })

  // Reset form when modal opens
useEffect(() => {
  if (isOpen) {
    setStep(1)
    setShowTips(false)
    setFormData({
      garmentType: initialService || 'Aso Ebi & Traditional Wear',
      fabricStatus: 'I have my own fabric',
      fabricDetails: '',
      measurementType: 'custom',
      standardSize: 'M (UK 12 / US 8)',
      bust: '',
      waist: '',
      hips: '',
      shoulder: '',
      sleeve: '',
      length: '',
      clientName: '',
      clientPhone: '',
      clientLocation: 'Ibadan',
      eventDate: '',
      specialNotes: '',
    })
  }
}, [isOpen, initialService])

// Prevent background scrolling when modal is open
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }
  return () => {
    document.body.style.overflow = 'unset'
  }
}, [isOpen])

// Close on Escape key
useEffect(() => {
  if (!isOpen) return
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [isOpen, onClose])

  if (!isOpen) return null

  const garmentOptions = [
    { label: 'Aso Ebi & Traditional', icon: '✨' },
    { label: 'Bridal Couture', icon: '👰' },
    { label: 'Corporate & Office Suit', icon: '💼' },
    { label: 'Bespoke Custom Dress', icon: '👗' },
    { label: 'Native / Agbada Set', icon: '👑' },
    { label: 'Everyday Casual Chic', icon: '🧵' },
    { label: "Children's Fashion", icon: '🧒' },        
    { label: 'Alterations & Repairs', icon: '🔄' },
    { label: 'Apprenticeship / Learning', icon: '🎓' },
  ]

  const fabricOptions = [
    'I have my own fabric ready',
    'I want Adeola to source fabric for me',
    'I need fabric consultation & styling advice'
  ]

  const measurementTips = [
    { part: 'Bust / Chest', tip: 'Measure across the fullest part of the bust, keeping the tape parallel to the floor.' },
    { part: 'Waist', tip: 'Measure around your natural waistline (narrowest part of torso, usually 1-2 inches above navel).' },
    { part: 'Hips', tip: 'Measure around the fullest part of your hips and buttocks while standing with feet together.' },
    { part: 'Shoulder', tip: 'Measure across back from the tip of one shoulder bone to the tip of the other.' },
    { part: 'Sleeve Length', tip: 'From shoulder bone down to desired wrist or elbow length with arm slightly bent.' },
    { part: 'Full Length', tip: 'From highest shoulder point down to desired hemline (wear fitting shoes if for gown).' }
  ]

  const generateWhatsAppMessage = () => {
    let msg = `✨ *BESPOKE ORDER REQUEST — ADEOLA FASHION DESIGNER* ✨\n\n`
    msg += `👤 *Client Name:* ${formData.clientName || 'Not specified'}\n`
    msg += `📍 *Location:* ${formData.clientLocation || 'Ibadan'}\n`
    if (formData.clientPhone) msg += `📞 *Phone:* ${formData.clientPhone}\n`
    if (formData.eventDate) msg += `📅 *Needed By:* ${formData.eventDate}\n`
    msg += `\n👗 *Garment Style:* ${formData.garmentType}\n`
    msg += `🧵 *Fabric Status:* ${formData.fabricStatus}\n`
    if (formData.fabricDetails) msg += `📝 *Fabric Note:* ${formData.fabricDetails}\n`

    msg += `\n📏 *MEASUREMENTS:* \n`
    if (formData.measurementType === 'studio') {
      msg += `• Preference: Will visit atelier in Ibadan for in-person fitting\n`
    } else if (formData.measurementType === 'standard') {
      msg += `• Standard Size: ${formData.standardSize}\n`
    } else {
      msg += `• Bust/Chest: ${formData.bust ? formData.bust + '"' : 'To confirm'}\n`
      msg += `• Waist: ${formData.waist ? formData.waist + '"' : 'To confirm'}\n`
      msg += `• Hips: ${formData.hips ? formData.hips + '"' : 'To confirm'}\n`
      msg += `• Shoulder: ${formData.shoulder ? formData.shoulder + '"' : 'To confirm'}\n`
      msg += `• Sleeve Length: ${formData.sleeve ? formData.sleeve + '"' : 'To confirm'}\n`
      msg += `• Full Length: ${formData.length ? formData.length + '"' : 'To confirm'}\n`
    }

    if (formData.specialNotes) {
      msg += `\n💬 *Special Notes & Details:*\n${formData.specialNotes}\n`
    }

    msg += `\n_Submitted via Adeola Fashion Designer Website Builder_`
    return msg
  }

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage()
    window.open(
      `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
    onClose()
  }

  const handleCopySummary = () => {
    const message = generateWhatsAppMessage()
    navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gold/30 flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-cream via-white to-cream border-b border-gold/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold">
              <Scissors size={18} className="transform -rotate-45" />
            </div>
            <div>
              <h2 id="modal-title" className="font-serif text-lg sm:text-xl font-bold text-dark">
                Bespoke Order &amp; Measurement Guide
              </h2>
              <p className="text-xs text-dark/60">
                Step {step} of 4 — {
                  step === 1 ? 'Select Garment Style' :
                  step === 2 ? 'Fabric & Sourcing' :
                  step === 3 ? 'Measurements & Fitting' :
                  'Contact & Confirmation'
                }
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-dark/40 hover:text-dark p-1.5 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="w-full bg-cream h-1.5">
          <div 
            className="bg-gold h-1.5 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* STEP 1: Garment Style */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-base font-semibold text-dark mb-1">
                  What would you like Adeola to create for you?
                </h3>
                <p className="text-xs text-dark/60">
                  Select the style that best matches your vision.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {garmentOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, garmentType: opt.label })}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm font-medium transition-all ${
                      formData.garmentType === opt.label
                        ? 'border-gold bg-gold/10 text-dark font-semibold shadow-sm'
                        : 'border-cream hover:border-gold/30 hover:bg-cream/40 text-dark/80'
                    }`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <span className="flex-1">{opt.label}</span>
                    {formData.garmentType === opt.label && (
                      <CheckCircle2 size={18} className="text-gold shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Fabric Status */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-base font-semibold text-dark mb-1">
                  Fabric Preferences
                </h3>
                <p className="text-xs text-dark/60">
                  Do you already have fabric or do you need Adeola to source high-grade Nigerian/imported fabrics?
                </p>
              </div>

              <div className="space-y-2">
                {fabricOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-sm transition-all ${
                      formData.fabricStatus === opt
                        ? 'border-gold bg-gold/10 text-dark font-medium'
                        : 'border-cream hover:bg-cream/40 text-dark/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fabricStatus"
                      checked={formData.fabricStatus === opt}
                      onChange={() => setFormData({ ...formData, fabricStatus: opt })}
                      className="text-gold focus:ring-gold"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark/70 uppercase tracking-wider mb-1">
                  Fabric Details / Colors / Type (Optional)
                </label>
                <input
                  type="text"
                  value={formData.fabricDetails}
                  onChange={(e) => setFormData({ ...formData, fabricDetails: e.target.value })}
                  placeholder="e.g. Royal blue Ankara, French lace, Duchess satin, Italian wool"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gold/30 text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Measurements & Fitting */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-semibold text-dark">
                    Fitting &amp; Measurement Guide
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowTips(!showTips)}
                    className="text-xs text-gold hover:text-terracotta flex items-center gap-1 font-medium"
                  >
                    <Info size={14} />
                    <span>{showTips ? 'Hide measuring tips' : 'How to measure?'}</span>
                  </button>
                </div>
                <p className="text-xs text-dark/60 mt-0.5">
                  Accurate measurements ensure an exquisite silhouette.
                </p>
              </div>

              {/* Tips Collapsible Box */}
              {showTips && (
                <div className="p-3.5 bg-cream/70 rounded-xl border border-gold/20 text-xs space-y-2">
                  <p className="font-semibold text-dark flex items-center gap-1.5">
                    <Ruler size={14} className="text-gold" />
                    How to Take Accurate Tailoring Measurements (in inches):
                  </p>
                  <ul className="space-y-1.5 text-dark/70">
                    {measurementTips.map((t, idx) => (
                      <li key={idx}>
                        <strong className="text-dark">{t.part}:</strong> {t.tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Method Toggle */}
              <div className="flex rounded-xl bg-cream p-1 border border-gold/20">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, measurementType: 'custom' })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    formData.measurementType === 'custom'
                      ? 'bg-gold text-white shadow-sm'
                      : 'text-dark/70 hover:text-dark'
                  }`}
                >
                  Enter Inches
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, measurementType: 'standard' })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    formData.measurementType === 'standard'
                      ? 'bg-gold text-white shadow-sm'
                      : 'text-dark/70 hover:text-dark'
                  }`}
                >
                  Standard Size
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, measurementType: 'studio' })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    formData.measurementType === 'studio'
                      ? 'bg-gold text-white shadow-sm'
                      : 'text-dark/70 hover:text-dark'
                  }`}
                >
                  In-Studio Fitting
                </button>
              </div>

              {/* Custom Inches Inputs */}
              {formData.measurementType === 'custom' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'bust', label: 'Bust / Chest (in)', placeholder: '36' },
                    { key: 'waist', label: 'Waist (in)', placeholder: '29' },
                    { key: 'hips', label: 'Hips (in)', placeholder: '40' },
                    { key: 'shoulder', label: 'Shoulder (in)', placeholder: '15' },
                    { key: 'sleeve', label: 'Sleeve Length (in)', placeholder: '23' },
                    { key: 'length', label: 'Full Length (in)', placeholder: '58' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[11px] font-medium text-dark/70 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 rounded-lg border border-gold/30 text-sm focus:outline-none focus:border-gold bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Standard Size Selector */}
              {formData.measurementType === 'standard' && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-dark/70 uppercase">
                    Select Standard Dress / Suit Size
                  </label>
                  <select
                    value={formData.standardSize}
                    onChange={(e) => setFormData({ ...formData, standardSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gold/30 text-sm focus:outline-none focus:border-gold bg-white"
                  >
                    <option value="XS (UK 6 / US 2)">XS (UK 6 / US 2) — Petite</option>
                    <option value="S (UK 8-10 / US 4-6)">S (UK 8-10 / US 4-6) — Small</option>
                    <option value="M (UK 12 / US 8)">M (UK 12 / US 8) — Medium</option>
                    <option value="L (UK 14 / US 10)">L (UK 14 / US 10) — Large</option>
                    <option value="XL (UK 16 / US 12)">XL (UK 16 / US 12) — Extra Large</option>
                    <option value="XXL (UK 18+ / US 14+) plus size">XXL (UK 18+ / US 14+) — Custom Curves</option>
                  </select>
                  <p className="text-[11px] text-dark/50 italic">
                    Note: Adeola always leaves internal seam allowances so minor adjustments can be made easily.
                  </p>
                </div>
              )}

              {/* Studio Fitting Info */}
              {formData.measurementType === 'studio' && (
                <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-xs space-y-1.5 text-dark/80">
                  <p className="font-semibold text-dark flex items-center gap-1.5">
                    <MapPin size={16} className="text-gold" />
                    Visit the Studio in Ibadan, Oyo State
                  </p>
                  <p>
                    Adeola will personally measure you with master tailor precision at the atelier. We will schedule a comfortable time slot via WhatsApp.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Client Details & Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-base font-semibold text-dark mb-1">
                  Almost Done! Where Should We Reach You?
                </h3>
                <p className="text-xs text-dark/60">
                  Provide your contact details so Adeola can review and give you an exact quote and timeline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-dark/70 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Folake Alabi"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gold/30 text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark/70 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="e.g. +234 801 234 5678"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gold/30 text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark/70 mb-1">
                    Delivery City / Country
                  </label>
                  <input
                    type="text"
                    value={formData.clientLocation}
                    onChange={(e) => setFormData({ ...formData, clientLocation: e.target.value })}
                    placeholder="e.g. Ibadan, Lagos, Abuja, London UK, Dallas US"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gold/30 text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark/70 mb-1">
                    Target Event / Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gold/30 text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark/70 mb-1">
                  Design Notes or Specific Requests
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Mermaid silhouette with beaded off-shoulder neckline, corset boning..."
                  className="w-full px-3.5 py-2 rounded-lg border border-gold/30 text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Order Summary Preview Card */}
              <div className="p-3.5 rounded-xl bg-cream border border-gold/20 text-xs space-y-1">
                <p className="font-semibold text-dark text-xs mb-1">📋 Ready Order Summary:</p>
                <p className="text-dark/80"><strong>Outfit:</strong> {formData.garmentType}</p>
                <p className="text-dark/80"><strong>Fabric:</strong> {formData.fabricStatus}</p>
                <p className="text-dark/80"><strong>Fitting:</strong> {
                  formData.measurementType === 'studio' ? 'At Ibadan Studio' :
                  formData.measurementType === 'standard' ? formData.standardSize :
                  'Custom Inches Provided'
                }</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-cream/50 border-t border-gold/20">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-dark/70 hover:text-dark transition-colors px-3 py-2"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-3.5 py-2 rounded-full border border-gold/40 text-dark/80 hover:bg-gold/10 text-xs font-medium inline-flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold py-2 px-5 rounded-full inline-flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
                >
                  <MessageCircle size={16} />
                  <span>Send to Adeola via WhatsApp</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeasurementOrderModal
