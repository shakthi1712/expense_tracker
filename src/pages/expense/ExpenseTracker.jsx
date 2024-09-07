import { useState, useRef } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import incomeimg from '../../asset/arrow down.jpg';
import expenseimg from '../../asset/arrowup.jpg';
import deletes from '../../asset/delete.png';
const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState();
  const [add, setadd] = useState(false);
  const [transactionType, setTransactionType] = useState("expense");
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const inputRef = useRef(null);
  const { balance, income, expense } = transactionTotals;
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount("");
    inputRef.current.focus();
    setadd(false);
  }
  const SignOutuser = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");

    }
    catch (err) {
      console.log(err)
    }
  };
  const deleteuser = async (id) => {
    const transactionDocRef = doc(db, "transaction", id);
    await deleteDoc(transactionDocRef);
  }
  return (
    <div className='max-w-full sm:max-w-xs bg-white'>
      <div className='bg-white font-sans '>
        {profilePhoto && (
          <div className='flex items-center justify-between gap-4  bg-[#080808] h-[70px] shadow-lg p-2 text-white rounded-md' >
            <div className='flex items-center justify-center gap-2'>
              <img src={profilePhoto} alt="PROFILE" className='h-[40px] rounded-full shadow-xl' />
              <h3 className='shadow-lg' >{name}</h3>
            </div>
            <button className=' shadow-md p-2 rounded-full bg-[#ffffff] border-0 text-[#0b0b0b]  font-light outline-none text flex items-center justify-center ' onClick={SignOutuser}>SIGN OUT</button>
          </div>
        )}
        <div className='flex flex-col items-center'>
          <div className=' bg-slate-100 shadow-lg rounded-md w-[97%] flex items-center justify-center flex-col text-black h-[200px] mt-2 md-2  text-[25px]'>
            <p className='text-[50px]'>🏦</p>
            <h3 className=''>BALANCE</h3>
            {balance >= 0 ? (<h2 className='text-green-600' > ₹ {balance}</h2>) : (<h2 className='text-red-500'>-₹ {balance * -1}</h2>)}
          </div>
          <div className='flex items-start justify-center gap-2 mt-2 w-[97%]'>
            <div className=' shadow-lg rounded-md h-[125px] w-[50%] bg-green-400 flex flex-col items-center justify-center gap-2'>
              <h2>INCOME</h2>
              <h3>₹ {income}</h3>
            </div>
            <div className=' shadow-lg rounded-md h-[125px] w-[50%] bg-red-400 flex flex-col items-center justify-center gap-2'>
              <h2>EXPENSE</h2>
              <h3>₹ {expense}</h3>
            </div>
          </div>

        </div>
        <div className='flex items-center justify-center'>
          <form onSubmit={onSubmit} className={add === true ? 'block-l' : 'hidden'} >
            <input className='w-[300px] h-[40px] border-0 outline-none bg-[#ffff] border-b-2 border-black text-[30px] text-black placeholder-gray-700 mb-8' ref={inputRef} type="text" placeholder='Description' value={description} required onChange={(e) => setDescription(e.target.value)} />
            <input className='w-[300px] h-[40px] border-0 outline-none bg-[#ffff] border-b-2 border-black text-[30px] text-black placeholder-gray-700' type="number" placeholder='Amount' value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)} />
            <div className='flex items-center p-4 '>
              <input className='' type="radio" id='expense' value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
              <label className='pr-8 text-[20px] text-gray-800 pl-2' htmlFor="expense">Expense</label>
              <input type="radio" id='income' value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
              <label className='pr-8 text-[20px] text-gray-800 pl-2' htmlFor="income">Income</label>
            </div>
            <button className='p-3 rounded-full border-0 outline-none shadow-lg bg-black text-white ' type='submit'>Add transaction</button>
            <button onClick={()=>{setadd(false)}} className=' w-8 h-8 flex items-center justify-center rounded-full border-0 bg-black shadow-lg text-white text-[30px]'>x</button>
          </form>
        </div>
      </div>
      <div className='bg-white flex flex-col font-sans justify-center p-2 h-[54vh] '>
        <h2 className='mt-2 p-1'>Recent Transactions</h2>
        <ul className='flex flex-col p-2 items-start list-none pb-5 h-[525px] overflow-scroll gap-2'>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id, createdAt } = transaction;
            const formatTimestamp = (timestamp) => {
              if (!timestamp) return "";
              const date = timestamp.toDate();
              return date.toLocaleString();
            };

            return (
              <li className=' shadow-md rounded-md flex p-[20px] w-[98%] bg-slate-100 text-black justify-between'>
               <div className='flex gap-2 items-center'>
                {transactionType==='expense'?(<img className='w-8 h-8 rounded-full' src={expenseimg} alt="" />):(<img className='w-8 h-8 rounded-full' src={incomeimg} alt="" />)}
               <div className='flex flex-col'>
                  <h2>{description}</h2>
                  <p className='font-mono text-[12px] text-[#050000e2]'>{formatTimestamp(createdAt)}</p>
                </div>
               </div>
                <div className='flex items-center justify-center gap-2'>
                  {transactionType === 'income' ? (<h5 className='text-green-400'>₹ {transactionAmount}</h5>) : (<h5 className='text-red-400'>₹ {transactionAmount}</h5>)}
                  <button className='p-1 rounded-md border-0 shadow-xl' onClick={() => deleteuser(id)} ><img className='w-6 h-6 opacity-60 line-clamp-2' src={deletes} alt="" /></button>
                </div>
              </li>
            )
          })}
        </ul>  
        <button className=' bg-black text-white fixed text-[50px] p-8 rounded-full h-4 w-4  flex items-center justify-center bottom-3 border-0 outline-none shadow-lg left-[45%]' onClick={() => { add === true ? setadd(false) : setadd(true) }}>+</button>
      </div>

    </div>
  )
}

export default ExpenseTracker 