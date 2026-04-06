---
name: component-library-management
description: 'Organize, document, and maintain a scalable component library. Use for creating component catalogs, writing component docs, setting up Storybook, managing component versions, enforcing naming conventions, and building a shared component inventory.'
argument-hint: 'Describe what you want to do (e.g., "Document all button components", "Set up Storybook catalog", "Export component inventory")'
---

# Component Library Management

Systematically build, organize, and document reusable components for your TrustServe marketplace.

## When to Use

- Creating component documentation and usage guides
- Setting up a component catalog or Storybook
- Organizing existing components into a library structure
- Establishing naming conventions and component patterns
- Managing component versions and dependencies
- Creating a component inventory or audit
- Standardizing component prop interfaces
- Building component stories for visual testing

## Step-by-Step Procedure

### 1. **Audit Existing Components**

Inventory all components in your project:

```bash
# Find all component files
find src/components -name "*.jsx" -o -name "*.tsx"
```

Create a spreadsheet/inventory:
- Component name
- Location (path)
- Props interface (what does it accept?)
- Current accessibility level (yes/no/partial)
- Whether it has animations
- Status (needs refactor, ready, deprecated)

Reference: [Component Audit Template](./assets/component-audit-template.md)

### 2. **Establish Naming Conventions**

Define consistent patterns for all components:

**File naming**: PascalCase, descriptive
```
✅ ProductCard.jsx
✅ ServiceBookingModal.jsx
❌ card.jsx
❌ modal.jsx
```

**Component structure**: Export default, include displayName, JSDoc
```jsx
/**
 * @component ProductCard
 * Displays product with image, title, price, and action button
 * @param {string} title - Product title
 * @param {number} price - Price in rupees
 * @returns {JSX.Element}
 */
const ProductCard = ({ title, price }) => { ... }
ProductCard.displayName = 'ProductCard'
export default ProductCard
```

**Prop naming**: Consistent, semantic
```jsx
// ✅ Good
<Button disabled={isLoading} onClick={handleSubmit} variant="primary" />

// ❌ Avoid
<Button isDisabled={isLoading} onButtonClick={handleSubmit} btnVariant="primary" />
```

Reference: [Naming Conventions Guide](./references/naming-conventions.md)

### 3. **Document Each Component**

For every component, create JSDoc + usage examples:

```jsx
/**
 * @component RatingStars
 * Interactive star rating component.
 * 
 * Features:
 * - Click to select rating
 * - Hover to preview rating
 * - Keyboard accessible (arrow keys)
 * - Dark mode support
 * 
 * @param {number} value - Current rating (0-5)
 * @param {function} onChange - Callback when rating changes
 * @param {string} size - Star size: 'sm' | 'md' | 'lg'
 * @param {boolean} readOnly - Prevent user interaction
 * @returns {JSX.Element}
 * 
 * @example
 * <RatingStars value={4} onChange={(val) => setRating(val)} />
 * 
 * @accessibility
 * - ARIA labels for each star
 * - Keyboard navigation (arrow keys to change)
 * - Focus visible on hover
 */
```

Reference: [JSDoc Template](./assets/component-jsdoc-template.md)

### 4. **Refactor Components for Library Readiness**

Ensure every component is "library-ready":

**Checklist**:
- [ ] Uses consistent prop interface (no prop drilling)
- [ ] Has dark mode support (dark: Tailwind variants)
- [ ] Fully accessible (WCAG 2.1 AA)
- [ ] Responsive (mobile-first, tested at sm/md/lg)
- [ ] Includes JSDoc with @param, @returns, @example
- [ ] Has displayName for debugging
- [ ] No hardcoded colors/strings (uses design tokens)
- [ ] Exports default + named export if needed

Reference: [Library Readiness Checklist](./assets/library-readiness-checklist.md)

### 5. **Set Up Component Categories**

Organize by functional domain:

