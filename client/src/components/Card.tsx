import React from 'react';

interface CardProps {
  card: string | null;
  onClick?: () => void;
  selectable?: boolean;
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, selectable = false, selected = false }) => {
  const getSuitColor = (suit: string): string => {
    return ['h', 'd'].includes(suit) ? 'text-gray-400' : 'text-gray-600';
  };

  const getSuitSymbol = (suit: string): string => {
    const symbols: Record<string, string> = {
      h: '♥', 
      d: '♦', 
      c: '♣', 
      s: '♠', 
    };
    return symbols[suit] || suit;
  };

  const getValueDisplay = (value: string): string => {
    const valueMap: Record<string, string> = {
      T: '10',
      J: 'J', 
      K: 'K', 
      A: 'A', 
    };
    return valueMap[value] || value;
  };

  let cardContent;

  if (card) {
    const value = card[0];
    const suit = card[1];
    
    cardContent = (
      <>
        <div className={`text-lg sm:text-xl font-bold ${getSuitColor(suit)}`}>
          {getValueDisplay(value)}
        </div>
        <div className={`text-2xl sm:text-3xl mt-1 ${getSuitColor(suit)}`}>
          {getSuitSymbol(suit)}
        </div>
      </>
    );
  } else {
    cardContent = (
      <div className="text-gray-500 text-xl sm:text-2xl font-light">
        {selectable ? '+' : ''}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick} 
      className={`
        w-14 h-20 xs:w-16 xs:h-24 sm:w-20 sm:h-28 rounded-lg sm:rounded-xl flex flex-col justify-center items-center
        transition-all duration-300 transform select-none
        ${card 
          ? 'bg-gray-100/90 backdrop-blur-sm border border-white/20' 
          : 'glass'
        } 
        ${selectable 
          ? 'cursor-pointer hover:scale-105 active:scale-95 hover:shadow-xl' 
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