import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Popover,
  PopoverContent,
  PopoverHandler,
  button,
} from '@material-tailwind/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { LiaTimesSolid } from "react-icons/lia";

interface IInboxPopupProps {
  children: React.ReactNode;
}

const InboxPopup: React.FC<IInboxPopupProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  const navigate = useNavigate();
  const buttonClick = () => {
    navigate('/inbox');
  }

  return (
    <Popover placement="bottom-end">
      <PopoverHandler>
        <div>{children}</div>
      </PopoverHandler>
      <PopoverContent className="rounded-xl flex flex-col max-w-[390px] h-auto drop-shadow-lg z-[9001] px-0" hidden={!isOpen}>
        <div className='flex flex-row p-4 justify-between items-center'>
          <h3 className="font-montserrat font-bold text-base">Inbox</h3>
          <LiaTimesSolid className="font-bold text-base cursor-pointer" onClick={togglePopover} />
        </div>
        <div className="flex flex-col">
          <div className='flex flex-row p-4 justify-between hover:bg-[#F9F9F9] w-full'>
            <div className='flex flex-row gap-2 relative'>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src='/images/avatar_1.jpg' alt=""/>
              </Avatar>
              <span className="top-0 left-9 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              <div className="flex flex-col gap-2 align-middle">
                <div className='flex flex-row gap-2 items-center'>
                  <h5 className="font-medium text-black font-poppins">
                    Smith Mathew
                  </h5>
                  <span className='bg-green-400 rounded-full w-3 h-3 text-white flex items-center justify-center text-[10px]'>2</span>
                </div>
                <p className='font-poppins font-medium text-sm text-[#9C9797]'>Hi, David Hope you're...</p>
              </div>
            </div>
            <p className='font-poppins font-normal text-xs'>29 mar</p>
          </div>
          <div className='flex flex-row p-4 justify-between hover:bg-[#F9F9F9] w-full'>
            <div className='flex flex-row gap-2 relative'>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src='/images/avatar_1.jpg' alt=""/>
              </Avatar>
              <span className="top-0 left-9 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              <div className="flex flex-col gap-2 align-middle">
                <div className='flex flex-row gap-2 items-center'>
                  <h5 className="font-medium text-black font-poppins">
                    Smith Mathew
                  </h5>
                  <span className='bg-green-400 rounded-full w-3 h-3 text-white flex items-center justify-center text-[10px]'>2</span>
                </div>
                <p className='font-poppins font-medium text-sm text-[#9C9797]'>Hi, David Hope you're...</p>
              </div>

            </div>
            <p className='font-poppins font-normal text-xs'>29 mar</p>
          </div>
          <div className='flex flex-row p-4 justify-between hover:bg-[#F9F9F9] w-full'>
            <div className='flex flex-row gap-2 relative'>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src='/images/avatar_1.jpg' alt=""/>
              </Avatar>
              <span className="top-0 left-9 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              <div className="flex flex-col gap-2 align-middle">
                <div className='flex flex-row gap-2 items-center'>
                  <h5 className="font-medium text-black font-poppins">
                    Smith Mathew
                  </h5>
                  <span className='bg-green-400 rounded-full w-3 h-3 text-white flex items-center justify-center text-[10px]'>2</span>
                </div>
                <p className='font-poppins font-medium text-sm text-[#9C9797]'>Hi, David Hope you're...</p>
              </div>

            </div>
            <p className='font-poppins font-normal text-xs'>29 mar</p>
          </div>
          <div className='flex flex-row p-4 justify-between hover:bg-[#F9F9F9] w-full'>
            <div className='flex flex-row gap-2 relative'>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src='/images/avatar_1.jpg' alt=""/>
              </Avatar>
              <span className="top-0 left-9 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              <div className="flex flex-col gap-2 align-middle">
                <div className='flex flex-row gap-2 items-center'>
                  <h5 className="font-medium text-black font-poppins">
                    Smith Mathew
                  </h5>
                  <span className='bg-green-400 rounded-full w-3 h-3 text-white flex items-center justify-center text-[10px]'>2</span>
                </div>
                <p className='font-poppins font-medium text-sm text-[#9C9797]'>Hi, David Hope you're...</p>
              </div>

            </div>
            <p className='font-poppins font-normal text-xs'>29 mar</p>
          </div>
          <div className='flex flex-row p-4 justify-between hover:bg-[#F9F9F9] w-full'>
            <div className='flex flex-row gap-2 relative'>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src='/images/avatar_1.jpg' alt=""/>
              </Avatar>
              <span className="top-0 left-9 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              <div className="flex flex-col gap-2 align-middle">
                <div className='flex flex-row gap-2 items-center'>
                  <h5 className="font-medium text-black font-poppins">
                    Smith Mathew
                  </h5>
                  <span className='bg-green-400 rounded-full w-3 h-3 text-white flex items-center justify-center text-[10px]'>2</span>
                </div>
                <p className='font-poppins font-medium text-sm text-[#9C9797]'>Hi, David Hope you're...</p>
              </div>

            </div>
            <p className='font-poppins font-normal text-xs'>29 mar</p>
          </div>
          <Button variant='default' className='bg-[#F4F4F4] text-black m-4 hover:text-white' onClick={buttonClick}>VIEW ALL</Button>
          
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default InboxPopup;