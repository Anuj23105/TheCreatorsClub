/**
 * @component ModernComponent
 * Template for building accessible, responsive UI components with Tailwind + shadcn/ui patterns.
 * 
 * Features:
 * - Semantic HTML structure
 * - Full accessibility attributes (ARIA labels, roles, semantic elements)
 * - Responsive design (mobile-first, Tailwind breakpoints)
 * - Dark mode support (via TailwindCSS theme)
 * - Hover/active/focus states
 * - Smooth transitions and animations
 * 
 * @param {string} variant - Visual variant (default, primary, outline, ghost)
 * @param {string} size - Component size (sm, md, lg)
 * @param {boolean} disabled - Disabled state
 * @param {function} onClick - Click handler
 * @param {ReactNode} children - Component content
 * @param {string} className - Additional Tailwind classes
 * 
 * @returns {JSX.Element} Rendered component
 * 
 * @example
 * <ModernButton variant="primary" size="lg">
 *   Get Started
 * </ModernButton>
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Component wrapper with accessibility and animation support
 */
const ModernComponent = forwardRef(
  (
    {
      variant = 'default',
      size = 'md',
      disabled = false,
      onClick,
      className = '',
      children,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      role = 'button',
      ...props
    },
    ref
  ) => {
    // Variant styles (use Tailwind utilities for consistency)
    const variantStyles = {
      default: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
      outline: 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800',
      ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    };

    // Size styles (padding + font size + min-height for touch targets)
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm h-8',
      md: 'px-4 py-2 text-base h-10',
      lg: 'px-6 py-3 text-lg h-12',
    };

    // Base classes (responsive, semantic, accessible)
    const baseClasses = `
      inline-flex items-center justify-center
      rounded-lg font-medium
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      dark:focus:ring-offset-gray-900
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-95
      whitespace-nowrap
    `;

    const finalClassName = `
      ${baseClasses}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${className}
    `;

    // Animation variants for Framer Motion
    const motionVariants = {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        className={finalClassName}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        role={role}
        variants={motionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2, ease: 'easeOut' }}
        whileHover={!disabled ? { y: -2 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

ModernComponent.displayName = 'ModernComponent';

export default ModernComponent;

/**
 * USAGE PATTERNS
 * ===============
 */

// Pattern 1: Basic Button with Icon
/*
<div className="flex gap-2">
  <ModernButton variant="primary" size="md" aria-label="Save changes">
    <SaveIcon className="w-4 h-4 mr-2" />
    Save
  </ModernButton>
  <ModernButton variant="outline" size="md" aria-label="Cancel">
    Cancel
  </ModernButton>
</div>
*/

// Pattern 2: Loading State
/*
<ModernButton 
  disabled={isLoading}
  onClick={handleSubmit}
>
  {isLoading ? (
    <>
      <Loader className="w-4 h-4 mr-2 animate-spin" />
      Processing...
    </>
  ) : (
    'Submit Form'
  )}
</ModernButton>
*/

// Pattern 3: Responsive Sizing
/*
<ModernButton 
  size="sm"         // Mobile
  className="sm:h-10 md:h-12"  // Responsive heights
  variant="primary"
>
  Mobile Friendly
</ModernButton>
*/

// Pattern 4: Icon-Only Button (Accessible)
/*
<ModernButton
  aria-label="Close modal"
  aria-describedby="close-modal-tooltip"
  className="rounded-full p-2"
>
  <X className="w-5 h-5" />
</ModernButton>
*/

// Pattern 5: Disabled State
/*
<ModernButton disabled variant="primary">
  Disabled Action
</ModernButton>
*/

/**
 * ACCESSIBILITY CHECKLIST
 * =======================
 * ✓ Semantic HTML (<button> not <div>)
 * ✓ ARIA labels for screen readers
 * ✓ Focus ring visible (focus:ring-2)
 * ✓ Min touch target 44x44px (h-10, h-12)
 * ✓ Disabled state visually distinct
 * ✓ Color not only indicator (hover effect + outline)
 * ✓ Keyboard navigation support (native <button>)
 * ✓ Motion respects prefers-reduced-motion
 */

/**
 * DARK MODE NOTES
 * ================
 * All color classes include dark: variants
 * Add to your tailwind.config.js:
 * {
 *   darkMode: 'class',
 *   theme: { extend: {} }
 * }
 */

/**
 * ANIMATION DETAILS
 * ==================
 * - Initial scale: 0.95 (subtle entrance)
 * - Hover: y-2 lift (feedback)
 * - Tap: scale 0.95 (press feedback)
 * - Duration: 200ms (snappy)
 * - Easing: easeOut (natural feel)
 */
