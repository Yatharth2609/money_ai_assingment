import axios from 'axios';
import { mockPortfolioData } from '../mockData/portfolioData';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPortfolioData = async () => {
  // Using mock data instead of API call
  return mockPortfolioData;
};

export const fetchStrategyData = async (_strategyId: string) => {
  // For now, just fetch all strategies since we're using dummy data
  const response = await api.get('/strategy');
  return response.data[0]; // Return the first strategy
};

export const fetchMarketUpdates = async () => {
  // Simulated market updates data
  const updates = [
    {
      id: 1,
      title: 'Fed Announces Interest Rate Decision',
      description: 'The Federal Reserve maintains interest rates steady at 5.25-5.50% range, signaling potential cuts later in the year as inflation shows signs of cooling.',
      impact: 'positive',
      timestamp: new Date().setHours(new Date().getHours() - 2),
      category: 'Monetary Policy'
    },
    {
      id: 2,
      title: 'Tech Sector Rally',
      description: 'Major tech stocks surge on strong earnings reports and AI developments. NVIDIA reaches new all-time high.',
      impact: 'positive',
      timestamp: new Date().setHours(new Date().getHours() - 4),
      category: 'Market Trends'
    },
    {
      id: 3,
      title: 'Oil Prices Volatility',
      description: 'Crude oil prices experience volatility amid geopolitical tensions in the Middle East and concerns over global demand.',
      impact: 'negative',
      timestamp: new Date().setHours(new Date().getHours() - 6),
      category: 'Commodities'
    },
    {
      id: 4,
      title: 'European Markets Update',
      description: 'European stocks trade mixed as ECB signals continuation of tight monetary policy to combat inflation.',
      impact: 'neutral',
      timestamp: new Date().setHours(new Date().getHours() - 8),
      category: 'Global Markets'
    },
    {
      id: 5,
      title: 'Crypto Market Analysis',
      description: 'Bitcoin and major cryptocurrencies show strong momentum following spot ETF approvals and institutional adoption.',
      impact: 'positive',
      timestamp: new Date().setHours(new Date().getHours() - 10),
      category: 'Cryptocurrency'
    },
    {
      id: 6,
      title: 'Manufacturing PMI Data',
      description: 'Latest manufacturing PMI data indicates continued expansion in the sector, though at a slower pace than previous month.',
      impact: 'neutral',
      timestamp: new Date().setHours(new Date().getHours() - 12),
      category: 'Economic Indicators'
    },
    {
      id: 7,
      title: 'Retail Sector Earnings',
      description: 'Major retailers report mixed Q4 earnings, with online sales showing strength while brick-and-mortar faces challenges.',
      impact: 'negative',
      timestamp: new Date().setHours(new Date().getHours() - 14),
      category: 'Earnings'
    },
    {
      id: 8,
      title: 'AI Sector Development',
      description: 'New breakthroughs in artificial intelligence drive investment surge in tech companies focused on AI development.',
      impact: 'positive',
      timestamp: new Date().setHours(new Date().getHours() - 16),
      category: 'Technology'
    }
  ];

  return updates;
};

export const compareStrategies = async (strategyIds: string[]) => {
  const response = await api.post('/strategy/compare', { strategyIds });
  return response.data;
};
