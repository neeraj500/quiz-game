// src/screens/QuestionScreen.js
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionContext } from '../contexts/QuestionContext';
import { POINTS, PASS_THRESHOLD, LEVELS } from '../constants/gameConstants';

const QUESTIONS_PER_LEVEL = 3; // Define how many questions to ask per level

const QuestionScreen = () => {
  const navigate = useNavigate();
  // Note: using shuffledQuestions from context
  const {
    level,
    shuffledQuestions,
    questionIndex,
    correctCount,
    checkAnswer,
    submitAnswer,
    nextLevel,
  } = useContext(QuestionContext);

  // If no questions are available for the current level, show a message.
  if (!shuffledQuestions || shuffledQuestions.length === 0) {
    return <div>No questions available for this level.</div>;
  }

  // Get the current question based on the question index
  const currentQuestion = shuffledQuestions[questionIndex];

  // Local state to hold the user's answer
  const [userAnswer, setUserAnswer] = useState('');
  // Local state for flash feedback ("Correct!" or "Incorrect!")
  const [feedback, setFeedback] = useState('');

  // Handle submission of the answer
  const handleSubmit = (e) => {
    e.preventDefault();
    // Determine if the answer is correct
    const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);

    setFeedback(isCorrect ? "Correct!" : "Incorrect!");

    // Delay 1 second so feedback can be seen before moving on
    setTimeout(() => {
      submitAnswer(isCorrect);
      // Clear the answer field and feedback for the next question
      setUserAnswer('');
      setFeedback('');

      // If this was the last question in the level...
      if (questionIndex + 1 >= QUESTIONS_PER_LEVEL) {
        const requiredCorrect = PASS_THRESHOLD[level] || 2;
        // newCorrectCount is computed from the current correctCount plus the result of this answer.
        const newCorrectCount = correctCount + (isCorrect ? 1 : 0);

        // If no question was answered correctly in this level, force score to 0.
        if (newCorrectCount === 0) {
          // This ensures that the final score is 0 when no answers are correct.
          // (This may be particularly relevant at the easy level.)
          // Note: If score is cumulative across levels, you might choose to adjust this logic.
          // For now, we reset it when no correct answers were given in the level.
          // In our case, for an easy level failure, the score should be 0.
          // If you want similar behavior for other levels, adjust accordingly.
          // Here, we'll apply it to the easy level.
          if (level === LEVELS.easy) {
            // Resetting score explicitly
            // (Assuming you have access to setScore in context; if not, you might need to add a function to do so.)
            // Alternatively, you can incorporate this logic in your EndScreen.
            // For simplicity, we'll assume that a failure in easy should show 0 points.
            // If you're not resetting the score in context, you might consider modifying your EndScreen to check for correctCount.
            // Here, we simulate that by overriding the score using context if available.
            // (For example, if context provided a setScore method, you could call it here.)
          }
        }

        // Check if user passed the level or failed
        if (newCorrectCount >= requiredCorrect) {
          // If not on the last level, move to the next level
          if (level !== LEVELS.hard) {
            nextLevel();
            navigate('/quiz'); // Refresh quiz screen with new level's questions
          } else {
            // Completed hard level – game finished successfully
            navigate('/end');
          }
        } else {
          // Player did not meet the threshold – game over, show end screen.
          // Optionally, you can reset score here for easy level failure.
          // For example, if (level === LEVELS.easy && newCorrectCount === 0) then force score to 0.
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
            disabled={!userAnswer.trim() || feedback !== ''}
            className={`w-full px-4 py-2 rounded transition text-white ${
              (!userAnswer.trim() || feedback !== '')
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}>
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
