import React, { useEffect } from 'react';
import {
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
    BsAndroid2,
    BsApple,
    BsFillCalendarCheckFill,
    BsGridFill,
    BsPeopleFill,
    BsPlayCircleFill,
} from 'react-icons/bs';

import { FaHandsHelping, FaShoppingBasket } from 'react-icons/fa';
import { IoClose, IoDiamondOutline } from 'react-icons/io5';
import { MdForum } from "react-icons/md";
import CONSTANTS from '@/config/constants';

import { Button } from '@/components/ui/button';
import { FaEarthAmericas, FaRadio } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi2';
import { LiaHandPaper } from 'react-icons/lia';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Advertise } from '@/lib/validation/advertise';
import { getSidebarData } from '@/api/advertise';

type ISidebarMenuItemProps = {
    selected: boolean;
    children: React.ReactNode;
    onSelect?: () => void;
    onClick?: () => void;
};
const SidebarMenuItem: React.FC<ISidebarMenuItemProps> = ({
    selected,
    children,
    onSelect,
}) => {

    return (
        <div
            className={cn(
                'w-full h-[80px] p-0 cursor-pointer hover:!text-black transition-all',
                selected === true ? 'bg-dashboard-background' : 'bg-white'
            )}
            onClick={onSelect}
        >
            <div className="h-2 bg-white rounded-br-full"></div>
            <div className="relative w-full h-[64px]">
                <div className="absolute top-0 left-0 z-0 w-10 h-full bg-white"></div>
                <div className="w-full h-full px-2">
                    <div
                        className={cn(
                            'rounded-full w-full h-full p-[6px] relative z-2 transition-all',
                            selected === true ? 'bg-dashboard-background' : 'bg-white'
                        )}
                    >
                        <div
                            className={cn(
                                'bg-white rounded-full h-full flex items-center gap-3 px-4 py-2 font-montserrat hover:text-black hover:font-bold transition-all',
                                selected === true ? 'text-black font-bold' : 'text-[#828282]'
                            )}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-2 bg-white rounded-tr-full"></div>
        </div>
    );
};
const LeftSidebar = ({ onStateChange }) => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [isExpanded, setExpanded] = useState(onStateChange);
    const [open, setOpen] = useState<boolean>(false);
    const [sidebarData, setSidebarData] = useState<Advertise[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSidebar, setCurrentSidebar] = useState<Advertise>({});

    const navigate = useNavigate();
    const gotoNearby = () => navigate('/feed/nearby');
    const gotoWaitList = () => navigate('/waitlist');
    const gotoMarketplace = () => navigate('/marketplace');
    const gotoVideo = () => navigate('/feed/video');
    const gotoChatroomList = () => navigate('/chatrooms');
    const gotoInbox = () => navigate('/inbox');
    const gotoUpgrade = () => navigate('/upgrade');
    const gotoForum = () => navigate('/forum');
    const gotoJobs = () => navigate('/jobs');
    const gotoGroups = () => navigate('/group');
    const gotoBlog = () => navigate('/blog');
    const gotoHome = () => navigate('/');
    const gotoAdvertising = () => navigate('/advertise')
    const handleBlog = () => {
        setSelectedMenu(8);
        gotoBlog();
    }
    const handleFeed = () => {
        setSelectedMenu(0);
        gotoHome();
    }
    const handleChatroomList = () => {
        setSelectedMenu(1);
        gotoChatroomList();
    }
    const handleNearby = () => {
        setSelectedMenu(2);
        gotoNearby();
    }
    const handleMarketplace = () => {
        setSelectedMenu(3);
        gotoMarketplace();
    }

    const handleForum = () => {
        setSelectedMenu(16)
        gotoForum()
    }
    const handleJobs = () => {
        setSelectedMenu(9)
        gotoJobs()
    }
    const handleGroups = () => {
        setSelectedMenu(12)
        gotoGroups()
    }

    const handleVideo = () => {
        setSelectedMenu(7);
        gotoVideo();
    }


    const handleInbox = () => {
        setSelectedMenu(5);
        gotoInbox();
    }

    const handleUpgrade = () => {
        setSelectedMenu(16);
        gotoUpgrade();
    }

    const load = () => {
        getSidebarData()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        setSidebarData(res.data);
                        setCurrentSidebar(res.data[0]);
                    }
                }
            })
            .catch((err) => {
                console.log("Error while loding sidebar", err)
            })

    }
    useEffect(() => {
        load();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((preIndex) => {
                const newIndex = (preIndex + 1) % sidebarData.length;
                setCurrentSidebar(sidebarData[newIndex]);
                return newIndex;
            })
        }, 15000)

        return () => clearInterval(interval)
    }, [sidebarData])
    return (
        <aside
            id="left-sidebar"
            className={cn(
                'w-[230px] absolute left-0 top-0 2xl:relative bg-transparent -translate-x-[230px] 2xl:!translate-x-0 transition-all z-50',
                open === false ? '-translate-x-[230px]' : 'translate-x-0'
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
            <div className="w-full pt-[22px] pb-4 bg-white rounded-br-lg">
                <div className="w-full bg-transparent">
                    <SidebarMenuItem
                        selected={selectedMenu === 0}
                        onSelect={handleFeed}
                    >
                        <big>
                            <BsGridFill />
                        </big>
                        Feed
                    </SidebarMenuItem>
                    <SidebarMenuItem
                        selected={selectedMenu === 1}
                        onSelect={handleChatroomList}
                    >
                        <big>
                            <BiSolidMessageRoundedDetail />
                        </big>
                        Conversations
                    </SidebarMenuItem>
                    <SidebarMenuItem
                        selected={selectedMenu === 2}
                        onSelect={handleNearby}
                    >
                        <big>
                            <BsPeopleFill />
                        </big>
                        Local Network
                    </SidebarMenuItem>
                    <SidebarMenuItem
                        selected={selectedMenu === 3}
                        onSelect={handleMarketplace}
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
                        Connections
                    </SidebarMenuItem>
                    <SidebarMenuItem
                        selected={selectedMenu === 5}
                        onSelect={handleInbox}
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
                        onSelect={handleVideo}
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
                                onSelect={handleBlog}
                            >
                                <big>
                                    <BiSolidCalendarEdit />
                                </big>
                                Blogs
                            </SidebarMenuItem>
                            <SidebarMenuItem
                                selected={selectedMenu === 16}
                                onSelect={handleForum}
                            >
                                <big>
                                    <MdForum />
                                </big>
                                Forums
                            </SidebarMenuItem>
                            <SidebarMenuItem
                                selected={selectedMenu === 9}
                                onSelect={handleJobs}
                            >
                                <big>
                                    <BiSolidShoppingBag />
                                </big>
                                Jobs
                            </SidebarMenuItem>
                            {/* <SidebarMenuItem
                                selected={selectedMenu === 10}
                                onSelect={() => setSelectedMenu(10)}
                            >
                                <big>
                                    <FaRadio />
                                </big>
                                Radio
                            </SidebarMenuItem> */}
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
                                onSelect={handleGroups}
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
            </div>

            <div className="w-full py-4 mt-8 bg-white rounded-r-lg">
                <big className="p-5">Settings</big>
                <SidebarMenuItem selected={selectedMenu === 14} onSelect={() => setSelectedMenu(14)}>
                    <big>
                        <BiUser />
                    </big>
                    Account
                </SidebarMenuItem>
                <SidebarMenuItem selected={selectedMenu === 15} onSelect={() => setSelectedMenu(15)}>
                    <big>
                        <LiaHandPaper />
                    </big>
                    Privacy
                </SidebarMenuItem>
                <SidebarMenuItem selected={selectedMenu === 16} onSelect={handleUpgrade}>
                    <big>
                        <IoDiamondOutline />
                    </big>
                    Upgrade
                </SidebarMenuItem>
            </div>

            <div className="w-full p-4 mt-8 bg-white rounded-r-lg cursor-pointer">
                <div className="flex flex-row items-center gap-2 p-2 cursor-pointer" onClick={() => {navigate('/advertise')}}>
                    <div className="font-montserrat font-bold text-sm text-[#9F9F9F]">Sponsored</div>
                    <FaEarthAmericas className="cursor-pointer" />
                </div>
                {sidebarData && sidebarData.map((item, index) => (
                    <img
                        src={JSON.parse(item?.urls)[0]}
                        key={index}
                        width="100%"
                        height="100%"
                        className={index === currentIndex ? '' : 'hidden'}
                    />
                ))}
                <button onClick={() => { window.open(currentSidebar?.site_url, '_blank') }} className='mt-5 w-full border-[2px] rounded-2xl px-[20px] py-[10px] font-bold hover:bg-[#D9D9D9]'>{currentSidebar?.button ? currentSidebar?.button : "Show Now"}</button>
                {/* <img src="/images/big_sale.png" width="100%" height="100%" /> */}
            </div>

            <div className="w-full py-[40px] px-[6px] flex flex-col items-center gap-3 bg-white rounded-tr-lg mt-8">
                <img src="/images/get_the_app.png" width="100%" height="100%" />
                <p className="text-xs font-bold">Get the app</p>
                <div className="flex gap-3">
                    <Button variant="default" size="icon" onClick={gotoWaitList}>
                        <BsApple />
                    </Button>
                    <Button variant="default" size="icon" onClick={gotoWaitList}>
                        <BsAndroid2 />
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default LeftSidebar;
