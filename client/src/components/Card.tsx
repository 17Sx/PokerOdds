import React from 'react';

interface CardProps {
  card: string | null;
  onClick?: () => void;
  selectable?: boolean;
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, selectable = false, selected = false }) => {
  // Logique pour déterminer la couleur et la valeur de la carte
  const getSuitColor = (suit: string): string => {
    return ['h', 'd'].includes(suit) ? 'text-red-600' : 'text-gray-800';
  };

  const getSuitSymbol = (suit: string): string => {
    const symbols: Record<string, string> = {
      h: '♥', // Cœur
      d: '♦', // Carreau
      c: '♣', // Trèfle
      s: '♠', // Pique
    };
    return symbols[suit] || suit;
  };

  const getValueDisplay = (value: string): string => {
    const valueMap: Record<string, string> = {
      T: '10',
      J: 'V', // Valet
      Q: 'D', // Dame
      K: 'R', // Roi
      A: 'A', // As
    };
    return valueMap[value] || value;
  };

  let cardContent;

  if (card) {
    const value = card[0];
    const suit = card[1];
    
    cardContent = (
      <>
        <div className={`text-xl font-bold ${getSuitColor(suit)}`}>
          {getValueDisplay(value)}
        </div>
        <div className={`text-2xl ${getSuitColor(suit)}`}>
          {getSuitSymbol(suit)}
        </div>
      </>
    );
  } else {
    cardContent = (
      <div className="text-gray-400">
        {selectable ? '+' : ''}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick} 
      className={`
        w-16 h-24 rounded-lg flex flex-col justify-center items-center
        ${card ? 'bg-white' : 'bg-gray-100'} 
        ${selectable ? 'cursor-pointer hover:bg-gray-200' : ''}
        ${selected ? 'ring-2 ring-blue-500' : ''}
        shadow-md
      `}
    >
      {cardContent}
    </div>
  );
};

export default Card; 