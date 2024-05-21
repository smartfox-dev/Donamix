import React from 'react';
import {
  BiChevronDown,
  BiChevronRight,
  BiLogOut,
  BiMenu,
  BiSearch,
  BiSolidBell,
} from 'react-icons/bi';
import { BsFillChatSquareDotsFill, BsPeopleFill, BsMoonFill, BsFillShareFill } from 'react-icons/bs';
import { TbNut } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';

import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const gotoHome = () => navigate('/help');
  const gotoBlog = () => navigate('/blog');
  const gotoMyBlog = () => navigate('/myblog');
  const gotoViewProfile = () => navigate('/profile/edit/?page=about');
  const gotoDownload = () => navigate('/dashboard/download');
  const gotoAboutus = () => navigate('/aboutus');

  return (
    <div className="fixed top-0 left-0 w-screen px-[25px] z-[9900] bg-white h-[72px] flex items-center justify-between gap-5">
      <div
        className="basis-[200px] w-[200px] h-[60px] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/black_logo.svg)' }}
        onClick={() => { navigate('/') }}
      ></div>

      <div className="hidden gap-0 xl:flex xl:justify-center">
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
          onClick={gotoAboutus}
        >
          About
        </Button>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
          onClick={() => { navigate('/faq') }}
        >
          Help Center
        </Button>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
          onClick={() => { navigate('/policy') }}
        >
          Privacy Policy
        </Button>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
          onClick={() => { navigate('/terms') }}
        >
          Terms & Service
        </Button>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
          onClick={() => { navigate('/advertise') }}
        >
          Advertising
        </Button>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
          onClick={() => { navigate('/conduct') }}
        >
          Community Guidelines
        </Button>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
          onClick={() => { navigate('/feed/download') }}
        >
          Download
        </Button>


      </div>
    </div>
  );
};

export default Navbar;
