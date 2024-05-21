import React from 'react';
import {useState, useContext} from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import ProfileNavbar from './ProfileNavbar';
import Footer from '@/pages/layout/Footer';
import Navbar from '@/pages/layout/Navbar';


const ProfileLayout = () => {
  const [name, setName] = useState("Martha John");
  const [email, setEmail] = useState("@MarthaJohn123");
  return (
    <div className="bg-dashboard-background">
      <Navbar />
      <div className="flex mt-[72px]">
        <Outlet />
      </div>
      <Footer />
    </div>
    // <div className="bg-dashboard-background flex flex-col">
    //   <div className="relative w-full h-[292px] bg-black">
    //     <div className="flex flex-col absolute 2xl:top-[200px] top-[50px] left-[90px] z-[100] items-center">
    //       <img src="/images/profile/profile.png" className="" alt=""/>
    //       <div className="font-inter font-bold text-xl 2xl:text-black text-white">{name}</div>
    //       <div className="font-inter font-medium text-lg text-[#818181]">{email}</div>
    //     </div>
    //     <button className="bg-white text-black absolute top-[220px] right-10 font-montserrat font-medium text-base p-3 rounded-md">Edit Cover Photo</button>
    //   </div>
    //   <div className="relative w-full h-full flex flex-row ">
    //     <LeftSidebar onStateChange={true}/>
    //     <div className="flex-1 h-full pl-10">
    //       {/* <div className="flex flex-col w-full h-full bg-dashboard-background"> */}
    //         <ProfileNavbar/>
    //         <Outlet />
    //       {/* </div> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProfileLayout;
