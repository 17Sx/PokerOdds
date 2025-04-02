interface CalculationResults {
  winProbability: string;
  tieProbability: string;
  lossProbability: string;
  currentHand: string | null;
  outs: string[];
}

export async function calculateProbabilities(
  playerCards: string[],
  boardCards: string[]
): Promise<CalculationResults> {
  // Pour l'instant, retournons des résultats simulés
  // À remplacer par la vraie logique de calcul
  return {
    winProbability: "45%",
    tieProbability: "5%",
    lossProbability: "50%",
    currentHand: "High Card",
    outs: ["Ace", "King", "Queen"]
  };
} 