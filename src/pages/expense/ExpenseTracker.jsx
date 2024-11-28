import AddForm from './AddForm';
import FormDialog from './FormDialog';
import Header from './Header';
import { TotalDatas } from './TotalDatas';
import TransactionList from './TransactionList';

const ExpenseTracker = () => {
  return (
    <div className='bg-[#ffffff]'>
      <div className='min-header zindex'>
        <Header />
      </div>
      <div className='flex min-screen'>
        <div className='h-[40vh] w-[50%] min-screen-main'>
          <TotalDatas />
        </div>
        <div className=' flex flex-col items-end p-2 text-[#000000c7] w-[50%] h-[82vh] min-screen-list'>
          <TransactionList />
        </div>
      </div>
      <div className='w-full bg-[#e9ecef] flex items-start justify-center min-header'>
          <FormDialog />
      </div>
    </div>
  )
}
export default ExpenseTracker;