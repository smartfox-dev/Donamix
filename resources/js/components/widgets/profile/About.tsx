import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsBriefcaseFill } from 'react-icons/bs';
import Button from '@/components/common/Button';
import { Chip } from '@material-tailwind/react';
import { FaGraduationCap } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useAuthContext } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';

interface IAboutProps { }

const About: React.FC<IAboutProps> = ({ }) => {
  const { user } = useAuthContext();
  // const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  console.log('ssss')

  const [isMenuOpen, setIsMenuOpen] = useState<number>(0);
  const handleMenuClick = () => {
    setIsMenuOpen(isMenuOpen > 0 ? 0 : 1);
    console.log("MenuClick");
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(0);
  };

  const handleOutsideClick = (event: any) => {
    console.log('123', event, event.type, isMenuOpen, event.type == 'click' && isMenuOpen == 2)
    if (event.type == 'click' && isMenuOpen == 2) {
      setIsMenuOpen(0);
    }
    if (event.type == 'click' && isMenuOpen == 1) {
      setIsMenuOpen(2);
    }

  };

  useEffect(() => {
    console.log("isMenuOpen", isMenuOpen)
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  })

  // const handleClickOutside = (event: any) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsMenuOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('click', handleClickOutside);
  //   return () => {
  //     window.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold text-black font-poppins mt-8">Personal Information</h3>
      <p className="text-[#7D7D7D] font-medium font-poppins mt-2">
        {user && user.description
          ? user.description
          : `Hi i'm Sophia from UK, I love blogging, fashion, travel. I like to learn and share blogging with you.`}
      </p>

      <div className="flex flex-col gap-6 mt-4">
        <div className="flex flex-row w-full p-5 bg-white rounded-lg items-center gap-5">
          <big className="scale-150">
            <FaGraduationCap />
          </big>
          <div className="flex-1 flex-col">
            <p className="font-poppins font-medium text-base text-black">Work Experiences</p>
            <p className="font-poppins font-medium text-base text-[#7D7D7D]">{
            user && user.experience ?

            user.experience.company + ' - ' + user.experience.position

            : 'has no experiences'}</p>
          </div>
        </div>

        <div className="flex flex-row w-full p-5 bg-white rounded-lg items-center gap-5">
          <big className="scale-150">
            <FaGraduationCap />
          </big>
          <div className="flex-1 flex-col">
            <p className="font-poppins font-medium text-base text-black">Educations</p>
            <p className="font-poppins font-medium text-base text-[#7D7D7D]">{
            user && user.education ?

            user.education.university + ' - ' + user.education.description

            : 'has no education'}</p>
          </div>
        </div>

        <div className="flex flex-row w-full p-5 bg-white rounded-lg items-center gap-5">
          <big className="scale-150">
            <FaLocationDot />
          </big>
          <div className="flex-1 flex-col">
            <p className="font-poppins font-medium text-base text-black">Location</p>
            <p className="font-poppins font-medium text-base text-[#7D7D7D]">{user && user.city + ' - ' + user.country}</p>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-black font-poppins my-8">My Interests</h3>
      <div className="flex flex-row flex-wrap gap-5">
      {user && user.interests.map((interest, i: number) => (
        <Button key={i}>{interest}</Button>

        ))}
      </div>
    </div>
  );
};

export default About;
