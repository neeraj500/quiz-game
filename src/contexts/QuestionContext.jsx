import React, {createContext, useState} from 'react';
import questionsData from '../data/questions';

// create context
export const QuestionContext = createContext();

export const QuestionProvider  = ({ children }) => {
  // level
  const [level, setLevel] = useState('easy');
  // total score
  const [score, setScore] = useState(0);
  // questionIndex
  const [questionIndex, setQuestionIndex] = useState(0);
  // questions answered correctly
  const [correctCount, setCorrectCount] = useState(0);

  const questions = questionsData[level];

  // function to check if the answer is correct
  const checkAnswer = (userAnswer, correctAnswer) => {
    if (typeof correctAnswer === 'string') {
      return userAnswer.trim().toLowerCase() == correctAnswer.trim().toLowerCase();
    }

    return userAnswer === correctAnswer;
  }

  // function to handle answer submission and update state
  const submitAnswer = (isCorrect) => {
    if (isCorrect) {
      let points = 0;
      if (level === 'easy') points = 10;
      else if (level === 'medium') points = 20;
      else if (level === 'hard') points = 30;

      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
    }

    // move to next question
    setQuestionIndex(prev => prev + 1);
  }

  // function to reset only the current level question index and correct count (RETRY)
  const resetLevel = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
  };

  // reset the entire game (for restart)
  const resetGame = () => {
    setLevel('easy');
    setScore(0);
    setQuestionIndex(0);
    setCorrectCount(0);
  };

  // move to the next level 
  const nextLevel = () => {
    if (level === 'easy') setLevel('medium');
    else if (level === 'medium') setLevel('hard');

    // If already on hard, the game is complete.
    // Reset the level stats for the new level.
    setQuestionIndex(0);
    setCorrectCount(0);
  }

  return (
    <QuestionContext.Provider value={{
      level,
      score,
      questionIndex,
      correctCount,
      questions,
      checkAnswer,
      submitAnswer,
      resetLevel,
      resetGame,
      nextLevel
    }}>
      {children}
    </QuestionContext.Provider>
  );
}