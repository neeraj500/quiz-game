// src/constants/gameConstants.js
export const LEVELS = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard',
  };
  
  export const POINTS = {
    easy: 10,
    medium: 20,
    hard: 30,
  };
  
  // Example: require at least 2 correct answers out of 3 questions per level
  export const PASS_THRESHOLD = {
    easy: 2,
    medium: 2,
    hard: 2,
  };
  
  // New constant for level display text and styles
  export const LEVEL_STYLES = {
    easy: {
      text: 'easy',
      className: 'text-green-600',
      bg: 'bg-green-200',
    },
    medium: {
      text: 'medium',
      className: 'text-yellow-600',
      bg: 'bg-yellow-200',
    },
    hard: {
      text: 'hard',
      className: 'text-red-600',
      bg: 'bg-red-200',
    },
  };
  