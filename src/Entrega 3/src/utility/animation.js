// src/utility/animation.js
import { motion } from 'framer-motion';

// SlideUp com escala, rotação e opacidade
export const SlideUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotate: 10,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };
};

// SlideLeft com escala, rotação e opacidade
export const SlideLeft = (delay) => {
  return {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      rotate: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      rotate: -10,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };
};

// SlideRight com escala, rotação e opacidade
export const SlideRight = (delay) => {
  return {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      rotate: 10,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };
};

// FadeIn com opacidade
export const FadeIn = (delay) => {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };
};