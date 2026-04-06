# WCAG 2.1 Quick Reference

Essential accessibility standards for web content.

## Levels

| Level | Standard | Target |
|-------|----------|--------|
| **A** | Basic | Usually not sufficient |
| **AA** | Acceptable | **TARGET for TrustServe** |
| **AAA** | Enhanced | Nice-to-have, rarely required |

## Principle 1: Perceivable

Users must perceive the content.

### 1.1 Text Alternatives
- **Images**: Provide alt text describing the image
- **Icons with meaning**: Provide aria-label or text
- **Decorative**: Mark with `aria-hidden="true"`

```jsx
// ✅ Good
<img src="worker.jpg" alt="Portrait of experienced electrician" />
<button aria-label="Close modal"><X /></button>

// ❌ Bad
<img src="worker.jpg" />
<button><X /></button>
```

### 1.4 Distinguishable

Content must be distinguishable from background.

#### Color Contrast (AA)
- **Normal text (< 18px)**: 4.5:1 minimum
- **Large text (≥ 18px)**: 3:1 minimum
- **Disabled text**: 3:1 acceptable
- **Graphic elements**: 3:1 minimum

Test: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Common ratios**:
```
❌ #AAA on #FFF = 2.3:1 (FAIL)
✅ #666 on #FFF = 4.5:1 (PASS)

❌ #999 on #F5F5F5 = 1.6:1 (FAIL)
✅ #444 on #F5F5F5 = 8.6:1 (PASS)

❌ Blue #0000AA on Black #000000 = 3:1 (BORDER)
✅ Blue #1E40AF on White #FFFFFF = 5.5:1 (PASS)
```

#### Resize Text
- Allow text to be resized up to 200% without loss of functionality

#### Visual Spacing
- Don't rely on color alone (use icons, text, patterns too)
- Provide multiple ways to identify components

## Principle 2: Operable

Users must be able to operate the interface.

### 2.1 Keyboard Accessible

- **All functionality** available via keyboard
- **No keyboard trap** (can Tab out of any component)
- **Focus visible** (outline or highlight)

```jsx
// ✅ Good: Native button (keyboard accessible)
<button onClick={handleClick}>Action</button>

// ❌ Bad: Div without keyboard support
<div onClick={handleClick}>Action</div>

// ✅ Fix: Add keyboard handler if using div
<div
  role="button"
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  tabIndex={0}
>
  Action
</div>
```

### 2.4 Readable

- **Tab order** matches visual order
- **Focus indicator** is visible (min 2px outline)
- **No flashing** content > 3x per second

### Keyboard Navigation Expectations

| Key | Behavior |
|-----|----------|
| **Tab** | Move to next interactive element |
| **Shift+Tab** | Move to previous element |
| **Enter/Space** | Activate button, checkbox, radio |
| **Escape** | Close modal, collapse menu |
| **Arrow keys** | Navigate within lists, tabs, menus |

## Principle 3: Understandable

Users must understand the content and how to use it.

### 3.1 Readable Text
- **Language** clear and simple (avoid jargon)
- **Abbreviations** explained on first use: "World Health Organization (WHO)"
- **Unusual words** have definitions

