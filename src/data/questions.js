// src/data/questions.js
const questions = {
  easy: [
    {
      id: 'e1',
      type: 'multiple-choice',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4'
    },
    {
      id: 'e2',
      type: 'true-false',
      question: 'Is the Earth round?',
      correctAnswer: 'true'
    },
    {
      id: 'e3',
      type: 'text-input',
      question: 'What is the capital of France?',
      correctAnswer: 'paris'
    },
    // Additional Easy Questions
    {
      id: 'e4',
      type: 'multiple-choice',
      question: 'What color is the sky on a clear day?',
      options: ['Blue', 'Green', 'Red', 'Yellow'],
      correctAnswer: 'Blue'
    },
    {
      id: 'e5',
      type: 'text-input',
      question: 'What is the boiling point of water (in Celsius)?',
      correctAnswer: '100'
    }
  ],
  medium: [
    {
      id: 'm1',
      type: 'multiple-choice',
      question: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Mars', 'Mercury', 'Jupiter'],
      correctAnswer: 'Mercury'
    },
    {
      id: 'm2',
      type: 'true-false',
      question: 'JavaScript was created in 10 days?',
      correctAnswer: 'true'
    },
    {
      id: 'm3',
      type: 'text-input',
      question: 'What programming language is React built with?',
      correctAnswer: 'javascript'
    },
    // Additional Medium Questions
    {
      id: 'm4',
      type: 'multiple-choice',
      question: "Who wrote '1984'?",
      options: ['George Orwell', 'Aldous Huxley', 'J.K. Rowling', 'Ernest Hemingway'],
      correctAnswer: 'George Orwell'
    },
    {
      id: 'm5',
      type: 'true-false',
      question: 'The Earth revolves around the Sun.',
      correctAnswer: 'true'
    }
  ],
  hard: [
    {
      id: 'h1',
      type: 'multiple-choice',
      question: 'Which sorting algorithm has the best average time complexity?',
      options: ['Bubble Sort', 'Quick Sort', 'Insertion Sort', 'Selection Sort'],
      correctAnswer: 'Quick Sort'
    },
    {
      id: 'h2',
      type: 'true-false',
      question: 'Is P = NP still an unsolved problem in computer science?',
      correctAnswer: 'true'
    },
    {
      id: 'h3',
      type: 'text-input',
      question: 'What is the time complexity of binary search?',
      correctAnswer: 'O(log n)'
    },
    // Additional Hard Questions
    {
      id: 'h4',
      type: 'multiple-choice',
      question: "Which element has the chemical symbol 'Au'?",
      options: ['Silver', 'Gold', 'Copper', 'Iron'],
      correctAnswer: 'Gold'
    },
    {
      id: 'h5',
      type: 'text-input',
      question: 'Who developed the theory of relativity?',
      correctAnswer: 'einstein'
    }
  ]
};

export default questions;
