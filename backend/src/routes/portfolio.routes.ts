import { Router } from 'express';
import Portfolio from '../models/Portfolio';

const router = Router();

// Get portfolio overview
router.get('/', async (req, res) => {
  try {
    // For demo purposes, we'll return the first portfolio
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      // Create dummy data if no portfolio exists
      const dummyPortfolio = new Portfolio({
        userId: 'demo-user',
        totalValue: 100000,
        cashBalance: 25000,
        positions: [
          {
            symbol: 'AAPL',
            quantity: 100,
            averagePrice: 150,
            currentPrice: 175,
          },
          {
            symbol: 'GOOGL',
            quantity: 50,
            averagePrice: 2500,
            currentPrice: 2700,
          },
        ],
        performance: {
          dailyPnL: 1500,
          totalPnL: 15000,
          roi: 15,
          cagr: 12,
          maxDrawdown: 10,
          returns: Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return {
              date: date.toISOString().split('T')[0],
              value: 100000 + Math.random() * 20000 - 10000,
              benchmark: 100000 + Math.random() * 15000 - 7500
            };
          })
        },
      });
      await dummyPortfolio.save();
      return res.json(dummyPortfolio);
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
});

// Update portfolio
router.put('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: 'demo-user' },
      req.body,
      { new: true }
    );
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error updating portfolio' });
  }
});

// Get portfolio performance
router.get('/performance', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio.performance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio performance' });
  }
});

export const portfolioRoutes = router;
