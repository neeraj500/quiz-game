// src/screens/EndScreen.js
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionContext } from '../contexts/QuestionContext';
import { LEVELS } from '../constants/gameConstants';

const EndScreen = () => {
  const navigate = useNavigate();
  const { score, level, resetGame, resetLevel, correctCount } = useContext(QuestionContext);

  // Determine the game message.
  // Here we assume that if the player is in the hard level and has at least 2 correct answers,
  // then they have completed all levels.
  const passedAllLevels = level === LEVELS.hard && correctCount >= 2;
  const message = passedAllLevels
    ? "Congratulations, you have completed all the levels!"
    : `You failed at the ${level} level. Try again.`;

  // Handler for retrying the current level
  const handleRetry = () => {
    resetLevel();
    navigate('/quiz');
  };

  // Handler for restarting the game from the beginning
  const handleRestart = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Game Over</h1>
        <p className="mb-2">{message}</p>
        <p className="mb-4">Your Total Score: {score}</p>
        <div className="flex justify-around">
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
