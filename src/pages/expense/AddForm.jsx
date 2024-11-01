import options from '../../Datas/Datas.json';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useState, useRef } from 'react';

const AddForm = () => {
    const inputRef = useRef(null);
    const [add, setadd] = useState(false);
const { addTransaction } = useAddTransaction();
const [description, setDescription] = useState("");
const [transactionAmount, setTransactionAmount] = useState();
    const [transactionType, setTransactionType] = useState("expense");
    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({ description, transactionAmount, transactionType });
        setDescription("");
        setTransactionAmount("");
        inputRef.current.focus();
        setadd(false);
      }
  return (
    <>
         <div className='flex items-center justify-center'>
          <form onSubmit={onSubmit} className={add === true ? 'block-l' : 'hidden'} >
            <input className='w-full h-[40px] border-0 outline-none bg-[#ffff] border-b-2 border-black text-[20px] text-black mb-8' ref={inputRef} type="text" placeholder='Description...' value={description} required onChange={(e) => setDescription(e.target.value)} />
            <input className='w-full h-[40px] border-0 outline-none bg-[#ffff] border-b-2 border-black text-[20px] text-black' type="number" placeholder='Amount...' value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)} />
            <select name="option" id="" onChange={(e) => { setDescription(e.target.value); }} className='block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 overflow-scroll '>
              {options.map((option)=>{
                return (
                  <option key={option.value} value={option.value} >{option.label}</option>
                )
              })}
            </select>
            <div className='flex items-center p-4 '>
              <input className='' type="radio" id='expense' value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
              <label className='pr-8 text-[20px] text-gray-800 pl-2' htmlFor="expense">Expense</label>
              <input type="radio" id='income' value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
              <label className='pr-8 text-[20px] text-gray-800 pl-2' htmlFor="income">Income</label>
            </div>
            <button className='p-3 rounded-md border-0 outline-none shadow-lg bg-black text-white ' type='submit'>Add transaction</button>
            <button onClick={() => { setadd(false) }} className=' w-9 h-9 absolute top-[20px] right-[20px] flex items-center border-0 justify-center rounded-full bg-white text-black text-[20px]'>✖️</button>
          </form>
        </div>
    <div>
        <button className=' text-black text-[50px] p-7 rounded-full h-4 w-4  flex items-center justify-center outline-none shadow-lg' onClick={() => { add === true ? setadd(false) : setadd(true) }}>+</button>
    </div>
    </>
  )
}

export default AddForm
