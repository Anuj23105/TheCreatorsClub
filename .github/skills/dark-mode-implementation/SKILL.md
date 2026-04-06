---
name: dark-mode-implementation
description: 'Setup and manage dark mode with theme switching, CSS variables, and token management. Use for implementing light/dark color schemes, theme persistence, system preference detection, and dark mode testing.'
argument-hint: 'Describe what you need (e.g., "Set up dark mode toggle", "Create theme variable system", "Add dark mode to existing components")'
---

# Dark Mode Implementation

Implement a robust dark mode system for TrustServe with theme switching, persistence, and comprehensive styling.

## When to Use

- Setting up light/dark mode toggle
- Creating theme color tokens
- Converting components to support dark mode
- Implementing system preference detection
- Testing dark mode across application
- Managing theme persistence
- Creating dark mode design tokens

## Step-by-Step Procedure

### 1. **Choose Dark Mode Strategy**

Reference: [Dark Mode Strategies](./references/dark-mode-strategies.md)

| Strategy | Implementation | Best For |
|----------|---|---|
| **Class-based** | Tailwind `dark:` class | Most flexible, projects using Tailwind |
| **CSS Variables** | --color-primary, --bg-primary, etc. | Complex token systems, multi-theme |
| **Context-based** | React Theme Context | Dynamic theme switching in React |
| **localStorage** | Persist user preference | Remember user choice across sessions |
| **System preference** | prefers-color-scheme media query | Respect OS settings |

**Recommendation for TrustServe**: **Hybrid approach** = Tailwind dark: + localStorage + system preference

### 2. **Set Up Tailwind Dark Mode**

Configure in tailwind.config.js:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',  // Enable class-based dark mode

  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FFFFFF',
          surface: '#F9FAFB',
          text: '#1F2937',
          border: '#E5E7EB',
        },
        dark: {
          bg: '#111827',
          surface: '#1F2937',
          text: '#F9FAFB',
          border: '#374151',
        },
      },
    }
  }
}
```

### 3. **Create Dark Mode Provider**

Set up React Context for theme management:

```javascript
// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Update DOM
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Persist preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

**Usage**:
```jsx
// App.jsx
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  )
}
```

### 4. **Create Theme Toggle Component**

Build a user-facing toggle:

```jsx
// src/components/ui/ThemeToggle.jsx
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-neutral-700" />
      )}
    </button>
  )
}
```

**Place in header/navigation**:
```jsx
<header>
  <nav className="flex items-center justify-between">
    <Logo />
    <ThemeToggle />
  </nav>
</header>
```

### 5. **Define Color Tokens**

Create a comprehensive color system with light and dark variants:

```javascript
// tailwind.config.js - Extended colors for dark mode

module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic colors with variants
        primary: {
          light: { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' },
          dark: { bg: '#064E3B', text: '#D1FAE5', border: '#047857' },
        },
        secondary: {
          light: { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' },
          dark: { bg: '#0C2340', text: '#93C5FD', border: '#1E40AF' },
        },
        // Direct semantic colors (handled by Tailwind dark: prefix)
        success: {
          50: '#F0FDF4', 500: '#22C55E',
          dark: '#16A34A',
        },
        warning: {
          50: '#FFFBEB', 500: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          50: '#FEF2F2', 500: '#EF4444',
          dark: '#DC2626',
        },
        // Neutral scale
        neutral: {
          50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB',
          400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563', 700: '#374151',
          800: '#1F2937', 900: '#111827',
        },
      },
    }
  }
}
```

### 6. **Convert Components to Dark Mode**

Add `dark:` variants to existing components:

**Before** (light mode only):
```jsx
<div className="bg-white text-neutral-900 border border-neutral-200">
  <h2 className="text-neutral-700">Title</h2>
  <p className="text-neutral-600">Description</p>
</div>
```

**After** (light + dark mode):
```jsx
<div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700">
  <h2 className="text-neutral-700 dark:text-neutral-300">Title</h2>
  <p className="text-neutral-600 dark:text-neutral-400">Description</p>
</div>
```

**Common conversions**:

