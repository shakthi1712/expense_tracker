import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useGetTransactions } from '../../hooks/useGetTransactions';

const DownloadTransactions = () => {
  const { transactions } = useGetTransactions(); // Fetch transactions

  const handleDownload = () => {
    if (!transactions || transactions.length === 0) {
      alert('No transactions available to download.');
      return;
    }

    // Group transactions by year and month
    const groupedData = transactions.reduce((acc, transaction) => {
      const dateTime = transaction.createdAt ? new Date(transaction.createdAt.seconds * 1000) : null;
      if (!dateTime) return acc;

      const yearMonth = `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}`; // Format: YYYY-MM
      const amount = Number(transaction.transactionAmount);
      const type = transaction.transactionType;

      if (!acc[yearMonth]) {
        acc[yearMonth] = { data: [], totalIncome: 0, totalExpense: 0 };
      }

      acc[yearMonth].data.push({
        Description: transaction.description || 'Unknown',
        Date: dateTime.toLocaleDateString(),
        Time: dateTime.toLocaleTimeString(),
        Amount: amount,
      });

      // Add to total income or expense
      if (type === 'expense') {
        acc[yearMonth].totalExpense += amount;
      } else if (type === 'income') {
        acc[yearMonth].totalIncome += amount;
      }

      return acc;
    }, {});

    // Prepare the data to be downloaded
    const formattedData = [];
    Object.keys(groupedData).forEach((month) => {
      const { data, totalIncome, totalExpense } = groupedData[month];

      // Add month data
      formattedData.push({ Description: `Month: ${month}`, Date: '', Time: '', Amount: '' }); // Header row for month

      // Add individual transaction data
      data.forEach((transaction) => {
        formattedData.push(transaction);
      });

      // Add total income and expense for the month
      formattedData.push({
        Description: `Total Income for ${month}`,
        Date: '',
        Time: '',
        Amount: totalIncome,
      });

      formattedData.push({
        Description: `Total Expense for ${month}`,
        Date: '',
        Time: '',
        Amount: totalExpense,
      });

      // Add a separator for each month
      formattedData.push({ Description: '', Date: '', Time: '', Amount: '' });
    });

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

    // Write the workbook and trigger the download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Transactions.xlsx');
  };

  return (
<button
  onClick={handleDownload}
  className="px-4 py-2 border-none rounded-full cursor-pointer mt-5 w-full h-10 button-color"
>
  DOWNLOAD TRANSACTIONS
</button>

  );
};

export default DownloadTransactions;
