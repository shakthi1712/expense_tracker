import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import login from '../../asset/user.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Authentication() {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const SigninWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authinfo = {
      userId: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authinfo));
    navigate("/expense-page");
  };
  if (isAuth) {
    return <Navigate to="expense-page" />
  }
  return (
    <div  className="flex justify-center items-center relative h-[100vh] bg-[#fff]">
      <div className='bg-[#cecece] shadow-lg text-black h-[50vh] w-[90%]  pt-10 pb-10 pl-20 pr-20 rounded-lg flex flex-col justify-center items-center gap-7 blur-0'>
        <h1 className=''>WELCOME!</h1>
        < AccountCircleIcon sx={{ fontSize: 150 }}/>
      <h1 className='text-center'>Sign In</h1>
      <button className='font-bold p-2 rounded-md bg-[#f9fdff] border-0 flex items-center justify-center w-[150px] h-[50px] shadow-lg ' onClick={SigninWithGoogle}>  <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" className='h-6 align-middle'/>Google</button>
      </div>
     
    </div>
  );

}

export default Authentication;