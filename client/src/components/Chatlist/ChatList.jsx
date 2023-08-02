import React, { useEffect, useState } from 'react';
import ChatListHeader from './ChatListHeader';
import SearchBar from './SearchBar';
import List from './List';
import { useStateProvider } from '@/context/StateContext';
import ContactsList from './ContactsList';

function ChatList() {
  const [{ contactsPage }] = useStateProvider();
  const [pageType, setPageType] = useState('default');

  useEffect(() => {
    if (contactsPage) {
      setPageType('all-contacts');
    } else {
      setPageType('default');
    }
  }, [contactsPage]);
  return (
    <div className='z-20 flex flex-col max-h-screen bg-panel-header-background'>
      {pageType === 'default' && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {pageType === 'all-contacts' && <ContactsList />}
    </div>
  );
}

export default ChatList;
