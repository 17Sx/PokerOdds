import React, { useState } from 'react';

interface CardSelectorProps {
  onSelectCard: (card: string) => void;
  usedCards: string[];
}

const CardSelector: React.FC<CardSelectorProps> = ({ onSelectCard, usedCards }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedSuit, setSelectedSuit] = useState<string | null>(null);

  const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  const suits = ['h', 'd', 'c', 's'];
  const suitNames: Record<string, string> = {
    h: 'Hearts',
    d: 'Diamonds',
    c: 'Clubs',
    s: 'Spades',
  };

  const handleValueClick = (value: string) => {
    setSelectedValue(value);
  };

  const handleSuitClick = (suit: string) => {
    if (selectedValue) {
      const card = selectedValue + suit;
      // Check if the card is already used
      if (!usedCards.includes(card)) {
        onSelectCard(card);
        resetSelection();
      }
    } else {
      setSelectedSuit(suit);
    }
  };

  const resetSelection = () => {
    setSelectedValue(null);
    setSelectedSuit(null);
  };

  const isCardUsed = (value: string, suit: string): boolean => {
    return usedCards.includes(value + suit);
  };

  return (
    <div className="glass p-6 rounded-xl shadow-lg backdrop-blur-md animate-fadeIn glow-subtle">
      <h3 className="text-xl font-semibold mb-6 text-white">Select a card</h3>
      
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-2">
          {values.map((value) => (
            <button
              key={value}
              onClick={() => handleValueClick(value)}
              className={`
                p-3 rounded-lg text-center text-lg font-medium transition-all
                ${selectedValue === value 
                  ? 'bg-white/20 text-white shadow-lg shadow-white/5' 
                  : 'bg-white/5 text-white hover:bg-white/10'
                }
              `}
            >
              {value === 'T' ? '10' : value}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {suits.map((suit) => (
          <button
            key={suit}
            onClick={() => handleSuitClick(suit)}
            disabled={selectedValue ? isCardUsed(selectedValue, suit) : false}
            className={`
              p-3 rounded-lg text-center transition-all
              ${selectedSuit === suit 
                ? 'bg-white/20 text-white shadow-lg shadow-white/5' 
                : 'bg-white/5 text-white hover:bg-white/10'
              }
              ${selectedValue && isCardUsed(selectedValue, suit) 
                ? 'opacity-30 cursor-not-allowed' 
                : ''
              }
            `}
          >
            {suitNames[suit]}
          </button>
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={resetSelection}
          className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CardSelector; 