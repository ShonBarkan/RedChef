import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
