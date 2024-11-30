import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useGetTransactions } from '../../hooks/useGetTransactions'; // Fetch transactions hook

const chartSetting = {
  yAxis: [
    {
      label: 'Expense Amount',
    },
  ],
  series: [{ dataKey: 'expenseAmount', label: 'Monthly Expenses' }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function ExpenseBarChart() {
  const { transactions } = useGetTransactions(); // Fetch transactions

  // Create an array for all months (January to December)
  const allMonths = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
  ];

  // Aggregate expenses by month
  const aggregatedData = allMonths.map((month) => {
    // Get the total amount for the current month (month in 'MM' format)
    const totalAmount = transactions?.reduce((acc, transaction) => {
      if (
        transaction.transactionType === 'expense' &&
        transaction.createdAt && // Ensure createdAt exists
        transaction.createdAt.seconds
      ) {
        const date = new Date(transaction.createdAt.seconds * 1000); // Convert timestamp to date
        const transactionMonth = (`0${date.getMonth() + 1}`).slice(-2); // Get month in 'MM' format
        if (transactionMonth === month) {
          acc += Number(transaction.transactionAmount); // Add the transaction amount for this month
        }
      }
      return acc;
    }, 0);

    return {
      month: `${month}`,
      expenseAmount: totalAmount || 0,
    };
  });

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={aggregatedData}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]} 
        {...chartSetting}
      />
    </div>
  );
}
