import Avatar from '@/components/common/Avatar';
import Input from '@/components/common/Input';
import { useStateProvider } from '@/context/StateContext';
import { ONBOARD_USER_ROUTE } from '@/utils/ApiRoutes';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function onboarding() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('/default_avatar.png');

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push('/login');
    else if (!newUser && userInfo?.email) router.push('/');
  }, [newUser, userInfo, router]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.user.id,
              name,
              email,
              profileImage: image,
              status: about,
            },
          });
          router.push('/');
        }
      } catch (error) {}
    }
  };
  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-6 text-white bg-panel-header-background'>
      <div className='flex items-center justify-center gap-2 '>
        <Image src='/whatsapp.gif' alt='WhatsApp' height={300} width={300} />
        <span className='text-7xl '>WhatsApp</span>
      </div>
      <h2 className='text-2xl'>Create your profile</h2>
      <div className='flex gap-6 mt-6'>
        <div className='flex flex-col items-center justify-center gap-6 mt-5'>
          <Input name='Display Name' state={name} setState={setName} label />
          <Input name='About' state={about} setState={setAbout} label />
          <div className='flex items-center justify-center'>
            <button
              className='flex items-center justify-center p-5 rounded-lg gap-7 bg-search-input-container-background'
              onClick={onboardUserHandler}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type='xl' image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
