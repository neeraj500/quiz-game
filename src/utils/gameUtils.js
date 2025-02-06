// src/utils/gameUtils.js

// This utility function checks if the user passed the current level.
// It takes the number of correct answers and the threshold required.
export const hasPassedLevel = (correctCount, threshold) => {
    return correctCount >= threshold;
  };
  
// shuffle funtion
export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray
}