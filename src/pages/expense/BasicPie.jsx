import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts';
import { useGetTransactions } from '../../hooks/useGetTransactions';

export default function PieAnimation() {
  const { transactions, loading, error } = useGetTransactions(); // Fetch transactions

  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  // Handle loading or error states
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  // Group and aggregate expenses by description (case-insensitive)
  const aggregatedData = transactions
    ?.filter((transaction) => transaction.transactionType === 'expense') // Filter for expenses
    .reduce((acc, transaction) => {
      const description = (transaction.description || 'Unknown').toLowerCase(); // Standardize to lowercase
      const amount = Number(transaction.transactionAmount);
      const existing = acc.find((item) => item.label.toLowerCase() === description);
      if (existing) {
        existing.value += amount; // Aggregate by description
      } else {
        acc.push({ label: transaction.description, value: amount }); // Add new expense category
      }
      return acc;
    }, []);

  // Handle the number of items in the chart
  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };

  // Handle the radius of the chart
  const handleRadius = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setRadius(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
      <PieChart
        height={200}
        series={[
          {
            data: aggregatedData?.slice(0, itemNb) || [], 
            innerRadius: radius,
            arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 20,
          },
        ]}
      />   
    </Box>
  );
}
