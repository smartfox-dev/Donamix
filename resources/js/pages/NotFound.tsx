import React, { useEffect } from 'react';
import Footer from '@/pages/unauthlayout/Footer';
import Navbar from '@/pages/unauthlayout/Navbar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return(
    <div
        className="flex flex-col w-full m-h-[100vh] overflow-y-auto bg-dashboard-background">
        <Navbar />
        <div className="mt-[72px] flex-1">
          <div className="w-full h-full bg-dashboard-background py-[100px] px-[150px]">
            <div className="flex flex-col gap-2">
              <p className="sm:block sm:text-6xl sm:font-medium hidden">Oops!</p>
              <h3 className="text-[30px] font-medium">We can't seem to find the page<br/>you're looking for.</h3>
              <p className="text-lg text-red-600 font-medium">Error code: 404</p>
              <ul className="text-base text-blue-500">
                <li className="text-[#6d6e71]">Here are some helpful links instead:</li>
                <li><a href="/">Home</a></li>
                <li><a href="/feed/search">Search</a></li>
                {/* <li><a href="/feed">Feed</a></li>  */}
                <li><a href="/chatrooms">Conversations on Donamix</a></li>
                <li><a href="/chat/rules">Chat Etiquette</a></li>
                <li><a href="/chat/safety">Trust &amp; Safety</a></li>
                <li><a href="/faq">Need help ?</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  )
};

export default NotFound;
