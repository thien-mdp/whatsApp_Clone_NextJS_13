import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

function CapturePhoto({ setImage, setShowCapturePhoto }) {
  const videoRef = useRef();

  useEffect(() => {
    let stream;
    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audiio: false,
      });
      videoRef.current.srcObject = stream;
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.getContext('2nd').drawImage(videoRef.current, 0, 0, 300, 150);
    setImage(canvas.toDataURL('image/jpeg'));
    setShowCapturePhoto(false);
  };

  return (
    <div className='absolute flex items-center justify-center w-2/6 gap-3 pt-2 bg-gray-900 rounded-lg h-4/6 top-1/4 left-1/3'>
      <div className='flex flex-col items-center justify-center w-full gap-4'>
        <div
          className='flex items-end justify-end w-full pt-2 pr-2'
          onClick={() => setShowCapturePhoto(false)}
        >
          <IoClose className='w-10 h-10 cursor-pointer' />
        </div>
        <div className='flex justify-center'>
          <video id='video' width='400' autoPlay ref={videoRef} />
        </div>
        <button
          className='w-16 h-16 p-2 mb-10 bg-white border-8 rounded-full cursor-pointer border-teal-light'
          onClick={capturePhoto}
        ></button>
      </div>
    </div>
  );
}

export default CapturePhoto;
