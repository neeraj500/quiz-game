// src/screens/EndScreen.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionContext } from '../contexts/QuestionContext';
import { LEVELS } from '../constants/gameConstants';

const EndScreen = () => {
  const navigate = useNavigate();
  const { score, level, resetGame, resetLevel, correctCount } = useContext(QuestionContext);

  // Decide the message based on whether the user passed or failed the current level.
  const passedAllLevels = level === LEVELS.hard && correctCount >= 2;
  const message = passedAllLevels
    ? "Congratulations, you've completed all the levels!"
    : `You failed at the ${level} level. Try again.`;

  const handleRetry = () => {
    resetLevel();
    navigate('/quiz');
  };

  const handleRestart = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Game Over</h1>
        <p className="text-lg text-gray-800 mb-2">{message}</p>
        <p className="mb-6 text-gray-700">Your Total Score: {score}</p>
        <div className="flex flex-col sm:flex-row justify-around gap-4">
          <button 
            onClick={handleRetry} 
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
            Retry Level
          </button>
          <button 
            onClick={handleRestart} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
