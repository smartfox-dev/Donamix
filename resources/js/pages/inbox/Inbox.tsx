import React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
// import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import queryString from 'query-string'; // Install this package if it's not yet installed
import Carousel from 'react-multi-carousel';
import { getFriends } from '@/api/users';
import FeaturedMemberItem, {
    FeaturedMember,
} from '@/components/common/FeaturedMemberItem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';


import { FaCheckCircle } from "react-icons/fa";


import InboxLeftSidebar from './InboxLeftSidebar';
import InboxRoom from './InboxRoom';
import CONSTANTS from '@/config/constants';

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

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
        role: 'BLOGGER',
    },
    {
        avatar: '/images/avatar_3.jpg',
        name: 'Innoxent Jay',
        role: 'ADMIN',
    },
];

const Inbox = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const page = queryParams.page;
    const [list, setList] = useState(null)
    const [mobile, setMobile] = useState(true)
    const [isPrivateChat, setIsPrivateChat] = useState(false);

    const privateSelect = () => {
        setIsPrivateChat(true);
    };


    const load = () => {
        getFriends()
            .then((res) => {
                if (res.code == CONSTANTS.SUCCESS) {
                    setList(res.data)
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

    return (
        <div className='flex flex-col w-full p-10 gap-5'>
            <div className='flex lg:flex-row md:flex-row sm:flex-row flex-col w-full'>
                {!isMobileDevice()
                    ?
                    <>
                        <InboxLeftSidebar isPrivateChat={isPrivateChat} setIsPrivateChat={setIsPrivateChat} />
                        <InboxRoom isPrivateChat={isPrivateChat} setIsPrivateChat={setIsPrivateChat} />
                    </>
                    :
                    (mobile ?
                        <InboxLeftSidebar isPrivateChat={isPrivateChat} setMobile={setMobile} setIsPrivateChat={setIsPrivateChat} />
                        :
                        <InboxRoom isPrivateChat={isPrivateChat} setMobile={setMobile} setIsPrivateChat={setIsPrivateChat} />)
                }

            </div>
            <div className='w-full flex flex-col gap-5 overflow-hidden mt-11 sm:mt-0'>
                <p className='font-inter font-semibold text-lg'>Featured Members</p>
                <div className='w-full overflow-hidden'>
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className="w-full mt-3 overflow-hidden gap-2 max-w-7xl mr-auto ml-auto"
                        containerClass=""
                        dotListClass=""
                        draggable={false}
                        focusOnSelect={false}
                        infinite={false}
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        partialVisible
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktopxl: {
                                breakpoint: {
                                    max: 3000,
                                    min: 2400,
                                },
                                items: 7,
                            },
                            desktoplg: {
                                breakpoint: {
                                    max: 2400,
                                    min: 1800,
                                },
                                items: 5,
                            },
                            desktop: {
                                breakpoint: {
                                    max: 1800,
                                    min: 1400,
                                },
                                items: 4,
                            },
                            mobilelg: {
                                breakpoint: {
                                    max: 1100,
                                    min: 960,
                                },
                                items: 4,
                            },
                            mobilemd: {
                                breakpoint: {
                                    max: 960,
                                    min: 850,
                                },
                                items: 3,
                            },
                            mobilesm: {
                                breakpoint: {
                                    max: 850,
                                    min: 650,
                                },
                                items: 2,
                            },
                            mobilexs: {
                                breakpoint: {
                                    max: 650,
                                    min: 0,
                                },
                                items: 1,
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1400,
                                    min: 1100,
                                },
                                items: 4,
                            },
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass="gap-2 overflow-hidden"
                        slidesToSlide={1}
                        swipeable
                    >
                        {featuredMembers.map((item, i) => (
                            <div className='p-2 flex flex-col gap-3 items-center w-[260px] rounded-t-xl bg-white'>
                                <Avatar className='w-[60px] h-[60px]'>
                                    <AvatarImage src={item.avatar} alt='' />
                                </Avatar>
                                <p className='font-poppins font-medium text-lg'>{item.name}</p>
                                <p className={cn('font-poppins text-lg font-medium', item.role === 'VIP' ? 'text-[#8874DC]' : item.role === 'Moderator' ? 'text-[#4C7737]' : item.role === 'BLOGGER' ? 'text-[#AAA]' : 'text-red-800')}>{item.role}</p>

                            </div>
                            //   key={`recent-blog-${i}`}
                            //   className="h-[200px]"
                            //   item={blog}
                            // ></FeaturedMemberItem>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Inbox;
