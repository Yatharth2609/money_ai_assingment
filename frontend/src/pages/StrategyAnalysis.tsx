import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
} from 'recharts';
import { fetchStrategyData } from '../api/portfolio';
import { format } from 'date-fns';

interface Trade {
  date: string;
  type: string;
  symbol: string;
  quantity: number;
  price: number;
  pnl?: number;
}

const StrategyAnalysis = () => {
  const theme = useTheme();
  const [selectedStrategy] = useState<string>('demo-strategy');
  const [dateRange, setDateRange] = useState<string>('1M');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: strategyData, isLoading } = useQuery(
    ['strategyData', selectedStrategy],
    () => fetchStrategyData(selectedStrategy)
  );

  const StatCard = ({ title, value, change, icon }: { title: string; value: string; change?: number; icon?: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          height: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            {icon}
          </Box>
          <Typography variant="h4" component="div" fontWeight="bold">
            {value}
          </Typography>
          {change !== undefined && (
            <Box display="flex" alignItems="center" mt={1}>
              {change >= 0 ? (
                <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', mr: 1 }} />
              )}
              <Typography
                variant="body2"
                color={change >= 0 ? 'success.main' : 'error.main'}
              >
                {change >= 0 ? '+' : ''}{change}%
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  const sortedTrades = strategyData?.trades?.sort((a: Trade, b: Trade) => {
    if (!a || !b) return 0;
    const aValue = sortBy === 'date' ? new Date(a.date).getTime() : a[sortBy as keyof Trade];
    const bValue = sortBy === 'date' ? new Date(b.date).getTime() : b[sortBy as keyof Trade];
    if (aValue === undefined || bValue === undefined) return 0;
    return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
  }) || [];

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          Strategy Performance
        </Typography>

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as string)}
                label="Date Range"
              >
                <MenuItem value="1W">1 Week</MenuItem>
                <MenuItem value="1M">1 Month</MenuItem>
                <MenuItem value="3M">3 Months</MenuItem>
                <MenuItem value="1Y">1 Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="pnl">P&L</MenuItem>
                <MenuItem value="quantity">Quantity</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <TextField
                label="Search Trades"
                variant="outlined"
                placeholder="Enter symbol or type..."
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total ROI"
              value={`${strategyData?.performance.statistics.roi.toFixed(2)}%`}
              change={strategyData?.performance.statistics.roi}
              icon={<TrendingUp color="primary" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="CAGR"
              value={`${strategyData?.performance.statistics.cagr.toFixed(2)}%`}
              change={strategyData?.performance.statistics.cagr}
              icon={<TrendingUp color="primary" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Max Drawdown"
              value={`${strategyData?.performance.statistics.maxDrawdown.toFixed(2)}%`}
              change={-strategyData?.performance.statistics.maxDrawdown}
              icon={<TrendingDown color="error" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Win Rate"
              value={`${(strategyData?.performance.statistics.winRate * 100).toFixed(2)}%`}
              change={(strategyData?.performance.statistics.winRate * 100) - 50}
              icon={<TrendingUp color="primary" />}
            />
          </Grid>
        </Grid>

        {/* Performance Chart */}
        <Card sx={{ mb: 4, p: 2, background: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h6" gutterBottom sx={{ pl: 2 }}>
            Performance Over Time
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer>
              <AreaChart data={strategyData?.performance.returns}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                />
                <YAxis 
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <RechartsTooltip 
                  formatter={(value: number) => [`₹${(value / 100000).toFixed(2)}L`, 'Value']}
                  labelFormatter={(label) => format(new Date(label), 'dd MMM, yyyy')}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Recent Trades */}
        <Card sx={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Trades
            </Typography>
            <TableContainer component={Paper} sx={{ background: 'transparent' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">P&L</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence>
                    {sortedTrades.map((trade: Trade, index: number) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <TableCell>{format(new Date(trade.date), 'dd MMM, yyyy')}</TableCell>
                        <TableCell>
                          <Chip
                            label={trade.type}
                            color={trade.type === 'BUY' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{trade.symbol}</TableCell>
                        <TableCell align="right">{trade.quantity}</TableCell>
                        <TableCell align="right">₹{(trade.price).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: trade.pnl && trade.pnl >= 0 ? 'success.main' : 'error.main',
                          }}
                        >
                          {trade.pnl ? `₹${(trade.pnl).toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : '-'}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default StrategyAnalysis;
