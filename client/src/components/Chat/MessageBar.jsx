import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE } from '@/utils/ApiRoutes';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { FaMicrophone } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { MdSend } from 'react-icons/md';
import PhotoPicker from '../common/PhotoPicker';
import dynamic from 'next/dynamic';

const CaptureAudio = dynamic(() => import('../common/CaptureAudio'), {
  ssr: false,
});

function MessageBar() {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id !== 'emoji-open') {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(e.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
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

  const photoPickerChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          from: userInfo.id,
          to: currentChatUser.id,
        },
      });
      if (res.status === 201) {
        socket.current.emit('send-msg', {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: res.data.message,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...res.data.message,
          },
          fromSelf: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji) => {
    setMessage((prev) => (prev += emoji.emoji));
  };

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
      socket.current.emit('send-msg', {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: {
          ...data.message,
        },
        fromSelf: true,
      });
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='relative flex items-center h-20 gap-6 px-4 bg-panel-header-background'>
      {!showAudioRecorder && (
        <>
          <div className='flex gap-6'>
            <BsEmojiSmile
              className='text-xl cursor-pointer text-panel-header-icon'
              title='Emoji'
              id='emoji-open'
              onClick={handleEmojiModal}
            />
            {showEmojiPicker && (
              <div
                className='absolute z-40 bottom-24 left-16'
                ref={emojiPickerRef}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} theme='dark' />
              </div>
            )}
            <ImAttachment
              className='text-xl cursor-pointer text-panel-header-icon'
              title='Attach File'
              onClick={() => setGrabPhoto(true)}
            />
          </div>
          <div className='flex items-center w-full h-10 rounded-lg'>
            <input
              type='text'
              placeholder='Type a message'
              className='w-full h-10 px-5 py-4 text-sm text-white rounded-lg bg-input-background focus:outline-none'
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              value={message}
            />
          </div>
          <div className='flex items-center justify-center w-10'>
            <button>
              {message.length ? (
                <MdSend
                  className='text-xl cursor-pointer text-panel-header-icon'
                  title='Send message'
                  onClick={(e) => {
                    sendMessage();
                  }}
                />
              ) : (
                <FaMicrophone
                  className='text-xl cursor-pointer text-panel-header-icon'
                  title='Record'
                  onClick={() => {
                    setShowAudioRecorder(true);
                  }}
                />
              )}
            </button>
          </div>
        </>
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
      {showAudioRecorder && <CaptureAudio hide={setShowAudioRecorder} />}
    </div>
  );
}

export default MessageBar;
