import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import ContextMenu from './ContextMenu';
import PhotoPicker from './PhotoPicker';
import PhotoLibrary from './PhotoLibrary';
import CapturePhoto from './CapturePhoto';

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContentMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContentMenuCordinates({ x: e.pageX, y: e.pageY });
  };
  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById('photo-picker');
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 300);
      };
    }
  }, [grabPhoto]);
  const contextMenuOptions = [
    {
      name: 'Take Photo',
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: 'Choose From Library',
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: 'Upload Photo',
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: 'Remove Photo',
      callback: () => {
        setImage('/default_avatar.png');
      },
    },
  ];
  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement('img');
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute('data-src', event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage(data.src);
    }, 100);
  };
  return (
    <>
      <div className='flex items-center justify-center'>
        {type === 'sm' && (
          <div className='relative w-10 h-10'>
            <Image src={image} alt='avatar' className='rounded-full' fill />
          </div>
        )}
        {type === 'lg' && (
          <div className='relative w-14 h-14'>
            <Image src={image} alt='avatar' className='rounded-full' fill />
          </div>
        )}
        {type === 'xl' && (
          <div
            className='relative z-0 cursor-pointer'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 z-10 flex items-center rounded-full justify-center flex-col text-center gap-2 
              ${hover ? 'visible' : 'hidden'}`}
              id='context-onpener'
              onClick={(e) => showContextMenu(e)}
            >
              <FaCamera
                className='text-2xl'
                id='context-onpener'
                onClick={(e) => showContextMenu(e)}
              />
              <span onClick={(e) => showContextMenu(e)} id='context-onpener'>
                Change Profile Photo
              </span>
            </div>
            <div className='flex items-center justify-center w-60 h-60'>
              <Image src={image} alt='avatar' className='rounded-full' fill />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          cordinates={contextMenuCordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary
          setImage={setImage}
          setShowPhotoLibrary={setShowPhotoLibrary}
        />
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
      {showCapturePhoto && (
        <CapturePhoto
          setImage={setImage}
          setShowCapturePhoto={setShowCapturePhoto}
        />
      )}
    </>
  );
}

export default Avatar;
