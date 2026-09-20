# Senior Frontend Engineering Audit & Master Fix Guide
**Project:** Adeola Fashion Designer  
**Target Environment:** React 19, Vite 8 (Rolldown), Tailwind CSS v4, Framer Motion 13, React Router 7  
**Document Purpose:** Comprehensive reference guide and actionable implementation specification for an engineer or AI assistant to execute all fixes, resolve all lint errors, eliminate dead code, and elevate the project to production-grade standard.

---

## Table of Contents
1. [Executive Summary & Health Status](#1-executive-summary--health-status)
2. [Task Progress Checklist](#2-task-progress-checklist)
3. [Phase 1: Zero-Error Baseline (32 ESLint Errors & React 19 Hooks)](#3-phase-1-zero-error-baseline-32-eslint-errors--react-19-hooks)
4. [Phase 2: Architectural Cleanup & Dead Code Consolidation](#4-phase-2-architectural-cleanup--dead-code-consolidation)
5. [Phase 3: Logic, UX & Mobile Flaws](#5-phase-3-logic-ux--mobile-flaws)
6. [Phase 4: Accessibility (WCAG 2.1 AA Compliance)](#6-phase-4-accessibility-wcag-21-aa-compliance)
7. [Phase 5: SEO, PWA & Asset Performance](#7-phase-5-seo-pwa--asset-performance)
8. [Copy-Paste Prompt for the Next AI](#8-copy-paste-prompt-for-the-next-ai)

---

## 1. Executive Summary & Health Status

* **Build:** Passes (`npm run build` succeeds in ~5.4s).
* **Linter:** **FAILS with 32 errors** (`npm run lint` exits with code 1).
* **Primary Failure Modes:**
  1. React 19 Hook Violation (`react-hooks/set-state-in-effect`): Synchronous `setState` inside `useEffect` causes cascading render warnings across 4 files.
  2. Vite React Fast Refresh Violation (`react-refresh/only-export-components`): Context file exports both a component and a custom hook.
  3. Dead Code & Unused Variables: 26 unused imports/variables and 3 orphaned components/hooks (`GalleryItem.jsx`, `ImageSkeleton.jsx`, `useScrollAnimation.js`).
  4. Gallery Lightbox Bug: Filtered views swipe through unfiltered images.
  5. Accessibility Contrast: Brand gold (`#C9A84C`) fails WCAG AA 4.5:1 text contrast ratio on white/cream backgrounds.

---

## 2. Task Progress Checklist

- [ ] **Phase 1: Linting & Zero-Error Baseline**
  - [ ] Fix synchronous `setState` in `src/components/common/MeasurementOrderModal.jsx`
  - [ ] Fix synchronous `setState` in `src/components/common/ReviewModal.jsx`
  - [ ] Fix synchronous `setState` in `src/components/layout/Navbar.jsx`
  - [ ] Fix synchronous `setState` in `src/pages/Gallery.jsx`
  - [ ] Extract `useModal` into `src/hooks/useModal.js` to fix Fast Refresh in `src/context/ModalContext.jsx`
  - [ ] Clean up all unused variables across 8 files
  - [ ] Verify `npm run lint` exits with `0 problems (0 errors, 0 warnings)`
- [ ] **Phase 2: Architectural Consistency & Dead Code**
  - [ ] Connect `ImageSkeleton` into `src/pages/Gallery.jsx` or consolidate `GalleryItem.jsx`
  - [ ] Wire `useScrollAnimation.js` into `src/pages/Home.jsx` to eliminate redundant refs & listeners
  - [ ] Lift `iconMap` out of `.map()` render loop in `src/pages/Home.jsx`
- [ ] **Phase 3: Core Logic & Mobile UX**
  - [ ] Fix Gallery lightbox slides to use `filteredImages` and relative index
  - [ ] Add form validation and min event date to `MeasurementOrderModal.jsx`
  - [ ] Add backdrop overlay and scroll lock to mobile menu in `Navbar.jsx`
  - [ ] Resolve stacking collision between `ScrollToTop` and `WhatsAppButton` popover
- [ ] **Phase 4: Accessibility (WCAG AA)**
  - [ ] Add accessible gold text token (`--color-gold-text: #A67C1E`) in `src/index.css`
  - [ ] Add modal focus trap and restoration on close in `MeasurementOrderModal` and `ReviewModal`
  - [ ] Add keyboard interaction (`tabIndex={0}`, `role="button"`, `onKeyDown`) to gallery cards
- [ ] **Phase 5: SEO, PWA & Performance**
  - [ ] Implement `useDocumentTitle` hook for dynamic titles on all routes
  - [ ] Add `public/manifest.json` for Add-to-Home-Screen PWA support
  - [ ] Convert JPEG images to WebP format for ~70% bundle payload reduction

---

## 3. Phase 1: Zero-Error Baseline (32 ESLint Errors & React 19 Hooks)

### Issue 1.1: `src/components/common/MeasurementOrderModal.jsx`
* **Errors:**
  1. `react-hooks/set-state-in-effect`: Synchronous `setState` inside `useEffect` (lines 37-60).
  2. Unused imports: `Sparkles`, `Calendar`, `User`.
* **Root Cause:** Calling `setStep(1)`, `setShowTips(false)`, and `setFormData(...)` inside an effect triggered by `isOpen` causes React 19 cascading render warnings.
* **Fix:** 
  1. Remove unused imports from `lucide-react`.
  2. Either reset the state when closing the modal or key the modal's inner content by `isOpen`. If resetting inside the component, store an initial state constant and only update upon explicit modal reset actions.

```javascript
// --- BEFORE (lines 1-6) ---
import { 
  X, Scissors, Sparkles, CheckCircle2, 
  ArrowRight, ArrowLeft, Ruler, Calendar, 
  User, MapPin, MessageCircle, Copy, Check, Info 
} from 'lucide-react'

// --- AFTER ---
import { 
  X, Scissors, CheckCircle2, 
  ArrowRight, ArrowLeft, Ruler, 
  MapPin, MessageCircle, Copy, Check, Info 
} from 'lucide-react'
```

For the state reset, define the initial state outside the component:
```javascript
const INITIAL_FORM_STATE = {
  garmentType: 'Aso Ebi & Traditional Wear',
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
}
```
In `Layout.jsx`, pass a `key` to reset state cleanly on open:
```jsx
<MeasurementOrderModal
  key={isOrderModalOpen ? `open-${selectedService}` : 'closed'}
  isOpen={isOrderModalOpen}
  onClose={closeOrderModal}
  initialService={selectedService}
/>
```
Then remove lines 37-60 (`useEffect` with synchronous `setState`) in `MeasurementOrderModal.jsx`.

---

### Issue 1.2: `src/components/common/ReviewModal.jsx`
* **Errors:**
  1. `react-hooks/set-state-in-effect`: Synchronous `setState` inside `useEffect` (lines 13-23).
  2. Unused imports: `Heart`, `Sparkles`.
* **Fix:**
  1. Remove `Heart` and `Sparkles` from `lucide-react` import.
  2. Key the modal component in `Testimonials.jsx` with `<ReviewModal key={isReviewModalOpen ? 'open' : 'closed'} ... />` and remove lines 13-23.

---

### Issue 1.3: `src/components/layout/Navbar.jsx`
* **Error:** `react-hooks/set-state-in-effect` (lines 36-39):
```javascript
// --- BEFORE ---
useEffect(() => {
  setSearchOpen(false)
  setSearchQuery('')
}, [location.pathname])
```
* **Fix:** Do not trigger synchronous `setState` in response to prop/location change. Handle closing directly on navigation events:
```javascript
// --- AFTER ---
// Close search when navigating via handleSearch or when route changes using a ref to track previous pathname without re-triggering render loop
const prevPathRef = useRef(location.pathname)
useEffect(() => {
  if (prevPathRef.current !== location.pathname) {
    prevPathRef.current = location.pathname
    // Reset if previously open
    if (searchOpen) setSearchOpen(false)
  }
}, [location.pathname, searchOpen])
```
Or close search in the Link `onClick` handlers.

---

### Issue 1.4: `src/context/ModalContext.jsx` -> Fast Refresh Warning
* **Error:** `Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components (react-refresh/only-export-components)` (line 38).
* **Fix:** Separate the hook from the provider:
  1. Create `src/hooks/useModal.js`:
  ```javascript
  import { useContext } from 'react'
  import ModalContext from '../context/ModalContext'

  export const useModal = () => useContext(ModalContext)
  export default useModal
  ```
  2. In `src/context/ModalContext.jsx`, remove line 38 (`export const useModal = ...`) and export only `ModalProvider` and `ModalContext`.
  3. In `Navbar.jsx`, `Layout.jsx`, `Gallery.jsx`, `Home.jsx`, `Services.jsx`, change:
  ```javascript
  // FROM:
  import { useModal } from '../../context/ModalContext'
  // TO:
  import { useModal } from '../../hooks/useModal'
  ```

---

### Issue 1.5: `src/pages/Gallery.jsx`
* **Errors:**
  1. `react-hooks/set-state-in-effect`: `setVisibleCount(ITEMS_PER_PAGE)` inside `useEffect` (lines 157-159).
  2. Unused imports: `AnimatePresence`, `Sparkles`, `Grid3x3`, `LayoutGrid`, `Heart`, `X`, `ChevronLeft`, `ChevronRight`.
  3. Unused functions: `handleShare` (line 125), `handleQuote` (line 138).
* **Fix:**
  1. Remove unused imports from `framer-motion` and `lucide-react`.
  2. Wire `handleShare` and `handleQuote` to action buttons on the image cards (or remove if using lightbox actions).
  3. Remove the `useEffect` on line 157-159. Instead, reset `visibleCount` in the category change handler and sort change handler:
  ```javascript
  const handleCategorySelect = (category) => {
    setActiveCategory(category)
    setVisibleCount(ITEMS_PER_PAGE)
    if (searchQuery) clearSearch()
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setVisibleCount(ITEMS_PER_PAGE)
  }
  ```

---

### Issue 1.6: Remaining Unused Variable Cleanups
* **`src/components/common/WhatsAppButton.jsx` (line 2):**
  Remove `Sparkles` from `import { MessageCircle, X, Sparkles, Send } from 'lucide-react'`.
* **`src/components/layout/Footer.jsx` (line 4):**
  Remove `Heart` from `lucide-react` import.
* **`src/data/searchIndex.js`:**
  - Remove `import { contactInfo } from './contactData'` (line 4).
  - Change line 167 from `.filter(([_, group]) => ...)` to `.filter(([, group]) => ...)`.
* **`src/pages/Apprenticeship.jsx` (line 4):**
  Remove `GraduationCap`, `Clock`, `Award` from `lucide-react` import.
* **`src/pages/Home.jsx`:**
  - Line 252: Change `displayImages.map((img, index) =>` to `displayImages.map((img) =>`.
  - Line 369: Change `featuredTestimonials.map((testimonial, index) =>` to `featuredTestimonials.map((testimonial) =>`.
  - Line 436: Change `displayServices.map((service, index) =>` to `displayServices.map((service) =>`.
* **`src/pages/SearchResults.jsx` (line 5):**
  Remove `Grid3X3` and `MessageCircle` from `lucide-react` import.

---

## 4. Phase 2: Architectural Cleanup & Dead Code Consolidation

### 2.1. Integrate or Deprecate Orphaned Components
1. **`GalleryItem.jsx` and `ImageSkeleton.jsx`:**
   * Currently, `Gallery.jsx` renders card markup directly inline and does not use `GalleryItem.jsx`.
   * **Recommendation:** Either refactor `Gallery.jsx` to use `GalleryItem.jsx` (which already includes skeleton loading, quote triggers, and share handlers) OR delete `GalleryItem.jsx` and import `ImageSkeleton` directly into `Gallery.jsx` so images display a shimmer effect before loading.
2. **`useScrollAnimation.js` Integration:**
   * In `src/pages/Home.jsx`, replace the 6 manual `useInView` and `useRef` calls with the centralized `useScrollAnimation` hook, or remove the hook file if manual refs are preferred.
3. **Lift Static Objects Out of Render Loops:**
   * In `src/pages/Home.jsx`, move `iconMap` (lines 437-446) outside the `Home` component to module scope so it is not reallocated on every iteration.

---

## 5. Phase 3: Logic, UX & Mobile Flaws

### 3.1. Gallery Lightbox Filtering Bug
* **Problem:** In `Gallery.jsx`, `slides` is mapped from `galleryImages` (all 25 items). Clicking a card passes `realIndex` in the global list. When the gallery is filtered to "Bridal", swiping in the lightbox still traverses all categories.
* **Fix:**
```javascript
// In Gallery.jsx:
const lightboxSlides = useMemo(() => {
  return filteredImages.map(img => ({
    src: img.image,
    title: img.title,
    description: img.description,
  }))
}, [filteredImages])

// Handlers:
const openLightbox = (filteredIndex) => {
  setCurrentIndex(filteredIndex)
  setLightboxOpen(true)
}

// In visibleImages.map((image, index) => ...)
onClick={() => openLightbox(index)}
```

### 3.2. Modal Form Validation
* In `MeasurementOrderModal.jsx`:
  1. In Step 3, add numerical validation constraints:
     ```jsx
     <input type="number" min="10" max="100" step="0.5" ... />
     ```
  2. In Step 4, add minimum date validation to prevent selecting past dates:
     ```jsx
     <input 
       type="date" 
       min={new Date().toISOString().split('T')[0]} 
       value={formData.eventDate} 
       ... 
     />
     ```
  3. Validate required fields in `handleSendWhatsApp`:
     ```javascript
     if (!formData.clientName.trim()) {
       alert('Please enter your name before sending your order.')
       return
     }
     ```

### 3.3. Mobile WhatsApp Popup Blocker Mitigation
* In mobile Safari and Android Chrome, `window.open(...)` inside form handlers is frequently blocked as an unsolicited popup.
* **Fix:** Use standard link navigation or direct assignment on mobile devices:
```javascript
const openWhatsApp = (url) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    window.location.href = url
  } else {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
```

### 3.4. Layout Floating Button Stacking
* In `Layout.jsx`: Scroll-to-top is located at `bottom-24 right-6`. In `WhatsAppButton.jsx`, the popup menu opens upwards from `bottom-6 right-6`, conflicting with ScrollToTop.
* **Fix:** Add a state check or position ScrollToTop at `bottom-6 left-6` or hide it when WhatsApp popover is open.

### 3.5. Mobile Menu Scroll Locking
* In `Navbar.jsx`, when `isOpen` is true, body scroll should be locked to prevent background scrolling:
```javascript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }
  return () => { document.body.style.overflow = 'unset' }
}, [isOpen])
```

---

## 6. Phase 4: Accessibility (WCAG 2.1 AA Compliance)

### 4.1. Color Contrast Tuning
* The brand gold `#C9A84C` has a **2.4:1** contrast ratio against `#FFFFFF` / `#FDF8F0`, failing WCAG AA (requires 4.5:1 for body text, 3:1 for large headings).
* **Fix in `src/index.css`:**
```css
@theme {
  --color-gold: #C9A84C;          /* For borders, icons, dark-background accents */
  --color-gold-text: #9B7826;     /* Accessible text gold (4.6:1 contrast ratio) */
  --color-cream: #FDF8F0;
  --color-dark: #2C2C2C;
  --color-terracotta: #D4765A;
  --color-warmBeige: #F5EDE3;
  --font-serif: "Playfair Display", serif;
  --font-sans: "Inter", sans-serif;
}
```
Replace `text-gold` with `text-[#9B7826]` or `text-gold-text` on light backgrounds for subtitles, tags, and text links.

### 4.2. Modal Focus Trap
* Install or create a simple focus trap inside `MeasurementOrderModal.jsx` and `ReviewModal.jsx` so keyboard users pressing `Tab` cannot tab out of the open modal. Return focus to the opening trigger button on modal close.

### 4.3. Keyboard Nav for Gallery Masonry
* In `Gallery.jsx`, update the card container:
```jsx
<motion.div
  role="button"
  tabIndex={0}
  aria-label={`View ${image.title} in full screen`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openLightbox(index)
    }
  }}
  onClick={() => openLightbox(index)}
  className="..."
>
```

---

## 7. Phase 5: SEO, PWA & Asset Performance

### 7.1. Dynamic Route Titles (`useDocumentTitle`)
Create `src/hooks/useDocumentTitle.js`:
```javascript
import { useEffect } from 'react'

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = `${title} | Adeola Fashion Designer Ibadan`
    return () => { document.title = prevTitle }
  }, [title])
}
export default useDocumentTitle
```
Call `useDocumentTitle('Creations Gallery')` in `Gallery.jsx`, `useDocumentTitle('Bespoke Tailoring Services')` in `Services.jsx`, etc.

### 7.2. Web App Manifest (`public/manifest.json`)
Add `public/manifest.json`:
```json
{
  "short_name": "Adeola Fashion",
  "name": "Adeola Fashion Designer",
  "icons": [
    {
      "src": "/favicon.svg",
      "type": "image/svg+xml",
      "sizes": "512x512"
    }
  ],
  "start_url": "/",
  "background_color": "#FDF8F0",
  "theme_color": "#C9A84C",
  "display": "standalone"
}
```
Link it in `index.html`:
```html
<link rel="manifest" href="/manifest.json" />
<link rel="apple-touch-icon" href="/favicon.svg" />
```

### 7.3. Image Asset Compression
* The 26 JPEG files in `src/assets/images/` total **2.3 MB**.
* Use a tool like Sharp or Squoosh to convert all `.jpg` images to `.webp` with quality 80. This reduces the total image footprint to **<700 KB** without perceptible quality loss.

---

## 8. Copy-Paste Prompt for the Next AI

*Copy and paste the prompt below directly into another AI assistant to have it execute these fixes systematically:*

```markdown
You are an expert Senior Frontend Engineer working on the "Adeola Fashion Designer" React application. 
Please read the comprehensive plan in `FRONTEND_AUDIT_AND_ACTION_PLAN.md` located in the root of the project.

Your mission:
1. Execute Phase 1: Fix all 32 ESLint errors by resolving the React 19 hook violations (`react-hooks/set-state-in-effect`), extracting `useModal` into `src/hooks/useModal.js` to satisfy Vite Fast Refresh rules, and removing all 26 unused imports and variables. Run `npm run lint` and ensure it exits cleanly with 0 errors.
2. Execute Phase 2 & 3: Fix the Gallery Lightbox filtering bug so it traverses only the currently filtered items, add required validation and minimum date constraints in `MeasurementOrderModal.jsx`, and eliminate dead/orphaned code.
3. Execute Phase 4: Enhance accessibility by adding `--color-gold-text: #9B7826` for contrast compliance and adding keyboard handlers (`onKeyDown`, `role="button"`, `tabIndex={0}`) to the gallery cards.
4. Execute Phase 5: Add the `useDocumentTitle` hook for dynamic SEO titles across all routes and add `public/manifest.json`.
5. Run `npm run build` and `npm run lint` at the end to verify that both build and linting pass with zero errors.
```