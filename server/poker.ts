import { evaluateHand, calculateProbabilities as calculateProbs, calculateOuts } from './pokerUtils';

interface CalculationResults {
  winProbability: string;
  tieProbability: string;
  lossProbability: string;
  currentHand: string | null;
  outs: string[];
}

export async function calculateProbabilities(
  playerCards: string[],
  boardCards: string[],
  numOpponents: number = 1
): Promise<CalculationResults> {
  // Calculer les probabilités
  const probabilities = calculateProbs(playerCards, boardCards, numOpponents);
  
  // Calculer la main actuelle si nous avons au moins 3 cartes sur le board
  let currentHand = null;
  if (boardCards.length >= 3) {
    const evaluation = evaluateHand([...playerCards, ...boardCards]);
    currentHand = evaluation.type;
  }
  
  // Calculer les outs
  const outs = calculateOuts(playerCards, boardCards);
  
  return {
    winProbability: probabilities.winProbability,
    tieProbability: probabilities.tieProbability,
    lossProbability: probabilities.lossProbability,
    currentHand,
    outs
  };
} 