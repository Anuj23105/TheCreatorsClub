# Component Naming Conventions

Consistent naming makes code easier to navigate, understand, and maintain.

## File & Component Naming

### PascalCase for Components
```bash
✅ src/components/ui/Button.jsx
✅ src/components/marketplace/ServiceCard.jsx
✅ src/components/forms/TextField.jsx

❌ src/components/ui/button.jsx
❌ src/components/marketplace/service_card.jsx
❌ src/components/forms/text-field.jsx
```

### Match File Name to Component Name
```jsx
// Button.jsx
export default function Button() { ... }

// NOT
export default function PrimaryButton() { ... }
```

## Prop Naming Conventions

### Use Semantic, Consistent Names

| Prop | Style | Example |
|------|-------|---------|
| **Size** | Semantic scale | `size="sm" \| "md" \| "lg"` |
| **Variant** | Purpose-based | `variant="primary" \| "outline" \| "ghost"` |
| **State** | Adjective | `disabled={bool}`, `active={bool}` |
| **Callbacks** | on{Action} | `onClick`, `onChange`, `onSubmit` |
| **Display** | showX, hideX | `showLabel={bool}` |
| **Content** | children or semantic | `children`, `title`, `description`, `icon` |

### Good Examples
```jsx
<Button variant="primary" size="lg" disabled={isLoading}>
  Save
</Button>

<Input 
  type="email"
  placeholder="user@example.com"
  value={email}
  onChange={handleEmailChange}
  disabled={isSubmitting}
/>

<Card title="Service Details" description="Worker info">
  {content}
</Card>

<Modal isOpen={showModal} onClose={handleClose}>
  Content
</Modal>
```

## Variant Naming

### Size Variants
```jsx
size="sm"    // 8x8, px-2 py-1
size="md"    // 10x10, px-4 py-2
size="lg"    // 12x12, px-6 py-3
size="xl"    // 14x14, px-8 py-4
```

### Visual Variants
```jsx
variant="primary"      // Main action (brand color)
variant="secondary"    // Secondary action
variant="outline"      // Outlined style
variant="ghost"        // Minimal, text-only
variant="danger"       // Destructive action
variant="success"      // Positive action
```

### State Props (Booleans)
```jsx
disabled={bool}        // Cannot interact
loading={bool}         // Processing
active={bool}          // Currently selected
checked={bool}         // Checked checkbox
invalid={bool}         // Validation error
required={bool}        // Must fill
readOnly={bool}        // Cannot edit
```

## Folder Organization

```
src/components/
├── ui/                    # Atomic components (no business logic)
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Badge.jsx
│   ├── Modal.jsx
│   └── Icon.jsx
├── forms/                 # Form-specific components
│   ├── TextField.jsx
│   ├── SelectField.jsx
│   ├── CheckboxField.jsx
│   └── Form.jsx
├── marketplace/           # TrustServe domain components
│   ├── ServiceCard.jsx
│   ├── WorkerCard.jsx
│   ├── BookingCard.jsx
│   └── ServiceModal.jsx
├── layout/                # Page structure components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── MainLayout.jsx
├── feedback/              # Feedback/notification components
│   ├── Toast.jsx
│   ├── Loading.jsx
│   ├── Error.jsx
│   └── SkeletonLoader.jsx
└── index.js              # Main export file
```

## Index Export Pattern

```jsx
// src/components/index.js
// UI atoms
export { default as Button } from './ui/Button'
export { default as Input } from './ui/Input'
export { default as Card } from './ui/Card'
export { default as Badge } from './ui/Badge'

// Forms
export { default as TextField } from './forms/TextField'
export { default as SelectField } from './forms/SelectField'

// Marketplace
export { default as ServiceCard } from './marketplace/ServiceCard'
export { default as WorkerCard } from './marketplace/WorkerCard'

// Layout
export { default as Header } from './layout/Header'
export { default as Footer } from './layout/Footer'
```

Usage:
```jsx
import { Button, Card, ServiceCard, Header } from 'components'
```

## JSDoc Naming

### Standard JSDoc Tags
```jsx
/**
 * @component ProductCard
 * Displays product information with image, title, price, and action.
 * 
 * @param {string} title - Product title (required)
 * @param {string} [description] - Optional product description
 * @param {number} price - Price in rupees (required)
 * @param {function} onAddToCart - Callback when add button clicked
 * @param {string} [size='md'] - Component size: 'sm', 'md', 'lg'
 * @param {boolean} [isNew=false] - Show "New" badge
 * 
 * @returns {JSX.Element} Rendered product card
 * 
 * @example
 * <ProductCard 
 *   title="Cleaning Service"
 *   price={500}
 *   onAddToCart={() => {}}
 * />
 */
```

## Callback Naming

### on{Action} Pattern
```jsx
onClick        // Button clicked
onChange       // Input/Select changed
onSubmit       // Form submitted
onClose        // Modal/Dropdown closed
onOpen         // Modal/Dropdown opened
onSelect       // Item selected from list
onDelete       // Delete action confirmed
onSave         // Save action triggered
onCancel       // Cancel action triggered
onError        // Error occurred
onSuccess      // Operation succeeded
onLoad         // Data loaded
```

### Handler Function Naming
```jsx
// Components call these
const handleClick = () => { ... }
const handleChange = (value) => { ... }
const handleSubmit = (formData) => { ... }
const handleClose = () => { ... }
```

## Constants & Enums

### Define Outside Component
```jsx
// Button.constants.js
export const BUTTON_VARIANTS = ['primary', 'outline', 'ghost', 'danger']
export const BUTTON_SIZES = ['sm', 'md', 'lg', 'xl']

// Button.jsx
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants'
```

## Display Names (For Debugging)

Always set displayName on components:
```jsx
function Button({ ... }) { ... }
Button.displayName = 'Button'

function TextField({ ... }) { ... }
TextField.displayName = 'TextField'
```

Helps in React DevTools and error messages.

---

**Key Principle**: Your team should understand a component's purpose and expected props **just from the file name and JSDoc**. Consistency saves time.
