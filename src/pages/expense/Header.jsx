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
                <>
                <div className='flex items-center justify-between gap-4  bg-[#e9ecef] h-[70px]  p-2 text-black min-head-font min-header zindex'>
                    <div className=' text-[#000] font-light' >🪙<span className='font-extrabold text-[#000]' >EXPENSE</span> TRACKER</div>
                    <div className='flex items-center justify-center gap-2' onClick={() => { profile === false ? setprofile(true) : setprofile(false) }} >
                     {profile===true?(<CloseIcon fontSize='large' className='hover:cursor-pointer text-black' />):(<MenuIcon fontSize='large' className='hover:cursor-pointer text-black' />)}    
                    </div>
                    
                </div>
                <div className={profile === true ? 'drop-p' : 'hide'}>
                <h1>PROFILE
                </h1>
            <img src={profilePhoto} className='h-[100px] w-[100px] rounded-full shadow-xl'/>
                <h4 className='text-2xl text-black'>{name}</h4>
                <button className='p-4 border-black border-[0.1px] text-[#e9ecef] bg-black outline-none rounded-md shadow-lg pl-4 pr-4' onClick={SignOutuser}>SIGN OUT</button>
            </div>
            </>
            )}
        </>
    )
}

export default Header;
