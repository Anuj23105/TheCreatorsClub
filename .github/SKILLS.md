# UI/UX Skills Ecosystem for TrustServe

Complete system of interconnected skills for designing, building, testing, and maintaining a modern marketplace UI.

## Skills Overview

| Skill | Purpose | When to Use |
|-------|---------|-----------|
| **ui-ux-pro** | Foundational design & animation principles | Every component and page design |
| **component-library-management** | Organize and document reusable components | Building scalable component library |
| **accessibility-auditing** | WCAG 2.1 compliance testing & validation | Before shipping any page or component |
| **tailwind-configuration** | Extend Tailwind with design tokens | Setting up project-wide design system |
| **dark-mode-implementation** | Light/dark mode with theme switching | Building consistent light & dark experiences |

## Skill Dependencies Graph

```
                          ui-ux-pro (Foundation)
                                 ↓
                    ┌────────────┼────────────┐
                    ↓            ↓            ↓
          Component Lib    Tailwind Config   Dark Mode
          Management             ↓               ↓
                ↓                ↓               ↓
          [Design tokens] ← [Colors & tokens] ← [Theme tokens]
                ↓                               ↓
          Accessibility ←──────────────────────┘
          Auditing       (Test with dark mode variants)
```

## How to Use Together

### Workflow 1: Building a New Component

1. **ui-ux-pro** → Understand design principles (hierarchy, accessibility, animations)
2. **tailwind-configuration** → Use configured color tokens and utilities
3. **component-library-management** → Follow naming conventions and JSDoc patterns
4. **dark-mode-implementation** → Add `dark:` variants to all color classes
5. **accessibility-auditing** → Test WCAG AA compliance before shipping
6. **component-library-management** → Document in component inventory

### Workflow 2: Building a Full Page

1. **ui-ux-pro** → Design page layout and visual hierarchy
2. **tailwind-configuration** → Apply configured spacing, colors, typography
3. **dark-mode-implementation** → Ensure dark mode variants throughout
4. **accessibility-auditing** → Test keyboard nav, heading hierarchy, focus management
5. **component-library-management** → Identify components to extract for library

### Workflow 3: Establishing Design System

1. **tailwind-configuration** → Define colors, spacing, typography tokens
2. **dark-mode-implementation** → Create dark mode color variants
3. **component-library-management** → Set naming conventions and documentation standards
4. **ui-ux-pro** → Document design language and usage patterns
5. **accessibility-auditing** → Validate all tokens meet WCAG contrast ratios

### Workflow 4: Accessibility Audit

1. **accessibility-auditing** → Run automated tools (Axe, Lighthouse)
2. **dark-mode-implementation** → Check dark mode color contrast separately
3. **accessibility-auditing** → Manually test keyboard navigation, screen reader
4. **tailwind-configuration** → Fix color tokens if contrast issues
5. **accessibility-auditing** → Generate audit report

## Quick Start by Role

### For Designers
1. Read **ui-ux-pro** for design principles
2. Use **tailwind-configuration** to understand available colors/tokens
3. Use **component-library-management** to see existing components
4. Reference **dark-mode-implementation** for dark mode considerations

### For Frontend Developers
1. Read **tailwind-configuration** to understand custom utilities
2. Follow **component-library-management** naming conventions
3. Reference **ui-ux-pro** for animation timing and accessibility
4. Use **dark-mode-implementation** when building components
5. Run **accessibility-auditing** before submitting PR

### For QA / Testers
1. Use **accessibility-auditing** to validate WCAG compliance
2. Check **dark-mode-implementation** variant coverage
3. Verify **component-library-management** naming consistency
4. Test responsive breakpoints against **ui-ux-pro** guidelines

## Integration with Agents

| Agent | Uses These Skills |
|-------|---|
| **Component Architect** | ui-ux-pro, component-library-management, tailwind-configuration, dark-mode-implementation, accessibility-auditing |
| **Page Designer** | ui-ux-pro, tailwind-configuration, dark-mode-implementation, accessibility-auditing |
| **Design System Architect** | tailwind-configuration, dark-mode-implementation, component-library-management, ui-ux-pro |
| **Animation Specialist** | ui-ux-pro, dark-mode-implementation (respects prefers-reduced-motion) |

## Key Principles Across All Skills

