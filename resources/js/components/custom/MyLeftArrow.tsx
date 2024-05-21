import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';

const MyLeftArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <BsChevronLeft onClick={onClick} className="border-none cursor-pointer absolute top-1 right-[60px] z-99999 scale-150"/>

);

export default MyLeftArrow;