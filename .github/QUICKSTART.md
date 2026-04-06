# Quick Start Guide

Get up and running with the TrustServe UI/UX system in 5 steps.

## Step 1: Understand the System (5 min)

Read the overview documents in order:
1. `.github/AGENTS.md` — Available agents and workflows
2. `.github/SKILLS.md` — Available skills and integration

## Step 2: Set Up Tailwind Design System (15-30 min)

Use the **tailwind-configuration** skill to:
1. Define your color palette (primary, secondary, semantic, neutral)
2. Set up typography scale (font sizes, weights, families)
3. Configure dark mode (`darkMode: 'class'`)
4. Add custom utilities (`.card`, `.btn-base`, `.input-field`)
5. Test with `npm run dev` — colors should apply

**Reference**: `.github/skills/tailwind-configuration/SKILL.md`

Quick command:
```bash
# Check if tailwind.config.js has:
# - darkMode: 'class'
# - Extended colors with light and dark variants
# - Custom animations
```

## Step 3: Set Up Dark Mode Theme (10-15 min)

Use the **dark-mode-implementation** skill to:
1. Create `ThemeContext.jsx` — manages light/dark state
2. Wrap app with `<ThemeProvider>`
3. Create `ThemeToggle.jsx` button — header toggle
4. Test theme persistence (localStorage)
5. Test system preference detection

**Reference**: `.github/skills/dark-mode-implementation/SKILL.md`

Quick test:
```jsx
// App.jsx should look like:
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Header /> {/* Contains ThemeToggle button */}
      <Main />
    </ThemeProvider>
  )
}
```

## Step 4: Build First Component

Use the **Component Architect agent** with the template:

```
@Component Architect
Create a ServiceCard component that displays
- Service title
- Price in rupees  
- 5-star rating
- Contact button
- Make it responsive (mobile-first)
- Add hover animation
- Include dark mode variants
- Full accessibility (WCAG AA)
```

The agent will:
- Use the ui-ux-pro design template
- Apply your tailwind tokens
- Add dark: variants automatically
- Include JSDoc + usage examples
- Verify WCAG AA compliance

## Step 5: Build Your First Page

Use the **Page Designer agent**:

```
@Page Designer
Create a service marketplace page with:
- Header with search bar
- Hero section with CTA
- Grid of 12 service cards (responsive 1/2/3/4 columns)
- Filter sidebar (optional on mobile)
- Footer
- Responsive at 375px, 768px, 1024px, 1280px
```

The agent will:
- Use the layout template
- Apply responsive grid system
- Include dark mode variants
- Ensure semantic HTML
- Suggest placing your ServiceCard component here

## Common Tasks

### "Add a new color to the design"
1. Update `tailwind.config.js` in `theme.extend.colors`
2. Add BOTH light and dark variants
3. Test contrast with WebAIM Contrast Checker
4. Use in components: `className="bg-yourcolor-500 dark:bg-yourcolor-600"`

### "Check if page meets WCAG AA"
Use the **accessibility-auditing** skill:
1. Run Axe DevTools (Chrome extension)
2. Check color contrast (4.5:1 minimum)
3. Test keyboard navigation (Tab, Enter, Escape)
4. Test with NVDA screen reader
5. Generate audit report

### "Refactor existing component to new standards"
Use **component-library-management** skill:
1. Audit component (what props, what variants?)
2. Add JSDoc documentation
3. Add dark mode variants
4. Run accessibility check
5. Update component inventory

### "Add dark mode to existing components"
Simple process:
1. Find all hardcoded colors: `grep -r "bg-white\|text-black"` src/
2. Replace with Tailwind + dark: variants
3. Example: `bg-white` → `bg-white dark:bg-neutral-800`
4. Test theme toggle works
5. Verify contrast in dark mode

## Directory Your Skills Are In

```
.github/
├── skills/
│   ├── ui-ux-pro/          ← Design principles & animation guide
│   ├── component-library-management/  ← Component organization
│   ├── accessibility-auditing/        ← WCAG testing
│   ├── tailwind-configuration/        ← Design tokens
│   └── dark-mode-implementation/      ← Theme switching
├── agents/
│   ├── component-architect.agent.md
│   ├── page-designer.agent.md
│   ├── design-system-architect.agent.md
│   └── animation-specialist.agent.md
├── AGENTS.md               ← Master agent guide
└── SKILLS.md               ← Master skills guide
```

## How Agents & Skills Work Together

```
Your Request
    ↓
Agent picks right skill (e.g., ui-ux-pro)
    ↓
Loads templates, references, principles
    ↓
Generates code + documentation
    ↓
Suggests next steps (e.g., "Run accessibility-auditing skill")
```

## Testing Checklist for Every Component/Page

Before shipping, verify:

- [ ] **Design**: Follows ui-ux-pro hierarchy & spacing
- [ ] **Dark Mode**: Has `dark:` variants, tested toggle
- [ ] **Responsive**: Mobile 375px, tablet 768px, desktop 1024px+
- [ ] **Accessibility**: Runs Axe with 0 violations, keyboard nav works
- [ ] **Tailwind**: Uses defined tokens (no hardcoded colors)
- [ ] **Documentation**: JSDoc + usage examples
- [ ] **Performance**: Lighthouse score 90+

## Keyboard Shortcuts

In chat, quickly invoke agents:
```
/component-architect     (Build components)
/page-designer          (Design pages)
/design-system-architect (Create design system)
/animation-specialist   (Build animations)
```

Or use `/` to see all agents.

## Emergency Checklist: "Project Looks Inconsistent"

1. **Check colors**: Run `npm run dev`, use color picker, verify against tailwind.config.js
2. **Check spacing**: Components should use Tailwind spacing (no hardcoded px)
3. **Check fonts**: Typography should use configured font families
4. **Check dark mode**: Toggle theme, should update all colors
5. **Check components**: Use component index (`import { Button } from 'components'`)

## Examples in Real Code

### Minimal Component with All Standards
```jsx
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

/**
 * @component Badge
 * Semantic label for categorization
 * @param {'success'|'warning'|'error'|'info'} variant
 * @param {string} children
 * @returns {JSX.Element}
 */
const Badge = forwardRef(({ variant = 'info', children }, ref) => {
  const variants = {
    success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
    warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100',
    error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100',
    info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
  }

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}
    >
      {children}
    </motion.span>
  )
})

Badge.displayName = 'Badge'
export default Badge
```

✅ Has:
- JSDoc with example
- Dark mode variants (`dark:bg-*`, `dark:text-*`)
- Respects design system (no hardcoded colors)
- Accessible semantic HTML
- Animation (light, 300ms)
- displayName for debugging

## Resources

- **UI/UX Pro**: Full design system principles and animation guide
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **GSAP**: https://gsap.com/

---

**You're ready!** Start with Step 1 (5 min read), then Step 2 (15 min setup). After that, use agents to build components and pages.

**Questions?** Reference `.github/SKILLS.md` or `.github/AGENTS.md` for detailed guidance.
