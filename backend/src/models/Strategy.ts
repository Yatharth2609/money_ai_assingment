import mongoose, { Schema, Document } from 'mongoose';

export interface IStrategy extends Document {
  name: string;
  description: string;
  type: string;
  risk: 'Low' | 'Medium' | 'High';
  performance: {
    returns: Array<{
      date: Date;
      value: number;
      benchmark: number;
    }>;
    statistics: {
      roi: number;
      cagr: number;
      sharpeRatio: number;
      maxDrawdown: number;
      winRate: number;
      volatility: number;
      alpha: number;
      beta: number;
    };
    allocation: Array<{
      symbol: string;
      percentage: number;
      sector: string;
    }>;
  };
  trades: Array<{
    date: Date;
    type: 'BUY' | 'SELL';
    symbol: string;
    quantity: number;
    price: number;
    pnl?: number;
    fees: number;
    sector: string;
  }>;
  metrics: {
    totalValue: number;
    invested: number;
    available: number;
    dailyPnL: number;
    weeklyPnL: number;
    monthlyPnL: number;
    yearlyPnL: number;
  };
  riskMetrics: {
    var: number; // Value at Risk
    expectedShortfall: number;
    stressTestResults: {
      marketCrash: number;
      highVolatility: number;
      recession: number;
    };
  };
  lastUpdated: Date;
}

const StrategySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  risk: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  performance: {
    returns: [{
      date: { type: Date, required: true },
      value: { type: Number, required: true },
      benchmark: { type: Number, required: true },
    }],
    statistics: {
      roi: { type: Number, required: true },
      cagr: { type: Number, required: true },
      sharpeRatio: { type: Number, required: true },
      maxDrawdown: { type: Number, required: true },
      winRate: { type: Number, required: true },
      volatility: { type: Number, required: true },
      alpha: { type: Number, required: true },
      beta: { type: Number, required: true },
    },
    allocation: [{
      symbol: { type: String, required: true },
      percentage: { type: Number, required: true },
      sector: { type: String, required: true },
    }],
  },
  trades: [{
    date: { type: Date, required: true },
    type: { type: String, enum: ['BUY', 'SELL'], required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    pnl: { type: Number },
    fees: { type: Number, required: true },
    sector: { type: String, required: true },
  }],
  metrics: {
    totalValue: { type: Number, required: true },
    invested: { type: Number, required: true },
    available: { type: Number, required: true },
    dailyPnL: { type: Number, required: true },
    weeklyPnL: { type: Number, required: true },
    monthlyPnL: { type: Number, required: true },
    yearlyPnL: { type: Number, required: true },
  },
  riskMetrics: {
    var: { type: Number, required: true },
    expectedShortfall: { type: Number, required: true },
    stressTestResults: {
      marketCrash: { type: Number, required: true },
      highVolatility: { type: Number, required: true },
      recession: { type: Number, required: true },
    },
  },
  lastUpdated: { type: Date, default: Date.now },
}, {
  timestamps: true
});

export default mongoose.model<IStrategy>('Strategy', StrategySchema);
