import React, { useState } from 'react';

interface CardSelectorProps {
  onSelectCard: (card: string) => void;
  usedCards: string[];
  onCancel: () => void;
}

const CardSelector: React.FC<CardSelectorProps> = ({ onSelectCard, usedCards, onCancel }) => {
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
    <div className="glass p-8 rounded-xl shadow-lg backdrop-blur-md animate-fadeIn glow-subtle">
      <h3 className="text-xl font-semibold mb-8 text-white text-center">Select a card</h3>
      
      <div className="mb-8">
        <div className="grid grid-cols-7 gap-3 max-w-xl mx-auto">
          {values.map((value) => (
            <button
              key={value}
              onClick={() => handleValueClick(value)}
              className={`
                p-4 rounded-lg text-center text-lg font-medium transition-all
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
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto mb-8">
        {suits.map((suit) => (
          <button
            key={suit}
            onClick={() => handleSuitClick(suit)}
            disabled={selectedValue ? isCardUsed(selectedValue, suit) : false}
            className={`
              p-4 rounded-lg text-center transition-all
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
      
      <div className="flex justify-center">
        <button
          onClick={onCancel}
          className="glass px-8 py-3 text-white rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all border border-white/10 shadow-lg glow-subtle"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CardSelector; 