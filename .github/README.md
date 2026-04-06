# TrustServe UI/UX System - Complete Reference

Your complete, production-ready UI/UX ecosystem with agents and skills.

## 🎯 What You Have

### 1 Core Skill + 4 Supporting Skills + 4 Agents = Complete System

```
┌─────────────────────────────────────────────────────────────┐
│                     UI/UX PRO SKILL                         │
│         (Design Principles + Animation Guide)               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │  Component   │   │    Page      │   │   Design     │   │
│  │  Architect   │   │   Designer   │   │   System     │   │
│  │              │   │              │   │  Architect   │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
│         ↓                  ↓                   ↓            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           TAILWIND CONFIGURATION SKILL               │  │
│  │    (Colors, Spacing, Typography, Utilities)         │  │
│  └──────────────────────────────────────────────────────┘  │
│         ↓                  ↓                                │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │     Dark     │   │ Accessibility│   │   Animation  │   │
│  │     Mode     │   │   Auditing   │   │  Specialist  │   │
│  │              │   │              │   │              │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      COMPONENT LIBRARY MANAGEMENT SKILL               │  │
│  │    (Organization, Naming, Documentation)            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📚 Files at a Glance

| File | Purpose | Read Time |
|------|---------|-----------|
| **QUICKSTART.md** | Get started in 5 steps | 5 min |
| **AGENTS.md** | Agent reference & workflows | 10 min |
| **SKILLS.md** | Skills integration & mapping | 10 min |
| **ui-ux-pro/SKILL.md** | Design & animation principles | 20 min |
| **tailwind-configuration/SKILL.md** | Set up design tokens | 15 min |
| **dark-mode-implementation/SKILL.md** | Theme switching setup | 10 min |
| **component-library-management/SKILL.md** | Component standards | 15 min |
| **accessibility-auditing/SKILL.md** | WCAG AA testing | 15 min |

**Total time to fluency: ~90 minutes**

## 🚀 Quick Start (5 Steps)

### Step 1: Read Overview (5 min)
→ `.github/QUICKSTART.md`

### Step 2: Set Up Design System (15 min)
→ Use `/tailwind-configuration` skill

### Step 3: Set Up Dark Mode (10 min)
→ Use `/dark-mode-implementation` skill

### Step 4: Build First Component (20 min)
→ Use `@Component Architect` agent

### Step 5: Ensure Quality (10 min)
→ Use `/accessibility-auditing` skill

## 🎨 Design System

### Color Palette
- **Primary**: Trust color (green, blue, or custom)
- **Secondary**: Secondary action color
- **Semantic**: Success (green), warning (yellow), error (red), info (blue)
- **Neutral**: 10-shade gray scale (50–900)

**All defined in**: `tailwind.config.js` → `theme.extend.colors`

### Typography
- **Display**: Poppins or Sans (headings)
- **Body**: Inter or Sans (paragraphs)
- **Sizes**: h1–h6, body, small with configured line heights
- **Weights**: light (300), normal (400), medium (500), semibold (600), bold (700)

**All defined in**: `tailwind.config.js` → `theme.extend.fontSize`, `fontFamily`

### Spacing Scale
- **Grid**: 8px base
- **Tailwind defaults**: 0, 4px, 8px, 12px, 16px, 24px, 32px... (multiply by 4)
- **Common gaps**: xs (4px), sm (8px), md (16px), lg (24px), xl (32px)

**All defined in**: `tailwind.config.js` → `theme.extend.spacing`, `gap`

### Dark Mode
- **Strategy**: Hybrid (Tailwind `dark:` classes + Context + localStorage + system preference)
- **Approach**: Add `dark:` prefix to color classes in every component
- **Configuration**: `darkMode: 'class'` in tailwind.config.js

**Setup**: Use `/dark-mode-implementation` skill

## 🔧 Key Technologies

| Tech | Role | In Use |
|------|------|--------|
| **Tailwind CSS** | Utility-first styling | Primary |
| **shadcn/ui** | Accessible components | Reference |
| **Framer Motion** | React animations (light) | Recommended |
| **GSAP** | Complex animations (heavy) | For specialists |
| **React Context** | Theme switching | Dark mode |
| **Lucide Icons** | Icon library | Recommended |

## ✅ Quality Standards

Every component and page must meet:

- [ ] **WCAG 2.1 AA** — Accessibility compliant
- [ ] **Responsive** — Works at 375px, 768px, 1024px, 1280px
- [ ] **Dark Mode** — Includes `dark:` variants, tested toggle
- [ ] **Keyboard Navigation** — Tab, Enter, Escape, arrows all work
- [ ] **Documentation** — JSDoc, usage examples, accessibility notes
- [ ] **Design Tokens** — Uses configured colors/spacing (no hardcoded values)
- [ ] **Semantic HTML** — Proper tags (`<button>`, `<input>`, `<nav>`, etc.)
- [ ] **Performance** — 60 FPS animations, Lighthouse 90+

## 🤖 Agent Quick Picker

```
What you want to do           →  Agent to use
────────────────────────────────────────────────────
Build a button/card           →  @Component Architect
Design a whole page           →  @Page Designer
Create color/token system     →  @Design System Architect
Add scroll/parallax animation →  @Animation Specialist
```

## 📖 Documentation Structure

### By Role

**Designers**:
1. Read `ui-ux-pro/references/design-principles.md`
2. Use `tailwind-configuration/assets/` for available tokens
3. Reference `component-library-management/references/naming-conventions.md`

**Developers**:
1. Read `QUICKSTART.md` (5 min)
2. Follow steps 2–3 (tailwind + dark mode setup)
3. Use agents to build components
4. Run accessibility audit before submitting PR

**QA/Testers**:
1. Use `accessibility-auditing/SKILL.md` for testing
2. Check dark mode variant coverage
3. Validate component naming consistency
4. Test responsive at breakpoints (375, 768, 1024, 1280)

### By Task

**"How do I...?"**

| Task | Resource |
|------|----------|
| Add a color? | `tailwind-configuration/SKILL.md` |
| Create a component? | `@Component Architect` + `ui-ux-pro/SKILL.md` |
| Check WCAG AA? | `/accessibility-auditing` skill |
| Add dark mode to component? | `dark-mode-implementation/SKILL.md` |
| Set up project? | `QUICKSTART.md` |
| Understand agents? | `AGENTS.md` |
| Understand skills? | `SKILLS.md` |

## 🔄 Typical Workflow

### Building a Component
```
1. Check naming conventions (component-library-management)
2. Use component-architect agent
3. Apply tailwind tokens (tailwind-configuration)
4. Add dark: variants (dark-mode-implementation)
5. Add JSDoc + examples (component-library-management)
6. Run accessibility audit (accessibility-auditing)
```

### Building a Page
```
1. Design layout with page-designer agent
2. Apply responsive breakpoints (ui-ux-pro)
3. Use existing components from library
4. Add dark: variants throughout
5. Test keyboard nav & screen reader
6. Run Lighthouse audit
```

### Setting Up Project
```
1. Read QUICKSTART.md
2. Update tailwind.config.js (tailwind-configuration)
3. Add ThemeProvider (dark-mode-implementation)
4. Create ThemeToggle button
5. Test color application
6. Establish naming conventions
```

## 🏗️ Architecture

### Everything Flows Through Tailwind

```
tailwind.config.js (Single Source of Truth)
         ↓
    [design tokens]
         ↓
    ┌────┴────┐
    ↓         ↓
