# Animation & Motion Guide

## Animation Philosophy

**Principle**: Animations should serve a purpose, not distract. Every motion should either:
1. **Provide feedback** (button clicked, loading)
2. **Guide attention** (entrance animation draws eye)
3. **Enhance storytelling** (transition reinforces page flow)
4. **Improve perceived performance** (loading spinner feels faster)

**Anti-pattern**: Animations that delight but confuse. Rural users, elderly users, and users on slow connections benefit from restraint.

## Animation Timing

### Duration Guidelines
- **Micro-interactions** (hover, click feedback): 100–150ms
- **Transitions** (fade between pages): 200–300ms
- **Entrance animations** (elements appearing): 300–500ms
- **Scroll-based** (parallax, reveal): Variable (tied to scroll)
- **Complex sequences** (GSAP): 500ms–2s (rarely longer)

**Rule of Thumb**: Faster = snappier, slower = more graceful. Test on target devices.

### Easing Functions
Easing makes animations feel natural, not robotic.

```css
/* CSS Easing Keywords */
ease-in: cubic-bezier(0.42, 0, 1, 1);      /* Slow start, fast end — exits */
ease-out: cubic-bezier(0, 0, 0.58, 1);     /* Fast start, slow end — entrances */
ease-in-out: cubic-bezier(0.42, 0, 0.58, 1); /* Symmetric — rarely useful */

/* Custom Easing (Tailwind supports via plugins) */
custom: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy/overshoot */
```

**Selection Rules:**
- **Entrance** (disappear → appear): `ease-out` (grabs attention)
- **Exit** (appear → disappear): `ease-in` (gentle departure)
- **UI feedback** (hover, button): `ease-out` (snappy)
- **Scroll effects**: `linear` or custom cubic-bezier

## CSS Animations (Light Level)

Ideal for: Simple state changes, hover effects, loading spinners, page transitions.

### Property Types (GPU-Accelerated)
**Fast** (Use these):
- `transform` (translate, rotate, scale)
- `opacity` (fade in/out)

**Slow** (Avoid):
- `left`, `top`, `right`, `bottom` (triggers layout recalculation)
- `width`, `height`, `padding`, `margin`
- `background-color`, `color` (repaints)

### CSS Transition Example
```jsx
<button className="
  px-4 py-2 
  bg-blue-500 text-white 
  rounded-lg
  transition-all duration-200 ease-out
  hover:shadow-lg hover:bg-blue-600
">
  Click me
</button>
```

### CSS Keyframes Example
```scss
@keyframes slideInDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// In component:
animate-slide-in-down (register in tailwind.config.js)
```

## Framer Motion (Medium Level)

**When to use**: React-specific, component entrance/exit, conditional animations, drag/gesture responses.

**Advantages over CSS:**
- Trigger animations on React state changes
- Orchestrate multiple animations
- Easy gesture handling (drag, hover, tap)
- Automatic layout animations (reflow-triggered)

### Basic Setup
```jsx
import { motion } from 'framer-motion';

// Simple fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Each child waits 100ms
      }
    }
  }}
>
  {items.map(item => (
    <motion.div key={item} variants={{ hidden: {...}, visible: {...} }}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

### Common Patterns
- **Page transitions**: Exit current, enter new (300ms)
- **List entrance**: Staggered children animations (50–100ms apart)
- **Conditional rendering**: Exit animation before unmounting component
- **Drag gestures**: `onDrag`, `whileHover`, `whileTap`

## GSAP (Heavy Level)

**When to use**: Complex animations, scroll-based effects, professional interactions, timeline sequences, pixel-perfect control.

**Advantages:**
- Extreme power and flexibility
- Timeline control (sequence multiple animations)
- ScrollTrigger plugin (scroll-based, parallax, reveal)
- Can animate almost anything (SVG, canvas, DOM)
- Excellent performance (optimized)

**Learning curve:** Steeper than Framer Motion, but worth it for complex work.

### Basic Setup
```jsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Simple animation
useEffect(() => {
  gsap.to('.box', {
    duration: 0.5,
    x: 100,
    rotation: 360,
    ease: 'power2.out'
  });
}, []);

