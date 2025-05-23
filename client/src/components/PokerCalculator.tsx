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
  hitProbability: string;
  currentHand: string | null;
  outs: string[];
  outDetails?: {
    byType: { [key: string]: number },
    total: number
  };
  opponentImpact?: Array<{
    opponents: number;
    winProbability: string;
  }>;
}

const PokerCalculator: React.FC = () => {
  const [playerCards, setPlayerCards] = useState<(string | null)[]>([null, null]);
  
  const [boardCards, setBoardCards] = useState<(string | null)[]>([null, null, null, null, null]);
  
  const [selectionMode, setSelectionMode] = useState<'player' | 'board' | null>(null);
  
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  
  const [results, setResults] = useState<CalculationResults | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  
  const [numOpponents, setNumOpponents] = useState<number>(1);
  
  const usedCards = [...playerCards, ...boardCards].filter(card => card !== null) as string[];
  
  const handlePlayerCardClick = (index: number) => {
    if (playerCards[index]) {
      const newPlayerCards = [...playerCards];
      newPlayerCards[index] = null;
      setPlayerCards(newPlayerCards);
    } else {
      setSelectionMode('player');
      setCurrentCardIndex(index);
    }
  };
  
  const handleBoardCardClick = (index: number) => {
    if (boardCards[index]) {
      const newBoardCards = [...boardCards];
      newBoardCards[index] = null;
      setBoardCards(newBoardCards);
    } else {
      setSelectionMode('board');
      setCurrentCardIndex(index);
    }
  };
  
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
  
  const handleReset = () => {
    setPlayerCards([null, null]);
    setBoardCards([null, null, null, null, null]);
    setResults(null);
  };
  
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
      console.log('With data:', { 
        playerCards: validPlayerCards, 
        boardCards: validBoardCards,
        numOpponents
      });
      
      const response = await axios.post(`${API_URL}/calculate`, {
        playerCards: validPlayerCards,
        boardCards: validBoardCards,
        numOpponents
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
  }, [playerCards, boardCards, numOpponents]);
  
  useEffect(() => {
    const validPlayerCards = playerCards.filter(card => card !== null);
    
    if (validPlayerCards.length > 0) {
      calculateProbabilities();
    }
  }, [playerCards, boardCards, calculateProbabilities]);
  
  const handleCancel = () => {
    setSelectionMode(null);
    setCurrentCardIndex(null);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1">
          <div className="glass p-4 sm:p-6 rounded-xl shadow-lg backdrop-blur-md mb-6 glow-subtle">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-white text-center">
              Your Cards
            </h2>
            
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-gray-300 text-center">Player Hand</h3>
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
            
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-gray-300 text-center">Board</h3>
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
            
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-gray-300 text-center">Number of Opponents</h3>
              <div className="flex justify-center">
                <select
                  value={numOpponents}
                  onChange={(e) => setNumOpponents(parseInt(e.target.value))}
                  className="glass px-4 py-2 text-white rounded-lg 
                  hover:bg-white/10 transform hover:scale-105 transition-all 
                  border border-white/10 shadow-lg backdrop-blur-md 
                  appearance-none bg-transparent min-w-[100px] sm:min-w-[120px] text-center
                  focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <option key={num} value={num} className="bg-gray-800">{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleReset}
                className="glass px-6 sm:px-8 py-2 sm:py-3 text-white rounded-lg 
                hover:bg-white/10 transform hover:scale-105 transition-all 
                border border-white/10 shadow-lg glow-subtle font-medium
                backdrop-blur-md relative z-10"
              >
                Reset
              </button>
            </div>
          </div>
          
          {selectionMode && currentCardIndex !== null && (
            <div className="mt-6">
              <CardSelector
                onSelectCard={handleSelectCard}
                usedCards={usedCards}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
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