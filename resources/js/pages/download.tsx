import React from 'react';
// import 'react-multi-carousel/lib/u';
import {useState, useEffect} from 'react';
import LeftSidebar from './dashboard/layout/LeftSidebar';
import RightSidebar from './dashboard/layout/RightSidebar';
import { Button, buttonVariants } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';

export default function Download() {
  const navigate = useNavigate();
  const gotoWaitList = () => navigate('/waitlist');

  const [sidbarExpanded, setSidebarExpanded] = useState(null)
  const showSidebar: () => void = () => {
    setSidebarExpanded(true)
  }
  const hideSidebar: () => void = () => {
    setSidebarExpanded(false)
  }


  return (
    // <div className="relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
    //   <LeftSidebar onStateChange={showSidebar}/>
      <div className="flex-1 bg-dashboard-background w-full mainBody">
        {/* <div className="flex flex-col w-full h-full"> */}
          <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-10 items-center">
            <div className="font-sans font-bold text-4xl text-center sm:px-28 px-6 pt-14 ">Available on Desktop, Web, and Mobile</div>
            <div className="font-sans font-semibold text-lg text-center">Stay connected, wherever you work.</div>
            <Button variant="default" className=" p-6 font-sans font-normal text-base max-w-[180px] rounded-full">Get it Now</Button>
            <img src="/images/download/screens.png" alt=""/>
            <div className="flex flex-row flex-wrap bg-black m-3 rounded-t-xl p-10 w-full justify-center">
              <div className="flex flex-col items-center gap-5 w-[50%] p-5 min-w-[300px]">
                <div className="text-white font-sans font-bold text-base">For Browser</div>
                <img src="/images/download/browser.png" className="max-w-full h-auto" alt=""/>
                <Button variant="secondary" className="font-sans font-bold text-base rounded-full">Download</Button>
              </div>
              <div className="flex flex-col items-center gap-5 w-[50%] p-5 min-w-[300px]">
                <div className="text-white font-sans font-bold text-base">For Window</div>
                <img src="/images/download/browser.png" alt=""/>
                <Button variant="secondary" className="font-sans font-bold text-base rounded-full">Download</Button>
              </div>
            </div>
            <div className="font-sans font-bold text-4xl text-center sm:px-28 px-6">Start using DONAMIX Today!</div>
            <div className="flex flex-row flex-wrap gap-10 w-full justify-center">
              <img src="/images/app_store.svg" className="cursor-pointer hover:scale-105" onClick={gotoWaitList} alt=""/>
              <img src="/images/google_play.svg" className="cursor-pointer hover:scale-105" onClick={gotoWaitList} alt=""/>
            </div>
          </div>
        {/* </div> */}
      </div>
    //   <RightSidebar/>
    // </div>
  )
}