---
name: accessibility-auditing
description: 'Test and validate WCAG 2.1 compliance. Use for checking color contrast, keyboard navigation, screen reader compatibility, heading hierarchy, focus management, and generating accessibility reports.'
argument-hint: 'Describe what you want to audit (e.g., "Check color contrast on all buttons", "Test keyboard navigation on modal", "Validate heading hierarchy")'
---

# Accessibility Auditing

Systematically test UI components and pages for WCAG 2.1 AA/AAA compliance.

## When to Use

- Checking if components meet WCAG 2.1 AA standards
- Testing keyboard navigation (Tab, Enter, Escape, arrow keys)
- Validating color contrast ratios
- Verifying screen reader compatibility
- Checking heading hierarchy on pages
- Testing focus management and focus indicators
- Generating accessibility audit reports
- Remediating accessibility issues

## Step-by-Step Procedure

### 1. **Understand WCAG 2.1 Levels**

Reference: [WCAG 2.1 Quick Reference](./references/wcag-quick-reference.md)

| Level | Requirement | Standard |
|-------|-------------|----------|
| **A** | Basic accessibility | Minimum, rarely sufficient |
| **AA** | Acceptable (Target) | 4.5:1 contrast, alt text, keyboard access |
| **AAA** | Enhanced (Nice-to-have) | 7:1 contrast, extended audio descriptions |

**Target for TrustServe**: WCAG 2.1 **AA** compliance

### 2. **Automated Testing (First Pass)**

Run tools to catch obvious issues:

**Tools**:
- **Axe DevTools** (browser extension) — Scans page, shows violations, severity levels
- **Lighthouse** (Chrome DevTools) — Accessibility score + specific issues
- **WAVE** (browser extension) — Visual feedback on ARIA, contrast, structure
- **axe-core** (npm package) — Programmatic testing

**Quick audit**:
```bash
# Using axe-core in React Testing Library
import { axe, toHaveNoViolations } from 'jest-axe'

test('Button is accessible', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

Reference: [Automated Testing Setup](./assets/automated-testing-setup.md)

### 3. **Manual Testing: Color Contrast**

Verify all text-to-background combinations:

**Standards**:
- **Normal text** (< 18px): 4.5:1 (AA), 7:1 (AAA)
- **Large text** (≥ 18px): 3:1 (AA), 4.5:1 (AAA)

**Test tools**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Stark (Figma plugin)](https://www.getstark.co/)
- Chrome DevTools (DevTools → Elements → Computed → check contrast)

**Checklist** (for TrustServe):
- [ ] Primary text on primary background: 4.5:1+
- [ ] Primary text on secondary background: 4.5:1+
- [ ] Secondary text on primary background: 4.5:1+
- [ ] Button text on button background: 4.5:1+
- [ ] Links on background: 4.5:1+ AND visually distinct (not just color)
- [ ] Icons with meaning: text equivalent or sufficient background contrast
- [ ] Form labels on background: 4.5:1+
- [ ] Disabled text: ≥ 3:1 (acceptable for disabled state)

**Common failures** to fix:
```
❌ #AAAAAA text on #FFFFFF = 2.3:1 (FAIL)
✅ #666666 text on #FFFFFF = 4.5:1 (PASS)

❌ #555555 (medium gray) on #F5F5F5 (light gray) = 1.6:1 (FAIL)
✅ #333333 (dark gray) on #F5F5F5 = 5.1:1 (PASS)
```

### 4. **Manual Testing: Keyboard Navigation**

Verify all functionality works via keyboard:

**Test procedure**:
1. **Close trackpad/mouse** — Use ONLY Tab, Enter, Escape, Arrow keys
2. **Tab through the page** — Tab order should match visual flow
3. **Enter key on buttons** — Should trigger action
4. **Escape on modals** — Should close
5. **Arrow keys in menus/tabs** — Should navigate options
6. **Focus visible** — Clear focus indicator (outline or highlight)

**Checklist**:
- [ ] All interactive elements reachable via Tab
- [ ] Tab order logical (top-left → bottom-right)
- [ ] No keyboard traps (can always Tab out)
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys work in: menus, tabs, lists, radio buttons
- [ ] Focus always visible (not hidden by outline: none)
- [ ] Link vs Button semantics used correctly

**Common fixes**:
```jsx
// ❌ BAD: Keyboard inaccessible
<div onClick={handleClick}>Click me</div>

// ✅ GOOD: Proper semantics
<button onClick={handleClick}>Click me</button>

// OR if using a div, add keyboard support:
<div
  role="button"
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  tabIndex={0}
>
  Click me
</div>
```

Reference: [Keyboard Navigation Checklist](./assets/keyboard-navigation-checklist.md)

### 5. **Manual Testing: Screen Reader**

Test with actual screen readers (not just keyboard):

**Setup** (Free options):
- **NVDA** (Windows, free) — Most common for testing
- **VoiceOver** (Mac/iOS, built-in) — Cmd+F5 to enable
- **Narrator** (Windows, built-in) — Limited but free

**Test procedure**:
1. Enable screen reader
2. Navigate page with Tab key
3. Verify spoken announcements are meaningful
4. Check form labels announced
5. Verify link text is descriptive (not "click here")
6. Check headings announced correctly
7. Check button/link purpose clear

**Common fixes**:
```jsx
// ❌ BAD: Meaningless link text
<a href="/services">Click here</a>

// ✅ GOOD: Descriptive text
<a href="/services">View all services</a>

