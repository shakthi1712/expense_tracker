import { useGetTransactions } from '../../hooks/useGetTransactions';
export const TotalDatas = () => {
    const { transactionTotals } = useGetTransactions();
    const { balance, income, expense } = transactionTotals;
  return (
    <>
        <div className='flex flex-col items-center'>
          <div className=' bg-[#030303] rounded-md w-[97%] flex items-center justify-center flex-col text-white h-[180px] mt-2 md-2  text-[25px] bor'>
             {balance >= 0 ? (<h1 className='text-[#16db65] ' > ₹{balance.toLocaleString()}</h1>) : (<h1 className='text-red-500'>-₹{Math.abs(balance).toLocaleString()}</h1>)}
             <h3 className='text-[#fefefeb4]'>Balance</h3>
          </div>
          <div className='flex items-start justify-center gap-2 mt-2 w-[97%]'>
            <div className=' bor rounded-md h-[100px] w-[50%] bg-[#000000] flex flex-col items-center justify-center gap-2 text-[#fefefeb4]'>
            <h1 className='text-[#16db65]' >₹ {income.toLocaleString()}</h1>
              <h3>Income</h3>
              
            </div>
            <div className='bor shadow-lg rounded-md h-[100px] w-[50%] bg-[#000000] flex flex-col items-center justify-center gap-2 text-[#fefefeb4]'>
              <h1 className='text-red-500'>₹ {expense.toLocaleString()}</h1>
              <h4>Expense</h4>
            </div>
          </div>
        </div>
    </>
  )
}
