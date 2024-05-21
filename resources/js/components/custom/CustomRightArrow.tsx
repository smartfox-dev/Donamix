// CustomRightArrow.tsx
import React from 'react';

const CustomRightArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <img src="/images/home/arrow.png" onClick={onClick} className="border-none cursor-pointer absolute right-0 z-99999" alt=""/>
);

export default CustomRightArrow;