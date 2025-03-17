import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import StudentBoardPage from './pages/StudentBoardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FF] dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/student" element={<StudentBoardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;