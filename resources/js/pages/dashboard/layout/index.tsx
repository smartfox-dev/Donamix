import React from 'react';
import { BlogProvider } from '@/context/BlogContext';
import LeftSidebar from '@/pages/dashboard/layout/LeftSidebar';
import { Outlet } from 'react-router-dom';
import RightSidebar from '@/pages/dashboard/layout/RightSidebar';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';

const DashboardLayout = () => {
  const { setIsLeftSidebarOpen } = useAppContext();

  useEffect(() => {
    return () => setIsLeftSidebarOpen(true);
  }, []);
  
  return (
    <BlogProvider>
      <div className="relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
        <LeftSidebar />
        <div className="flex-1 bg-white">
          <div className="w-full h-full bg-dashboard-background">
            <div className="w-full h-full">
              <Outlet />
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </BlogProvider>
  );
};

export default DashboardLayout;
