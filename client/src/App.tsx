import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import MenuMuze from './components/MenuMuze/MenuMuze';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/MenuMuze" element={<MenuMuze />} />
    </Routes>
  );
};

export default App;
