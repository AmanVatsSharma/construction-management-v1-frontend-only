/**
 * @file animations.ts
 * @module lib
 * @description Framer Motion animation variants for modern UI interactions
 * @author BharatERP
 * @created 2025-11-07
 */

import { Variants } from "framer-motion"

// ========================================
// SLIDE ANIMATIONS
// ========================================

export const slideInFromRight: Variants = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const slideInFromLeft: Variants = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const slideInFromTop: Variants = {
  initial: {
    y: "-100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const slideInFromBottom: Variants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

// ========================================
// SCALE ANIMATIONS
// ========================================

export const scaleIn: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const scaleUp: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
  },
}

// ========================================
// FADE ANIMATIONS
// ========================================

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
  },
}

// ========================================
// STAGGER ANIMATIONS
// ========================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

// ========================================
// HOVER ANIMATIONS
// ========================================

export const hoverLift = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
  },
}

export const hoverScale = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
}

export const hoverGlow = {
  rest: {
    boxShadow: "0 0 0px rgba(var(--primary), 0)",
  },
  hover: {
    boxShadow: "0 0 20px rgba(var(--primary), 0.5)",
    transition: {
      duration: 0.3,
    },
  },
}

// ========================================
// ROTATE ANIMATIONS
// ========================================

export const rotate360: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
}

export const rotateIn: Variants = {
  initial: {
    rotate: -180,
    opacity: 0,
  },
  animate: {
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
}

// ========================================
// BACKDROP OVERLAY
// ========================================

export const backdropVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

// ========================================
// MENU/DROPDOWN ANIMATIONS
// ========================================

export const menuVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.15,
    },
  },
}

// ========================================
// MODAL ANIMATIONS
// ========================================

export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
}

// ========================================
// NOTIFICATION/TOAST ANIMATIONS
// ========================================

export const toastVariants: Variants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.2,
    },
  },
}

// ========================================
// PAGE TRANSITION ANIMATIONS
// ========================================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Creates a custom stagger container with configurable delay
 */
export const createStaggerContainer = (staggerDelay: number = 0.1, delayChildren: number = 0.1): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
})

/**
 * Creates a custom slide animation with configurable direction and distance
 */
export const createSlideAnimation = (
  direction: "left" | "right" | "up" | "down",
  distance: number = 100
): Variants => {
  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const value = direction === "left" || direction === "up" ? -distance : distance

  return {
    initial: {
      [axis]: value,
      opacity: 0,
    },
    animate: {
      [axis]: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      [axis]: value,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }
}

/**
 * Spring transition preset for smooth animations
 */
export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
}

/**
 * Smooth ease transition preset
 */
export const easeTransition = {
  duration: 0.3,
  ease: "easeInOut" as const,
}

