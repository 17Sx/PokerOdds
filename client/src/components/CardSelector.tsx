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
    h: 'Cœur',
    d: 'Carreau',
    c: 'Trèfle',
    s: 'Pique',
  };

  const handleValueClick = (value: string) => {
    setSelectedValue(value);
  };

  const handleSuitClick = (suit: string) => {
    if (selectedValue) {
      const card = selectedValue + suit;
      // Vérifier si la carte est déjà utilisée
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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Sélectionnez une carte</h3>
      
      <div className="mb-4">
        <div className="grid grid-cols-7 gap-2">
          {values.map((value) => (
            <button
              key={value}
              onClick={() => handleValueClick(value)}
              className={`
                p-2 rounded-md text-center
                ${selectedValue === value 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              {value === 'T' ? '10' : value}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {suits.map((suit) => (
          <button
            key={suit}
            onClick={() => handleSuitClick(suit)}
            disabled={selectedValue ? isCardUsed(selectedValue, suit) : false}
            className={`
              p-2 rounded-md text-center
              ${selectedSuit === suit 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
              }
              ${selectedValue && isCardUsed(selectedValue, suit) 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
              }
            `}
          >
            {suitNames[suit]}
          </button>
        ))}
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={resetSelection}
          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default CardSelector; 