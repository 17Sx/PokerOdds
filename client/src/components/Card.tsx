import React from 'react';

interface CardProps {
  card: string | null;
  onClick?: () => void;
  selectable?: boolean;
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, selectable = false, selected = false }) => {
  // Logic to determine the color and value of the card
  const getSuitColor = (suit: string): string => {
    return ['h', 'd'].includes(suit) ? 'text-gray-400' : 'text-gray-600';
  };

  const getSuitSymbol = (suit: string): string => {
    const symbols: Record<string, string> = {
      h: '♥', // Heart
      d: '♦', // Diamond
      c: '♣', // Club
      s: '♠', // Spade
    };
    return symbols[suit] || suit;
  };

  const getValueDisplay = (value: string): string => {
    const valueMap: Record<string, string> = {
      T: '10',
      J: 'J', // Jack
      Q: 'Q', // Queen
      K: 'K', // King
      A: 'A', // Ace
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
        <div className={`text-3xl mt-1 ${getSuitColor(suit)}`}>
          {getSuitSymbol(suit)}
        </div>
      </>
    );
  } else {
    cardContent = (
      <div className="text-gray-500 text-2xl font-light">
        {selectable ? '+' : ''}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick} 
      className={`
        w-16 h-24 sm:w-20 sm:h-28 rounded-xl flex flex-col justify-center items-center
        transition-all duration-300 transform
        ${card 
          ? 'bg-gray-100/90 backdrop-blur-sm border border-white/20' 
          : 'glass'
        } 
        ${selectable 
          ? 'cursor-pointer hover:scale-105 hover:shadow-xl' 
          : ''
        }
        ${selected 
          ? 'ring-2 ring-white/30 shadow-lg shadow-white/10' 
          : 'shadow-lg'
        }
      `}
    >
      {cardContent}
    </div>
  );
};

export default Card; 