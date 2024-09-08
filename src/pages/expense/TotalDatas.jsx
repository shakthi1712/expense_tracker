import { useGetTransactions } from '../../hooks/useGetTransactions';
export const TotalDatas = () => {
    const { transactionTotals } = useGetTransactions();
    const { balance, income, expense } = transactionTotals;
  return (
    <>
        <div className='flex flex-col items-center'>
          <div className=' bg-[#f8f9fa] shadow-lg rounded-md w-[97%] flex items-center justify-center flex-col text-black h-[180px] mt-2 md-2  text-[25px]'>
            <p className='text-[50px]'>🏦</p>
            <h3 className='text-[#5a5959]'>BALANCE</h3>
            {balance >= 0 ? (<h3 className='text-[#16db65] ' > ₹ {balance}</h3>) : (<h3 className='text-red-500'>-₹ {balance * -1}</h3>)}
          </div>
          <div className='flex items-start justify-center gap-2 mt-2 w-[97%]'>
            <div className=' shadow-lg rounded-md h-[100px] w-[50%] bg-[#80ed99] flex flex-col items-center justify-center gap-2'>
              <h2 className='text-black'>INCOME</h2>
              <h3 className='text-black'>₹ {income}</h3>
            </div>
            <div className=' shadow-lg rounded-md h-[100px] w-[50%] bg-[#ef233c] flex flex-col items-center justify-center gap-2'>
              <h2 className='text-black'>EXPENSE</h2>
              <h3 className='text-black'>₹ {expense}</h3>
            </div>
          </div>
        </div>
    </>
  )
}
