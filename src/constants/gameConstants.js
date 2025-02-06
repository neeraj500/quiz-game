// // constants/gameConstants.js
// export const GAME_STATES = {
//     START: 'start',
//     PLAYING: 'playing',
//     END: 'end'
//   };
  
//   export const LEVELS = {
//     EASY: 'easy',
//     MEDIUM: 'medium',
//     HARD: 'hard'
//   };
  
//   export const QUESTION_TYPES = {
//     MULTIPLE_CHOICE: 'multiple-choice',
//     TRUE_FALSE: 'true-false',
//     TEXT_INPUT: 'text-input'
//   };
  
//   export const POINTS = {
//     [LEVELS.EASY]: 10,
//     [LEVELS.MEDIUM]: 20,
//     [LEVELS.HARD]: 30
//   };
  
//   export const LEVEL_COLORS = {
//     [LEVELS.EASY]: {
//       bg: 'bg-green-100',
//       text: 'text-green-600'
//     },
//     [LEVELS.MEDIUM]: {
//       bg: 'bg-yellow-100',
//       text: 'text-yellow-600'
//     },
//     [LEVELS.HARD]: {
//       bg: 'bg-red-100',
//       text: 'text-red-600'
//     }
//   };
  
//   export const REQUIRED_CORRECT = 2;
//   export const QUESTION_TIMER = 20;
//   // Set feedback delay to 2000ms so the user can see the answer before moving on
// //   export const FEEDBACK_DELAY = 1000;
  
// src/constants/gameConstants.js
export const LEVELS = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard'
  };
  
  export const POINTS = {
    easy: 10,
    medium: 20,
    hard: 30
  };
  
  // Example: require at least 2 correct answers out of 3 questions per level
  export const PASS_THRESHOLD = {
    easy: 2,
    medium: 2,
    hard: 2,
  };
  