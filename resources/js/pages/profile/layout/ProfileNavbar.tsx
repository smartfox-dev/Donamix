import React from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button';

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';


export default function ProfileNavbar() {
  const navigate = useNavigate();
  const { user } = useAuthContext();


  return (
    <div>
      <Menu>      
        <Button variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-poppins font-semibold text-[16px] py-10 px-16" onClick={() => {
            navigate('/')}} >
          Timeline
        </Button>
        <Button variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-poppins font-semibold text-[16px] py-10 px-16" onClick={() => {
            navigate('/')}} >
          About
        </Button>
        <Button variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-poppins font-semibold text-[16px] py-10 px-16" onClick={() => {
            navigate('/')}} >
          Album
        </Button>
        <Button variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-poppins font-semibold text-[16px] py-10 px-16" onClick={() => {
            navigate('/')}} >
          Friends
        </Button>      
      </Menu>
      <div className="h-[1px] w-full ml-2 border-solid border-[1px] border-[#C9C9C9]"></div>
    </div>
  )
}
