import React from 'react';
import LeftPanel from '@/pages/auth/layout/LeftPanel';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-[50%] hidden lg:block">
        <LeftPanel />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
