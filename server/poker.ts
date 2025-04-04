import { evaluateHand, calculateProbabilities as calculateProbs, calculateDetailedOuts, getHandTypeFromScore } from './pokerUtils';

interface CalculationResults {
  winProbability: string;
  tieProbability: string;
  lossProbability: string;
  hitProbability: string;
  currentHand: string | null;
  outs: string[];
  outDetails: {
    byType: { [key: string]: number },
    total: number
  };
  opponentImpact: Array<{
    opponents: number;
    winProbability: string;
  }>;
}

export async function calculateProbabilities(
  playerCards: string[],
  boardCards: string[],
  numOpponents: number = 1
): Promise<CalculationResults> {
  // Calculer les probabilités pour le nombre d'adversaires spécifié
  const probabilities = calculateProbs(playerCards, boardCards, numOpponents);
  
  // Calculer la main actuelle si nous avons au moins 3 cartes sur le board
  let currentHand = null;
  if (boardCards.length >= 3) {
    const evaluation = evaluateHand([...playerCards, ...boardCards]);
    currentHand = evaluation.type;
  }
  
  // Calculer l'impact du nombre d'adversaires (1 à 5)
  const opponentImpact = [];
  for (let i = 1; i <= 5; i++) {
    // Ne pas recalculer pour le nombre actuel d'adversaires
    if (i === numOpponents) {
      opponentImpact.push({
        opponents: i,
        winProbability: probabilities.winProbability
      });
      continue;
    }
    
    // Calculer uniquement pour 1, 2, 3, 5 adversaires (si ce n'est pas le nombre actuel)
    if (i === 1 || i === 2 || i === 3 || i === 5) {
      const opponentProbs = calculateProbs(playerCards, boardCards, i);
      opponentImpact.push({
        opponents: i,
        winProbability: opponentProbs.winProbability
      });
    }
  }
  
  // Obtenir les outs détaillés
  const outDetails = calculateDetailedOuts(playerCards, boardCards);
  
  const outsByType: { [key: string]: number } = {};
  for (const [type, count] of Object.entries(probabilities.outTypes)) {
    outsByType[type] = count;
  }
  
  return {
    winProbability: probabilities.winProbability,
    tieProbability: probabilities.tieProbability,
    lossProbability: probabilities.lossProbability,
    hitProbability: probabilities.hitProbability,
    currentHand,
    outs: probabilities.outCards,
    outDetails: {
      byType: outsByType,
      total: probabilities.outCards.length
    },
    opponentImpact
  };
} 