import incomeimg from '../../asset/imagesdown-removebg-green.png';
import expenseimg from '../../asset/imagesdown-removebg-red.png';
import SortIcon from '@mui/icons-material/Sort';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { isToday, isThisMonth, isThisYear } from 'date-fns';
import { useGetTransactions } from '../../hooks/useGetTransactions';
const TransactionList = () => {
    const { transactions } = useGetTransactions();
    const [sortOption, setSortOption] = useState('all');
    const deleteuser = async (id) => {
        const transactionDocRef = doc(db, "transaction", id);
        await deleteDoc(transactionDocRef);
      }
      const filterTransactions = (transactions) => {
        return transactions.filter((transaction) => {
    
          switch (sortOption) {
            case 'expense':
              return  transaction.transactionType === 'expense';
            case 'income':
              return  transaction.transactionType === 'income';
            default:
              return true; 
          }
        });
      };
    
      const filteredTransactions = filterTransactions(transactions);
  return (
    <>
       <div className='flex items-center justify-between w-[99%] min-font'>
          <h2 className='mt-2 p-1 min-font'>TRANSACTIONS</h2>
          <select
            id="filter"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className='w-[50px] rounded-sm mt-3 bg-[#ffffff] '
          >
            <option value="all">Sort</option>
            <option value="all">All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <ul className='flex flex-col items-start list-none pb-5 overflow-y-scroll gap- w-[99%] h-[80vh] scrollbar-thumb min-screen-list '>
          {filteredTransactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id, createdAt } = transaction;
            const formatTimestamp = (timestamp) => {
              if (!timestamp) return "";
              const date = timestamp.toDate();
              return date.toLocaleString();
            };
            return (
              <li className=' shadow-md flex items-center p-[15px] w-[98%] bg-[#ffffff] justify-between borders min-font'>
                <div className='flex gap-2 items-center'>
                  {transactionType === 'expense' ? (<img className='w-8 h-8 rounded-full' src={expenseimg} alt="" />) : (<img className='w-8 h-8 rounded-full' src={incomeimg} alt="" />)}
                  <div className='flex flex-col'>
                    <h3 className='min-font' >{description}</h3>
                    <p className='font-mono text-[12px] '>{formatTimestamp(createdAt)}</p>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-2t'>
                  {transactionType === 'income' ? (<h5 className='text-green-600 min-font'>₹ {transactionAmount.toLocaleString()}</h5>) : (<h5 className='text-red-600 min-font'>₹ {transactionAmount.toLocaleString()}</h5>)}
                  <button className='p-1 rounded-md border-0 text-[#2c2c2c] bg-[#e9ecef] flex items-center justify-center
                  ' onClick={() => deleteuser(id)} > 
                  <DeleteIcon fontSize='medium' />
                   </button>
                </div>
              </li>
            )
          })}
        </ul>
      
    </>
  )
}

export default TransactionList;