```
src/components/
├── ui/                    # Atomic components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   └── Badge.jsx
├── forms/                 # Form-specific components
│   ├── TextField.jsx
│   ├── SelectField.jsx
│   └── FormSubmit.jsx
├── marketplace/           # TrustServe domain components
│   ├── ServiceCard.jsx
│   ├── WorkerCard.jsx
│   └── BookingCard.jsx
├── layout/                # Layout components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   └── Footer.jsx
└── feedback/              # Feedback components
    ├── Toast.jsx
    ├── Modal.jsx
    └── SkeletonLoader.jsx
```

### 6. **Create Component Index File**

Export all components from a single index for easy imports:

```jsx
// src/components/index.js
export { default as Button } from './ui/Button'
export { default as Input } from './ui/Input'
export { default as Card } from './ui/Card'
export { default as ServiceCard } from './marketplace/ServiceCard'
// ... more exports
```

Usage:
```jsx
import { Button, ServiceCard, Card } from 'components'
```

### 7. **Document in Storybook (Optional)**

Create stories for visual testing and documentation:

```jsx
// Button.stories.jsx
import Button from './Button'

export default {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
}

export const Primary = { args: { variant: 'primary', children: 'Click me' } }
export const Outline = { args: { variant: 'outline', children: 'Outline' } }
export const Disabled = { args: { disabled: true, children: 'Disabled' } }
```

Reference: [Storybook Setup Guide](./references/storybook-setup.md)

### 8. **Create Component Inventory Document**

Generate or maintain a component catalog:

| Component | Category | Location | Props | Accessible | Docs | Status |
|-----------|----------|----------|-------|------------|------|--------|
| Button | ui | components/ui/Button.jsx | variant, size, disabled | ✅ | ✅ | Ready |
| ServiceCard | marketplace | components/marketplace/ServiceCard.jsx | title, image, price | ⚠️ | ✅ | Needs Refactor |
| Input | ui | components/ui/Input.jsx | type, value, onChange | ✅ | ✅ | Ready |

Reference: [Component Inventory Template](./assets/component-inventory.md)

### 9. **Version & Maintain**

Track component changes:
- Update JSDoc when props change
- Note breaking changes in component file
- Consider semantic versioning if exporting as package
- Review component usage across project for impact analysis

## Quick Checklist

- [ ] Audit existing components
- [ ] Establish naming conventions
- [ ] Document each component (JSDoc + examples)
- [ ] Refactor for library readiness
- [ ] Organize by category
- [ ] Create main index export file
- [ ] Set up Storybook stories (optional)
- [ ] Create component inventory document
- [ ] Communicate changes to team

## Common Patterns

### Button Component in Library
```jsx
export const Button = forwardRef(({ variant, size, disabled, children, ...props }, ref) => {
  // Implementation with variants, sizes, states
})
Button.displayName = 'Button'
```

### Card Component Family
- Card (container)
- CardHeader (title section)
- CardBody (content)
- CardFooter (actions)

All exported together so users import as:
```jsx
import { Card, CardHeader, CardBody, CardFooter } from 'components/ui'
```

### Form Component Suite
- TextField (input wrapper)
- SelectField (select wrapper)
- TextareaField (textarea wrapper)
- CheckboxField (checkbox wrapper)
- RadioField (radio wrapper)

All with consistent prop interface.

## References

- [Naming Conventions Guide](./references/naming-conventions.md) — Consistent patterns
- [Component Audit Template](./assets/component-audit-template.md) — Inventory spreadsheet
- [JSDoc Template](./assets/component-jsdoc-template.md) — Documentation standard
- [Library Readiness Checklist](./assets/library-readiness-checklist.md) — QA gates
- [Storybook Setup Guide](./references/storybook-setup.md) — Visual documentation
- [Component Inventory Template](./assets/component-inventory.md) — Catalog

## Integration with Other Skills

This skill works alongside:
- **ui-ux-pro skill** — Component design & accessibility principles
- **Component Architect agent** — Creates new library-ready components
- **Tailwind Configuration skill** — Tokens used in library components
- **Accessibility Auditing skill** — Validates WCAG compliance of components

---

**Ready?** Start with auditing your existing components, then refactor them to library standards. Build incrementally!
