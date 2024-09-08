import incomeimg from '../../asset/imagesdown-removebg-green.png';
import expenseimg from '../../asset/imagesdown-removebg-red.png';
import deletes from '../../asset/delete.png';
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
          const createdAt = transaction.createdAt?.toDate();
          if (!createdAt) return false;
    
          switch (sortOption) {
            case 'today':
              return isToday(createdAt);
            case 'month':
              return isThisMonth(createdAt);
            case 'year':
              return isThisYear(createdAt);
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
            className='w-[70px] shadow-md '
          >
            <option value="all">Sort By</option>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <ul className='flex flex-col p-2 items-start list-none pb-5 h-[525px] overflow-scroll gap-1'>
          {filteredTransactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id, createdAt } = transaction;
            const formatTimestamp = (timestamp) => {
              if (!timestamp) return "";
              const date = timestamp.toDate();
              return date.toLocaleString();
            };
            return (
              <li className=' shadow-md rounded-md flex p-[20px] w-[98%] bg-[#f8f9fa] text-black justify-between'>
                <div className='flex gap-2 items-center'>
                  {transactionType === 'expense' ? (<img className='w-8 h-8 rounded-full' src={expenseimg} alt="" />) : (<img className='w-8 h-8 rounded-full' src={incomeimg} alt="" />)}
                  <div className='flex flex-col'>
                    <h3>{description}</h3>
                    <p className='font-mono text-[12px] text-[#050000e2]'>{formatTimestamp(createdAt)}</p>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  {transactionType === 'income' ? (<h5 className='text-green-400'>₹ {transactionAmount}</h5>) : (<h5 className='text-red-400'>₹ {transactionAmount}</h5>)}
                  <button className='p-1 rounded-md border-0 bg-slate-100' onClick={() => deleteuser(id)} ><img className='w-6 h-6 opacity-70 line-clamp-2 shadow-lg ' src={deletes} alt="" /></button>
                </div>
              </li>
            )
          })}
        </ul>
      
    </>
  )
}

export default TransactionList;
