// src/screens/QuestionScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionContext } from '../contexts/QuestionContext';
import { PASS_THRESHOLD, LEVELS } from '../constants/gameConstants';

const QUESTIONS_PER_LEVEL = 3; // Define how many questions to ask per level

const QuestionScreen = () => {
  const navigate = useNavigate();
  const {
    level,
    shuffledQuestions, // use shuffled questions from context
    questionIndex,
    correctCount,
    checkAnswer,
    submitAnswer,
    nextLevel,
  } = useContext(QuestionContext);

  // Local state to hold the user's answer
  const [userAnswer, setUserAnswer] = useState('');
  // Local state for flash feedback ("Correct!", "Incorrect!", or "Time's up!")
  const [feedback, setFeedback] = useState('');
  // Local state for the timer (in seconds)
  const [timer, setTimer] = useState(25);

  // Reset timer whenever a new question is loaded (questionIndex changes)
  useEffect(() => {
    setTimer(25);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questionIndex]);

  // If no questions are available for the current level, show a message.
  if (!shuffledQuestions || shuffledQuestions.length === 0) {
    return <div>No questions available for this level.</div>;
  }

  // Get the current question based on the questionIndex from the shuffled array
  const currentQuestion = shuffledQuestions[questionIndex];

  // Function to handle submission when time runs out
  const handleTimeout = () => {
    // Only proceed if no answer has been submitted already
    if (feedback) return;
    setFeedback("Time's up!");
    setTimeout(() => {
      submitAnswer(false); // false means no points added
      setUserAnswer('');
      setFeedback('');
      // Check level progression
      if (questionIndex + 1 >= QUESTIONS_PER_LEVEL) {
        const requiredCorrect = PASS_THRESHOLD[level] || 2;
        const newCorrectCount = correctCount; // no update as question was skipped
        if (newCorrectCount >= requiredCorrect) {
          if (level !== LEVELS.hard) {
            nextLevel();
            navigate('/quiz');
          } else {
            navigate('/end');
          }
        } else {
          navigate('/end');
        }
      }
    }, 800);
  };

  // Handle submission of the answer when user clicks the button
  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear the timer if the user submits in time
    // Determine if the answer is correct
    const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");

    // Delay further actions by 0.8 sec so the feedback can be seen
    setTimeout(() => {
      submitAnswer(isCorrect);
      setUserAnswer('');
      setFeedback('');
      // Check if this was the last question in the level
      if (questionIndex + 1 >= QUESTIONS_PER_LEVEL) {
        const requiredCorrect = PASS_THRESHOLD[level] || 2;
        // Include the current answer result in the count
        const newCorrectCount = correctCount + (isCorrect ? 1 : 0);
        if (newCorrectCount >= requiredCorrect) {
          if (level !== LEVELS.hard) {
            nextLevel();
            navigate('/quiz');
          } else {
            navigate('/end');
          }
        } else {
          navigate('/end');
        }
      }
    }, 800);
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
      <div className="relative w-full max-w-md bg-white p-6 rounded shadow">
        {/* Timer displayed at top right */}
        <div className="absolute top-4 right-4 text-lg font-bold text-red-500">
          {timer}s
        </div>
        <h2 className="text-2xl font-bold mb-4 capitalize">{level} Level</h2>
        <div className="mb-4">
          {renderQuestion()}
        </div>
        <form onSubmit={handleSubmit}>
          {/* Display flash feedback message above the submit button */}
          {feedback && <div className="mb-2 text-center font-semibold">{feedback}</div>}
          <button 
            type="submit"
            disabled={feedback !== ''}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50">
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
