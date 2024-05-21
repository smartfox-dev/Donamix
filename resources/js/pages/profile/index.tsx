import React from 'react';
import ProfileLayout from './layout';
import { Outlet } from 'react-router-dom';
import { Radio } from "@material-tailwind/react"
import Button from '@/components/common/Button'


const Profile = () => {
  return (
    <></>
    // <div className="flex flex-col py-10 pr-10 gap-5">
    //   <div className="font-poppins font-semibold text-2xl">Edit Basic Information</div>
    //   <div className="font-poppins font-medium text-base text-[#7D7D7D]">
    //   Control your profile information, both what it says and what other people see. User profiles are shown across all Donamix website. Complete your profile 100% to reach more people. Note: accounts not verified will automatically be deleted by our system.
    //   </div>
    //   <div className="flex flex-row justify-between">
    //     <input type='text' placeholder='First Name' className='w-[49%] p-6 rounded-lg'/>
    //     <input type='text' placeholder='Last Name'  className='w-[49%] p-6 rounded-lg'/>
    //   </div>
    //   <div className="flex flex-col gap-5">
    //     <div className="font-poppins font-semibold text-lg">Date of Birth</div>
    //     <div className="flex flex-row justify-between">
    //       <input placeholder="Day" className='w-[32%]  p-6 rounded-lg'/>
    //       <input placeholder="Month" className='w-[32%]  p-6 rounded-lg' />
    //       <input placeholder="Year" className='w-[32%]  p-6 rounded-lg'/>
    //     </div>
    //   </div>
    //   <div className="flex flex-col gap-5">
    //     <div className="font-poppins font-semibold text-lg">Status</div>
    //     <div className="flex flex-row gap-5">
    //       <div className="w-[32%] p-6 rounded-lg bg-white flex flex-row items-center gap-3">
    //         <input type="radio" className="scale-[200%] bg-black" name="status" value="single" id="single"/>
    //         <span className="font-poppins font-medium text-base text-black">Single</span>
    //       </div>
    //       <div className="w-[32%] p-6 rounded-lg bg-white flex flex-row items-center gap-3">
    //         <input type="radio" className="scale-[200%] bg-black" name="status" value="married" id="married"/>
    //         <span className="font-poppins font-medium text-base text-black">Married</span>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex flex-col gap-5">
    //     <div className="font-poppins font-semibold text-lg">Location</div>
    //     <div className="flex flex-row gap-5">
    //       <input placeholder="City" className='w-[32%] p-6 rounded-lg placeholder-black'/>
    //       <input placeholder="Country" className='w-[32%] p-6 rounded-lg placeholder-black' />
    //     </div>
    //   </div>
    //   <div className="flex flex-col gap-5">
    //     <div className="font-poppins font-semibold text-lg">About</div>
    //     <input type="text" placeholder="Enter Description" className='p-8 rounded-lg'/>
    //   </div>
    //   <Button className="p-8 font-poppins font-semibold text-lg">Save Changes</Button>
    //   <div className="flex flex-col bg-white rounded-lg p-10">
    //     <div className="font-inter font-semibold text-xl">Received Gifts 23</div>
    //     <div className=" flex flex-row py-10 px-20 justify-between">
    //       <div className="flex flex-col items-center">
    //         <img src="/images/profile/child.png" className="w-[69px] h-[69px]" alt=""/>
    //         <div className="font-inter font-semibold text-lg text-black">Child</div>
    //         <div className="flex flex-row">
    //           <img src="/images/profile/money.png" className="w-[18.15px] h-[18.15px]" alt=""/>
    //           <div className="font-inter font-semibold text-[14.75px]">12</div>
    //         </div>
    //       </div>
    //       <div className="flex flex-col items-center">
    //         <img src="/images/profile/crown.png" className="w-[69px] h-[69px]" alt=""/>
    //         <div className="font-inter font-semibold text-lg text-black">Crown</div>
    //         <div className="flex flex-row">
    //           <img src="/images/profile/money.png" className="w-[18.15px] h-[18.15px]" alt=""/>
    //           <div className="font-inter font-semibold text-[14.75px]">124</div>
    //         </div>
    //       </div>
    //       <div className="flex flex-col items-center">
    //         <img src="/images/profile/cake.png" className="w-[69px] h-[69px]" alt=""/>
    //         <div className="font-inter font-semibold text-lg text-black">Cake</div>
    //         <div className="flex flex-row">
    //           <img src="/images/profile/money.png" className="w-[18.15px] h-[18.15px]" alt=""/>
    //           <div className="font-inter font-semibold text-[14.75px]">102</div>
    //         </div>
    //       </div>
    //       <div className="flex flex-col items-center">
    //         <img src="/images/profile/orange.png" className="w-[69px] h-[69px]" alt=""/>
    //         <div className="font-inter font-semibold text-lg text-black">Orange</div>
    //         <div className="flex flex-row">
    //           <img src="/images/profile/money.png" className="w-[18.15px] h-[18.15px]" alt=""/>
    //           <div className="font-inter font-semibold text-[14.75px]">16</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
};

export default Profile;
