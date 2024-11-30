import { useGetTransactions } from '../../hooks/useGetTransactions';
export const TotalDatas = () => {
  const { transactionTotals } = useGetTransactions();
  const { balance, income, expense } = transactionTotals;
  return (
    <>
      <div className='flex flex-col items-center justify-center ml-2 w-[100%] mt-3 h-[80vh] total-data-min'>
        <div className=' shadow-md mode-set-element rounded-md w-[100%] h-[35vh] pl-2 flex flex-col items-center justify-center gap-3 total-data-balance'>
          <h3 className='data-font'>BALANCE</h3>
          {balance >= 0 ? (<h1> ₹ {balance.toLocaleString()}</h1>) : (<h1> -₹ {Math.abs(balance).toLocaleString()}</h1>)}
        </div>
        <div className='flex items-start flex-col mt-2 w-[100%] gap-3 justify-center total-data-exp '>
          <div className=' shadow-md rounded-md  h-[20vh] w-[100%] bg-[#01ff802b] flex flex-col items-center justify-center gap-3 min-screen-expense'>
            <h4 className=' text-[#03f373] data-font'>INCOME</h4>
            <h1 className='text-[#03f373] data-font-amt' >₹ {income.toLocaleString()}</h1>
          </div>
          <div className='shadow-md rounded-md  h-[20vh] w-[100%] bg-[#ff293b2c] flex flex-col items-center justify-center gap-3 min-screen-expense'>
            <h4 className='text-[#f61515] data-font'>EXPENSE</h4>
            <h1 className='text-[#f61515] data-font-amt'>₹ {expense.toLocaleString()}</h1>
          </div>
        </div>
      </div>
    </>
  )
}
