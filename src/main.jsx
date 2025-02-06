import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { QuestionProvider } from './contexts/QuestionContext';
import './index.css'; // Tailwind CSS import (make sure Tailwind is configured)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Wrap the app with Router and our QuestionContext provider
  <Router>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </Router>
);