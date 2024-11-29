import BasicPie from './BasicPie'
import ExpenseBarChart from './ExpenseBarChart';
import FormDialog from './FormDialog';
import Header from './Header';
import { TotalDatas } from './TotalDatas';
import TransactionList from './TransactionList';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useState } from 'react';
const ExpenseTracker = () => {
  const[page,setPage]=useState(false);
  return (
    <div className='bg-[#ffffff]'>
      <div className='min-header zindex'>
        <Header />
      </div>
      <div className={page===false?'flex min-screen':'hidden'} >
        <div className='h-[40vh] w-[50%] min-screen-main'>
          <TotalDatas />
        </div>
        <div className=' flex flex-col items-end p-2 text-[#000000c7] w-[50%] h-[82vh] min-screen-list'>
          <TransactionList />
        </div>
      </div>
      <div className={page===true?'h-[86vh] flex flex-col justify-evenly p-4 ':'hidden'}>
        <h3 className='text-center'>DATA VISUALIZATION</h3>
        <BasicPie />
       <ExpenseBarChart />
      </div>
      <div className='w-full bg-[#ced4da] flex items-center justify-around min-header'>
          <HomeRoundedIcon fontSize="medium" onClick={()=>setPage(false)} />
          <FormDialog  />
          <LeaderboardRoundedIcon fontSize="medium" onClick={()=>setPage(true)} />
      </div>
    </div>
  )
}
export default ExpenseTracker;