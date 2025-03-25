import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Brain, LogOut, User, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user?.email) return '?';
    return user.email.charAt(0).toUpperCase();
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/90 backdrop-blur-lg z-50 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="w-8 h-8 text-[rgb(79,70,229)]" />
          <span className="text-xl font-bold">BrainlyAi</span>
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/features" 
              className={`relative text-gray-600 dark:text-gray-300 hover:text-[rgb(79,70,229)] dark:hover:text-[rgb(79,70,229)] transition-colors py-5 ${
                isActivePage('/features') ? 'text-[rgb(79,70,229)] dark:text-[rgb(79,70,229)] dark:text-opacity-90' : ''
              }`}
            >
              Features
              {isActivePage('/features') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(79,70,229)] dark:bg-[rgb(79,70,229)] dark:bg-opacity-90" />
              )}
            </Link>
            <Link 
              to="/pricing" 
              className={`relative text-gray-600 dark:text-gray-300 hover:text-[rgb(79,70,229)] dark:hover:text-[rgb(79,70,229)] transition-colors py-5 ${
                isActivePage('/pricing') ? 'text-[rgb(79,70,229)] dark:text-[rgb(79,70,229)] dark:text-opacity-90' : ''
              }`}
            >
              Pricing
              {isActivePage('/pricing') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(79,70,229)] dark:bg-[rgb(79,70,229)] dark:bg-opacity-90" />
              )}
            </Link>
            <Link 
              to="/about" 
              className={`relative text-gray-600 dark:text-gray-300 hover:text-[rgb(79,70,229)] dark:hover:text-[rgb(79,70,229)] transition-colors py-5 ${
                isActivePage('/about') ? 'text-[rgb(79,70,229)] dark:text-[rgb(79,70,229)] dark:text-opacity-90' : ''
              }`}
            >
              About
              {isActivePage('/about') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(79,70,229)] dark:bg-[rgb(79,70,229)] dark:bg-opacity-90" />
              )}
            </Link>
            <Link 
              to="/contact" 
              className={`relative text-gray-600 dark:text-gray-300 hover:text-[rgb(79,70,229)] dark:hover:text-[rgb(79,70,229)] transition-colors py-5 ${
                isActivePage('/contact') ? 'text-[rgb(79,70,229)] dark:text-[rgb(79,70,229)] dark:text-opacity-90' : ''
              }`}
            >
              Contact
              {isActivePage('/contact') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(79,70,229)] dark:bg-[rgb(79,70,229)] dark:bg-opacity-90" />
              )}
            </Link>
            <Link 
              to="/student"
              className={`px-4 py-2 bg-primary-50 dark:bg-primary-900/50 text-[rgb(79,70,229)] dark:text-[rgb(79,70,229)] dark:text-opacity-90 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors ${
                isActivePage('/student') ? 'ring-2 ring-[rgb(79,70,229)] dark:ring-[rgb(79,70,229)] dark:ring-opacity-90' : ''
              }`}
            >
              Student Board
            </Link>
          </nav>
          <ThemeToggle />
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    {getUserInitials()}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-1 border border-gray-100 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/profile');
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/signin')}
              className="hidden md:block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/20"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}; 