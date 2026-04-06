# Dark Mode Implementation Strategies

Different approaches to implementing light/dark modes.

## Strategy Comparison

| Strategy | Implementation | Pros | Cons | Best For |
|----------|---|---|---|---|
| **Tailwind `dark:` class** | Add `dark:` prefix to Tailwind classes | Simple, no overhead, built-in | Limited dynamic changes | Most projects |
| **CSS Variables** | `--color-primary: #fff` or `#000` | Flexible, dynamic, non-Tailwind | More complex setup | Complex systems, multiple themes |
| **Context + localStorage** | React state + persistence | Dynamic, persists | Requires context setup | React apps needing theme switching |
| **System preference** | `prefers-color-scheme` media query | Respects OS settings | No user toggle | Passive approach |
| **Hybrid** (Recommended) | Tailwind + Context + localStorage + system preference | All benefits, flexible | Slightly complex | Production apps |

## Recommended Approach: Hybrid

Combines Tailwind `dark:` classes with React Context for theme persistence.

### Quick Setup

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
}
```

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

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

### Adding to Component

```jsx
<div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">
  Content
</div>
```

## CSS Variables Approach

For more complex systems with multiple themes (brand variants, seasonal themes):

```css
:root {
  --color-primary: rgb(16 185 129);
  --color-surface: rgb(255 255 255);
  --color-text: rgb(31 41 55);
}

[data-theme="dark"] {
  --color-primary: rgb(16 185 129);
  --color-surface: rgb(17 24 39);
  --color-text: rgb(249 250 251);
}

/* Usage */
.btn {
  background-color: var(--color-primary);
  color: var(--color-text);
}
```

**Pros**: Can efficiently switch between multiple themes
**Cons**: More setup, not built into Tailwind (unless configured)

## System Preference Detection

Automatically match OS dark mode setting:

```javascript
// Check current preference
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// Listen for changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
mediaQuery.addEventListener('change', (e) => {
  setIsDark(e.matches)
})
```

**Good for**: Passive approach where you respect user's OS preference
**Less ideal for**: Users who want explicit toggle in app

## Transitioning Between Modes

Control animation speed:

```jsx
// Instant (no transition)
<div className="bg-white dark:bg-neutral-800">...</div>

// Smooth transition
<div className="transition-colors duration-300 bg-white dark:bg-neutral-800">...</div>

// Respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Dark Mode

### Manual Testing
1. Click theme toggle
2. Verify colors change
3. Reload page (should persist)
4. Check contrast with WebAIM
5. Test on different devices

### Automated Testing
```javascript
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/context/ThemeContext'

test('Dark mode applies dark class', () => {
  render(
    <ThemeProvider>
      <div className="dark:bg-black">Content</div>
    </ThemeProvider>
  )
  expect(document.documentElement).toHaveClass('dark')
})
```

## Common Mistakes

❌ **Hardcoded colors** (ignores dark mode):
```jsx
<div style={{ color: '#1F2937' }}>Text</div>
```

✅ **Use Tailwind classes**:
```jsx
<div className="text-neutral-900 dark:text-white">Text</div>
```

---

❌ **Assuming light/dark in images**:
```jsx
// Image might not be visible in dark mode
<img src="light-logo.png" />
```

✅ **Provide variants or allow background**:
```jsx
// Use logo with optional background
<img src="logo.svg" className="bg-white dark:bg-neutral-800 p-2 rounded" />
```

---

❌ **Not testing contrast**:
Dark text on dark background = unreadable

✅ **Always verify WCAG AA (4.5:1)**

---

## When to Use Each Approach

| Scenario | Approach |
|----------|----------|
| Simple Tailwind project | Use `dark:` classes + Tailwind |
| Need theme toggle | Add Context + localStorage |
| Respect OS preference | Add system preference detection |
| Multiple color schemes (variants) | CSS variables + theme switching |
| Complex design system | CSS variables + Design tokens |
