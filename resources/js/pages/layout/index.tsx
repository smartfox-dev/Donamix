import React, { useEffect } from 'react';
import { AppProvider } from '@/context/AppContext';
import Footer from '@/pages/layout/Footer';
import Navbar from '@/pages/layout/Navbar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AppProvider>
      <div
        className="flex flex-col w-full h-full overflow-y-auto bg-dashboard-background">
        <Navbar />
        <div className="mt-[72px] flex-1">
          <Outlet />
        </div>
        <Footer/>
      </div>
    </AppProvider>
  );
};

export default Layout;
