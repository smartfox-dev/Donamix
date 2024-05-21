import React, { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  // Button,
} from "@material-tailwind/react";


import { FaReply } from "react-icons/fa";
import { MdOutlineForum } from "react-icons/md";
import { ImBin, ImBlocked } from "react-icons/im";
import { BiPlusMedical, BiSolidVolumeMute } from "react-icons/bi";
import { FcCloseUpMode, FcRules } from "react-icons/fc";

interface IUserManagePopup {
  children: React.ReactNode;
  privateSelect ?: Function
}

const UserManagePopup:React.FC<IUserManagePopup> = ({children, privateSelect}) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const openPopover = () => {
    setIsOpenPopover(true);
  }

  const onClickPrivate = () => {
    privateSelect();
    setIsOpenPopover(false);
  }

  return (
    <Popover placement='bottom-start'>
      <PopoverHandler onClick={openPopover}>
        {children}
      </PopoverHandler>
      {isOpenPopover ===true && <PopoverContent className='bg-black w-[250px] flex flex-col gap-5 p-4 z-[50]'>
        <div className='flex flex-row items-center gap-3'>
          <ImBin size='20' className='text-white'/>
          <p className=' font-montserrat font-medium text-base text-white'>Delete Message</p>
        </div>
        <div className='flex flex-row items-center gap-3 hover:cursor-pointer' onClick={onClickPrivate}>
          <BiPlusMedical size='20' className=' text-green-600'/>
          <p className=' font-montserrat font-medium text-base text-white'>Private Message</p>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <FcCloseUpMode size='20'/>
          <p className=' font-montserrat font-medium text-base text-white'>Send gift</p>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <ImBlocked size='20' className=' text-red-600'/>
          <p className=' font-montserrat font-medium text-base text-white'>Block</p>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <BiSolidVolumeMute size='20' className='text-white'/>
          <p className=' font-montserrat font-medium text-base text-white'>Mute</p>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <FcRules size='20'/>
          <p className=' font-montserrat font-medium text-base text-white'>Chat Etiquette</p>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <MdOutlineForum size='20' className='text-white'/>
          <p className=' font-montserrat font-medium text-base text-white'>Forums</p>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <FaReply size='20' className=' text-green-600'/>
          <p className=' font-montserrat font-medium text-base text-white'>Reply</p>
        </div>
      </PopoverContent>}
    </Popover>
  )
}

export default UserManagePopup