### 1. Accessibility First
Every skill includes WCAG 2.1 AA compliance:
- Color contrast (4.5:1 minimum)
- Keyboard navigation
- Screen reader compatibility
- Semantic HTML
- Focus management

### 2. Dark Mode Built-In
All skills assume light AND dark mode variants:
- **tailwind-configuration**: Dark mode color tokens
- **dark-mode-implementation**: Theme switching setup
- **component-library-management**: Documentation includes dark mode notes
- **ui-ux-pro**: Design principles account for both modes

### 3. Design Tokens as Single Source of Truth
All custom colors/sizes defined in:
- **tailwind.config.js** (Tailwind tokens)
- **ThemeContext.jsx** (Theme switching)
- No hardcoded colors in components

### 4. Mobile-First Responsive
All designs start mobile (375px), then scale up:
- **ui-ux-pro**: Mobile-first breakpoints (sm, md, lg, xl)
- **tailwind-configuration**: Responsive utilities
- **component-library-management**: Components document responsive behavior

### 5. Rural-Friendly Design
TrustServe-specific considerations:
- Clear typography (readable on small screens)
- Reduced motion (many animations optional)
- Fast load times (optimize images, bundle size)
- Offline capability (when applicable)

## Common Tasks & Which Skill to Use

| Task | Skill |
|------|-------|
| "Add a new color to the palette" | **tailwind-configuration** |
| "Create a button component" | **component-library-management** + **ui-ux-pro** |
| "Set up dark mode toggle" | **dark-mode-implementation** |
| "Test if page meets WCAG AA" | **accessibility-auditing** |
| "Organize components folder" | **component-library-management** |
| "Design the dashboard layout" | **ui-ux-pro** |
| "Add GSAP scroll animations" | **ui-ux-pro** (animation guide) |
| "Document existing components" | **component-library-management** |
| "Check color contrast on dark mode" | **dark-mode-implementation** + **accessibility-auditing** |
| "Create Storybook component stories" | **component-library-management** |

## File Structure

```
.github/skills/
├── ui-ux-pro/
│   ├── SKILL.md
│   ├── references/
│   │   ├── design-principles.md
│   │   └── animation-guide.md
│   └── assets/
│       ├── component-template.jsx
│       └── layout-template.jsx
├── component-library-management/
│   ├── SKILL.md
│   ├── references/
│   │   └── naming-conventions.md
│   └── assets/
│       ├── component-audit-template.md
│       ├── component-jsdoc-template.md
│       ├── library-readiness-checklist.md
│       └── component-inventory.md
├── accessibility-auditing/
│   ├── SKILL.md
│   ├── references/
│   │   └── wcag-quick-reference.md
│   └── assets/
│       ├── keyboard-navigation-checklist.md
│       ├── screen-reader-testing.md
│       └── audit-report-template.md
├── tailwind-configuration/
│   ├── SKILL.md
│   ├── references/
│   │   ├── tailwind-config-reference.md
│   │   └── tailwind-plugins.md
│   └── assets/
│       ├── tailwind.config.template.js
│       └── tailwind-utilities-guide.md
└── dark-mode-implementation/
    ├── SKILL.md
    ├── references/
    │   └── dark-mode-strategies.md
    └── assets/
        ├── dark-mode-examples.md
        └── ThemeContext.template.jsx
```

## Getting Started Sequence

### Week 1: Foundation
1. Read **ui-ux-pro** design principles
2. Set up **tailwind-configuration** (colors, spacing, typography)
3. Set up **dark-mode-implementation** (ThemeProvider, ThemeToggle)

### Week 2: Components
1. Establish **component-library-management** conventions
2. Build atomic components using design tokens
3. Apply dark mode variants to all components

### Week 3: Quality
1. Run **accessibility-auditing** on all components
2. Fix WCAG AA issues
3. Document components in library inventory

### Ongoing
- New components follow established conventions
- Every PR includes accessibility check
- Design tokens stay centralized
- Dark mode always tested

## Resources

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **GSAP**: https://gsap.com/
- **WebAIM**: https://webaim.org/

---

**Next Step**: Pick one skill and dive in. Start with **tailwind-configuration** to set up your design system, then **dark-mode-implementation** for theme support. The other skills will guide your components and pages.
