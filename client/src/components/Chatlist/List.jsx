import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { GET_INITIAL_CONTACTS_ROUTE } from '@/utils/ApiRoutes';
import axios from 'axios';
import React, { useEffect } from 'react';
import ChatListItem from './ChatListItem';

function List() {
  const [{ userInfo, userContacts, filteredContacts }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);
        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
        dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: users });
      } catch (err) {
        console.log(err);
      }
    };
    if (userInfo?.id) {
      getContacts();
    }
  }, [userInfo]);

  return (
    <div className='flex flex-col flex-auto max-h-full overflow-auto bg-search-input-container-background custom-scrollbar'>
      {filteredContacts && filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <ChatListItem data={contact} key={contact.id} />
          ))
        : userContacts.map((contact) => (
            <ChatListItem data={contact} key={contact.id} />
          ))}
    </div>
  );
}

export default List;
