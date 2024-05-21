import React, { useState } from 'react';

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Collapsible = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <div className='p-3 bg-black w-full flex flex-row items-center justify-between rounded-t-2xl hover:cursor-pointer'  onClick={toggle}>
        <p className='font-sans font-medium text-[25px] text-white'>{title}</p>
        <div>
          {isCollapsed ? <FaChevronDown className='text-white text-[30px]'/>:<FaChevronUp className='text-white text-[30px]'/>}
        </div>
      </div>
      {!isCollapsed && <div className='w-full bg-white py-3 px-6 gap-1 shadow-gray-600 shadow-md'>{children}</div>}
    </div>
  );
};

export default Collapsible;