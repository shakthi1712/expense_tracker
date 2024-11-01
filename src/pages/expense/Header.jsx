import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
const Header = () => {
    const { name, profilePhoto } = useGetUserInfo();
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
    return (
        <>
            {profilePhoto && (
                <div className='flex items-center justify-between gap-4  bg-[#000000] h-[70px] shadow-2xl p-2 text-white'>
                    <div className='font-sans text-white font-light' >🪙<span className='font-extrabold text-white' >EXPENSE</span> TRACKER</div>
                    <div className='flex items-center justify-center gap-2' onClick={() => { profile === false ? setprofile(true) : setprofile(false) }} >
                     {profile===true?(<CloseIcon fontSize='large' className='hover:cursor-pointer' />):(<MenuIcon fontSize='large' className='hover:cursor-pointer' />)}    
                    </div>
                    <div className={profile === true ? 'drop-p' : 'hidden'}>
                    <img src={profilePhoto} className='h-[150px] w-[150px] rounded-full shadow-xl' />
                        <h4 className='text-2xl text-white'>{name}</h4>
                        <button className='p-4 border-black border-[0.1px] text-black  outline-none rounded-md shadow-sm pl-4 pr-4' onClick={SignOutuser}>SIGN OUT</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header;
// <span className='text-white text-[10px]'>▼</span>