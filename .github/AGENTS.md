# UI/UX Agents for TrustServe

Specialized agents for building modern, accessible, animated user interfaces. Each agent focuses on a specific domain.

## Quick Agent Picker

| Agent | Best For | Example Prompt |
|-------|----------|-----------------|
| **Component Architect** | Buttons, cards, inputs, modals, dropdowns | "Create a product card with hover animation" |
| **Page Designer** | Full pages, layouts, navigation, grids | "Build a worker dashboard layout" |
| **Design System Architect** | Colors, typography, tokens, animation presets | "Create a color palette for TrustServe" |
| **Animation Specialist** | GSAP sequences, scroll effects, complex interactions | "Add parallax to hero section with ScrollTrigger" |

## How Agents Work Together

```
User Request
    ↓
[Entry Agent Analyzes Task]
    ↓
    ├─→ "Build a component?" → Component Architect
    ├─→ "Design a page?" → Page Designer
    ├─→ "Create design tokens/system?" → Design System Architect
    └─→ "Animate something?" → Animation Specialist
    ↓
[Agent Executes with Collaboration]
    ↓
"I'll have the [Other Agent] create the [related asset]"
    ↓
[Coordinated Output]
```

## The Agents

### 1. **Component Architect**
- **Specializes in**: Atomic components (buttons, cards, inputs, tabs, modals, dropdowns)
- **Skills**: Accessibility, responsive sizing, micro-animations (< 300ms), Tailwind + shadcn patterns
- **Tools**: Read, edit, search (no terminal)
- **Uses the ui-ux-pro skill** for design principles + component template
- **Example collaboration**: "The Page Designer will place these components in a layout"

**Invoke when**:
- You need a single reusable component
- You want animations on buttons, hover states, focus rings
- You need full WCAG AA accessibility
- You're building a component library

---

### 2. **Page Designer**
- **Specializes in**: Full-page layouts, multi-section pages, responsive grids, navigation structures
- **Skills**: Semantic HTML, responsive breakpoints, section hierarchy, page transitions
- **Tools**: Read, edit, search (no terminal)
- **Uses the ui-ux-pro skill** for layout template + responsive patterns
- **Example collaboration**: "The Component Architect will build the buttons/cards used here"

**Invoke when**:
- You need a complete page layout
- You're designing a dashboard, marketplace, profile page
- You need responsive mobile → tablet → desktop
- You want proper semantic structure (``<header>``, ``<main>``, ``<section>``, ``<aside>``)

---

### 3. **Design System Architect**
- **Specializes in**: Design tokens, color palettes, typography systems, animation presets, Tailwind config
- **Skills**: Color theory, WCAG contrast ratios, token management, system-wide consistency
- **Tools**: Read, edit, search (no terminal)
- **Uses the ui-ux-pro skill** for design principles + color guidance
- **Example collaboration**: "The Component Architect will use these tokens in new components"

**Invoke when**:
- You need a consistent color palette
- You want to define a design system
- You're creating animation presets/library
- You need to extend tailwind.config.js
- You want to establish naming conventions for components

---

### 4. **Animation Specialist**
- **Specializes in**: GSAP timelines, scroll effects, parallax, complex micro-interactions, gesture animations
- **Skills**: GSAP, Framer Motion, scroll triggers, performance optimization, accessibility (prefers-reduced-motion)
- **Tools**: Read, edit, search (no terminal)
- **Uses the ui-ux-pro skill** for animation guide + performance tips
- **Example collaboration**: "Wrapping this animation in a component for reuse" (with Component Architect)

**Invoke when**:
- You need scroll-based animations (parallax, reveal on scroll)
- You want complex animation sequences or timelines
- You need gesture interactions (drag, swipe, pinch)
- You need to optimize animation performance
- You want to create reusable animation presets

---

## Workflow Examples

### Example 1: Building a Service Card Component
```
User: "Create a service card showing name, price, rating with hover animation"

→ Component Architect
  ├─ Reads ui-ux-pro component template
  ├─ Designs responsive card layout
  ├─ Adds hover scale + shadow animation
  ├─ Implements accessibility (semantic HTML, ARIA labels)
  └─ Delivers JSX + usage examples

→ Output: Reusable card component for marketplace pages
```

