import React from 'react';

const CustomLeftArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <img src="/images/home/arrow.png" onClick={onClick} className="scale-x-[-1] translate- border-none cursor-pointer absolute left-0 z-99999" alt=""/>

);

export default CustomLeftArrow;