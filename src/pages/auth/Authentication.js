import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import login from '../../asset/user.png';

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
    <div  className="flex justify-center items-center relative h-[100vh] bg-white">
      <div className='bg-gray-900 h-[60vh] w-[90%]  pt-10 pb-10 pl-20 pr-20 rounded-lg flex flex-col justify-center items-center gap-10 blur-0'>
        <h1 className='text-white'>WELCOME!</h1>
        <img src={login} alt="" className='w-[150px] align-middle justify-center bg-white rounded-full ' />
      <h1 className='text-center text-white'>Sign In</h1>
      <button className='font-bold p-2 rounded-full border-0 flex items-center justify-center bg-white-300 w-[150px] ' onClick={SigninWithGoogle}>  <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" className='h-6 align-middle'/>Google</button>
      </div>
    </div>
  );

}

export default Authentication;