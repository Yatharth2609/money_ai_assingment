import { Router } from 'express';

const router = Router();

// Get market updates
router.get('/updates', async (req, res) => {
  try {
    // Simulated market updates
    const updates = [
      {
        id: 1,
        title: 'Market Rally Continues',
        description: 'Major indices reach new highs as tech stocks lead the way',
        timestamp: new Date(),
        impact: 'positive',
      },
      {
        id: 2,
        title: 'Fed Announces Rate Decision',
        description: 'Federal Reserve maintains current interest rates',
        timestamp: new Date(Date.now() - 3600000),
        impact: 'neutral',
      },
      {
        id: 3,
        title: 'Earnings Season Update',
        description: '80% of S&P 500 companies beat expectations',
        timestamp: new Date(Date.now() - 7200000),
        impact: 'positive',
      },
    ];
    
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching market updates' });
  }
});

export const marketRoutes = router;
