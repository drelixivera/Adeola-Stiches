import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import Apprenticeship from './pages/Apprenticeship'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'

import ScrollToTop from './components/common/ScrollToTop'
import { ModalProvider } from './context/ModalContext'

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ScrollToTop />
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
      </ModalProvider>
    </BrowserRouter>
  )
}

export default App