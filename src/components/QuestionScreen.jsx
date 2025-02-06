// src/screens/QuestionScreen.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionContext } from '../contexts/QuestionContext';
import { POINTS, PASS_THRESHOLD, LEVELS } from '../constants/gameConstants';

const QUESTIONS_PER_LEVEL = 3; // Define how many questions to ask per level

const QuestionScreen = () => {
  const navigate = useNavigate();
  const {
    level,
    questions,
    questionIndex,
    correctCount,
    checkAnswer,
    submitAnswer,
    nextLevel,
  } = useContext(QuestionContext);

  // If no questions are available for the current level, show a message.
  if (!questions || questions.length === 0) {
    return <div>No questions available for this level.</div>;
  }

  // Get the current question based on the question index
  const currentQuestion = questions[questionIndex];

  // Local state to hold the user’s answer
  const [userAnswer, setUserAnswer] = useState('');

  // local state for feedback
  const [feedback, setFeedback] = useState('');

  // Handle submission of the answer
  const handleSubmit = (e) => {
    e.preventDefault();
    // Determine if the answer is correct
    const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);

    setFeedback(isCorrect ? "Correct!" : "Incorrect!");

    // delay 0.8 sec
    setTimeout(() => {
      submitAnswer(isCorrect);
      // Clear the answer field for the next question
      setUserAnswer('');
      setFeedback('');

      
    // If this was the last question in the level...
      if (questionIndex + 1 >= QUESTIONS_PER_LEVEL) {
        // Get the required number of correct answers from the constants (defaulting to 2 if not set)
        const requiredCorrect = PASS_THRESHOLD[level] || 2;
        // Include the current answer result in the count
        const newCorrectCount = correctCount + (isCorrect ? 1 : 0);
  
        if (newCorrectCount >= requiredCorrect) {
          // If not on the last level, move to the next level
          if (level !== LEVELS.hard) {
            nextLevel();
            navigate('/quiz'); // Navigate to refresh the quiz screen with new questions
          } else {
            // Completed the hard level – game finished successfully
            navigate('/end');
          }
        } else {
          // Player did not meet the threshold – game over, show end screen
          navigate('/end');
        }
      }
    }, 1000);
  };

  // Render the current question depending on its type
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div>
            <p className="mb-4">{currentQuestion.question}</p>
            <div className="flex flex-col space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => setUserAnswer(option)}
                  className={`px-4 py-2 border rounded hover:bg-gray-200 transition ${
                    userAnswer === option ? 'bg-gray-300' : ''
                  }`}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case 'true-false':
        return (
          <div>
            <p className="mb-4">{currentQuestion.question}</p>
            <div className="flex space-x-4">
              {['true', 'false'].map((option) => (
                <button 
                  key={option} 
                  onClick={() => setUserAnswer(option)}
                  className={`px-4 py-2 border rounded hover:bg-gray-200 transition ${
                    userAnswer === option ? 'bg-gray-300' : ''
                  }`}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );
      case 'text-input':
        return (
          <div>
            <p className="mb-4">{currentQuestion.question}</p>
            <input 
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="px-4 py-2 border rounded w-full"
              placeholder="Your answer here..."
            />
          </div>
        );
      default:
        return <div>Unknown question type.</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 capitalize">{level} Level</h2>
        <div className="mb-4">
          {renderQuestion()}
        </div>
        <form onSubmit={handleSubmit}>
          {feedback && <div className='mb-2 text-center font-semibold'>{feedback}</div>}
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Submit Answer
          </button>
        </form>
        <p className="mt-4 text-sm">
          Question {questionIndex + 1} of {QUESTIONS_PER_LEVEL}
        </p>
      </div>
    </div>
  );
};

export default QuestionScreen;
