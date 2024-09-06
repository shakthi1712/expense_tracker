import { useState, useRef } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
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
      <div className='bg-white font-sans'>
        {profilePhoto && (
          <div className='flex items-center justify-between gap-4  bg-[#1ACF9A] h-[60px] p-2'>
            <div className='flex items-center justify-center gap-2'>
              <img src={profilePhoto} alt="PROFILE" className='h-[40px] rounded-full' />
              <h3 className='text-[#081930]' >{name}</h3>
            </div>
            <button className='p-2 rounded-full bg-[#081930] border-0 text-[#FDFEFF]  font-light outline-none ' onClick={SignOutuser}>SIGN OUT</button>
          </div>
        )}
        <div className='flex flex-col items-center'>
          <div className='w-[97%] bg-black flex items-center justify-center gap-2 flex-col text-white mt-2 h-[150px] p-3'>
            <h2>Your balance</h2>
            {balance >= 0 ? (<h3>${balance}</h3>) : (<h3>-${balance * -1}</h3>)}
          </div>
          <div className='flex items-start justify-center gap-2 mt-2 w-[97%]'>
            <div className='h-[125px] w-[50%] bg-green-400 flex flex-col items-center justify-center gap-2'>
              <h2>Income</h2>
              <h3>${income}</h3>
            </div>
            <div className='h-[125px] w-[50%] bg-red-400 flex flex-col items-center justify-center gap-2'>
              <h2>Expense</h2>
              <h3>${expense}</h3>
            </div>
          </div>

        </div>
        <div className='flex items-center justify-center'>
          <form onSubmit={onSubmit} className={add === true ? 'block-l' : 'hidden'} >
            <input className='w-[300px] h-[40px] border-0 outline-none bg-[#ff0000] border-b-2 border-black text-[30px] text-black placeholder-gray-700 mb-8' ref={inputRef} type="text" placeholder='Description' value={description} required onChange={(e) => setDescription(e.target.value)} />
            <input className='w-[300px] h-[40px] border-0 outline-none bg-[#ff0000] border-b-2 border-black text-[30px] text-black placeholder-gray-700' type="number" placeholder='Amount' value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)} />
            <div className='flex items-center p-4 '>
              <input type="radio" id='expense' value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
              <label className='pr-8 text-[20px] text-gray-800 pl-2' htmlFor="expense">Expense</label>
              <input type="radio" id='income' value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
              <label className='pr-8 text-[20px] text-gray-800 pl-2' htmlFor="income">Income</label>
            </div>
            <button className='p-3 rounded-full border-0 outline-none shadow-lg ' type='submit'>Add transaction</button>
          </form>
        </div>
      </div>
      <div className='bg-white flex flex-col font-sans justify-center p-2 '>
        <h2 className='mt-2'>Recent Transactions</h2>
        <ul className='flex flex-col p-2 items-start list-none pb-5 h-[525px] overflow-scroll gap-2'>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id, createdAt } = transaction;
            const formatTimestamp = (timestamp) => {
              if (!timestamp) return "";
              const date = timestamp.toDate();
              return date.toLocaleString();
            };

            return (
              <li className='flex p-[34px] w-[98%] bg-black text-white justify-between'>
                <div className='flex flex-col fl'>
                  <h2>{description}</h2>
                  {/* <p>{transactionType}</p> */}
                  <p className='font-mono text-[12px] text-[#ffffffe1]' >{formatTimestamp(createdAt)}</p>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  {transactionType === 'income' ? (<h5 className='text-green-400'>${transactionAmount}</h5>) : (<h5 className='text-red-400'>${transactionAmount}</h5>)}
                  <button className='p-1 rounded-md' onClick={() => deleteuser(id)} >Delete</button>
                </div>
              </li>
            )
          })}
        </ul>
        <button className='fixed p-7 rounded-full w-3 h-3 flex items-center justify-center bottom-5 border-0 outline-none shadow-lg' onClick={() => { add === true ? setadd(false) : setadd(true) }}>+</button>
      </div>
    </div>
  )
}

export default ExpenseTracker 