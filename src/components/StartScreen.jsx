// src/screens/StartScreen.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionContext } from '../contexts/QuestionContext';

const StartScreen = () => {
  const navigate = useNavigate();
  const { resetGame } = useContext(QuestionContext);

  // Start game: reset state and navigate to quiz screen
  const startGame = () => {
    resetGame();
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz Game</h1>
      <p className="mb-8">Test your knowledge and level up!</p>
      <button 
        onClick={startGame} 
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
