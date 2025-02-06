// src/utils/gameUtils.js

// This utility function checks if the user passed the current level.
// It takes the number of correct answers and the threshold required.
export const hasPassedLevel = (correctCount, threshold) => {
    return correctCount >= threshold;
  };
  