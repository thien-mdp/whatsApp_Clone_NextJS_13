import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes';
import { firebaseAuth } from '@/utils/FirebaseConfig';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

function login() {
  const router = useRouter();

  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo?.id && !newUser) router.push('/');
  }, [userInfo, newUser]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoUrl: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        if (!data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: true,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: '',
            },
          });
          router.push('/onboarding');
        } else {
          const {
            id,
            name,
            mail,
            profilePicture: profileImage,
            status,
          } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              mail,
              profileImage,
              status,
            },
          });
          router.push('/');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-6 bg-panel-header-background'>
      <div className='flex items-center justify-center gap-2 text-white'>
        <Image src='/whatsapp.gif' alt='WhatsApp' height={300} width={300} />
        <span className='text-7xl '>WhatsApp</span>
      </div>
      <button
        className='flex items-center justify-center p-5 rounded-lg gap-7 bg-search-input-container-background'
        onClick={() => {
          handleLogin();
        }}
      >
        <FcGoogle className='text-4xl' />
        <span className='text-2xl text-white'>Login with Google</span>
      </button>
    </div>
  );
}

export default login;
