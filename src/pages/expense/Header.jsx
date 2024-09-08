import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
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
                <div className='flex items-center justify-between gap-4  bg-[#080808] h-[70px] shadow-2xl p-2 text-white'>
                    <div className='font-sans text-red-500 font-light' >🪙<span className='font-extrabold text-green-500' >EXPENSE</span> TRACKER</div>
                    <div className='flex items-center justify-center gap-2' onClick={() => { profile === false ? setprofile(true) : setprofile(false) }} >
                        <img src={profilePhoto} alt="PROFILE" className='h-[40px] rounded-full shadow-xl' /><span className='text-white text-[10px]'>▼</span>
                    </div>
                    <div className={profile === true ? 'drop-p' : 'hidden'}>
                        <h4 >{name}</h4>
                        <span className='w-full h-[0.7px] bg-[#000000ae] p-0'></span>
                        <button className='p-1 border-0 bg-black text-white outline-none rounded-md shadow-md pl-3 pr-3' onClick={SignOutuser}>📤 SIGN OUT</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header;