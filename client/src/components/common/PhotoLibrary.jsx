import Image from 'next/image';
import React from 'react';
import { IoClose } from 'react-icons/io5';

function PhotoLibrary({ setImage, setShowPhotoLibrary }) {
  const images = [
    '/avatars/1.png',
    '/avatars/2.png',
    '/avatars/3.png',
    '/avatars/4.png',
    '/avatars/5.png',
    '/avatars/6.png',
    '/avatars/7.png',
    '/avatars/8.png',
    '/avatars/9.png',
  ];
  return (
    <div className='fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex justify-center items-center'>
      <div className='gap-6 p-4 bg-gray-900 rounded-lg h-max w-max'>
        <div
          className='flex items-end justify-end pt-2 pe-2'
          onClick={() => setShowPhotoLibrary(false)}
        >
          <IoClose className='w-10 h-10 cursor-pointer' />
        </div>
        <div className='grid justify-center w-full grid-cols-3 gap-16 p-20 itemms-center'>
          {images.map((image, index) => (
            <div
              onClick={() => {
                setImage(images[index]);
                setShowPhotoLibrary(false);
              }}
            >
              <div className='relative w-24 h-24 cursor-pointer'>
                <Image src={image} alt='avatar' fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;