| Element | Light | Dark |
|---------|-------|------|
| Background | `bg-white` | `dark:bg-neutral-800` |
| Text | `text-neutral-900` | `dark:text-white` |
| Borders | `border-neutral-200` | `dark:border-neutral-700` |
| Hover BG | `hover:bg-neutral-50` | `dark:hover:bg-neutral-700` |
| Cards | `shadow-sm` | `dark:shadow-none dark:border` |
| Inputs | `bg-white border-neutral-300` | `dark:bg-neutral-700 dark:border-neutral-600` |

### 7. **Test Dark Mode Across Application**

**Manual testing checklist**:
- [ ] Toggle theme via button
- [ ] Theme persists on page reload
- [ ] System preference detected on first load
- [ ] All colors have sufficient contrast in dark mode (4.5:1)
- [ ] No hardcoded colors (everything uses Tailwind classes)
- [ ] Images visible in dark mode
- [ ] Form inputs readable
- [ ] Buttons visible and clickable
- [ ] Navigation clear in both modes
- [ ] Code block backgrounds readable

**Automated testing**:
```javascript
describe('Dark Mode', () => {
  test('Toggle theme', () => {
    render(<ThemeProvider><App /></ThemeProvider>)
    const button = screen.getByRole('button', { name: /dark mode/i })
    fireEvent.click(button)
    expect(document.documentElement).toHaveClass('dark')
  })

  test('Persist theme on reload', () => {
    render(<ThemeProvider><App /></ThemeProvider>)
    expect(localStorage.getItem('theme')).toBeDefined()
  })
})
```

### 8. **Handle Edge Cases**

**Prefers dark mode in reduced motion**:
```css
@media (prefers-color-scheme: dark) and (prefers-reduced-motion: reduce) {
  /* No transitions, instant theme change */
  * {
    transition: none !important;
  }
}
```

**Transition between modes smoothly**:
```jsx
<div className="transition-colors duration-200 bg-white dark:bg-neutral-800">
  Content
</div>
```

**Respect system preference even if user hasn't picked a theme**:
```jsx
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
```

### 9. **Create Dark Mode Documentation**

Usage guide for team:

```markdown
## Dark Mode Usage

### Adding Dark Mode to Components

1. Add `dark:` variants to all color classes
2. Test with theme toggle
3. Verify contrast (4.5:1 minimum)

### Color Classes

**Text**:
- Light: `text-neutral-900`
- Dark: `dark:text-white`

**Backgrounds**:
- Light: `bg-white`
- Dark: `dark:bg-neutral-800`

**Borders**:
- Light: `border-neutral-200`
- Dark: `dark:border-neutral-700`

### Testing Dark Mode

1. Click theme toggle button (top-right)
2. Verify readability
3. Check localStorage.theme

### Common Mistakes

❌ Hardcoded colors:
\`\`\`jsx
<div style={{ color: '#1F2937' }}>Light only</div>
\`\`\`

✅ Use Tailwind:
\`\`\`jsx
<div className="text-neutral-900 dark:text-white">Works both modes</div>
\`\`\`
```

Reference: [Dark Mode Component Examples](./assets/dark-mode-examples.md)

## Quick Checklist

- [ ] Enable `darkMode: 'class'` in tailwind.config.js
- [ ] Create ThemeProvider context
- [ ] Create ThemeToggle component
- [ ] Define color tokens (light + dark)
- [ ] Convert all components to use `dark:` variants
- [ ] Test contrast ratios in dark mode
- [ ] Test theme persistence (localStorage)
- [ ] Test system preference detection
- [ ] Document dark mode guidelines
- [ ] Test on actual devices

## Common Patterns

### Card in Dark Mode
```jsx
<div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm dark:shadow-none p-6">
  {content}
</div>
```

### Button in Dark Mode
```jsx
<button className="bg-primary-500 dark:bg-primary-600 text-white hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors">
  Action
</button>
```

### Form Input in Dark Mode
```jsx
<input
  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
  placeholder="Enter text"
/>
```

## References

- [Dark Mode Strategies](./references/dark-mode-strategies.md) — Implementation approaches
- [Dark Mode Component Examples](./assets/dark-mode-examples.md) — Real component examples
- [Tailwind Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)

## Integration with Other Skills

Works with:
- **Tailwind Configuration skill** — Color token setup for dark mode
- **Design System Architect agent** — Creates dark mode tokens
- **Component Architect agent** — Builds components with dark mode
- **ui-ux-pro skill** — Design principles for color and contrast

---

**Ready?** Set up ThemeProvider, create ThemeToggle button, and start adding `dark:` variants to components.
