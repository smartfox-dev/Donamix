import React from 'react';
// import { BlogProvider } from '@/context/BlogContext';
import LeftSidebar from '@/pages/dashboard/layout/LeftSidebar';
import { Outlet } from 'react-router-dom';
import RightSidebar from '@/pages/dashboard/layout/RightSidebar';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';

const HomeLayout = () => {
  const { setIsLeftSidebarOpen } = useAppContext();

  useEffect(() => {
    return () => setIsLeftSidebarOpen(true);
  }, []);

  return (
    // <BlogProvider>
      <div className="w-full h-full relative justify-between flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
        <LeftSidebar onStateChange={true}/>
        {/* <div className="flex flex-col lg:flex-1 bg-white">
          <div className="w-full h-full bg-dashboard-background"> */}
              <Outlet />
          {/* </div>
        </div> */}
        <RightSidebar />
      </div>
    // </BlogProvider>
  );
};

export default HomeLayout;
