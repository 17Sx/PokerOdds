import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="glass p-4 mb-8 rounded-xl shadow-lg backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
          Poker Odds
        </Link>
        
        <div className="flex space-x-6">
          <Link 
            to="/" 
            className={`text-lg font-medium transition-colors ${
              isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/calculator" 
            className={`text-lg font-medium transition-colors ${
              isActive('/calculator') ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Calculator
          </Link>
          <Link 
            to="/glossary" 
            className={`text-lg font-medium transition-colors ${
              isActive('/glossary') ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Glossary
          </Link>
          <Link 
            to="/tutorial" 
            className={`text-lg font-medium transition-colors ${
              isActive('/tutorial') ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Tutorial
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 