### 3.2 Predictable
- **Navigation consistent** (same location on each page)
- **Components behave consistently** (buttons look and work the same)
- **No unexpected actions** (submitting form shouldn't open new window)

### 3.3 Input Assistance
- **Labels** properly associated with inputs
- **Error messages** identify the problem AND suggest fix
- **Form recovery** (pre-fill after validation error)

```jsx
// ✅ Good: Label properly associated
<label htmlFor="email">Email:</label>
<input id="email" type="email" />

// ❌ Bad: Placeholder as label (disappears when typing)
<input type="email" placeholder="Email" />

// ✅ Good: Clear error message
<span role="alert" className="text-red-600">
  Email must be valid (example@domain.com)
</span>

// ❌ Bad: Vague error
<span className="text-red-600">Invalid input</span>
```

## Principle 4: Robust

Content must work with assistive technologies (screen readers, voice control).

### 4.1 Compatible
- **Valid HTML** (proper semantic elements)
- **ARIA labels** where semantic HTML isn't enough
- **Form associations** (label for input, input for label)

```jsx
// ✅ Good: Semantic HTML
<header>…</header>
<main>…</main>
<footer>…</footer>

// ❌ Bad: Only divs
<div class="header">…</div>
<div class="main">…</div>
<div class="footer">…</div>

// ✅ Good: Button with ARIA
<button aria-label="Delete customer record">
  <TrashIcon />
</button>

// ❌ Bad: Icon button without label
<button>
  <TrashIcon />
</button>
```

## Common Audit Checklist (AA Standard)

### Images & Media
- [ ] Images with text have alt text
- [ ] Decorative images marked `aria-hidden="true"`
- [ ] Icons have labels or aria-label
- [ ] Videos have captions (or transcript)

### Forms & Input
- [ ] All inputs have associated labels (via `htmlFor`/`id`)
- [ ] Error messages clear and actionable
- [ ] Required fields marked (visual + text)
- [ ] Form doesn't auto-submit without user action

### Colors & Contrast
- [ ] Text-to-background: 4.5:1 minimum (normal), 3:1 (large)
- [ ] Color not the only indicator (use icons, text)
- [ ] Dark mode variants have sufficient contrast

### Keyboard Navigation
- [ ] All buttons/links reachable via Tab
- [ ] Focus indicator visible (outline or highlight)
- [ ] Tab order matches visual reading order
- [ ] No keyboard traps
- [ ] Enter activates buttons
- [ ] Escape closes modals

### Headings & Structure
- [ ] One h1 per page
- [ ] Headings in logical order (h1 → h2 → h3, no skipping)
- [ ] Landmark elements used (`<header>`, `<main>`, `<nav>`, `<footer>`)
- [ ] Page title is meaningful

### Links
- [ ] Link text descriptive (not "click here")
- [ ] Links visually distinct (underline or color change)
- [ ] Link purpose clear without context

### Motion & Animation
- [ ] No flashing > 3 times per second
- [ ] Respect `prefers-reduced-motion` media query
- [ ] No auto-playing audio/video

## Tools

| Tool | What It Does | Free? |
|------|-------------|-------|
| **Axe DevTools** | Automated accessibility scanner | ✅ |
| **Lighthouse** | Chrome DevTools accessibility audit | ✅ |
| **WAVE** | Visual accessibility feedback | ✅ |
| **NVDA** | Screen reader for testing | ✅ |
| **WebAIM Contrast Checker** | Color contrast validation | ✅ |
| **Stark** | Figma plugin for contrast checking | Paid |

## Quick Test Process

1. **Run Axe** → Catch obvious violations
2. **Test keyboard** → Tab through every page
3. **Test colors** → WebAIM contrast checker
4. **Test screen reader** → Use NVDA for 5 min
5. **Check headings** → One h1, logical hierarchy
6. **Document issues** → Create audit report

## Common Violations & Fixes

| Violation | Fix |
|-----------|-----|
| Low contrast text | Darken text or lighten background |
| Missing alt text | Add alt attribute to images |
| Form without labels | Add `<label htmlFor="id">` |
| Icon button unlabeled | Add aria-label or title |
| Keyboard trap | Ensure Escape or Tab out possible |
| No focus indicator | Add outline on :focus |
| Skipped heading levels | Use h1→h2→h3 sequence |
| Link text "click here" | Make text descriptive ("View all services") |

---

**Target**: WCAG 2.1 AA for all TrustServe pages and components.

**Resources**:
- [Official WCAG 2.1 Spec](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Guides](https://webaim.org/)
- [A11ycasts by Google](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9Xc-RgEzwLvePng7V)