// Timeline (sequence multiple animations)
const tl = gsap.timeline();
tl.to('.item1', { duration: 0.5, opacity: 1 })
  .to('.item2', { duration: 0.5, opacity: 1 }) // Starts when item1 ends
  .to('.item3', { duration: 0.5, opacity: 1 });

// ScrollTrigger (animation on scroll)
gsap.to('.fade-in', {
  scrollTrigger: {
    trigger: '.fade-in',
    start: 'top center',
    end: 'bottom center'
  },
  opacity: 1,
  y: 0,
  duration: 0.8
});
```

### Common Patterns
- **Parallax scrolling**: Different speeds for different layers
- **Staggered animations**: Using `staggerTo` or timeline position
- **SVG morphing**: Smooth shape transformations
- **Scroll-triggered reveals**: Elements appear as user scrolls
- **Complex hero sequences**: Combined scale, rotation, opacity in precise order

## Animation Performance

### Metrics
- **Target**: 60 FPS (frames per second)
- **Mobile**: Aim for 60 FPS at minimum; 30 FPS is noticeable jank
- **Low-end devices**: Disable heavy animations if FPS drops

### Optimization Tips
1. **Use ChromeDevTools Performance tab** to measure FPS
2. **Profile with Lighthouse** (performance score)
3. **Enable GPU acceleration** (use `transform`, `opacity`)
4. **Reduce DOM complexity** during animations
5. **Lazy-load GSAP** (only import when needed)
6. **Limit simultaneous animations** (no more than 5-10 at once)
7. **Test on actual low-end devices** (not just DevTools throttling)

### Prefers Reduced Motion
**Legally required for accessibility.** Some users have motion sensitivity, vestibular disorders, or photosensitivity.

```jsx
// CSS Approach
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// React Hook
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Framer Motion
<motion.div
  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
>
</motion.div>
```

## Animation Library Comparison

| Library | Use Case | Learning Curve | Bundle Size | Best For |
|---------|----------|-----------------|------------|----------|
| **CSS** | Simple transitions | Easy | 0KB | Hover states, basic fades, spinners |
| **Framer Motion** | React components | Medium | 28KB | Page transitions, list animations, gestures |
| **GSAP** | Complex sequences | Hard | 32KB (core) | Scroll effects, timelines, professional sites |
| **Animate.css** | Pre-built animations | Easy | 14KB | Quick animations (bounce, shake, flip) |

## Real-World Examples

### Loading Spinner
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full"
/>
```

### Card Entrance (Staggered List)
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1, duration: 0.3 }}
  className="card"
>
  {card.content}
</motion.div>
```

### Scroll-Triggered Fade
```jsx
gsap.to('.section-title', {
  scrollTrigger: {
    trigger: '.section-title',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  opacity: 1,
  y: 0,
  duration: 0.6
});
```

### Toggle with GSAP Timeline
```jsx
const expanded = useRef(false);
const menuTl = useRef(gsap.timeline({ paused: true }));

useEffect(() => {
  menuTl.current
    .to('.menu', { height: 'auto', opacity: 1, duration: 0.3 })
    .to('.menu-item', { opacity: 1, x: 0, duration: 0.2 }, 0);
}, []);

const toggleMenu = () => {
  expanded.current ? menuTl.current.reverse() : menuTl.current.play();
  expanded.current = !expanded.current;
};
```

## Anti-Patterns (Avoid)

❌ **Animations longer than 500ms** without reason (feels sluggish)
❌ **Auto-playing videos/animations** on page load (annoying, accessibility issue)
❌ **No prefers-reduced-motion support** (fails accessibility)
❌ **Animating x/y position** instead of transform (causes jank)
❌ **More than 3 animations happening simultaneously** (performance hit)
❌ **Animations that block user interaction** (disable input while animating)
❌ **Infinite animations** without pause option (distracting, battery drain on mobile)

---

**Recommendation for TrustServe**: Start with CSS for basic transitions. Add Framer Motion for page transitions and list entrance animations. Reserve GSAP for hero sections, complex scroll effects, and professional interactions.
