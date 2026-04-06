# Design & Accessibility Principles

## Color & Contrast

### WCAG Compliance Ratios
- **AAA (Preferred)**: 7:1 contrast for normal text, 4.5:1 for large text
- **AA (Minimum)**: 4.5:1 for normal text, 3:1 for large text
- **Fail**: < 3:1 ratio

### Color Theory for Modern Design
- **Primary**: Action colors (CTA buttons, links) — should be vibrant but not aggressive
- **Secondary**: Supporting accent colors — complementary to primary
- **Neutral**: Grays for text, borders, backgrounds — prefer cool grays (#E5E7EB, #374151)
- **Semantic**: Green (success), Red (error), Yellow (warning), Blue (info)

### Dark Mode Consideration
- Invert contrast: light text on dark backgrounds needs same 4.5:1 ratio
- Use CSS custom properties for theme switching
- Test both modes thoroughly

**Good palette for TrustServe (Rural Focus):**
- Primary: Trusted blue (#3B82F6) or green (#10B981)
- Text dark: #1F2937 (dark gray, not pure black)
- Background: #F9FAFB (off-white, easy on eyes)
- Borders: #E5E7EB

## Typography

### Hierarchy & Scale
- **Heading 1 (h1)**: 28-32px, bold (main page titles) — used once per page
- **Heading 2 (h2)**: 22-24px, semi-bold (section titles)
- **Heading 3 (h3)**: 18-20px, semi-bold (sub-sections)
- **Body (p)**: 16px, regular (default reading text) — comfortable for rural users on small screens
- **Small (small)**: 13-14px, regular (captions, metadata)

### Font Families
- **Headings**: System font stack or Inter/Poppins (modern, clean)
- **Body**: System fonts or Open Sans/Lato (high legibility)
- **Monospace**: Courier New, JetBrains Mono (code blocks)

**Avoid:**
- More than 3 font families (rarely justified)
- Fonts smaller than 14px for body text
- Excessive font weights (stick to regular, 600, 700)

### Line Height
- **Headings**: 1.1–1.3 (tight, hierarchical)
- **Body**: 1.6–1.8 (loose, readable, especially on mobile)
- **Captions**: 1.4–1.5

### Letter Spacing
- **Headings**: 0 (normal) — except very large display text
- **Body**: 0 (normal)
- **Small caps/labels**: +0.05em (slight tracking)

## Spacing & Layout

### 8px Grid System (Tailwind Default)
- **0**: 0
- **1**: 8px
- **2**: 16px
- **3**: 24px
- **4**: 32px
- **6**: 48px
- **8**: 64px
- **12**: 96px
- **16**: 128px

Use multiples of 8 for consistency. **Never guess spacing.**

### Component Padding/Margin
- **Buttons**: px-4 py-2 (padding), 8px gap between
- **Cards**: p-6 (24px from edges)
- **Sections**: vertical spacing of 6-8 (48-64px)
- **Page margins**: px-4 (mobile), px-6 (tablet), px-8+ (desktop)

### White Space Is Essential
- Don't cram content. Let components breathe.
- More white space = more premium feeling
- Rural users benefit from reduced visual density

## Responsive Design

### Mobile-First Approach
1. Design for 375px width (iPhone SE, small mobiles)
2. Test at 768px (tablet), 1024px (desktop)
3. Add features as screen grows, not remove them

### Touch Targets
- Minimum 44x44px for clickable elements
- 12px spacing between touch targets
- Larger on mobile (avoid accidental clicks)

### Viewport Sizing
```jsx
// Always include in your page head
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Accessibility Standards (WCAG 2.1)

### Perception
- **Distinguishable**: Text and images are readable and distinguishable
  - Sufficient color contrast
  - Don't rely on color alone (use icons, patterns)
  - Resizable text (100% minimum, support zoom)
- **Meaningful Sequences**: Content flows logically in reading order
  - Proper heading hierarchy
  - Navigation appears consistently
  - Focus order = visual order

### Operable
- **Keyboard Navigation**: All functionality via keyboard
  - Tab through form fields
  - Enter to submit
  - Escape to close modals
  - Arrow keys for menus/tabs
- **Sufficient Time**: Users have enough time to read/interact
  - No auto-refreshes that cause loss of data
  - Pause/extend time-limited content
  - Session timeouts warn before closing
- **Seizures & Flicker**: Nothing flashes > 3x per second
  - No rapid flashing content
  - Avoid photosensitive triggers

### Understandable
- **Readable**: Text is legible and understandable
  - Normal locale language (not jargon overload)
  - Abbreviations explained
  - Pronunciation hints if needed
- **Predictable**: Navigation and functionality behave consistently
  - Links go where you expect
  - Menus open/close consistently
  - No unexpected context changes
- **Input Assistance**: Users can correct mistakes
  - Error messages identify the problem & suggest fixes
  - Labels and instructions clear
  - Form recovery (pre-fill after errors)

### Robust
- **Compatible**: Works with assistive technologies (screen readers, voice input)
  - Valid HTML
  - ARIA labels where semantic HTML isn't enough
  - Proper form associations

## Dark Mode & Theme Support

### Implementation
```jsx
// Use CSS variables
:root {
  --bg-primary: #FFFFFF;
  --text-primary: #1F2937;
  --border: #E5E7EB;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --text-primary: #F3F4F6;
    --border: #374151;
  }
}
```

### Contrast in Dark Mode
- Text must still meet 4.5:1 ratio
- Use lighter grays for borders (not pure white)
- Icons should have sufficient contrast

## Micro-interactions & Feedback

### Affordance
- Make interactive elements **obviously clickable**
- Use underlines for links (text links, not just color)
- Hover states must be visible and quick (< 200ms)
- Cursor changes to pointer on hover

### Confirmation
- Show success states (green check, brief toast)
- Show error states clearly (red border, error message)
- Loading states prevent double-submission
- Disabled states are visually distinct

### State Visualization
```
Default → Hover (quick shadow/color) → Active (pressed) → Disabled
```

## Performance Considerations

### Image Optimization
- Use modern formats (WebP with fallback)
- Responsive images (srcset)
- Lazy load below-the-fold images
- Compress before upload

### Animation Performance
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `left`, `top`, `width`, `height`
- Reduce motion for users with `prefers-reduced-motion`
- Test on low-end devices (60fps minimum)

### Bundle Size
- Don't import entire libraries for single components
- Tree-shake unused code
- Lazy-load components when possible
- Monitor with Lighthouse

---

**Reference**: [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/), [W3C Color Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
