import incomeimg from '../../asset/imagesdown-removebg-green.png';
import expenseimg from '../../asset/imagesdown-removebg-red.png';
import SortIcon from '@mui/icons-material/Sort';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
       <div className='flex items-center justify-between'>
          <h2 className='mt-2 p-1'>Recent Transactions</h2>
          <select
            id="filter"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className='w-[50px] rounded-sm mt-3 bg-black text-white'
          >
            <option value="all">Sort</option>
            <option value="all">All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <ul className='flex flex-col p-2 items-start list-none pb-5 h-[525px] overflow-scroll gap-3'>
          {filteredTransactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id, createdAt } = transaction;
            const formatTimestamp = (timestamp) => {
              if (!timestamp) return "";
              const date = timestamp.toDate();
              return date.toLocaleString();
            };
            return (
              <li className=' shadow-md  flex items-center p-[20px] w-[98%] bg-[#000000]  justify-between borders'>
                <div className='flex gap-2 items-center'>
                  {transactionType === 'expense' ? (<img className='w-8 h-8 rounded-full' src={expenseimg} alt="" />) : (<img className='w-8 h-8 rounded-full' src={incomeimg} alt="" />)}
                  <div className='flex flex-col'>
                    <h3>{description}</h3>
                    <p className='font-mono text-[12px]'>{formatTimestamp(createdAt)}</p>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  {transactionType === 'income' ? (<h5 className='text-green-400'>₹ {transactionAmount.toLocaleString()}</h5>) : (<h5 className='text-red-400'>₹ {transactionAmount.toLocaleString()}</h5>)}
                  <button className='p-1 rounded-md border-0 text-white bg-black flex items-center justify-center
                  ' onClick={() => deleteuser(id)} > 
                  <DeleteOutlineIcon fontSize='medium' />
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
