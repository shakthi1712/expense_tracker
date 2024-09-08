import AddForm from './AddForm';
import Header from './Header';
import { TotalDatas } from './TotalDatas';
import TransactionList from './TransactionList';
const ExpenseTracker = () => {
  return (
    <div className='bg-white'>
      <div className='bg-white font-sans'>
        <Header />
        <TotalDatas />
      </div>
      <div className='bg-white flex flex-col font-sans justify-center p-2 h-[54vh]'>
        <TransactionList />
      </div>
      <AddForm />
    </div>
  )
}
export default ExpenseTracker;