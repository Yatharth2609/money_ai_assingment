import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  userId: string;
  totalValue: number;
  cashBalance: number;
  positions: Array<{
    symbol: string;
    quantity: number;
    averagePrice: number;
    currentPrice: number;
  }>;
  performance: {
    dailyPnL: number;
    totalPnL: number;
    roi: number;
    cagr: number;
    maxDrawdown: number;
    returns: Array<{
      date: string;
      value: number;
      benchmark: number;
    }>;
  };
  lastUpdated: Date;
}

const PortfolioSchema: Schema = new Schema({
  userId: { type: String, required: true },
  totalValue: { type: Number, required: true },
  cashBalance: { type: Number, required: true },
  positions: [{
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    averagePrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true }
  }],
  performance: {
    dailyPnL: { type: Number, required: true },
    totalPnL: { type: Number, required: true },
    roi: { type: Number, required: true },
    cagr: { type: Number, required: true },
    maxDrawdown: { type: Number, required: true },
    returns: [{
      date: { type: String, required: true },
      value: { type: Number, required: true },
      benchmark: { type: Number, required: true }
    }]
  },
  lastUpdated: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
