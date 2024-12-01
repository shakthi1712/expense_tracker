import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DownloadTransactions from './DownloadTransactions';
import {useMode} from '../../hooks/useMode';
const Header = () => {
    const { name, profilePhoto } = useGetUserInfo();
    const {mode,setMode}=useMode();
    const [profile, setprofile] = useState(false);
    const navigate = useNavigate();
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
    const handleMode=()=>{
        setMode(mode === 'light' ? 'dark' : 'light');
        setprofile(false);

    }
    return (
        <>
            {profilePhoto && (
                <>
                <div className='flex items-center justify-between gap-4 shadow-lg h-[70px]  p-2 min-head-font min-header zindex mode-set'>
                    <div className='font-light' >🪙<span className='font-extrabold' >EXPENSE</span> TRACKER</div>
                    <div className='flex items-center justify-center gap-2' onClick={() => { profile === false ? setprofile(true) : setprofile(false) }} >
                     {profile===true?(<CloseIcon fontSize='large' className='hover:cursor-pointer' />):(<MenuIcon fontSize='large' className='hover:cursor-pointer' />)}    
                    </div>
                    
                </div>
                <div className={profile === true ? 'drop-p p-2 mode-set' : 'hide'}>
                <div className='flex items-start gap-4 w-full'>
                <img src={profilePhoto} className='h-[70px] w-[70px] rounded-full'/>
                <h4 className='text-2xl'>{name}</h4>
                </div>
                <DownloadTransactions />
                <div className='flex w-full items-center justify-between'>
                <button className=' h-[40px] w-[48%] border-[0.1px] button-color outline-none rounded-full' onClick={SignOutuser}>SIGN OUT</button>
                <button
                className={`h-[40px] w-[48%] border-[0.1px] ${mode === 'dark' ? 'text-[#000000] bg-white' : 'text-[#ffffff] bg-black'} outline-none rounded-full`}
                onClick={() => handleMode()}
              >
                {mode === 'light' ? 'DARK MODE' : 'LIGHT MODE'}
              </button>
                </div>

            </div>
            </>
            )}
        </>
    )
}

export default Header;
