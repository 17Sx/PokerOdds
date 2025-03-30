// Constantes
const SUITS = ['h', 'd', 'c', 's']; 
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const generateDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push(value + suit);
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getCardRank = (card) => {
  const value = card.charAt(0);
  return VALUES.indexOf(value);
};

const evaluateHand = (cards) => {

  
  const values = cards.map(card => card.charAt(0));
  const suits = cards.map(card => card.charAt(1));
  
  const valueCounts = {};
  for (const value of values) {
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  }
  
  const suitCounts = {};
  for (const suit of suits) {
    suitCounts[suit] = (suitCounts[suit] || 0) + 1;
  }
  
  const ranks = values.map(value => VALUES.indexOf(value)).sort((a, b) => b - a);
  
  // Vérification des mains possibles (du plus fort au plus faible)
  
  // Quinte Flush Royale ou Quinte Flush
  const isFlush = Object.values(suitCounts).some(count => count >= 5);
  
  // suite
  const uniqueRanks = [...new Set(ranks)].sort((a, b) => b - a);
  let isStraight = false;
  
  // suites normales
  for (let i = 0; i < uniqueRanks.length - 4; i++) {
    if (uniqueRanks[i] - uniqueRanks[i + 4] === 4) {
      isStraight = true;
      break;
    }
  }
  
  if (!isStraight && uniqueRanks.includes(12) && // As
      uniqueRanks.includes(3) && uniqueRanks.includes(2) && 
      uniqueRanks.includes(1) && uniqueRanks.includes(0)) {
    isStraight = true;
  }
  
  if (isFlush && isStraight) {
    if (ranks.includes(12) && ranks.includes(11) && ranks.includes(10) && 
        ranks.includes(9) && ranks.includes(8)) {
      return { score: 9, type: 'Quinte Flush Royale' };
    }
    return { score: 8, type: 'Quinte Flush' };
  }
  
  // Carré 
  if (Object.values(valueCounts).some(count => count === 4)) {
    return { score: 7, type: 'Carré' };
  }
  
  // Full House 
  const hasThreeOfAKind = Object.values(valueCounts).some(count => count === 3);
  const hasPair = Object.values(valueCounts).some(count => count === 2);
  if (hasThreeOfAKind && hasPair) {
    return { score: 6, type: 'Full House' };
  }
  
  // Flush 
  if (isFlush) {
    return { score: 5, type: 'Couleur' };
  }
  
  // Straight 
  if (isStraight) {
    return { score: 4, type: 'Suite' };
  }
  
  // Three of a Kind 
  if (hasThreeOfAKind) {
    return { score: 3, type: 'Brelan' };
  }
  
  // Two Pair 
  const pairs = Object.values(valueCounts).filter(count => count === 2);
  if (pairs.length >= 2) {
    return { score: 2, type: 'Deux Paires' };
  }
  
  // One Pair 
  if (hasPair) {
    return { score: 1, type: 'Paire' };
  }
  
  // High Card 
  return { score: 0, type: 'Carte Haute' };
};

const compareHands = (hand1, hand2) => {
  const eval1 = evaluateHand(hand1);
  const eval2 = evaluateHand(hand2);
  
  if (eval1.score > eval2.score) return 1; 
  if (eval1.score < eval2.score) return -1; 
  
  return 0; // Égalité (à développer davantage)
};

const simulateHand = (playerCards, boardCards, remainingDeck) => {
  const cardsNeeded = 5 - boardCards.length;
  
  const simulatedBoard = [...boardCards];
  for (let i = 0; i < cardsNeeded; i++) {
    simulatedBoard.push(remainingDeck.pop());
  }
  
  const playerHand = [...playerCards, ...simulatedBoard];
  
  const opponent = {
    cards: [remainingDeck.pop(), remainingDeck.pop()],
    hand: []
  };
  opponent.hand = [...opponent.cards, ...simulatedBoard];
  
  const result = compareHands(playerHand, opponent.hand);
  
  return {
    win: result > 0,
    tie: result === 0,
    loss: result < 0,
    board: simulatedBoard
  };
};

const calculateProbabilities = (playerCards, boardCards, numSimulations = 10000) => {
  let wins = 0;
  let ties = 0;
  
  const usedCards = [...playerCards, ...boardCards];
  let deck = generateDeck().filter(card => !usedCards.includes(card));
  
  for (let i = 0; i < numSimulations; i++) {
    const shuffledDeck = shuffleDeck(deck);
    
    const result = simulateHand(playerCards, boardCards, shuffledDeck);
    
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

const calculateOuts = (playerCards, boardCards) => {

  return [];
};

module.exports = {
  generateDeck,
  shuffleDeck,
  evaluateHand,
  compareHands,
  calculateProbabilities,
  calculateOuts
}; 