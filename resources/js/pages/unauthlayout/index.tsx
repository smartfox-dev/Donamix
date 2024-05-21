import React, { useEffect } from 'react';
import { AppProvider } from '@/context/AppContext';
import Footer from '@/pages/unauthlayout/Footer';
import Navbar from '@/pages/unauthlayout/Navbar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const UnAuthLayout = () => {
  const location = useLocation();
  console.log("=====unlogged_layout:")
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    // <AppProvider>
      <div
        className="flex flex-col w-full m-h-[100vh] overflow-y-auto bg-dashboard-background">
        <Navbar />
        <div className="mt-[72px] flex-1">
          <Outlet />
        </div>
        <Footer/>
      </div>
    // </AppProvider>
  );
};

export default UnAuthLayout;
