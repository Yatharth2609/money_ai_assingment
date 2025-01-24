import { subDays, format } from 'date-fns';

// Function to generate realistic looking portfolio data
function generatePortfolioData() {
  const today = new Date();
  const startValue = 10000000; // Starting portfolio value of ₹1 Crore
  let currentValue = startValue;
  let benchmarkValue = startValue;

  // Generate 180 days (6 months) of data
  const returns = Array.from({ length: 180 }, (_, index) => {
    const date = subDays(today, 179 - index);
    
    // Create more realistic market movements
    // Using random walk with drift and volatility
    const dailyVolatility = 0.01; // 1% daily volatility
    const annualDrift = 0.15; // 15% expected annual return
    const dailyDrift = annualDrift / 252; // Convert to daily (252 trading days)
    
    // Generate correlated but slightly different movements for portfolio and benchmark
    const marketMove = (Math.random() - 0.5) * 2 * dailyVolatility;
    const portfolioMove = marketMove + (Math.random() - 0.5) * 0.005 + dailyDrift; // Additional specific movement
    const benchmarkMove = marketMove + (Math.random() - 0.5) * 0.003 + dailyDrift * 0.8; // Slightly lower drift
    
    // Update values
    currentValue = currentValue * (1 + portfolioMove);
    benchmarkValue = benchmarkValue * (1 + benchmarkMove);

    return {
      date: format(date, 'yyyy-MM-dd'),
      value: Math.round(currentValue * 100) / 100,
      benchmark: Math.round(benchmarkValue * 100) / 100
    };
  });

  // Calculate performance metrics
  const lastValue = returns[returns.length - 1].value;
  const startDate = new Date(returns[0].date);
  const endDate = new Date(returns[returns.length - 1].date);
  const yearFraction = (endDate.getTime() - startDate.getTime()) / (365 * 24 * 60 * 60 * 1000);
  
  const totalReturn = (lastValue - startValue) / startValue * 100;
  const cagr = (Math.pow(lastValue / startValue, 1 / yearFraction) - 1) * 100;

  // Calculate daily PnL
  const yesterdayValue = returns[returns.length - 2].value;
  const dailyPnL = lastValue - yesterdayValue;

  // Calculate max drawdown
  let maxDrawdown = 0;
  let peak = returns[0].value;
  returns.forEach(day => {
    if (day.value > peak) {
      peak = day.value;
    }
    const drawdown = (peak - day.value) / peak * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });

  return {
    totalValue: lastValue,
    cashBalance: lastValue * 0.15, // Assume 15% cash position
    positions: [
      {
        symbol: 'RELIANCE.NS',
        quantity: 100,
        averagePrice: 2500,
        currentPrice: 2750,
      },
      {
        symbol: 'TCS.NS',
        quantity: 50,
        averagePrice: 3500,
        currentPrice: 3800,
      },
      {
        symbol: 'HDFCBANK.NS',
        quantity: 150,
        averagePrice: 1600,
        currentPrice: 1750,
      },
      {
        symbol: 'INFY.NS',
        quantity: 200,
        averagePrice: 1400,
        currentPrice: 1550,
      }
    ],
    performance: {
      dailyPnL: Math.round(dailyPnL * 100) / 100,
      totalPnL: Math.round((lastValue - startValue) * 100) / 100,
      roi: Math.round(totalReturn * 100) / 100,
      cagr: Math.round(cagr * 100) / 100,
      maxDrawdown: Math.round(maxDrawdown * 100) / 100,
      returns: returns
    },
    lastUpdated: new Date().toISOString()
  };
}

export const mockPortfolioData = generatePortfolioData();
