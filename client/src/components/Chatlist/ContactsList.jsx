import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { GET_ALL_CONTACTS } from '@/utils/ApiRoutes';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiArrowBack, BiSearchAlt2 } from 'react-icons/bi';
import ChatListItem from './ChatListItem';

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchContacts, setSearchContacts] = useState([]);
  const [{}, dispatch] = useStateProvider();

  useEffect(() => {
    if (searchTerm.length) {
      const filteredData = {};
      Object.keys(allContacts).forEach((key) => {
        filteredData[key] = allContacts[key].filter((obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      });
      setSearchContacts(filteredData);
    } else {
      setSearchContacts(allContacts);
    }
  }, [searchTerm]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
        setSearchContacts(users);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-end h-24 px-3 py-4'>
        <div className='flex items-center gap-12 text-white'>
          <BiArrowBack
            className='text-xl cursor-pointer'
            onClick={() => {
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
            }}
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className='flex-auto h-full overflow-auto bg-search-input-container-background custom-scrollbar'>
        <div className='flex items-center gap-3 py-3 h-14'>
          <div className='flex items-center flex-grow gap-5 px-3 py-1 mx-4 rounded-lg bg-panel-header-background'>
            <div>
              <BiSearchAlt2 className='text-lg cursor-pointer text-panel-header-icon' />
            </div>
            <div>
              <input
                type='text'
                placeholder='Search Contacts'
                className='w-full text-sm text-white bg-transparent focus:outline-none'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {Object.entries(searchContacts).map(([initialLetter, userList]) => {
          return (
            userList.length > 0 && (
              <div key={Date.now() + initialLetter}>
                <div className='py-5 pl-10 text-teal-light'>
                  {initialLetter}
                </div>
                {userList.map((contact) => {
                  return (
                    <ChatListItem
                      data={contact}
                      isContactPage={true}
                      key={contact.id}
                    />
                  );
                })}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
