import express from 'express';
import Strategy, { IStrategy } from '../models/Strategy';

const router = express.Router();

// Generate dummy data for testing
function generateDummyData() {
  const strategies = [
    {
      name: 'Conservative Growth Strategy',
      description: 'A low-risk strategy focused on stable growth',
      type: 'Conservative',
      risk: 'Low' as const,
      performance: {
        returns: [
          {
            date: new Date(),
            value: 10550000, // ₹1.05 Cr
            benchmark: 10320000 // ₹1.03 Cr
          }
        ],
        statistics: {
          roi: 5.5,
          cagr: 4.2,
          sharpeRatio: 1.2,
          maxDrawdown: 2.1,
          winRate: 0.65,
          volatility: 0.08,
          alpha: 0.02,
          beta: 0.85
        },
        allocation: [
          {
            symbol: 'RELIANCE.NS',
            percentage: 25,
            sector: 'Energy'
          },
          {
            symbol: 'TCS.NS',
            percentage: 20,
            sector: 'Technology'
          },
          {
            symbol: 'HDFCBANK.NS',
            percentage: 20,
            sector: 'Finance'
          },
          {
            symbol: 'INFY.NS',
            percentage: 15,
            sector: 'Technology'
          },
          {
            symbol: 'BHARTIARTL.NS',
            percentage: 20,
            sector: 'Telecom'
          }
        ]
      },
      trades: [
        {
          date: new Date(),
          symbol: 'RELIANCE.NS',
          type: 'BUY' as const,
          quantity: 50,
          price: 2750.50,
          fees: 99.99,
          sector: 'Energy'
        },
        {
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          symbol: 'TCS.NS',
          type: 'BUY' as const,
          quantity: 25,
          price: 3800.75,
          fees: 99.99,
          sector: 'Technology'
        },
        {
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          symbol: 'HDFCBANK.NS',
          type: 'SELL' as const,
          quantity: 100,
          price: 1750.25,
          fees: 99.99,
          sector: 'Finance'
        }
      ],
      metrics: {
        totalValue: 10000000, // ₹1 Cr
        invested: 8000000,    // ₹80 L
        available: 2000000,   // ₹20 L
        dailyPnL: 150000,     // ₹1.5 L
        weeklyPnL: 500000,    // ₹5 L
        monthlyPnL: 1500000,  // ₹15 L
        yearlyPnL: 5000000    // ₹50 L
      },
      riskMetrics: {
        var: 200000,           // ₹2 L
        expectedShortfall: 300000, // ₹3 L
        stressTestResults: {
          marketCrash: -2500000,   // -₹25 L
          highVolatility: -1500000, // -₹15 L
          recession: -2000000      // -₹20 L
        }
      },
      lastUpdated: new Date()
    }
  ];
  
  return strategies;
};

// Get all strategies
router.get('/', async (req, res) => {
  try {
    let strategies = await Strategy.find();
    
    // If no strategies exist, create dummy data
    if (strategies.length === 0) {
      const dummyData = generateDummyData();
      strategies = await Strategy.create(dummyData);
    }
    
    res.json(strategies);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching strategies' });
  }
});

// Get a specific strategy
router.get('/:id', async (req, res) => {
  try {
    const strategy = await Strategy.findById(req.params.id);
    if (strategy) {
      res.json(strategy);
    } else {
      res.status(404).json({ message: 'Strategy not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching strategy' });
  }
});

// Compare strategies
router.get('/compare/:ids', async (req, res) => {
  try {
    const strategyIds = req.params.ids.split(',');
    const strategies = await Strategy.find({ _id: { $in: strategyIds } });
    res.json(strategies);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error comparing strategies' });
  }
});

export default router;
