import * as React from 'react';

interface ITagProps {
  children: React.ReactNode;
}

const Tag: React.FC<ITagProps> = ({children}) => {
  return <div className='bg-dashboard-background px-[18px] py-[12px] text-black font-semibold text-base rounded-md font-inter'>
    {children}
  </div>;
};

export default Tag;
