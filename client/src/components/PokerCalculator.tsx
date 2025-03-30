import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import CardSelector from './CardSelector';
import ProbabilityResults from './ProbabilityResults';

// Backend API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
  const calculateProbabilities = async () => {
    const validPlayerCards = playerCards.filter(card => card !== null) as string[];
    const validBoardCards = boardCards.filter(card => card !== null) as string[];
    
    if (validPlayerCards.length === 0) {
      alert('Please select at least one card for the player');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/api/calculate`, {
        playerCards: validPlayerCards,
        boardCards: validBoardCards
      });
      
      setResults(response.data);
    } catch (error) {
      console.error('Error calculating probabilities:', error);
      alert('An error occurred while calculating probabilities');
    } finally {
      setLoading(false);
    }
  };
  
  // Automatically recalculate probabilities when cards change
  useEffect(() => {
    const validPlayerCards = playerCards.filter(card => card !== null);
    const validBoardCards = boardCards.filter(card => card !== null);
    
    if (validPlayerCards.length > 0) {
      calculateProbabilities();
    }
  }, [playerCards, boardCards]);
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
        <span className="text-white glow-subtle">
          Poker Odds Calculator
        </span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass p-6 rounded-xl shadow-lg backdrop-blur-md mb-6 glow-subtle">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Your Cards
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-gray-300">Player Hand</h3>
              <div className="flex flex-wrap justify-center gap-4">
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
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4 text-gray-300">Board</h3>
              <div className="flex flex-wrap gap-4 justify-center">
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
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-800 text-white rounded-full 
                hover:bg-gray-700 transform hover:scale-105 transition-all border border-white/10 shadow-lg"
              >
                Reset
              </button>
            </div>
          </div>
          
          {selectionMode && currentCardIndex !== null && (
            <CardSelector
              onSelectCard={handleSelectCard}
              usedCards={usedCards}
            />
          )}
        </div>
        
        <div>
          <ProbabilityResults
            results={results}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PokerCalculator; 