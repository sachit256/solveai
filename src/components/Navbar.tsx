import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="w-8 h-8 text-primary-600" />
          <span className="text-xl font-bold">SolveAI</span>
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6">
            <Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Features</Link>
            <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Pricing</Link>
            <Link 
              to="/student"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600"
            >
              Student Board
            </Link>
          </nav>
          <ThemeToggle />
          <Link 
            to="/pricing" 
            className="hidden md:block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium"
          >
            Try Now
          </Link>
        </div>
      </div>
    </header>
  );
}; 