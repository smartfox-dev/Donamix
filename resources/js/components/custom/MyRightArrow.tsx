import React from 'react';
import { BsChevronRight } from "react-icons/bs";

const MyRightArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <BsChevronRight onClick={onClick} className="border-none cursor-pointer absolute top-1 right-5 z-99999 scale-150" />
);

export default MyRightArrow;