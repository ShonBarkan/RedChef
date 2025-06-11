import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import MenuMuze from './components/MenuMuze/MenuMuze';
import Layout from './components/Layout/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/MenuMuze" element={<MenuMuze />} />
      </Routes>
    </Layout>
  );
};

export default App;
