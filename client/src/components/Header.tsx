import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="glass-dark sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-2xl lg:text-3xl transition-all hover:text-pink-300">
            Poker Odds Calculator
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 