Components  Pages
    ↓         ↓
Both use dark: variants
    ↓         ↓
    └────┬────┘
         ↓
   ThemeContext (toggles 'dark' class on <html>)
         ↓
   localStorage (persists choice)
         ↓
   System preference (fallback)
```

### Skills Power Agents

```
Agent receives request
      ↓
Agent loads relevant skill
      ↓
Skill provides:
  - SKILL.md (step-by-step guidance)
  - references/ (detailed docs)
  - assets/ (templates, examples)
      ↓
Agent generates code
      ↓
Agent suggests next steps
```

## 📊 Complexity Levels

### Light (Easiest)
- Simple components (buttons, badges, inputs)
- CSS animations (< 300ms)
- Basic pages

**Skills**: ui-ux-pro, tailwind-configuration

### Medium
- Complex components (modals, dropdowns, tables)
- Framer Motion animations (300–800ms)
- Multi-section pages

**Skills**: ui-ux-pro, tailwind-configuration, dark-mode-implementation, component-library-management

### Heavy
- GSAP timelines and scroll effects
- Scroll-triggered animations
- Complex interaction patterns

**Skills**: All skills, primarily animation-guide in ui-ux-pro + Animation Specialist agent

## 🧪 Testing Checklist

Before shipping ANY component/page:

### Visual
- [ ] Matches design system (colors, spacing, typography)
- [ ] Responsive at breakpoints (375, 768, 1024, 1280)
- [ ] Dark mode variants tested and visible

### Accessibility
- [ ] Axe DevTools: 0 violations
- [ ] Contrast: 4.5:1 minimum (normal text), 3:1 (large)
- [ ] Keyboard: Can use Tab, Enter, Escape, arrows
- [ ] Screen reader: Meaningful announcements

### Performance
- [ ] Lighthouse accessibility score: 90+
- [ ] Animations: 60 FPS, GPU-accelerated
- [ ] Bundle size: No unexpected increases

### Code Quality
- [ ] JSDoc with @param, @returns, @example
- [ ] Using design tokens (no hardcoded colors)
- [ ] Semantic HTML (proper tags)
- [ ] displayName set on components

## 🎓 Learning Path

### Day 1: Fundamentals (~1 hour)
1. Read QUICKSTART.md
2. Read AGENTS.md
3. Read SKILLS.md

### Day 2-3: Setup (~1 hour total)
1. Follow QUICKSTART steps 2–3
2. Update tailwind.config.js
3. Add ThemeProvider, ThemeToggle

### Day 4+: Building (~ongoing)
1. Use agents to create components
2. Follow established conventions
3. Run accessibility audits
4. Build incrementally

## 🚨 Common Mistakes (Avoid These!)

❌ Hardcoding colors: `style={{ color: '#1F2937' }}`
✅ Use Tailwind: `className="text-neutral-900 dark:text-white"`

❌ Forgetting dark variants: `bg-white` (light mode only)
✅ Include both modes: `bg-white dark:bg-neutral-800`

❌ Component without JSDoc or displayName
✅ Export with docs and displayName

❌ No keyboard navigation support
✅ Test with Tab, Enter, Escape keys

❌ Low contrast text (< 4.5:1)
✅ Test with WebAIM Contrast Checker

❌ Forgetting `htmlFor` on form labels
✅ Always: `<label htmlFor="id">` + `<input id="id" />`

## 📞 Getting Help

**Question**: "How do I [build X]?"
**Answer**: Look in this order:
1. QUICKSTART.md
2. AGENTS.md (which agent?)
3. SKILLS.md (which skill?)
4. Specific skill's SKILL.md (step-by-step)
5. Reference docs in skill folder

## 🎉 You're Ready!

**Everything is in place.** You have:
- ✅ Complete design system framework
- ✅ 4 specialized agents ready to help
- ✅ 5 supporting skills with templates
- ✅ Full documentation and examples
- ✅ Quality gates and checklists

**Next**: Read QUICKSTART.md and start building!

---

**Questions?** Reference the SKILLS.md or AGENTS.md documents — they control everything.
