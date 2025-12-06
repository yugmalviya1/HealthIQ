// Animation utility for smooth entry animations
export const slideInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: custom * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: custom * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Scroll-triggered animations
export const scrollFadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const scrollSlideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const scrollSlideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const scrollScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};
