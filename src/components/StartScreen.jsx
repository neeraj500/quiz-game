// src/screens/StartScreen.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionContext } from '../contexts/QuestionContext';

const StartScreen = () => {
  const navigate = useNavigate();
  const { resetGame } = useContext(QuestionContext);

  const startGame = () => {
    resetGame();
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">Quiz Game</h1>
        <p className="text-gray-700 mb-8">
          Test your knowledge and level up with each correct answer!
        </p>
        <button 
          onClick={startGame} 
          className="px-6 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
