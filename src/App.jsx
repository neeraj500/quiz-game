import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import EndScreen from './components/EndScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/quiz" element={<QuestionScreen />} />
      <Route path="/end" element={<EndScreen />} />
    </Routes>
  );
}

export default App;