### Example 2: Building a Worker Dashboard
```
User: "Design the worker dashboard page with sidebar navigation and stats grid"

→ Page Designer
  ├─ Reads ui-ux-pro layout template
  ├─ Creates semantic page structure
  ├─ Builds responsive grid for stats
  ├─ Adds mobile navigation
  └─ "The Component Architect will build the stat cards and buttons I've placed here"

→ Component Architect (if called)
  └─ Builds stat cards with up/down indicators

→ Output: Complete responsive dashboard layout
```

### Example 3: Establishing Design System
```
User: "Create a design system for TrustServe with color palette, typography, and animation presets"

→ Design System Architect
  ├─ Creates 5-color palette (primary, success, warning, error, info)
  ├─ Defines typography hierarchy (h1–h6, body, captions)
  ├─ Creates animation presets (entrance, exit, hover, loading)
  ├─ Updates tailwind.config.js with tokens
  └─ "Developers will use these tokens in all components and pages"

→ Component Architect & Page Designer (downstream use)
  └─ Both reference tokens for consistency

→ Output: Scalable design system for entire project
```

### Example 4: Adding Complex Scroll Animations
```
User: "Add parallax scrolling to the hero section and fade-in for cards as user scrolls"

→ Animation Specialist
  ├─ Reviews ui-ux-pro animation guide
  ├─ Sets up GSAP + ScrollTrigger plugin
  ├─ Creates parallax for hero background
  ├─ Creates entrance stagger for cards
  ├─ Implements prefers-reduced-motion fallback
  ├─ Tests performance on low-end devices
  └─ "Wrapping these animations in a component helper for reuse"

→ Output: Performant scroll animations integrated into existing layout
```

---

## Tool Restrictions (By Design)

All agents are **read-only terminal** (no shell execution) to maintain focus on design work:
- ✅ Can read files (find patterns, examples)
- ✅ Can edit files (create/modify components, layouts, configs)
- ✅ Can search (find similar patterns)
- ❌ Cannot run npm/terminal commands (keeps scope focused)

---

## Quality Gates (All Agents)

Before delivering, EVERY agent verifies:

| Gate | Check |
|------|-------|
| **Accessibility** | WCAG 2.1 AA compliance, semantic HTML, ARIA labels, keyboard nav |
| **Responsive** | Mobile (375px), tablet (768px), desktop (1024px+) all tested |
| **Dark mode** | Includes `dark:` Tailwind variants throughout |
| **Performance** | Animations at 60 FPS, GPU-accelerated, < 10% bundle increase |
| **Consistency** | Follows TrustServe design language (clean, rural-friendly, trust-focused) |
| **Documentation** | JSDoc, usage examples, accessibility notes included |

---

## Cheat Sheet: Commands to Try

### Component Creation
- `/component-architect` "Create a rating stars component with clickable stars"
- `/component-architect` "Build a search input with autocomplete dropdown"
- `/component-architect` "Design a booking confirmation modal"

### Page Design
- `/page-designer` "Build the service marketplace page with grid and filters"
- `/page-designer` "Create a user profile page with tabs and sections"
- `/page-designer` "Design the booking details page"

### Design System
- `/design-system-architect` "Create a color palette with light and dark modes"
- `/design-system-architect` "Define typography system for TrustServe"
- `/design-system-architect` "Build an animation preset library"

### Animations
- `/animation-specialist` "Add GSAP parallax to the homepage hero"
- `/animation-specialist` "Create scroll-triggered card entrance animations"
- `/animation-specialist` "Build a complex loading sequence animation"

---

## Integration with ui-ux-pro Skill

All agents load and reference the **ui-ux-pro skill** which provides:
- Design & Accessibility Principles (WCAG, color theory, spacing, typography)
- Animation & Motion Guide (timing, easing, GSAP/Framer Motion patterns)
- Component Template (starter code for atomic components)
- Layout Template (starter code for responsive pages)

**The skill + agents work together:**
- Skill = foundational knowledge + templates
- Agents = specialized execution + project-specific decisions

---

## Next Steps

1. Try one agent with `/` command picker
2. See auto-routing in action (agent picks based on your prompt)
3. Agents will suggest collaborations ("The Page Designer will...") when needed
4. Build components → pages → design system → animations in any order

---

**Questions?** Ask any agent — they'll collaborate or handoff as needed.
