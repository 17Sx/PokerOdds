import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from './Card';
import CardSelector from './CardSelector';
import ProbabilityResults from './ProbabilityResults';

// Backend API URL
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://poker-odds-ten.vercel.app/api'
  : 'http://localhost:5000/api';

interface CalculationResults {
  winProbability: string;
  tieProbability: string;
  lossProbability: string;
  currentHand: string | null;
  outs: string[];
}

const PokerCalculator: React.FC = () => {
  // Player cards state (2 cards max)
  const [playerCards, setPlayerCards] = useState<(string | null)[]>([null, null]);
  
  // Board cards state (5 cards max)
  const [boardCards, setBoardCards] = useState<(string | null)[]>([null, null, null, null, null]);
  
  // Selection mode state (player or board)
  const [selectionMode, setSelectionMode] = useState<'player' | 'board' | null>(null);
  
  // Current card index being selected
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  
  // Calculation results state
  const [results, setResults] = useState<CalculationResults | null>(null);
  
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  
  // List of all used cards
  const usedCards = [...playerCards, ...boardCards].filter(card => card !== null) as string[];
  
  // Handle click on player card
  const handlePlayerCardClick = (index: number) => {
    if (playerCards[index]) {
      // If card already exists, remove it
      const newPlayerCards = [...playerCards];
      newPlayerCards[index] = null;
      setPlayerCards(newPlayerCards);
    } else {
      // Otherwise, open card selector
      setSelectionMode('player');
      setCurrentCardIndex(index);
    }
  };
  
  // Handle click on board card
  const handleBoardCardClick = (index: number) => {
    if (boardCards[index]) {
      // If card already exists, remove it
      const newBoardCards = [...boardCards];
      newBoardCards[index] = null;
      setBoardCards(newBoardCards);
    } else {
      // Otherwise, open card selector
      setSelectionMode('board');
      setCurrentCardIndex(index);
    }
  };
  
  // Function to select a card
  const handleSelectCard = (card: string) => {
    if (selectionMode === 'player' && currentCardIndex !== null) {
      const newPlayerCards = [...playerCards];
      newPlayerCards[currentCardIndex] = card;
      setPlayerCards(newPlayerCards);
    } else if (selectionMode === 'board' && currentCardIndex !== null) {
      const newBoardCards = [...boardCards];
      newBoardCards[currentCardIndex] = card;
      setBoardCards(newBoardCards);
    }
    
    // Close selector
    setSelectionMode(null);
    setCurrentCardIndex(null);
  };
  
  // Function to reset all cards
  const handleReset = () => {
    setPlayerCards([null, null]);
    setBoardCards([null, null, null, null, null]);
    setResults(null);
  };
  
  // Function to calculate probabilities
  const calculateProbabilities = useCallback(async () => {
    const validPlayerCards = playerCards.filter(card => card !== null) as string[];
    const validBoardCards = boardCards.filter(card => card !== null) as string[];
    
    if (validPlayerCards.length === 0) {
      alert('Please select at least one card for the player');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Sending request to:', API_URL);
      console.log('With data:', { playerCards: validPlayerCards, boardCards: validBoardCards });
      
      const response = await axios.post(`${API_URL}/calculate`, {
        playerCards: validPlayerCards,
        boardCards: validBoardCards
      });
      
      console.log('Response received:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error calculating probabilities:', error);
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        alert('An error occurred while calculating probabilities. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [playerCards, boardCards]);
  
  // Automatically recalculate probabilities when cards change
  useEffect(() => {
    const validPlayerCards = playerCards.filter(card => card !== null);
    
    if (validPlayerCards.length > 0) {
      calculateProbabilities();
    }
  }, [playerCards, boardCards, calculateProbabilities]);
  
  // Function to handle cancel
  const handleCancel = () => {
    setSelectionMode(null);
    setCurrentCardIndex(null);
  };
  
  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2">
          <div className="glass p-6 rounded-xl shadow-lg backdrop-blur-md mb-8 glow-subtle">
            <h2 className="text-2xl font-semibold mb-8 text-white text-center">
              Your Cards
            </h2>
            
            <div className="mb-10">
              <h3 className="text-xl font-medium mb-6 text-gray-300 text-center">Player Hand</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {playerCards.map((card, index) => (
                  <Card
                    key={`player-${index}`}
                    card={card}
                    onClick={() => handlePlayerCardClick(index)}
                    selectable={true}
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-medium mb-6 text-gray-300 text-center">Board</h3>
              <div className="flex flex-wrap gap-6 justify-center">
                {boardCards.map((card, index) => (
                  <Card
                    key={`board-${index}`}
                    card={card}
                    onClick={() => handleBoardCardClick(index)}
                    selectable={true}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleReset}
                className="glass px-8 py-3 text-white rounded-lg 
                hover:bg-white/10 transform hover:scale-105 transition-all 
                border border-white/10 shadow-lg glow-subtle font-medium
                backdrop-blur-md relative z-10"
              >
                Reset
              </button>
            </div>
          </div>
          
          {selectionMode && currentCardIndex !== null && (
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <CardSelector
                  onSelectCard={handleSelectCard}
                  usedCards={usedCards}
                  onCancel={handleCancel}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <div className="w-full">
            <ProbabilityResults
              results={results}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokerCalculator;