import React, { useState } from 'react';
import Modal from 'react-modal';
import CustomLeftArrow from '@/components/custom/CustomLeftArrow';
import CustomRightArrow from '@/components/custom/CustomRightArrow';

import { FaRegTimesCircle } from "react-icons/fa";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

interface ImageProps {
  isOpen: boolean,
  onClose: () => void,
  images: string[],
  initialIndex: number,
}

const ImageModal: React.FC<ImageProps> = ({isOpen, onClose, images, initialIndex}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to the next image
  const goNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Go to the previous image
  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!isOpen) {
    return null;
  }


  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[1000] flex justify-center items-center py-10"
      onClick={onClose} // Add this if you want the modal to close when clicking outside
    >
      <div
        className="bg-white p-5 z-[1001] relative"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <span
          className="absolute top-0 right-0 p-4 text-3xl cursor-pointer"
          onClick={onClose}
        ><FaRegTimesCircle /></span>

        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="max-h-[80vh] max-w-[80vw]" />


        {currentIndex !== 0 && (
          <img src="/images/home/arrow.png" onClick={goPrevious} className="scale-x-[-1] border-none cursor-pointer absolute top-[50%] left-0 z-[1002]" alt=""/>
        )}

        {currentIndex !== images.length - 1 && (
          <img src="/images/home/arrow.png" onClick={goNext} className="border-none cursor-pointer absolute top-[50%] right-0 z-[1002]" alt=""/>
        )}

      </div>
    </div>

  );
}

export default ImageModal;
