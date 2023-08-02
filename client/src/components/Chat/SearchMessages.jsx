import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { calculateTime } from '@/utils/CalculateTime';
import React, { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

function SearchMessages() {
  const [{ currentChatUser, messages }, dispatch] = useStateProvider();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedMessages, setSearchedMessages] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setSearchedMessages(
        messages.filter(
          (message) =>
            message.type === 'text' && message.message.includes(searchTerm),
        ),
      );
    } else {
      setSearchedMessages([]);
    }
  }, [searchTerm]);

  return (
    <div className='z-10 flex flex-col w-full max-h-screen border-conversation-border border-1 bg-conversation-panel-background'>
      <div className='flex items-center h-16 gap-10 px-4 py-5 bg-panel-header-background text-primary-strong'>
        <IoClose
          className='text-2xl cursor-pointer text-icon-lighter'
          onClick={() => dispatch({ type: reducerCases.SET_MESSAGE_SEARCH })}
        />
        <span>Search Messages</span>
      </div>
      <div className='h-full overflow-auto custom-scrollbar'>
        <div className='flex flex-col items-center w-full'>
          <div className='flex items-center w-full gap-3 px-5 h-14'>
            <div className='flex items-center flex-grow gap-5 px-3 py-1 rounded-lg bg-panel-header-background'>
              <div>
                <BiSearchAlt2 className='text-lg cursor-pointer text-panel-header-icon' />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Search Messages'
                  className='w-full text-sm text-white bg-transparent focus:outline-none'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <span className='mt-1 text-secondary'>
            {!searchTerm.length &&
              `Search for message with ${currentChatUser.name}`}
          </span>
        </div>
        <div className='flex flex-col justify-center h-full'>
          {searchTerm.length > 0 && !searchedMessages.length && (
            <span className='flex justify-center w-full text-secondary'>
              No messages found
            </span>
          )}
          <div className='flex flex-col w-full h-full'>
            {searchedMessages.map((message) => (
              <div className='flex cursor-pointer flex-col justify-center hover:bg-background-default-hover w-full p-5 border-b-[0.1px] border-secondary'>
                <div className='text-sm text-secondary'>
                  {calculateTime(message.createAt)}
                </div>
                <div className='text-icon-green'>{message.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
