import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/common/ScrollToTop'
import { ModalProvider } from './context/ModalContext'

// Lazy-loaded pages — each becomes its own chunk
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Apprenticeship = lazy(() => import('./pages/Apprenticeship'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Luxury branded loader shown while a route chunk is loading
const LuxuryLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4" style={{ margin: '120px'}}>
    <div className="relative">
      {/* Outer gold ring */}
      <div className="w-16 h-16 rounded-full border-4 border-gold/20 border-t-gold animate-spin" />
      {/* Inner shears icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      </div>
    </div>
    <p className="text-xs font-serif text-gold/70 tracking-widest uppercase">
      Loading...
    </p>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ScrollToTop />
        <Suspense fallback={<LuxuryLoader />}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/apprenticeship" element={<Apprenticeship />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Suspense>
      </ModalProvider>
    </BrowserRouter>
  )
}

export default App