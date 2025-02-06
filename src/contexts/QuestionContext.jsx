// src/contexts/QuestionContext.js
import React, { createContext, useState, useEffect } from 'react';
import questionsData from '../data/questions';
import { shuffleArray } from '../utils/gameUtils';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  // State for current level (easy, medium, hard)
  const [level, setLevel] = useState('easy');
  // Total game score
  const [score, setScore] = useState(0);
  // Index of the current question within the current level
  const [questionIndex, setQuestionIndex] = useState(0);
  // Count of correctly answered questions in the current level
  const [correctCount, setCorrectCount] = useState(0);
  // Shuffled questions for the current level
  const [shuffledQuestions, setShuffledQuestions] = useState(() => {
    const levelQuestions = questionsData['easy'] || [];
    console.log('Initializing questions for level "easy":', levelQuestions);
    return shuffleArray([...levelQuestions]);
  });

  // Helper: update shuffledQuestions for a given level
  const updateShuffledQuestions = (currentLevel) => {
    const levelQuestions = questionsData[currentLevel] || [];
    console.log(`Shuffling questions for level "${currentLevel}":`, levelQuestions);
    setShuffledQuestions(shuffleArray([...levelQuestions]));
  };

  // Update shuffledQuestions, question index, and correct count when the level changes.
  useEffect(() => {
    updateShuffledQuestions(level);
    setQuestionIndex(0);
    setCorrectCount(0);
  }, [level]);

  // Check if the user's answer is correct (case-insensitive for strings)
  const checkAnswer = (userAnswer, correctAnswer) => {
    if (typeof correctAnswer === 'string') {
      return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    }
    return userAnswer === correctAnswer;
  };

  // Handle answer submission and update the score and count if correct.
  const submitAnswer = (isCorrect) => {
    if (isCorrect) {
      let points = 0;
      if (level === 'easy') points = 10;
      else if (level === 'medium') points = 20;
      else if (level === 'hard') points = 30;
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
    }
    // Move to the next question in the level
    setQuestionIndex(prev => prev + 1);
  };

  // Reset the current level (for a retry)
  const resetLevel = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    updateShuffledQuestions(level);
  };

  // Reset the entire game (for a restart)
  const resetGame = () => {
    setLevel('easy');
    setScore(0);
    setQuestionIndex(0);
    setCorrectCount(0);
    updateShuffledQuestions('easy');
  };

  // Advance to the next level (if available)
  const nextLevel = () => {
    if (level === 'easy') setLevel('medium');
    else if (level === 'medium') setLevel('hard');
    // The useEffect will automatically update shuffledQuestions when level changes.
  };

  return (
    <QuestionContext.Provider value={{
      level,
      score,
      questionIndex,
      correctCount,
      shuffledQuestions,
      checkAnswer,
      submitAnswer,
      resetLevel,
      resetGame,
      nextLevel
    }}>
      {children}
    </QuestionContext.Provider>
  );
};
