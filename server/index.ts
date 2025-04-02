import express from 'express';
import cors from 'cors';
import { calculateProbabilities } from './poker';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/calculate', async (req, res) => {
  try {
    const { playerCards, boardCards } = req.body;
    
    if (!playerCards || !Array.isArray(playerCards) || playerCards.length === 0) {
      return res.status(400).json({ message: 'At least one player card is required' });
    }

    const results = await calculateProbabilities(playerCards, boardCards || []);
    res.json(results);
  } catch (error) {
    console.error('Error calculating probabilities:', error);
    res.status(500).json({ message: 'Error calculating probabilities' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 