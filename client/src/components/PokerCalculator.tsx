import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import CardSelector from './CardSelector';
import ProbabilityResults from './ProbabilityResults';

// URL de l'API backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface CalculationResults {
  winProbability: string;
  tieProbability: string;
  lossProbability: string;
  currentHand: string | null;
  outs: string[];
}

const PokerCalculator: React.FC = () => {
  // État pour les cartes du joueur (2 cartes max)
  const [playerCards, setPlayerCards] = useState<(string | null)[]>([null, null]);
  
  // État pour les cartes du board (5 cartes max)
  const [boardCards, setBoardCards] = useState<(string | null)[]>([null, null, null, null, null]);
  
  // État pour le mode de sélection (player ou board)
  const [selectionMode, setSelectionMode] = useState<'player' | 'board' | null>(null);
  
  // État pour l'index de la carte en cours de sélection
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  
  // État pour les résultats des calculs
  const [results, setResults] = useState<CalculationResults | null>(null);
  
  // État pour le chargement
  const [loading, setLoading] = useState<boolean>(false);
  
  // Liste de toutes les cartes utilisées
  const usedCards = [...playerCards, ...boardCards].filter(card => card !== null) as string[];
  
  // Fonction pour gérer le clic sur une carte du joueur
  const handlePlayerCardClick = (index: number) => {
    if (playerCards[index]) {
      // Si la carte existe déjà, on la supprime
      const newPlayerCards = [...playerCards];
      newPlayerCards[index] = null;
      setPlayerCards(newPlayerCards);
    } else {
      // Sinon, on ouvre le sélecteur de carte
      setSelectionMode('player');
      setCurrentCardIndex(index);
    }
  };
  
  // Fonction pour gérer le clic sur une carte du board
  const handleBoardCardClick = (index: number) => {
    if (boardCards[index]) {
      // Si la carte existe déjà, on la supprime
      const newBoardCards = [...boardCards];
      newBoardCards[index] = null;
      setBoardCards(newBoardCards);
    } else {
      // Sinon, on ouvre le sélecteur de carte
      setSelectionMode('board');
      setCurrentCardIndex(index);
    }
  };
  
  // Fonction pour sélectionner une carte
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
    
    // Fermer le sélecteur
    setSelectionMode(null);
    setCurrentCardIndex(null);
  };
  
  // Fonction pour réinitialiser toutes les cartes
  const handleReset = () => {
    setPlayerCards([null, null]);
    setBoardCards([null, null, null, null, null]);
    setResults(null);
  };
  
  // Fonction pour calculer les probabilités
  const calculateProbabilities = async () => {
    const validPlayerCards = playerCards.filter(card => card !== null) as string[];
    const validBoardCards = boardCards.filter(card => card !== null) as string[];
    
    if (validPlayerCards.length === 0) {
      alert('Veuillez sélectionner au moins une carte pour le joueur');
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
      console.error('Erreur lors du calcul des probabilités:', error);
      alert('Une erreur est survenue lors du calcul des probabilités');
    } finally {
      setLoading(false);
    }
  };
  
  // Recalculer automatiquement les probabilités lorsque les cartes changent
  useEffect(() => {
    const validPlayerCards = playerCards.filter(card => card !== null);
    const validBoardCards = boardCards.filter(card => card !== null);
    
    if (validPlayerCards.length > 0) {
      calculateProbabilities();
    }
  }, [playerCards, boardCards]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Calculateur de Probabilités Poker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Vos Cartes</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Main du Joueur</h3>
              <div className="flex space-x-4 justify-center">
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
            
            <div>
              <h3 className="text-lg font-medium mb-2">Board</h3>
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
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Réinitialiser
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