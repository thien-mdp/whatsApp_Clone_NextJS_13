import React from 'react';
import Avatar from '../common/Avatar';
import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { calculateTime } from '@/utils/CalculateTime';
import MessageStatus from '../common/MessageStatus';
import { FaCamera, FaMicrophone } from 'react-icons/fa';

function ChatListItem({ data, isContactPage = false }) {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  const handleContactsClick = () => {
    // if (currentChatUser?.id === data?.id) {
    if (!isContactPage) {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          email: data.email,
          id: userInfo.id === data.senderId ? data.receiverId : data.senderId,
        },
      });
    } else {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: { ...data },
      });
      dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    }
    // }
  };
  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover`}
      onClick={handleContactsClick}
    >
      <div className='px-5 pt-3 pb-1 min-w-fit'>
        <Avatar type='lg' image={data?.profilePicture} />
      </div>
      <div className='flex flex-col justify-center w-full min-h-full pr-2 mt-3'>
        <div className='flex justify-between '>
          <div className='flex items-baseline'>
            <span className='text-white'>{data?.name}</span>
          </div>

          {!isContactPage && (
            <div className=''>
              <span
                className={`${
                  !data.totalUnreadMessages > 0
                    ? 'text-secondary'
                    : 'text-icon-green'
                } text-sm`}
              >
                {calculateTime(data.createAt)}
              </span>
            </div>
          )}
        </div>
        <div className='flex pt-1 pb-2 pr-2 border-b border-conversation-border'>
          <div className='flex justify-between w-full'>
            <span className='text-sm text-secondary line-clamp-1'>
              {isContactPage ? (
                data?.about || '\u00A0'
              ) : (
                <div className='flex items-center gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px]'>
                  {data.senderId === userInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === 'text' && (
                    <span className='truncate'>{data.message}</span>
                  )}
                  {data.type === 'audio' && (
                    <span className='flex items-center gap-1'>
                      <FaMicrophone className='text-panel-header-icon' />
                      Audio
                    </span>
                  )}
                  {data.type === 'image' && (
                    <span className='flex items-center gap-1'>
                      <FaCamera className='text-panel-header-icon' />
                      Image
                    </span>
                  )}
                </div>
              )}
            </span>
            {data.totalUnreadMessages > 0 && (
              <span className='bg-icon-green px-[4px] rounded-full text-sm'>
                {data.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
