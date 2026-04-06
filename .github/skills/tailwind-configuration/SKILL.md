---
name: tailwind-configuration
description: 'Extend and customize Tailwind CSS with design tokens, custom utilities, dark mode, and project-specific configurations. Use for managing color palettes, typography scales, spacing systems, and animation utilities.'
argument-hint: 'Describe what you want to configure (e.g., "Add TrustServe color palette", "Create custom animation utilities", "Extend typography system")'
---

# Tailwind Configuration

Customize and extend Tailwind CSS for TrustServe with design tokens, utilities, and theme configurations.

## When to Use

- Adding custom colors, spacing, or typography to Tailwind
- Creating custom utilities for repeated patterns
- Configuring dark mode theme
- Extending animation utilities
- Managing design tokens in tailwind.config.js
- Adding plugins (forms, typography, etc.)
- Creating responsive utilities and breakpoints
- Standardizing shadows, borders, and other reusable styles

## Step-by-Step Procedure

### 1. **Understand Tailwind Configuration Structure**

Reference: [tailwind.config.js Reference](./references/tailwind-config-reference.md)

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],  // Purge unused styles
  darkMode: 'class',                         // Dark mode toggle
  theme: {
    extend: {
      colors: { /* custom colors */ },
      spacing: { /* custom spacing */ },
      typography: { /* custom fonts */ },
      animation: { /* custom animations */ },
    }
  },
  plugins: [],
}
```

### 2. **Define Color Tokens**

Add your design system colors:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',  // Main green (trust color)
          600: '#059669',
          700: '#047857',
          900: '#065F46',
        },

        // Secondary action colors
        secondary: {
          500: '#3B82F6',  // Blue
          600: '#2563EB',
        },

        // Semantic colors
        success: {
          50: '#F0FDF4',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          50: '#FFFBEB',
          500: '#FBBF24',
          600: '#F59E0B',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
        info: {
          50: '#EFF6FF',
          500: '#3B82F6',
          600: '#2563EB',
        },

        // Neutral scale (grays)
        neutral: {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',  // primary text color
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    }
  }
}
```

**Usage in components**:
```jsx
<div className="bg-primary-500 text-neutral-900 border-neutral-200 dark:border-neutral-700">
  Content
</div>
```

### 3. **Define Typography Scale**

Standardize font sizes and families:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],  // Headings
      },

      fontSize: {
        // Heading sizes
        'h1': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '1.25', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.3', fontWeight: '600' }],

        // Body sizes
        'base': ['16px', { lineHeight: '1.6' }],  // Default
        'sm': ['14px', { lineHeight: '1.5' }],
        'xs': ['12px', { lineHeight: '1.4' }],

        // Display sizes
        'lg': ['18px', { lineHeight: '1.6' }],
        'xl': ['22px', { lineHeight: '1.4' }],
      },

      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    }
  }
}
```

**Usage**:
```jsx
<h1 className="font-display text-h1 font-bold">Main Title</h1>
<p className="text-base text-neutral-700">Body text</p>
<small className="text-xs text-neutral-500">Caption</small>
```

### 4. **Configure Spacing Scale**

Extend the 8px grid:

```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        // Tailwind default: 4px (0=0, 1=4px, 2=8px, 3=12px, etc.)
        // Add custom spacing if needed
        '4.5': '18px',   // Between standard gaps
        '13': '52px',
        '17': '68px',
      },

      gap: {
        // Component gaps
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
    }
  }
}
```

**Usage**:
```jsx
<div className="px-4 py-6 gap-4">Spacing</div>
```

### 5. **Add Custom Utilities**

Create shortcuts for repeated patterns:

```javascript
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const newUtilities = {
        '.card': {
          '@apply': 'bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6'
        },

        '.text-truncate-lines': {
          display: '-webkit-box',
          WebkitLineClamp: 'var(--lines, 3)',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        },

        '.input-base': {
          '@apply': 'w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white'
        },

        '.btn-base': {
          '@apply': 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
        },
      }

      addUtilities(newUtilities)
    }),
  ],
}
```

**Usage**:
```jsx
<div className="card">Card with predefined styling</div>
<input className="input-base" />
<button className="btn-base bg-primary-500 text-white hover:bg-primary-600">Button</button>
```

### 6. **Configure Dark Mode**

Set up dark mode classes and tokens:

```javascript
module.exports = {
  darkMode: 'class',  // Use class-based dark mode

  theme: {
    extend: {
      colors: {
        light: { bg: '#FFFFFF', text: '#1F2937' },
        dark: { bg: '#111827', text: '#F9FAFB' },
      },
    }
  }
}
```

**Usage**:
```jsx
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
  Content adapts to light/dark mode
