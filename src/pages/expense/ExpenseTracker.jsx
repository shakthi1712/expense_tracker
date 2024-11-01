import AddForm from './AddForm';
import Header from './Header';
import { TotalDatas } from './TotalDatas';
import TransactionList from './TransactionList';
const ExpenseTracker = () => {
  return (
    <div className='bg-white'>
      <div className='bg-black font-sans h-[40vh]'>
        <Header />
        <TotalDatas />
      </div>
      <div className='bg-black flex flex-col font-sans justify-center p-2 h-[53vh] text-[#fefefec7]'>
        <TransactionList />
      </div>
      <div className='bg-black flex items-center justify-center h-[7vh] w-[100%]'>
      <AddForm />
      </div>
    </div>
  )
}
export default ExpenseTracker;