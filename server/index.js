const express = require('express');
const cors = require('cors');
const pokerUtils = require('./pokerUtils');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route principale pour calculer les probabilités
app.post('/api/calculate', (req, res) => {
  const { playerCards, boardCards } = req.body;
  
  try {
    // Validation des entrées
    if (!playerCards || !boardCards) {
      return res.status(400).json({ error: 'Cartes manquantes' });
    }
    
    // Vérifier le format des cartes (simplification pour l'exemple)
    if (playerCards.length < 1 || playerCards.length > 2) {
      return res.status(400).json({ error: 'Le joueur doit avoir 1 ou 2 cartes' });
    }
    
    if (boardCards.length < 0 || boardCards.length > 5) {
      return res.status(400).json({ error: 'Le board doit avoir entre 0 et 5 cartes' });
    }
    
    // Calculer les probabilités avec l'algorithme Monte Carlo
    const probabilities = pokerUtils.calculateProbabilities(playerCards, boardCards);
    
    // Calculer les outs (cartes qui améliorent la main)
    const outs = pokerUtils.calculateOuts(playerCards, boardCards);
    
    // Déterminer la main actuelle
    let currentHand = null;
    if (boardCards.length >= 3) {
      const evaluation = pokerUtils.evaluateHand([...playerCards, ...boardCards]);
      currentHand = evaluation.type;
    }
    
    // Préparer la réponse
    const response = {
      winProbability: probabilities.winProbability,
      tieProbability: probabilities.tieProbability,
      lossProbability: probabilities.lossProbability,
      currentHand,
      outs
    };
    
    res.json(response);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors du calcul des probabilités' });
  }
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionnelle' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 