// BAD: Form input unlabeled
<input type="text" placeholder="Enter name" />

// GOOD: Input has explicit label
<label htmlFor="name">Your name:</label>
<input id="name" type="text" />

// BAD: Icon with no label
<button><SearchIcon /></button>

// GOOD: Icon button labeled
<button aria-label="Search"><SearchIcon /></button>
```

Reference: [Screen Reader Testing Guide](./assets/screen-reader-testing.md)

### 6. **Manual Testing: Heading Hierarchy**

Verify heading structure is logical:

**Rule**: Use h1–h6 sequentially, one h1 per page

```html
❌ BAD: Skips levels
<h1>Page Title</h1>
<h3>Section</h3>  <!-- Skipped h2 -->
<h4>Subsection</h4>

✅ GOOD: Logical flow
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h3>Another subsection</h3>
<h2>Another section</h2>
```

**Test with heading navigator**:
- Chrome DevTools Extensions: "HeadingsMap" or "Accessibility Inspector"
- NVDA/VoiceOver: Lists all headings in document

### 7. **Manual Testing: Focus Management**

Verify focus moves predictably:

**Checklist**:
- [ ] Focus visible on all interactive elements
- [ ] Focus outline not hidden (no outline: none without replacement)
- [ ] Focus order matches visual order (tab left-to-right, top-to-bottom)
- [ ] Modal traps focus inside (can't Tab to background)
- [ ] Focus returns logically after closing modal
- [ ] Dropdown focus management (Arrow keys move focus within dropdown)

**Example: Modal focus trap**:
```jsx
useEffect(() => {
  // Focus first input when modal opens
  firstInputRef.current?.focus()

  // When user Tabs past last element, return to first
  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && document.activeElement === lastElementRef.current) {
      e.preventDefault()
      firstInputRef.current?.focus()
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [])
```

### 8. **Create Accessibility Report**

Document findings:

**Template**:
```markdown
## Accessibility Audit Report

**Component/Page**: ProductCard
**Date**: 2024-04-05
**Tested Against**: WCAG 2.1 AA

### Results

| Category | Status | Notes |
|----------|--------|-------|
| Color Contrast | ✅ PASS | All text 4.5:1+ ratio |
| Keyboard Navigation | ✅ PASS | Tab order logical, focus visible |
| Screen Reader | ⚠️ NEEDS WORK | Missing alt text on images |
| Heading Hierarchy | ✅ PASS | Proper h1-h3 structure |
| Focus Management | ✅ PASS | Focus visible and logical |

### Issues Found

1. **Image missing alt text** (Priority: High)
   - Element: <img src="product.jpg" />
   - Fix: Add alt="Product image of {name}"

2. **Button text not descriptive** (Priority: Medium)
   - Element: <button>Click</button>
   - Fix: Change to <button>Add to cart</button>

### Recommendations

1. Add aria-labels to icon buttons
2. Increase focus outline thickness (currently 1px, recommend 2-3px)
3. Test with actual screen reader (NVDA)
```

Reference: [Audit Report Template](./assets/audit-report-template.md)

## Quick Checklist (WCAG 2.1 AA Minimum)

✅ **Contrast**: 4.5:1 on all text
✅ **Keyboard**: All interactive elements Tab-able, Enter/Space work
✅ **Focus**: Clear focus indicators, logical Tab order
✅ **Headings**: h1–h6 in order, one h1 per page
✅ **Images**: alt text for images, decorative images marked aria-hidden
✅ **Forms**: Labels properly associated with inputs
✅ **Links**: Descriptive link text (not "click here")
✅ **Motion**: No automated animations that distract
✅ **Color**: Not the only indicator (use icons, patterns, text too)
✅ **ARIA**: Labels for icon buttons, roles for custom components

## Tools Reference

| Tool | Type | Best For | Cost |
|------|------|----------|------|
| [Axe DevTools](https://www.deque.com/axe/devtools/) | Browser Extension | Quick scan, violations list | Free |
| [Lighthouse](https://developers.google.com/web/tools/lighthouse) | Browser (DevTools) | Overall audit, performance | Free |
| [WAVE](https://wave.webaim.org/) | Browser Extension | Visual feedback | Free |
| [NVDA](https://www.nvaccess.org/) | Screen Reader | Keyboard testing, announcements | Free |
| [VoiceOver](https://www.apple.com/accessibility/voiceover/) | Screen Reader (Mac) | Built-in, native testing | Included in macOS |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Web Tool | Color validation | Free |

## References

- [WCAG 2.1 Quick Reference](./references/wcag-quick-reference.md) — Quick lookup guide
- [Keyboard Navigation Checklist](./assets/keyboard-navigation-checklist.md) — Step-by-step verification
- [Screen Reader Testing Guide](./assets/screen-reader-testing.md) — How to use NVDA/VoiceOver
- [Automated Testing Setup](./assets/automated-testing-setup.md) — jest-axe, Cypress, axe-core
- [Audit Report Template](./assets/audit-report-template.md) — Document findings

## Integration with Other Skills

Works with:
- **ui-ux-pro skill** — Design principles include accessibility requirements
- **Component Architect agent** — Validates components meet WCAG AA
- **Component Library Management skill** — Ensures library components pass audit
- **Tailwind Configuration skill** — Validates color tokens meet contrast ratios

---

**Ready?** Run Axe DevTools on your current components, then manually test keyboard nav and screen reader access. Document in audit report.
