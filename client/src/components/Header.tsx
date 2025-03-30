import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-2xl">Poker Odds Calculator</Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                  Accueil
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 