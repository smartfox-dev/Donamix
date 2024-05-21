import React from 'react';
import FeaturedMemberItem, {
    FeaturedMember,
} from '@/components/common/FeaturedMemberItem';
import FriendRequestItem, {
    FriendRequest,
} from '@/components/common/FriendRequestItem';
import ContactItem, {
    Contact,
} from '@/components/common/ContactItem';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import { FaChevronUp, FaEarthAmericas } from 'react-icons/fa6';
import Tag from '@/components/common/Tag';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import YouTube from 'react-youtube';
import { getFriends } from '@/api/users';
import CONSTANTS from '@/config/constants';
import toast from 'react-hot-toast';

import { Advertise } from '@/lib/validation/advertise';
import { getVideoData } from '@/api/advertise';

interface IRightSidebarProps {
    open?: boolean;
}

const featuredMembers: FeaturedMember[] = [
    {
        avatar: '/images/avatar_1.jpg',
        name: 'John Walton',
        role: 'Moderator',
    },
    {
        avatar: '/images/avatar_2.jpg',
        name: 'Monica Randawa',
        role: 'VIP',
    },
    {
        avatar: '/images/avatar_3.jpg',
        name: 'Innoxent Jay',
        role: 'VIP',
    },
    {
        avatar: '/images/avatar_1.jpg',
        name: 'John Walton',
        role: 'Moderator',
    },
    {
        avatar: '/images/avatar_2.jpg',
        name: 'Monica Randawa',
        role: 'VIP',
    },
    {
        avatar: '/images/avatar_3.jpg',
        name: 'Innoxent Jay',
        role: 'VIP',
    },
];



const friendRequests: FriendRequest[] = [
    {
        avatar: '/images/avatar_1.jpg',
        name: 'John Walton',
        role: 'VIP',
        createdAt: '2 days ago',
        mutualFriends: 12,
    },
    {
        avatar: '/images/avatar_2.jpg',
        name: 'Monica Randawa',
        role: 'VIP',
        createdAt: '2 days ago',
        mutualFriends: 12,
    },
    {
        avatar: '/images/avatar_3.jpg',
        name: 'Innoxent Jay',
        role: 'VIP',
        createdAt: '2 days ago',
        mutualFriends: 12,
    },
];

