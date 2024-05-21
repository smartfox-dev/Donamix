import React, { useEffect } from 'react';
import {
  BiSolidInfoCircle,
  BiBlock,

  BiMenu,
  BiSolidCalendarEdit,
  BiSolidChevronDownCircle,
  BiSolidChevronUpCircle,
  BiSolidImage,
  BiSolidMessageDots,
  BiSolidMessageRoundedDetail,
  BiSolidShoppingBag,
  BiSolidVideo,
  BiUser,
} from 'react-icons/bi';
import {
  BsFillHeartFill,
  BsPersonCircle,

  BsAndroid2,
  BsApple,
  BsFillCalendarCheckFill,
  BsGridFill,
  BsPeopleFill,
  BsPlayCircleFill,
} from 'react-icons/bs';

import {
  RiGraduationCapFill,
  RiLockPasswordFill
} from "react-icons/ri";
import { PiNutFill } from "react-icons/pi";

import { FaHandsHelping, FaShoppingBasket } from 'react-icons/fa';
import { IoClose, IoDiamondOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { FaRadio, FaBook } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi2';
import { LiaHandPaper } from 'react-icons/lia';
import { cn } from '@/lib/utils';
import { useState, useContext } from 'react';
import FileUpload from '@/components/common/FileUpload';
import { useAuthContext } from '@/context/AuthContext';
import { getProfile, getIDProfile } from '@/api/users';
import CONSTANTS, { Option } from '@/config/constants';
import { User } from '@/lib/validation/user';
import Avatar from '@/components/common/Avatar';


type ISidebarMenuItemProps = {
  selected: boolean;
  children: React.ReactNode;
  onSelect?: () => void;
};
const SidebarMenuItem: React.FC<ISidebarMenuItemProps> = ({
  selected,
  children,
  onSelect,
}) => {
  return (
    <div
      className="w-full h-[80px] p-0 cursor-pointer hover:!text-black transition-all bg-white"
      onClick={onSelect}
    >
      <div
        className={cn(
          'bg-white h-full flex items-center gap-8 px-4 py-2 font-poppins text-xl hover:text-black transition-all',
          selected === true ? 'text-black font-medium' : 'text-[#828282] font-medium'
        )}
      >
        {children}
      </div>
    </div>
  );
};

const LeftSidebar = ({ onStateChange, userid, username }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isExpanded, setExpanded] = useState(onStateChange);
  const [open, setOpen] = useState<boolean>(false);
  const { user, reload } = useAuthContext();
  const [profile, setProfile] = useState<User | null>(null);

  const load = () => {
    if (username != '') {
      getProfile(username)
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            if (res.data) {
              setProfile(res.data);
            }
          }
        })
        .catch((err) => {
          console.warn('Error while loading blogs', err);
        })
        .finally(() => {

        });
    }
    else {
      getIDProfile(user?.id)
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            if (res.data) {
              setProfile(res.data);
            }
          }
        })
        .catch((err) => {
          console.warn('Error while loading blogs', err);
        })
        .finally(() => {

        });
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <aside
      id="left-sidebar"
      className={cn(
        'w-[354px] absolute left-0 top-0 2xl:relative bg-transparent -translate-x-[230px] 2xl:!translate-x-0 transition-all z-50',
        open === false ? '-translate-x-[354px]' : 'translate-x-0'
      )}
    >
      <div
        className="absolute top-0 block bg-white 2xl:hidden left-full text-[30px] -translate-x-2 pl-2 rounded-br-md hover:text-gray-600 cursor-pointer select-none"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {open === true ? <IoClose /> : <BiMenu />}
      </div>
      <div className="w-full h-full pb-4 bg-white">
        <div className="w-full bg-transparent">
          <div className="flex flex-col items-center -translate-y-[120%] translate-x-48 lg:-translate-y-1/3 lg:translate-x-0">
            <div className="w-[170px] h-[170px] rounded-full bg-gray-700">
              <Avatar
                className="w-full h-full text-[40px] font-bold border-white border-4 p-0 !important"
                user={profile}
              ></Avatar>
            </div>
            <div className=" flex-col items-center hidden gap-1 lg:flex">
              <h4 className="text-black font-inter text-[21px] font-bold mt-4">
                {profile?.name}
              </h4>
              <h5 className="text-[#818181] font-medium text-lg font-inter">
                {profile?.username}
              </h5>
            </div>
          </div>
          <div className="pl-8">
            <SidebarMenuItem
              selected={selectedMenu === 0}
              onSelect={() => setSelectedMenu(0)}
            >
              <big>
                <BsGridFill />
              </big>
              My Newsfeed
            </SidebarMenuItem>
            <SidebarMenuItem
              selected={selectedMenu === 1}
              onSelect={() => setSelectedMenu(1)}
            >
              <big>
                <BiSolidMessageRoundedDetail />
              </big>
              Chatrooms
            </SidebarMenuItem>
            <SidebarMenuItem
              selected={selectedMenu === 2}
              onSelect={() => setSelectedMenu(2)}
            >
              <big>
                <BsPeopleFill />
              </big>
              People Nearby
            </SidebarMenuItem>
            <SidebarMenuItem
              selected={selectedMenu === 3}
              onSelect={() => setSelectedMenu(3)}
            >
              <big>
                <FaShoppingBasket />
              </big>
              Marketplace
            </SidebarMenuItem>
            <SidebarMenuItem
              selected={selectedMenu === 4}
              onSelect={() => setSelectedMenu(4)}
            >
              <big>
                <FaHandsHelping />
              </big>
              Friends
            </SidebarMenuItem>
            <SidebarMenuItem
              selected={selectedMenu === 5}
              onSelect={() => setSelectedMenu(5)}
            >
              <big>
                <BiSolidMessageDots />
              </big>
              Inbox
            </SidebarMenuItem>
            <SidebarMenuItem
              selected={selectedMenu === 6}
              onSelect={() => setSelectedMenu(6)}
            >
              <big>
                <BiSolidImage />
              </big>
              Images
            </SidebarMenuItem>
            <SidebarMenuItem
              selected={selectedMenu === 7}
              onSelect={() => setSelectedMenu(7)}
            >
              <big>
                <BsPlayCircleFill />
              </big>
              Videos
            </SidebarMenuItem>
            {isExpanded === false ? (
              <SidebarMenuItem
                selected={false}
                onSelect={() => setExpanded(true)}
              >
                <big>
                  <BiSolidChevronDownCircle />
                </big>
                See More
              </SidebarMenuItem>
            ) : (
              <div className="transition-all ease-in-out fade-in-30">
                <SidebarMenuItem
                  selected={selectedMenu === 8}
                  onSelect={() => setSelectedMenu(8)}
                >
                  <big>
                    <BiSolidCalendarEdit />
                  </big>
                  Blogs
                </SidebarMenuItem>
                <SidebarMenuItem
                  selected={selectedMenu === 9}
                  onSelect={() => setSelectedMenu(9)}
                >
                  <big>
                    <BiSolidShoppingBag />
                  </big>
                  Jobs
                </SidebarMenuItem>
                <SidebarMenuItem
                  selected={selectedMenu === 10}
                  onSelect={() => setSelectedMenu(10)}
                >
                  <big>
                    <FaRadio />
                  </big>
                  Radio
                </SidebarMenuItem>
                <SidebarMenuItem
                  selected={selectedMenu === 11}
                  onSelect={() => setSelectedMenu(11)}
                >
                  <big>
                    <BiSolidVideo />
                  </big>
                  Live Streams
                </SidebarMenuItem>
                <SidebarMenuItem
                  selected={selectedMenu === 12}
                  onSelect={() => setSelectedMenu(12)}
                >
                  <big>
                    <HiUserGroup />
                  </big>
                  Groups
                </SidebarMenuItem>
                <SidebarMenuItem
                  selected={selectedMenu === 13}
                  onSelect={() => setSelectedMenu(13)}
                >
                  <big>
                    <BsFillCalendarCheckFill />
                  </big>
                  Events
                </SidebarMenuItem>
                <SidebarMenuItem
                  selected={false}
                  onSelect={() => setExpanded(false)}
                >
                  <big>
                    <BiSolidChevronUpCircle />
                  </big>
                  See Less
                </SidebarMenuItem>
              </div>
            )}
          </div>
          {/* {isExpanded === false ? (
            <SidebarMenuItem
              selected={false}
              onSelect={() => setExpanded(true)}
            >
              <big>
                <BiSolidChevronDownCircle />
              </big>
              See More
            </SidebarMenuItem>
          ) : (
            <div className="transition-all ease-in-out fade-in-30">
              <SidebarMenuItem
                selected={selectedMenu === 8}
                onSelect={() => setSelectedMenu(8)}
              >
                <big>
                  <BiSolidCalendarEdit />
                </big>
                Blogs
              </SidebarMenuItem>
              <SidebarMenuItem
                selected={selectedMenu === 9}
                onSelect={() => setSelectedMenu(9)}
              >
                <big>
                  <BiSolidShoppingBag />
                </big>
                Jobs
              </SidebarMenuItem>
              <SidebarMenuItem
                selected={selectedMenu === 10}
                onSelect={() => setSelectedMenu(10)}
              >
                <big>
                  <FaRadio />
                </big>
                Radio
              </SidebarMenuItem>
              <SidebarMenuItem
                selected={selectedMenu === 11}
                onSelect={() => setSelectedMenu(11)}
              >
                <big>
                  <BiSolidVideo />
                </big>
                Live Streams
              </SidebarMenuItem>
              <SidebarMenuItem
                selected={selectedMenu === 12}
                onSelect={() => setSelectedMenu(12)}
              >
                <big>
                  <HiUserGroup />
                </big>
                Groups
              </SidebarMenuItem>
              <SidebarMenuItem
                selected={selectedMenu === 13}
                onSelect={() => setSelectedMenu(13)}
              >
                <big>
                  <BsFillCalendarCheckFill />
                </big>
                Events
              </SidebarMenuItem>
              <SidebarMenuItem
                selected={false}
                onSelect={() => setExpanded(false)}
              >
                <big>
                  <BiSolidChevronUpCircle />
                </big>
                See Less
              </SidebarMenuItem>
            </div>
          )} */}
        </div>
      </div>

      {/* <div className="w-full py-4 mt-8 bg-white rounded-r-lg">
        <big className="p-5">Settings</big>
        <SidebarMenuItem selected={false} onSelect={() => setSelectedMenu(13)}>
          <big>
            <BiUser />
          </big>
          Account
        </SidebarMenuItem>
        <SidebarMenuItem selected={false} onSelect={() => setSelectedMenu(14)}>
          <big>
            <LiaHandPaper />
          </big>
          Privacy
        </SidebarMenuItem>
        <SidebarMenuItem selected={false} onSelect={() => setSelectedMenu(15)}>
          <big>
            <IoDiamondOutline />
          </big>
          Upgrade
        </SidebarMenuItem>
      </div> */}
    </aside>
  );
};

export default LeftSidebar;
