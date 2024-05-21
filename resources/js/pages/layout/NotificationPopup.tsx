import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';
import { Switch } from "@material-tailwind/react";

import { Button } from '@/components/ui/button';



import { PiSlidersHorizontalBold } from "react-icons/pi";
import { FcCalendar, FcSms, FcIdea, FcHighPriority, FcCurrencyExchange } from "react-icons/fc";
import { FaUserGroup } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { TbPointFilled } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";



interface INotificationPopup {
  children: React.ReactNode;
}

const NotificationPopup:React.FC<INotificationPopup> = ({children}) => {

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const clickFilter = () => {
    setIsOpenFilter(!isOpenFilter)
  }
  const closeFilter = () => {
    setIsOpenFilter(false)
  }


  return (
    <Popover placement="bottom-end">
      <PopoverHandler>
        <div>{children}</div>
      </PopoverHandler>
      <PopoverContent className="rounded-xl flex flex-col sm:w-[390px] w-[250px] h-auto drop-shadow-lg z-[9001] px-0">
        <div className='flex flex-row p-4 justify-between items-center'>
          <h3 className="font-poppins font-bold text-base">Notifications</h3>
          <PiSlidersHorizontalBold  className="font-bold text-2xl cursor-pointer" onClick={clickFilter}/>
          {isOpenFilter && 
            <div className="z-[9900] fixed top-[70px] right-[-20px] rounded-xl flex flex-col sm:w-[218px] w-[170px] h-auto bg-white drop-shadow-lg p-3">
              <div className='flex flex-row justify-between items-center border-b-2'>
                <h3 className='font-poppins font-bold text-sm'>Filter</h3>
                <LiaTimesSolid className="font-bold text-base cursor-pointer" onClick={clickFilter} />
              </div>
              <div className='flex flex-row justify-between items-center h-12 p-3 gap-3'>
                <h3 className='font-poppins font-medium text-sm'>All</h3>
                <Switch />
              </div>
              <div className='flex flex-row justify-between items-center h-12 p-3 gap-3'>
                <h3 className='font-poppins font-medium text-sm'>Likes</h3>
                <Switch defaultChecked/>
              </div>
              <div className='flex flex-row justify-between items-center h-12 p-3 gap-3'>
                <h3 className='font-poppins font-medium text-sm'>Comments</h3>
                <Switch />
              </div>
              <div className='flex flex-row justify-between items-center h-12 p-3 gap-3'>
                <h3 className='font-poppins font-medium text-sm'>Requests</h3>
                <Switch />
              </div>
              <div className='flex flex-row justify-between items-center h-12 p-3 gap-3'>
                <h3 className='font-poppins font-medium text-sm'>Jobs</h3>
                <Switch />
              </div>
              <div className='flex flex-row justify-between items-center h-12 p-3 gap-3'>
                <h3 className='font-poppins font-medium text-sm'>Events</h3>
                <Switch defaultChecked/>
              </div>
              <div className='flex flex-row justify-between items-center h-12 p-3 gap-3'>
                <h3 className='font-poppins font-medium text-sm'>Mentions</h3>
                <Switch defaultChecked/>
              </div>
            </div>
          }
        </div>
        <div className='flex flex-col h-[60vh] overflow-y-scroll'>
          <div className='flex flex-row gap-3 relative items-center p-3 hover:bg-gray-100'>
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage src='/images/avatar_1.jpg' alt=""/>
            </Avatar>
            <FcCalendar className="top-9 left-12 absolute w-5 h-5"/>
            <div className="flex flex-col gap-1 align-middle">              
              <p className="font-poppins font-medium text-xs text-black"><b>Username</b> invited you to an event</p>              
              <div className='flex flex-row items-center'>
                <p className="font-poppins font-bold text-[8px] text-[#959595]">10min</p>
                <TbPointFilled className='text-black' />
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-3 relative items-center p-3 hover:bg-gray-100'>
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage src='/images/avatar_1.jpg' alt=""/>
            </Avatar>
            <FaUserGroup className="top-9 left-12 absolute w-5 h-5 text-[#e0a854]"/>
            <div className="flex flex-col gap-1 align-middle">
            <p className="font-poppins font-medium text-xs text-black"><b>Username</b> added you as a co-host to an event</p> 
              <div className='flex flex-row items-center'>
                <p className="font-poppins font-bold text-[8px] text-[#959595]">10min</p>
                <TbPointFilled className='text-black' />
              </div>
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  {/* <FaUserGroup className="top-9 left-12 absolute w-5 h-5 text-[#e0a854]"/> */}
                  <div className="flex flex-col gap-1 align-middle">
                  <p className="font-poppins font-medium text-xs text-black"><b>Username</b> reacted to your post</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                <div className='relative items-center'>
                  <img src='/images/notification/notification.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div>
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  {/* <FaUserGroup className="top-9 left-12 absolute w-5 h-5 text-[#e0a854]"/> */}
                  <div className="flex flex-col gap-1 align-middle">
                    <p className="font-poppins font-medium text-xs text-black"><b>Username</b> reacted to your post</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                <div className='relative items-center'>
                  <img src='/images/notification/notification.png' alt='' className='w-[51px] h-[51px]'/>
                  {/* <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' /> */}
                </div>
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <img src="/images/notification/handshake.png" className="top-9 left-12 absolute w-5 h-5" alt=''/>
                  <div className="flex flex-col gap-1 align-middle">
                  <p className="font-poppins font-medium text-xs text-black"><b>Username</b> accepted your connection request</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                {/* <div className='relative items-center'>
                  <img src='/images/notification/notification.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div> */}
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  {/* <img src="/images/notification/handshake.png" className="top-9 left-12 absolute w-5 h-5" alt=''/> */}
                  <div className="flex flex-col gap-1 align-middle pt-3">
                    <p className="font-poppins font-medium text-xs text-black"><b>Username</b> sent you connection request</p>
                    <p className='font-poppins font medium text-[10px] text-[#959595]'>Accept and start building your network!</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                {/* <div className='relative items-center'>
                  <img src='/images/notification/notification.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div> */}
              </div>
              <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[12px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[12px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <img src="/images/notification/suitcase.png" className="top-9 left-12 absolute w-5 h-5" alt=''/>
                  <div className="flex flex-col gap-1 align-middle">
                  <p className="font-poppins font-medium text-xs text-black"><b>Username</b> sent you a gift</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                <div className='relative items-center'>
                  <img src='/images/gifts/2.png' alt='' className='w-[51px] h-[51px]'/>
                  {/* <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' /> */}
                </div>
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <img src="/images/notification/suitcase1.png" className="top-9 left-12 absolute w-5 h-5" alt=''/>
                  <div className="flex flex-col gap-1 align-middle">
                  <p className="font-poppins font-medium text-xs text-black"><b>Username</b> applied to your job post</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                <div className='relative items-center'>
                  <img src='/images/notification/group.png' alt='' className='w-[51px] h-[51px]'/>
                  {/* <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' /> */}
                </div>
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <FcCalendar className="top-9 left-12 absolute w-5 h-5"/>
                  <div className="flex flex-col gap-1 align-middle">
                    <p className="font-poppins font-medium text-xs text-black"><b>29 people</b> are attending an event near you</p>
                    <p className="font-poppins font-medium text-xs text-black underline">View jobs.</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                {/* <div className='relative items-center'>
                  <img src='/images/notification/group.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div> */}
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <img src="/images/notification/suitcase1.png" className="top-9 left-12 absolute w-5 h-5" alt=''/>
                  <div className="flex flex-col gap-1 align-middle">
                    <p className="font-poppins font-medium text-xs text-black"><b>33+ job opportunities</b> in user's country here</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                {/* <div className='relative items-center'>
                  <img src='/images/notification/group.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div> */}
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <FcSms  className="top-9 left-12 absolute w-5 h-5"/>
                  <div className="flex flex-col gap-1 align-middle pt-3">
                    <p className="font-poppins font-medium text-xs text-black">New Inquiry from <b>[Username]:</b> Someone is interested in your marketplace post. Respond now to discuss the details and make a potential sale!</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">20min</p>
                      <TbPointFilled className='text-black' />
                    </div>
                  </div>
                </div>
                {/* <div className='relative items-center'>
                  <img src='/images/notification/group.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div> */}
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <FcIdea   className="top-9 left-12 absolute w-5 h-5"/>
                  <div className="flex flex-col gap-1 align-middle">
                    <p className="font-poppins font-medium text-xs text-black"><b>Trending Topic:</b> Join the buzz! <b>[Username]'s</b> post is trending on Donamix</p>
                    <p className="font-poppins font-medium text-[10px] text-[#ABABAB]">check it out and add your perspective!</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">yesterday</p>
                      {/* <TbPointFilled className='text-black' /> */}
                    </div>
                  </div>
                </div>
                {/* <div className='relative items-center'>
                  <img src='/images/notification/group.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div> */}
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <FcHighPriority className="top-9 left-12 absolute w-5 h-5"/>
                  <div className="flex flex-col gap-1 align-middle">
                    <p className="font-poppins font-medium text-xs text-black"><b>Your wallet has a low balance</b> Enhance your experience by purchasing credits to unlock additional features.</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">yesterday</p>
                      {/* <TbPointFilled className='text-black' /> */}
                    </div>
                  </div>
                </div>
                {/* <div className='relative items-center'>
                  <img src='/images/notification/group.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div> */}
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  <FcCurrencyExchange className="top-9 left-12 absolute w-5 h-5"/>
                  <div className="flex flex-col gap-1 align-middle">
                    <p className="font-poppins font-medium text-xs text-black"><b>Unlock credits for free</b> by actively engaging with Donamix's exciting features!</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">0/00/000</p>
                      {/* <TbPointFilled className='text-black' /> */}
                    </div>
                  </div>
                </div>
                {/* <div className='relative items-center'>
                  <img src='/images/notification/group.png' alt='' className='w-[51px] h-[51px]'/>
                  <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' />
                </div> */}
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-row relative items-center p-3 hover:bg-gray-100'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src='/images/avatar_1.jpg' alt=""/>
                  </Avatar>
                  {/* <FcCurrencyExchange className="top-9 left-12 absolute w-5 h-5"/> */}
                  <div className="flex flex-col gap-1 align-middle">
                    <p className="font-poppins font-medium text-xs text-black"><b>[Username]</b> mentioned you in a post</p>
                    <p className="font-poppins font-medium text-[10px] text-[#ABABAB]">Engage with the conversation and share your insights!</p>
                    <div className='flex flex-row items-center'>
                      <p className="font-poppins font-bold text-[8px] text-[#959595]">0/00/0000</p>
                      {/* <TbPointFilled className='text-black' /> */}
                    </div>
                  </div>
                </div>
                <div className='relative items-center'>
                  <img src='/images/notification/notification.png' alt='' className='w-[51px] h-[51px]'/>
                  {/* <FaHeart className='absolute top-[15px] right-[35px] w-[32px] h-[29px] text-[#EA2F2F]' /> */}
                </div>
              </div>
              {/* <div>                
                <div className='flex flex-row gap-3 pl-[60px]'>
                  <Button variant='default' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Accept</Button>
                  <Button variant='secondary' className=' font-inter font-semibold text-[7px] h-[30px] py-0 px-8'>Decline</Button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Button className='bg-[#F4F4F4] text-black m-4 hover:text-white'>VIEW ALL</Button>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationPopup