import { useGetTransactions } from '../../hooks/useGetTransactions';
export const TotalDatas = () => {
  const { transactionTotals } = useGetTransactions();
  const { balance, income, expense } = transactionTotals;
  return (
    <>
      <div className='flex flex-col items-center justify-center ml-2 w-[100%] mt-3 h-[80vh] total-data-min'>
        <div className=' shadow-md bg-[#ffffff] rounded-md w-[100%] h-[35vh] pl-2 flex flex-col items-center justify-center gap-3 total-data-balance'>
          <h3 className='white-text data-font'>BALANCE</h3>
          {balance >= 0 ? (<h1 className='text-[#03d457]'> ₹{balance.toLocaleString()}</h1>) : (<h1 className='text-red-600'> -₹{Math.abs(balance).toLocaleString()}</h1>)}
        </div>
        <div className='flex items-start flex-col mt-2 w-[100%] gap-3 justify-center total-data-exp'>
          <div className=' shadow-sm rounded-md  h-[20vh] w-[100%] bg-[#ffffff] flex flex-col items-center justify-center gap-3 min-screen-expense'>
            <h4 className='white-text data-font'>INCOME</h4>
            <h1 className='text-[#03d457] data-font-amt' >₹ {income.toLocaleString()}</h1>
          </div>
          <div className='shadow-sm rounded-md  h-[20vh] w-[100%] bg-[#ffffff] flex flex-col items-center justify-center gap-3 min-screen-expense'>
            <h4 className='white-text data-font'>EXPENSE</h4>
            <h1 className='text-red-600 data-font-amt'>₹ {expense.toLocaleString()}</h1>
          </div>
        </div>
      </div>
    </>
  )
}
