import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Remove as NeutralIcon,
} from '@mui/icons-material';
import { fetchMarketUpdates } from '../api/portfolio';

const MarketUpdates = () => {
  const { data: updates, isLoading } = useQuery('marketUpdates', fetchMarketUpdates);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'default';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUpIcon />;
      case 'negative':
        return <TrendingDownIcon />;
      default:
        return <NeutralIcon />;
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Market Updates
      </Typography>

      <Grid container spacing={3}>
        {updates?.map((update) => (
          <Grid item xs={12} key={update.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {getImpactIcon(update.impact)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {update.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {new Date(update.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={update.impact}
                      color={getImpactColor(update.impact)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body1">{update.description}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MarketUpdates;