const RightSidebar: React.FC<IRightSidebarProps> = ({ open }) => {
    const { user } = useAuthContext();
    const [videoPlay, setVideoPlay] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [videoData, setVideoData] = useState<Advertise[]>([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentVideo, setCurrentVideo] = useState<Advertise>({});
    const opts = {
        height: '200',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
    const handlePlay = () => {
        setVideoPlay(true);
    }
    const handleVideoEnd = () => {
        setVideoPlay(false);
    }

    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/profile/userprofile');
    }

    const load = () => {
        getVideoData()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        console.log("===video_data:", res.data)
                        setVideoData(res.data);
                        setCurrentVideo(res.data[0]);
                    }
                }
            })
            .catch((err) => {
                console.log("Error while loding feed", err)
            })

        getFriends()
            .then((res) => {
                if (res.code == CONSTANTS.SUCCESS) {
                    setContacts(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
                console.error('Failed Load!')
            })
    }

    useEffect(() => {
        load()
    }, [])

    const handleVideoChange = () => {
        const newIndex = (currentIndex + 1) % videoData.length;
        setCurrentIndex(newIndex);
        console.log("====newIndex1:", newIndex)
        setCurrentVideo(videoData[newIndex]);
    };


    useEffect(() => {
        if (videoData?.length) {
            handleVideoChange();
        }
    }, [videoData])

    return (
        <div
            className={cn(
                'w-full max-w-[400px] bg-dashboard-background',
                open === false ? 'hidden' : 'block'
            )}
        >
            <div className="relative px-6 pt-5 pb-9 bg-white">
                <div className="flex flex-row items-center gap-2 p-2 cursor-pointer" onClick={() => { navigate('/advertise') }}>
                    <div className="font-montserrat font-bold text-sm text-[#9F9F9F]">Sponsored</div>
                    <FaEarthAmericas className="cursor-pointer" />
                </div>
                <div className='h-[200px]'>
                    {currentVideo?.urls ?
                        <div className='h-full'>
                            {videoData.map((item, index) => (
                                <video
                                    key={index}
                                    src={JSON.parse(item?.urls)[0]}
                                    controls
                                    muted
                                    autoPlay
                                    className={`w-full h-full ${index === currentIndex ? '' : 'hidden'}`}
                                    onEnded={() => handleVideoChange()}
                                />
                            ))}
                        </div>
                        :
                        <div>
                            <div className=" bg-cover w-full h-[200px] bg-center rounded-t-2xl" style={{ backgroundImage: 'url(/images/video-cover.png)' }}></div>
                            <AiFillPlayCircle
                                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white opacity-40 cursor-pointer hover:scale-105 w-[100px] h-[100px] rounded-full ${videoPlay ? 'hidden' : 'block'}`}
                            />
                        </div>
                    }
                </div>
                <button onClick={() => { window.open(currentVideo?.site_url, '_blank') }} className='mt-5 w-full border-[2px] rounded-2xl px-[20px] py-[10px] font-bold hover:bg-[#D9D9D9]'>{currentVideo?.button ? currentVideo?.button : "Show Now"}</button>
            </div>

            <div className="px-6 py-6 mt-5 lg:mt-10 bg-[#f2f2f2] rounded-t-2xl">
                <div className="flex gap-4">
                    <Avatar user={user} className="w-[50px] h-[50px]" onClick={handleOnClick} />
                    <div>
                        <h6 className="font-bold text-[#151515]">{user?.name}</h6>
                        <a href="/profile/edit" className="text-[#959595] font-semibold text-xs">
                            Edit Profile
                        </a>
                    </div>
                </div>
                <div className="flex mt-5 justify-evenly">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="flex flex-col items-center gap-2 bg-transparent border-none">
                                <p className="text-base font-extrabold text-black">160</p>
                                <p className="text-xs text-[#151515] opacity-[0.63] font-semibold">
                                    Your dail connection requests!
                                </p>
                            </TooltipTrigger>
                            <TooltipContent className="text-white bg-black">
                                <p>Growing Connections</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="flex flex-col items-center gap-2 bg-transparent border-none">
                                <p className="text-base font-extrabold text-black">10</p>
                                <p className="text-xs text-[#151515] opacity-[0.63] font-semibold">
                                    Your daily tally of gifts!
                                </p>
                            </TooltipTrigger>
                            <TooltipContent className="text-white bg-black">
                                <p>Daily surprise</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex items-center justify-between gap-4 px-8 py-4 mt-5 bg-white rounded-md">
                    <p className="font-semibold text-[#515151]">Wallet</p>
                    <div className="flex gap-1">
                        <img src="/images/money.svg" width={24} height={24} />
                        <p className="text-[#515151] font-semibold font-inter">
                            1600
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-6 py-6 mt-5 bg-white lg:mt-10 rounded-t-2xl">
                <h4 className="text-lg text-[#B5B5B5] font-semibold font-inter">
                    Trending Topics
                </h4>
                <div className="flex flex-wrap gap-2 mt-4">
                    <Tag>#Donamix</Tag>
                    <Tag>#DDD</Tag>
                    <Tag>#Cookieclicker</Tag>
                    <Tag>#inside</Tag>
                    <Tag>#hashtag</Tag>
                </div>
            </div>
            <div className="px-6 py-6 mt-5 bg-white lg:mt-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg text-[#B5B5B5] font-semibold font-inter">
                        Online Members
                    </h4>
                    <Button
                        className="bg-[#F4F4F4] rounded-full h-[30px] text-[13px] font-inter"
                        variant="ghost"
                    >
                        See all
                    </Button>
                </div>
                <div className="flex flex-row gap-3 mt-6">
                    {featuredMembers.map((item, i) => (
                        <Avatar key={i} user={item} onClick={handleOnClick} />
                    ))}
                </div>
            </div>
            <div className="px-6 py-6 mt-5 bg-white lg:mt-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg text-[#B5B5B5] font-semibold font-inter">
                        Featured Members
                    </h4>
                    <Button
                        className="bg-[#F4F4F4] rounded-full h-[30px] text-[13px] font-inter"
                        variant="ghost"
                        onClick={() => { navigate('/upgraded-users') }}
                    >
                        See all
                    </Button>
                </div>
                <div className="flex flex-col gap-6 mt-6">
                    {featuredMembers.map((item, i) => (
                        <FeaturedMemberItem key={`featured-member-${i}`} item={item} />
                    ))}
                </div>
            </div>

            <div className="relative px-6 py-6 mt-5 bg-white lg:mt-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg text-[#B5B5B5] font-semibold font-inter">
                        Connection Requests
                    </h4>
                    <Button
                        className="bg-[#F4F4F4] rounded-full h-[30px] text-[13px] font-inter"
                        variant="ghost"
                    >
                        See all
                    </Button>
                </div>
                <div className="flex flex-col gap-6 mt-6">
                    {friendRequests.map((item, i) => (
                        <FriendRequestItem key={`featured-member-${i}`} item={item} />
                    ))}
                </div>
                <div className="absolute flex justify-center w-[340px] -bottom-4">
                    <Button
                        className="h-8 gap-2 rounded-full"
                        onClick={() => {
                            console.log(document.scrollingElement?.scrollTop)
                            document.scrollingElement?.scroll({
                                left: 0,
                                top: 0,
                                behavior: "smooth"
                            })
                        }}
                    >
                        <FaChevronUp />
                        <a className="text-[10px] font-white font-bold font-montserrat">
                            Move to Top
                        </a>
                    </Button>
                </div>
            </div>
            <div className="relative px-6 py-6 mt-5 bg-white lg:mt-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg text-[#B5B5B5] font-semibold font-inter">
                        Contacts
                    </h4>
                    <Button onClick={() => { navigate('/contacts') }}
                        className="bg-[#F4F4F4] rounded-full h-[30px] text-[13px] font-inter"
                        variant="ghost"
                    >
                        See all
                    </Button>
                </div>
                <div className="flex flex-col gap-6 mt-6">
                    {contacts.map((item, i) => (
                        <ContactItem key={`contact-${i}`} item={item} />
                    ))}
                </div>
                <div className="absolute flex justify-center w-[340px] -bottom-4">
                    <Button
                        className="h-8 gap-2 rounded-full"
                        onClick={() => {
                            console.log(document.scrollingElement?.scrollTop)
                            document.scrollingElement?.scroll({
                                left: 0,
                                top: 0,
                                behavior: "smooth"
                            })
                        }}
                    >
                        <FaChevronUp />
                        <a className="text-[10px] font-white font-bold font-montserrat">
                            Move to Top
                        </a>
                    </Button>
                </div>
            </div>
            <div className="relative px-6 py-10 bg-white mt-[40px] rounded-t-2xl">
                {videoPlay ? (
                    // <YouTube
                    //     videoId='AO40ZlEuyH4?si=5pZ5jeyS39Auf9EU'
                    //     opts={opts}
                    //     onReady={(event) => {
                    //         // access to player in all event handlers via event.target
                    //         event.target.playVideo();
                    //     }}
                    // />
                    <iframe
                        src="/Donamix Explained _ Unlock the Power of Social Connection.mp4"
                        className="w-full h-[200px]"
                        onEnded={handleVideoEnd}>
                    </iframe>
                ) : (
                    <div className=" bg-cover w-full h-[200px] bg-center rounded-t-2xl" style={{ backgroundImage: 'url(/images/video-cover.png)' }}></div>
                )}
                <AiFillPlayCircle onClick={handlePlay} className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white opacity-40 cursor-pointer hover:scale-105 w-[100px] h-[100px] rounded-full ${videoPlay ? 'hidden' : 'block'}`} />
            </div>
        </div>
    );
};

export default RightSidebar;
