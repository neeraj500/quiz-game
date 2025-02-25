// src/screens/QuestionScreen.js
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionContext } from "../contexts/QuestionContext";
import {
  PASS_THRESHOLD,
  LEVELS,
  LEVEL_STYLES,
} from "../constants/gameConstants";

const QUESTIONS_PER_LEVEL = 4; // Define how many questions to ask per level

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
  const [userAnswer, setUserAnswer] = useState("");
  // Local state for flash feedback ("Correct!", "Incorrect!", or "Time's up!")
  const [feedback, setFeedback] = useState("");
  // Local state for the timer (in seconds)
  const [timer, setTimer] = useState(25);

  // Reset timer whenever a new question is loaded (questionIndex changes)
  useEffect(() => {
    setTimer(25);
    const interval = setInterval(() => {
      setTimer((prev) => {
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
    return (
      <div className="text-center text-gray-700">
        No questions available for this level.
      </div>
    );
  }

  // Get the current question based on the questionIndex from the shuffled array
  const currentQuestion = shuffledQuestions[questionIndex];

  // Function to handle submission when time runs out
  const handleTimeout = () => {
    if (feedback) return;
    setFeedback("Time's up!");
    setTimeout(() => {
      submitAnswer(false); // false means no points added
      setUserAnswer("");
      setFeedback("");
      if (questionIndex + 1 >= QUESTIONS_PER_LEVEL) {
        const requiredCorrect = PASS_THRESHOLD[level] || 2;
        const newCorrectCount = correctCount; // no update as question was skipped
        if (newCorrectCount >= requiredCorrect) {
          if (level !== LEVELS.hard) {
            nextLevel();
            navigate("/quiz");
          } else {
            navigate("/end");
          }
        } else {
          navigate("/end");
        }
      }
    }, 800);
  };

  // Handle submission of the answer when user clicks the button
  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");
    setTimeout(() => {
      submitAnswer(isCorrect);
      setUserAnswer("");
      setFeedback("");
      if (questionIndex + 1 >= QUESTIONS_PER_LEVEL) {
        const requiredCorrect = PASS_THRESHOLD[level] || 2;
        const newCorrectCount = correctCount + (isCorrect ? 1 : 0);
        if (newCorrectCount >= requiredCorrect) {
          if (level !== LEVELS.hard) {
            nextLevel();
            navigate("/quiz");
          } else {
            navigate("/end");
          }
        } else {
          navigate("/end");
        }
      }
    }, 800);
  };

  // Render the current question depending on its type
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <div>
            <p className="mb-4 text-lg text-gray-800">
              {currentQuestion.question}
            </p>
            <div className="flex flex-col space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setUserAnswer(option)}
                  className={`px-4 py-2 border rounded transition ${
                    userAnswer === option
                      ? "bg-indigo-200 border-indigo-400"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "true-false":
        return (
          <div>
            <p className="mb-4 text-lg text-gray-800">
              {currentQuestion.question}
            </p>
            <div className="flex space-x-4">
              {["true", "false"].map((option) => (
                <button
                  key={option}
                  onClick={() => setUserAnswer(option)}
                  className={`px-4 py-2 border rounded transition ${
                    userAnswer === option
                      ? "bg-indigo-200 border-indigo-400"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );
      case "text-input":
        return (
          <div>
            <p className="mb-4 text-lg text-gray-800">
              {currentQuestion.question}
            </p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Type your answer..."
            />
          </div>
        );
      default:
        return <div className="text-gray-700">Unknown question type.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white p-6 rounded shadow-lg">
        {/* Timer displayed at top right */}
        <div className="absolute top-4 right-4 text-xs font-semibold text-red-600">
          Time Left: {timer}s
        </div>
        <div className={`rounded-lg w-fit px-2 ${LEVEL_STYLES[level].bg}`}>
        <h2
          className={`text-md font-bold mb-4 ${LEVEL_STYLES[level].className}`}
        >
          {LEVEL_STYLES[level].text}
        </h2>
        </div>
        <div className="mb-6">{renderQuestion()}</div>
        <form onSubmit={handleSubmit}>
          {feedback && (
            <div className="mb-2 text-center font-semibold text-gray-800">
              {feedback}
            </div>
          )}
          <button
            type="submit"
            disabled={!userAnswer.trim() || feedback !== ""}
            className={`w-full px-4 py-2 rounded transition text-white ${
              !userAnswer.trim() || feedback !== ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Submit Answer
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Question {questionIndex + 1} of {QUESTIONS_PER_LEVEL}
        </p>
      </div>
    </div>
  );
};

export default QuestionScreen;