</div>
```

**Toggle via JavaScript**:
```jsx
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')
}
```

### 7. **Add Animation Utilities**

Create custom animations:

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',

        // Feedback animations
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',

        // Custom
        'shimmer': 'shimmer 2s infinite',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    }
  }
}
```

**Usage**:
```jsx
<div className="animate-fade-in">Fades in on load</div>
<div className="animate-spin">Spinning loader</div>
```

### 8. **Add Plugins**

Extend Tailwind with community plugins:

```bash
npm install @tailwindcss/forms @tailwindcss/typography @tailwindcss/container-queries
```

```javascript
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),      // Better form styling
    require('@tailwindcss/typography'), // Prose class for rich text
    require('@tailwindcss/container-queries'), // Container queries
  ],
}
```

**Usage**:
```jsx
<form className="space-y-4">
  <input className="form-input" type="text" />
  <textarea className="form-textarea" />
  <select className="form-select">...</select>
</form>

<article className="prose dark:prose-invert">
  <!-- Rich text content automatically styled -->
</article>
```

Reference: [Tailwind Plugins](./references/tailwind-plugins.md)

### 9. **Configure Responsive Breakpoints**

Standard breakpoints (usually defaults are fine):

```javascript
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Tablets
      'md': '768px',   // Small desktops
      'lg': '1024px',  // Desktops
      'xl': '1280px',  // Large desktops
      '2xl': '1536px', // Ultra-wide
    },
  }
}
```

### 10. **Export Configuration Reference**

Create a documentation file:

Reference: [Available Tailwind Utilities](./assets/tailwind-utilities-guide.md)

## Quick Checklist

- [ ] Define color palette (primary, secondary, semantic, neutral)
- [ ] Configure dark mode variants
- [ ] Set typography scale (font families, sizes, weights)
- [ ] Extend spacing and gaps
- [ ] Create custom utilities (.card, .input-base, etc.)
- [ ] Add custom animations and keyframes
- [ ] Install helpful plugins (@tailwindcss/forms)
- [ ] Document custom utilities and colors
- [ ] Test colors for WCAG contrast compliance
- [ ] Purge unused styles in production

## Common Patterns

### Complete Button Utility
```javascript
'.btn-primary': {
  '@apply': 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-primary-500 text-white hover:bg-primary-600 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
}
```

### Card Component Utility
```javascript
'.card': {
  '@apply': 'bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden'
}
```

### Input Utility
```javascript
'.input-field': {
  '@apply': 'w-full px-3 py-2 text-base border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors'
}
```

## References

- [tailwind.config.js Reference](./references/tailwind-config-reference.md) — Full config options
- [Available Tailwind Utilities](./assets/tailwind-utilities-guide.md) — What's available
- [Tailwind Plugins](./references/tailwind-plugins.md) — Community plugins (forms, typography)

## Template

See [Complete Config Template](./assets/tailwind.config.template.js) for a ready-to-use configuration.

## Integration with Other Skills

Works with:
- **Design System Architect agent** — Configures design tokens
- **Component Architect agent** — Uses configured colors/utilities
- **Dark Mode Implementation skill** — Dark mode configuration
- **ui-ux-pro skill** — Reference for design token principles

---

**Ready?** Update your tailwind.config.js with colors, typography, and custom utilities. Test with `npm run dev`.
