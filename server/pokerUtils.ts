// Types
interface HandEvaluation {
  score: number;
  type: string;
}

interface SimulationResult {
  win: boolean;
  tie: boolean;
  loss: boolean;
  board: string[];
}

interface ProbabilityResults {
  winProbability: string;
  tieProbability: string;
  lossProbability: string;
}

// Constants
const SUITS = ['h', 'd', 'c', 's'] as const;
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] as const;

const generateDeck = (): string[] => {
  const deck: string[] = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push(value + suit);
    }
  }
  return deck;
};

const shuffleDeck = (deck: string[]): string[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getCardRank = (card: string): number => {
  const value = card.charAt(0);
  return VALUES.indexOf(value as typeof VALUES[number]);
};

const evaluateHand = (cards: string[]): HandEvaluation => {
  // Si nous n'avons pas assez de cartes, retourner une carte haute
  if (cards.length < 5) {
    const values = cards.map(card => card.charAt(0));
    const ranks = values.map(value => VALUES.indexOf(value as typeof VALUES[number])).sort((a, b) => b - a);
    return { score: 0, type: 'High Card' };
  }

  // Trier les cartes par valeur
  const sortedCards = [...cards].sort((a, b) => {
    const rankA = VALUES.indexOf(a.charAt(0) as typeof VALUES[number]);
    const rankB = VALUES.indexOf(b.charAt(0) as typeof VALUES[number]);
    return rankB - rankA;
  });

  // Prendre les 5 meilleures cartes
  const bestCards = sortedCards.slice(0, 5);
  
  const values = bestCards.map(card => card.charAt(0));
  const suits = bestCards.map(card => card.charAt(1));
  
  const valueCounts: Record<string, number> = {};
  for (const value of values) {
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  }
  
  const suitCounts: Record<string, number> = {};
  for (const suit of suits) {
    suitCounts[suit] = (suitCounts[suit] || 0) + 1;
  }
  
  const ranks = values.map(value => VALUES.indexOf(value as typeof VALUES[number])).sort((a, b) => b - a);
  
  // Check possible hands (from highest to lowest)
  
  // Royal Flush or Straight Flush
  const isFlush = Object.values(suitCounts).some(count => count >= 5);
  
  // Straight
  const uniqueRanks = [...new Set(ranks)].sort((a, b) => b - a);
  let isStraight = false;
  
  // Regular straights
  for (let i = 0; i < uniqueRanks.length - 4; i++) {
    if (uniqueRanks[i] - uniqueRanks[i + 4] === 4) {
      isStraight = true;
      break;
    }
  }
  
  // Ace-low straight (A-2-3-4-5)
  if (!isStraight && uniqueRanks.includes(12) && // Ace
      uniqueRanks.includes(3) && uniqueRanks.includes(2) && 
      uniqueRanks.includes(1) && uniqueRanks.includes(0)) {
    isStraight = true;
  }
  
  if (isFlush && isStraight) {
    if (ranks.includes(12) && ranks.includes(11) && ranks.includes(10) && 
        ranks.includes(9) && ranks.includes(8)) {
      return { score: 9, type: 'Royal Flush' };
    }
    return { score: 8, type: 'Straight Flush' };
  }
  
  // Four of a Kind
  if (Object.values(valueCounts).some(count => count === 4)) {
    return { score: 7, type: 'Four of a Kind' };
  }
  
  // Full House
  const hasThreeOfAKind = Object.values(valueCounts).some(count => count === 3);
  const hasPair = Object.values(valueCounts).some(count => count === 2);
  if (hasThreeOfAKind && hasPair) {
    return { score: 6, type: 'Full House' };
  }
  
  // Flush
  if (isFlush) {
    return { score: 5, type: 'Flush' };
  }
  
  // Straight
  if (isStraight) {
    return { score: 4, type: 'Straight' };
  }
  
  // Three of a Kind
  if (hasThreeOfAKind) {
    return { score: 3, type: 'Three of a Kind' };
  }
  
  // Two Pair
  const pairs = Object.values(valueCounts).filter(count => count === 2);
  if (pairs.length >= 2) {
    return { score: 2, type: 'Two Pair' };
  }
  
  // One Pair
  if (hasPair) {
    return { score: 1, type: 'One Pair' };
  }
  
  // High Card
  return { score: 0, type: 'High Card' };
};

const compareHands = (hand1: string[], hand2: string[]): number => {
  const eval1 = evaluateHand(hand1);
  const eval2 = evaluateHand(hand2);
  
  // Si les types de mains sont différents, la main avec le score le plus élevé gagne
  if (eval1.score > eval2.score) return 1;
  if (eval1.score < eval2.score) return -1;
  
  // Si les types de mains sont identiques, on compare en fonction du type
  const handType = eval1.score;
  
  // Transformer les cartes en rangs (triés du plus fort au plus faible)
  const ranks1 = hand1.map(card => VALUES.indexOf(card.charAt(0) as typeof VALUES[number])).sort((a, b) => b - a);
  const ranks2 = hand2.map(card => VALUES.indexOf(card.charAt(0) as typeof VALUES[number])).sort((a, b) => b - a);
  
  // Pour une quinte flush, quinte flush royale, couleur ou suite, on compare simplement les rangs
  if (handType === 9 || handType === 8 || handType === 5 || handType === 4) {
    // Cas spécial : suite As-5
    const isAceLow1 = ranks1.includes(12) && ranks1.includes(3) && ranks1.includes(2) && ranks1.includes(1) && ranks1.includes(0);
    const isAceLow2 = ranks2.includes(12) && ranks2.includes(3) && ranks2.includes(2) && ranks2.includes(1) && ranks2.includes(0);
    
    // La suite As-5 est la plus faible des suites
    if (isAceLow1 && !isAceLow2) return -1;
    if (!isAceLow1 && isAceLow2) return 1;
    if (isAceLow1 && isAceLow2) return 0; // Égalité parfaite pour deux suites As-5
    
    // Pour les autres suites, on compare simplement la carte la plus haute
    for (let i = 0; i < Math.min(ranks1.length, ranks2.length); i++) {
      if (ranks1[i] > ranks2[i]) return 1;
      if (ranks1[i] < ranks2[i]) return -1;
    }
    return 0;
  }
  
  // Pour les autres types de mains (brelan, full, carré, etc.), on trie par fréquence puis par valeur
  const valueCounts1: Record<number, number> = {};
  for (const rank of ranks1) {
    valueCounts1[rank] = (valueCounts1[rank] || 0) + 1;
  }
  
  const valueCounts2: Record<number, number> = {};
  for (const rank of ranks2) {
    valueCounts2[rank] = (valueCounts2[rank] || 0) + 1;
  }
  
  // On trie les rangs par fréquence (descendant) puis par valeur (descendant)
  const sortedRanks1 = Object.entries(valueCounts1)
    .sort(([rankA, countA], [rankB, countB]) => {
      if (countA !== countB) return countB - countA;
      return parseInt(rankB) - parseInt(rankA);
    })
    .map(([rank]) => parseInt(rank));
  
  const sortedRanks2 = Object.entries(valueCounts2)
    .sort(([rankA, countA], [rankB, countB]) => {
      if (countA !== countB) return countB - countA;
      return parseInt(rankB) - parseInt(rankA);
    })
    .map(([rank]) => parseInt(rank));
  
  // Comparer les rangs un par un
  for (let i = 0; i < Math.min(sortedRanks1.length, sortedRanks2.length); i++) {
    if (sortedRanks1[i] > sortedRanks2[i]) return 1;
    if (sortedRanks1[i] < sortedRanks2[i]) return -1;
  }
  
  // Si on arrive ici, c'est une égalité parfaite
  return 0;
};

const simulateHand = (playerCards: string[], boardCards: string[], remainingDeck: string[], numOpponents: number = 1): SimulationResult => {
  const cardsNeeded = 5 - boardCards.length;
  
  const simulatedBoard = [...boardCards];
  for (let i = 0; i < cardsNeeded; i++) {
    simulatedBoard.push(remainingDeck.pop()!);
  }
  
  const playerHand = [...playerCards, ...simulatedBoard];
  
  // Créer plusieurs adversaires
  const opponents = [];
  for (let i = 0; i < numOpponents; i++) {
    opponents.push({
      cards: [remainingDeck.pop()!, remainingDeck.pop()!],
      hand: [] as string[]
    });
  }
  
  // Compléter les mains des adversaires avec le board
  for (const opponent of opponents) {
    opponent.hand = [...opponent.cards, ...simulatedBoard];
  }
  
  // Comparer la main du joueur avec chaque adversaire
  let win = true;
  let tie = false;
  
  for (const opponent of opponents) {
    const result = compareHands(playerHand, opponent.hand);
    
    if (result < 0) {
      // Si le joueur perd contre un seul adversaire, il perd la main
      win = false;
      tie = false;
      break;
    } else if (result === 0) {
      // En cas d'égalité avec un adversaire, on considère une égalité potentielle
      win = false;
      tie = true;
    }
  }
  
  return {
    win,
    tie,
    loss: !win && !tie,
    board: simulatedBoard
  };
};

const calculateProbabilities = (playerCards: string[], boardCards: string[], numOpponents: number = 1, numSimulations = 10000): ProbabilityResults => {
  let wins = 0;
  let ties = 0;
  
  const usedCards = [...playerCards, ...boardCards];
  let deck = generateDeck().filter(card => !usedCards.includes(card));
  
  for (let i = 0; i < numSimulations; i++) {
    const shuffledDeck = shuffleDeck(deck);
    
    const result = simulateHand(playerCards, boardCards, shuffledDeck, numOpponents);
    
    if (result.win) wins++;
    if (result.tie) ties++;
  }
  
  const winProbability = (wins / numSimulations * 100).toFixed(2);
  const tieProbability = (ties / numSimulations * 100).toFixed(2);
  const lossProbability = (100 - parseFloat(winProbability) - parseFloat(tieProbability)).toFixed(2);
  
  return {
    winProbability,
    tieProbability,
    lossProbability
  };
};

const calculateOuts = (playerCards: string[], boardCards: string[]): string[] => {
  const allCards = [...playerCards, ...boardCards];
  const evaluation = evaluateHand(allCards);
  
  // Si nous n'avons pas assez de cartes pour évaluer la main, retourner un tableau vide
  if (allCards.length < 5) {
    return [];
  }
  
  const outs: string[] = [];
  
  // Ajouter des outs en fonction de la main actuelle
  switch (evaluation.type) {
    case 'High Card':
      outs.push('Any card to make a pair');
      break;
    case 'One Pair':
      outs.push('Any card to make three of a kind');
      break;
    case 'Two Pair':
      outs.push('Any card to make a full house');
      break;
    case 'Three of a Kind':
      outs.push('Any card to make four of a kind');
      outs.push('Any card to make a full house');
      break;
    case 'Straight':
      outs.push('Any card to make a straight flush');
      break;
    case 'Flush':
      outs.push('Any card to make a straight flush');
      break;
    case 'Full House':
      outs.push('Any card to make four of a kind');
      break;
    case 'Four of a Kind':
      outs.push('Any card to make a straight flush');
      break;
    case 'Straight Flush':
      outs.push('Any card to make a royal flush');
      break;
  }
  
  return outs;
};

export {
  generateDeck,
  shuffleDeck,
  evaluateHand,
  compareHands,
  calculateProbabilities,
  calculateOuts
}; 