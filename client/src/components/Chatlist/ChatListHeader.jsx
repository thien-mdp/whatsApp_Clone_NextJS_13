import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import { useStateProvider } from '@/context/StateContext';
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from 'react-icons/bs';
import { reducerCases } from '@/context/constants';
import { useRouter } from 'next/router';
import ContextMenu from '../common/ContextMenu';

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const router = useRouter();

  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  console.log('isContextMenuVisible', isContextMenuVisible);
  const showContextMenu = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
  };

  const contextMenuOptions = [
    {
      name: 'Logout',
      callback: async () => {
        setIsContextMenuVisible(false);
        router.push('/logout');
      },
    },
  ];

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };
  return (
    <div className='flex items-center justify-between h-16 px-4 py-3'>
      <div className='cursor-pointer'>
        <Avatar type='sm' image={userInfo?.profileImage} />
      </div>
      <div className='flex gap-6'>
        <BsFillChatLeftTextFill
          className='text-xl cursor-pointer text-panel-header-icon'
          title='New Chat'
          onClick={handleAllContactsPage}
        />
        <>
          <BsThreeDotsVertical
            className='text-xl cursor-pointer text-panel-header-icon'
            title='Menu'
            onClick={(e) => showContextMenu(e)}
            id='context-onpener'
          />
          {isContextMenuVisible && (
            <ContextMenu
              options={contextMenuOptions}
              cordinates={contextMenuCordinates}
              contextMenu={isContextMenuVisible}
              setContextMenu={setIsContextMenuVisible}
            />
          )}
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
