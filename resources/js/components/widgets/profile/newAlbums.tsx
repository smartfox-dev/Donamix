import React from 'react'
import {Button} from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';

export default function Albums1() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-black font-poppins text-xl font-semibold">
          Manage Albums
        </h3>
        <Button variant="secondary" className="font-poppins font-semibold text-lg bg-white">Select Image</Button>
      </div>
      <div className="w-auto h-auto bg-white rounded-t-3xl p-4 flex flex-col gap-3">
        <div className="flex flex-row-reverse items-center">
          <Popover placement="bottom-end">
            <PopoverHandler>
              <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                <img src="/images/home/Frame3dots.png" className="w-auto h-auto" alt="" />
              </div>
            </PopoverHandler>
            <PopoverContent>
              <div className="flex flex-col w-[253px] gap-4 pt-3">
                <div className="flex flex-row items-center gap-3">
                  <img src="/images/home/Edit.png" alt=""/>
                  <div className="font-montserrat font-medium text-base text-black">Edit Album</div>
                </div>                        
                <div className="flex flex-row items-center gap-3">
                  <img src="/images/home/dustbin.png" alt=""/>
                  <div className="font-montserrat font-medium text-base text-black">Delete Album</div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-row gap-3">
          <img src="/images/profile/rectangle6760.png" alt=""/>
          <div className="flex flex-col gap-3">
            <img src="/images/profile/rectangle6761.png" alt=""/>
            <img src="/images/profile/rectangle6762.png" alt=""/>
          </div>
        </div>
        {/* <div className="flex flex-row gap-3 items-center">
          <Avatar className='w-[28.11px] h-[28.11px]'>
            <AvatarImage src='/images/avatar_1.jpg' alt="" />
            
          </Avatar>
          <input type='text' placeholder='Add a comment' className="flex-1 border-2 border-gray-300 rounded-sm px-3 py-2"/>
          
        </div> */}
      </div>
      <div className="w-auto h-auto bg-white rounded-t-3xl p-6 flex flex-col gap-3">
        <div className="flex flex-row-reverse items-center">
          <Popover placement="bottom-end">
            <PopoverHandler>
              <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                <img src="/images/home/Frame3dots.png" className="w-auto h-auto" alt="" />
              </div>
            </PopoverHandler>
            <PopoverContent>
              <div className="flex flex-col w-[253px] gap-4 pt-3">
                <div className="flex flex-row items-center gap-3">
                  <img src="/images/home/Edit.png" alt=""/>
                  <div className="font-montserrat font-medium text-base text-black">Edit Album</div>
                </div>                        
                <div className="flex flex-row items-center gap-3">
                  <img src="/images/home/dustbin.png" alt=""/>
                  <div className="font-montserrat font-medium text-base text-black">Delete Album</div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-row gap-3">
          <img src="/images/profile/rectangle6764.png" alt=""/>
          <div className="flex flex-col gap-3">
            <img src="/images/profile/rectangle6765.png" alt=""/>
            <img src="/images/profile/rectangle6766.png" alt=""/>
          </div>
        </div>
        {/* <div className="flex flex-row gap-3 items-center">
          <Avatar className='w-[28.11px] h-[28.11px]'>
            <AvatarImage src='/images/avatar_1.jpg' alt="" />
            
          </Avatar>
          <input type='text' placeholder='Add a comment' className="flex-1 border-2 border-gray-300 rounded-sm px-3 py-2"/>
          
        </div> */}
      </div>
      <Button className='font-poppins font-semibold text-lg p-8'>Add Image</Button>
    </div>
  )
}
