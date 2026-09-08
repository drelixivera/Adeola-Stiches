import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-dark text-cream/80 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {currentYear} Adeola Fashion Designer. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1">
            <span>Made</span>
            <span>by Daniel</span>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="#" 
              className="hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a 
              href="#" 
              className="hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a 
              href="#" 
              className="hover:text-gold transition-colors"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer