import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchPortfolioData } from '../api/portfolio';

const Dashboard = () => {
  const { data: portfolioData, isLoading } = useQuery('portfolioData', fetchPortfolioData);

  console.log('Portfolio Data:', portfolioData);
  console.log('Returns Data:', portfolioData?.performance?.returns);

  const MetricCard = ({ title, value, trend }: { title: string; value: string; trend?: number }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          {trend && (
            <Typography
              variant="body2"
              color={trend >= 0 ? 'success.main' : 'error.main'}
              sx={{ mt: 1 }}
            >
              {trend >= 0 ? '+' : ''}{trend}%
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Portfolio Overview
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Total Value"
            value={`₹${((portfolioData?.totalValue ?? 0) / 10000000).toFixed(2)} Cr`}
            trend={2.5}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Daily P&L"
            value={`₹${Math.abs((portfolioData?.performance?.dailyPnL ?? 0) / 100000).toFixed(2)} L`}
            trend={(portfolioData?.performance?.dailyPnL ?? 0) >= 0 ? 1.2 : -1.2}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Total ROI"
            value={`${portfolioData?.performance?.roi?.toFixed(2) ?? '0.00'}%`}
            trend={15.7}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="CAGR"
            value={`${portfolioData?.performance?.cagr?.toFixed(2) ?? '0.00'}%`}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Portfolio Performance
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={portfolioData?.performance?.returns ?? []}
                    margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4caf50" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" opacity={0.1} />
                    <XAxis 
                      dataKey="date"
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getDate()}/${d.getMonth() + 1}`; // Indian date format
                      }}
                      stroke="#666"
                      tick={{ fill: '#666' }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
                      stroke="#666"
                      tick={{ fill: '#666' }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`₹${(value / 100000).toFixed(2)}L`, 'Value']}
                      labelFormatter={(label) => new Date(label).toLocaleDateString('en-IN')}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#2196f3"
                      fill="url(#colorValue)"
                      strokeWidth={2}
                      name="Portfolio"
                      dot={false}
                      activeDot={{ r: 4, strokeWidth: 1 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="benchmark"
                      stroke="#4caf50"
                      fill="url(#colorBenchmark)"
                      strokeWidth={2}
                      name="Benchmark"
                      dot={false}
                      activeDot={{ r: 4, strokeWidth: 1 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Asset Allocation
              </Typography>
              {/* Add Pie Chart for asset allocation */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Trades
              </Typography>
              {/* Add table for recent trades */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
