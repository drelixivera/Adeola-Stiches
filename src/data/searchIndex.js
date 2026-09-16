import { galleryImages } from './galleryData'
import { servicesData } from './servicesData'
import { testimonialsData } from './testimonialsData'
import { contactInfo } from './contactData'

// About page content
const aboutContent = {
  title: 'About Adeola',
  content: `Adeola's journey into fashion design began over a decade ago in the heart of Nigeria. 
    What started as a passion for fabrics and colors quickly evolved into a mission to help 
    people express their unique style through custom-made clothing. Trained by master tailors 
    who passed down generations of craftsmanship, Adeola combines traditional techniques with 
    modern design sensibilities. Every piece she creates is more than just clothing — it's a 
    statement of identity, a celebration of culture, and a testament to the beauty of handcrafted 
    fashion. From vibrant Aso Ebi to elegant bridal wear, from sharp corporate suits to effortless 
    everyday styles, Adeola approaches every project with the same dedication.`,
  url: '/about'
}

// Apprenticeship content
const apprenticeshipContent = {
  title: 'Apprenticeship Program',
  content: `Adeola's Fashion Design Apprenticeship is a comprehensive program designed 
    to take you from beginner to competent fashion designer. Learn pattern making, 
    cutting, stitching, fabric selection, garment construction, fitting, alterations, 
    quality control, business management, and customer service skills. 
    Duration: 6-12 months flexible. Hands-on practical training with a completion certificate.`,
  url: '/apprenticeship'
}

// Build the search index
export const searchIndex = [
  // Gallery Items
  ...galleryImages.map(img => ({
    type: 'gallery',
    id: img.id,
    title: img.title,
    content: `${img.title} ${img.category} ${img.subcategory || ''} ${img.description || ''} ${(img.tags || []).join(' ')}`,
    url: '/gallery',
    category: img.category,
    image: img.image,
  })),
  
  // Services
  ...servicesData.map(service => ({
    type: 'service',
    id: service.id,
    title: service.title,
    content: `${service.title} ${service.category} ${service.description} ${service.features.join(' ')}`,
    url: '/services',
    category: service.category,
    icon: service.icon,
  })),
  
  // Testimonials
  ...testimonialsData.map(t => ({
    type: 'testimonial',
    id: t.id,
    title: t.name,
    content: `${t.name} ${t.location} ${t.service} ${t.quote}`,
    url: '/testimonials',
    location: t.location,
    service: t.service,
  })),
  
  // About
  {
    type: 'about',
    id: 'about',
    title: aboutContent.title,
    content: aboutContent.content,
    url: aboutContent.url,
  },
  
  // Apprenticeship
  {
    type: 'apprenticeship',
    id: 'apprenticeship',
    title: apprenticeshipContent.title,
    content: apprenticeshipContent.content,
    url: apprenticeshipContent.url,
  },
]

// Helper function to search
export const searchContent = (query) => {
  if (!query || query.trim().length < 2) {
    return []
  }
  
  const searchTerm = query.toLowerCase().trim()
  // Escape regex special characters so search terms like "a.b" or "O'Neil" don't break
  const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const searchRegex = new RegExp(escapedTerm, 'g')
  
  return searchIndex
    .map(item => {
      // Calculate relevance score
      let score = 0
      const content = item.content.toLowerCase()
      const title = item.title.toLowerCase()
      
      // Title match is weighted higher
      if (title.includes(searchTerm)) {
        score += 10
      }
      if (title.startsWith(searchTerm)) {
        score += 5
      }
      
      // Content matches
      const contentMatches = content.match(searchRegex) || []
      score += contentMatches.length * 2
      
      // Category matches
      if (item.category && item.category.toLowerCase().includes(searchTerm)) {
        score += 3
      }
      
      // Service/Testimonial location matches
      if (item.location && item.location.toLowerCase().includes(searchTerm)) {
        score += 2
      }
      
      return {
        ...item,
        score,
        // Get a snippet of content with the match highlighted
        snippet: getSnippet(content, searchTerm),
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
}

// Helper to get content snippet
const getSnippet = (content, searchTerm) => {
  const index = content.indexOf(searchTerm)
  if (index === -1) {
    return content.slice(0, 120) + '...'
  }
  const start = Math.max(0, index - 30)
  const end = Math.min(content.length, index + searchTerm.length + 70)
  let snippet = content.slice(start, end)
  if (start > 0) snippet = '...' + snippet
  if (end < content.length) snippet = snippet + '...'
  return snippet
}

// Group results by type
export const groupSearchResults = (results) => {
  const groups = {
    gallery: { label: 'Gallery', icon: 'Image', items: [] },
    service: { label: 'Services', icon: 'Scissors', items: [] },
    testimonial: { label: 'Testimonials', icon: 'Star', items: [] },
    about: { label: 'About', icon: 'User', items: [] },
    apprenticeship: { label: 'Apprenticeship', icon: 'GraduationCap', items: [] },
  }
  
  results.forEach(item => {
    if (groups[item.type]) {
      groups[item.type].items.push(item)
    }
  })
  
  return Object.entries(groups)
    .filter(([_, group]) => group.items.length > 0)
    .map(([key, group]) => ({
      type: key,
      ...group,
    }))
}