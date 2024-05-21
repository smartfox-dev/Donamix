import React, { useEffect, useState } from 'react';
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
import { logout } from '@/api/chat';
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
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';

import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InboxPopup from './InboxPopup';
import NotificationPopup from './NotificationPopup';
import InvitePopup from './InvitePopup';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const gotoHome = () => navigate('/');
    const gotoBlog = () => navigate('/blog');
    const gotoMyBlog = () => navigate('/myblog');
    const gotoViewProfile = () => navigate('/profile/edit/?page=about');
    const gotoEditProfile = () =>  navigate('/profile/edit/?page=info');
    const gotoDownload = () => navigate('/feed/download');
    const gotoNearby = () => navigate('/feed/nearby');
    const gotoForum = () => navigate('/forum');
    const gotoSearch = () => navigate('/feed/search');
    const gotoMarketplace = () => navigate('/marketplace');
    const gotoUpgradedusers = () => navigate('/upgraded-users');
    const gotoContacts = () => navigate('/contacts');
    const gotoMyMarketplace = () => navigate('/marketplace');
    const gotoVideo = () => navigate('/feed/video');
    const gotoMyGroups = () => navigate('/group/edit/?page=info')
    const gotoChatroomList = () => navigate('/chatrooms');
    const gotoInbox = () => navigate('/inbox');
    const gotoJob = () => navigate('/jobs');
    const gotoGroup = () => navigate('/group');
    const [searchKey, setSearchKey] = useState('')

    const handleChange = (e: any) => {
        setSearchKey(e.target.value)
    }

    const performSearch = () => {
        navigate('/feed/search?key=' + searchKey);
    }

    const MobileNavs = (
        <Menu>
            <MenuHandler>
                <Button variant="secondary" size="icon">
                    <BiMenu />
                </Button>
            </MenuHandler>
            <MenuList className="text-base shadow-lg z-[9000] p-2">
                <MenuItem
                    onClick={gotoHome}
                >
                    Home
                </MenuItem>
                <Menu placement="right-start" offset={15}>
                    <MenuHandler>
                        <MenuItem className="flex justify-between">
                            Newsfeed
                            <BiChevronRight />
                        </MenuItem>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem>Newsfeed</MenuItem>
                        <MenuItem onClick={gotoInbox}>Inbox</MenuItem>
                        <MenuItem onClick={gotoVideo}>Videos</MenuItem>
                    </MenuList>
                </Menu>
                <Menu placement="right-start" offset={15}>
                    <MenuHandler>
                        <MenuItem className="flex justify-between">
                            My Profile
                            <BiChevronRight />
                        </MenuItem>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem onClick={gotoViewProfile}>View My Profile</MenuItem>
                        <MenuItem onClick={gotoEditProfile}>Edit Profile</MenuItem>
                        <MenuItem >My Blog</MenuItem>
                        <MenuItem onClick={gotoMyMarketplace}>My Marketplace</MenuItem>
                        <MenuItem onClick={gotoVideo}>My Videos</MenuItem>
                        <MenuItem>My Jobs</MenuItem>
                        <MenuItem>My Contacts</MenuItem>
                        <MenuItem>My Photos</MenuItem>
                        <MenuItem>My Gifts</MenuItem>
                    </MenuList>
                </Menu>
                <Menu placement="right-start" offset={15}>
                    <MenuHandler>
                        <MenuItem className="flex justify-between">
                            Communities
                            <BiChevronRight />
                        </MenuItem>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem onClick={gotoForum}>Forums</MenuItem>
                        <MenuItem onClick={gotoChatroomList}>Chatrooms</MenuItem>
                        <MenuItem onClick={gotoNearby}>Local Network</MenuItem>
                        <MenuItem>Chat Etiquette</MenuItem>
                        <MenuItem>Administration</MenuItem>
                    </MenuList>
                </Menu>
                <MenuItem onClick={gotoBlog}>Blog</MenuItem>
                <Menu placement="right-start" offset={15}>
                    <MenuHandler>
                        <MenuItem className="flex justify-between">
                            Explore
                            <BiChevronRight />
                        </MenuItem>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem>Trending Topics</MenuItem>
                        <MenuItem>Featured Users</MenuItem>
                        <MenuItem onClick={() => {navigate('/chat/admin')}}>Administration</MenuItem>
                        <MenuItem onClick={gotoMarketplace}>Marketplace</MenuItem>
                        <MenuItem>Browse</MenuItem>
                        {/* <MenuItem>Banners</MenuItem> */}
                        <MenuItem>Events</MenuItem>
                        <MenuItem>Groups</MenuItem>
                        <MenuItem onClick={gotoDownload}>Download</MenuItem>
                    </MenuList>
                </Menu>
            </MenuList>
        </Menu>
    );

    return (
        <div className="fixed top-0 left-0 w-screen px-[25px] z-[9000] bg-white h-[72px] flex items-center justify-between gap-5">
            {/* <div
        className="basis-[200px] min-w-[200px] min-h-[60px] bg-contain bg-center bg-no-repeat cursor-pointer" onClick={gotoHome}
        style={{ backgroundImage: 'url(/images/black_logo.png)' }}
      ></div> */}
            <>
                {/* Image for mobile and smaller screens */}
                <img
                    src="/images/black_logo.png"
                    alt="Logo"
                    className="hidden sm:block basis-[200px] min-w-[200px] min-h-[60px] bg-contain bg-center bg-no-repeat cursor-pointer"
                    onClick={gotoHome}
                />

                {/* Image for sm screens and larger */}
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="block sm:hidden basis-[70px] min-w-[50px] min-h-[50px] bg-contain bg-center bg-no-repeat cursor-pointer"
                    onClick={gotoHome}
                />
            </>

            <div className="flex-1 xl:hidden">{MobileNavs}</div>
            <div className="hidden gap-0 xl:flex xl:justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
                            onClick={gotoHome}
                        >
                            Home
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
                        >
                            Newsfeed
                            <BiChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 z-[9000] !font-montserrat !text-[13.24px]">
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
                            <span>Newsfeed</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoInbox}>
                            <span>Inbox</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
                            <span>Images</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoVideo}>
                            <span>Videos</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
                        >
                            My Profile
                            <BiChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 z-[9000]">
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoViewProfile}>
                            <span>View My Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="font-montserrat font-medium text-[13.24px]"
                            onClick={() => {
                                navigate('/profile/edit/?page=info');
                            }}
                        >
                            <span>Edit Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={gotoMyBlog} className="font-montserrat font-medium text-[13.24px]">
                            <span>My Blog</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoMyMarketplace}>
                            <span>My Marketplace</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
                            <span>My Jobs</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoContacts}>
                            <span>My Contacts</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
                            <span>My Photos</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
                            <span>My Gifts</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoMyGroups}>
                            <span>My Groups</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
                        >
                            Communities
                            <BiChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 z-[9000]">
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoForum}>
                            <span>Forums</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoChatroomList}>
                            <span>Chatrooms</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={gotoNearby}>
                            <span>Local Network</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={() => navigate('/chat/rules')}>
                            <span>Chat Etiquette</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]" onClick={() => navigate('/chat/admin')}>
                            <span>Administration</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
                            onClick={gotoBlog}
                        >
                            Blog
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-black font-montserrat font-semibold text-[13.24px]"
                        >
                            Explore
                            <BiChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 z-[9000]">
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
                            <span>Trending Topics</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={gotoUpgradedusers} className="font-montserrat font-medium text-[13.24px]">
                            <span>Highlighted Profiles</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={gotoMarketplace} className="font-montserrat font-medium text-[13.24px]">
                            <span>Marketplace</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
                            <span>Browse</span>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
              <span>Banners</span>
            </DropdownMenuItem> */}
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px]">
                            <span>Events</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={gotoJob} className="font-montserrat font-medium text-[13.24px]">
                            <span>Jobs</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={gotoGroup} className="font-montserrat font-medium text-[13.24px]">
                            <span>Groups</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={gotoDownload} className="font-montserrat font-medium text-[13.24px]">
                            <span>Download</span>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
                <Popover placement="bottom">
                    <PopoverHandler>
                        <Button variant='ghost' className="flex items-center p-2  cursor-pointer">
                            <BiSearch className="text-[25px]" />
                        </Button>
                    </PopoverHandler>
                    <PopoverContent className="rounded-full drop-shadow-lg min-w-[200px] py-1 z-[10000]">
                        {/* <div className="shadow-lg rounded-full">   */}
                        <input placeholder='Type to search' type='text' className='text-sm h-[30px] min-w-[150px] p-2 border-none' onChange={handleChange}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    performSearch();
                                }
                            }}
                        />
                        {/* </div> */}
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex items-center gap-3">
                <InboxPopup>
                    <Button
                        className="rounded-full flex w-[30px] h-[30px]"
                        size="icon"
                    >
                        <BsFillChatSquareDotsFill />
                    </Button>
                </InboxPopup>
                <NotificationPopup>
                    <Button
                        className="rounded-full flex w-[30px] h-[30px]"
                        size="icon"
                    >
                        <BiSolidBell />
                    </Button>
                </NotificationPopup>
                {/* <Button
          className="hidden rounded-full md:flex w-[30px] h-[30px]"
          size="icon"
        >
          <BsPeopleFill />
        </Button> */}
                <Button className="hidden rounded-full md:flex w-[30px] h-[30px]" size="icon">
                    <BsMoonFill />
                </Button>
                <InvitePopup>
                    <Button className="hidden rounded-full md:flex w-[30px] h-[30px]" size="icon">
                        <BsFillShareFill />
                    </Button>
                </InvitePopup>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-2">
                            <Avatar
                                user={user}
                                className="w-[38px] h-[38px] border-2 border-[#DADADA]"
                            />
                            <div className="flex items-center gap-1 cursor-pointer select-none">
                                <p className="text-[#202020] font-montserrat font-bold text-xs hidden lg:block">
                                    {user?.name}
                                </p>
                                <BiChevronDown />
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-[9000]">
                        <DropdownMenuItem className="font-montserrat font-medium text-[13.24px] gap-2" onClick={(e) => {
                            navigate('/profile/edit/?page=settings')
                        }}>
                            <span className="text-base">
                                <TbNut />
                            </span>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <hr />
                        <DropdownMenuItem
                            className="font-montserrat font-medium text-[13.24px] gap-2"
                            onClick={() => {
                                logout()
                                    .then((res) => console.log('Success logout'))
                                    .catch((err) => console.log('error logout'))
                                navigate('/logout');
                            }}
                        >
                            <span className="text-base">
                                <BiLogOut />
                            </span>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Navbar;
