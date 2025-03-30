import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Poker Odds Calculator</p>
          </div>
          <div>
            <p>Calculez vos probabilités de poker en temps réel</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 