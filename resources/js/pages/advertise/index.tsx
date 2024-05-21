import React, { useState, useEffect } from 'react'
import LeftSidebar from '@/pages/dashboard/layout/LeftSidebar';
import RightSidebar from '@/pages/dashboard/layout/RightSidebar';
import { useAppContext } from '@/context/AppContext';
import Carousel from 'react-multi-carousel';
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import CustomLeftArrow from '@/components/custom/CustomLeftArrow';
import CustomRightArrow from '@/components/custom/CustomRightArrow';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Advertise() {
    const navigate = useNavigate();
    const { setIsLeftSidebarOpen } = useAppContext();
    const [users, setUsers] = useState(null)
    const [isLoad, setLoad] = useState(false)
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)

    const { isAuth, user } = useAuthContext();

    useEffect(() => {
        return () => setIsLeftSidebarOpen(true);
    }, []);

    return (
        <>
            <div className='w-full h-full relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0"'>
                {isAuth === true && <LeftSidebar onStateChange={true} />}

                <div className='flex flex-col p-10 gap-10 w-full'>
                    <div className='flex lg:flex-row flex-col justify-between items-center gap-10'>
                        <div className='flex flex-col gap-5 justify-center items-start'>
                            <span className='font-sans font-semibold text-2xl'>Connect with the people at the center of what's happening</span>
                            <button onClick={() => { navigate('/launch') }} className='pt-3 pb-3 pl-5 pr-5 font-normal font-sans text-lg text-[white] bg-black rounded-xl'>Launch a Campaign</button>
                        </div>
                        <img src="/images/home/ad.svg" className='lg:w-[40%] w-full' alt="" />
                    </div>
                    <div className='flex flex-col w-full lg:p-10 p-5 rounded-2xl bg-white justify-center items-center'>
                        <div className="flex flex-row w-[40vw] gap-4 overflow-x-hidden ">
                            <Carousel
                                additionalTransfrom={0}
                                arrows={true}
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                centerMode={false}
                                className="w-full"
                                containerClass="gap-2"
                                dotListClass="justify-start"
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
                                        items: 3,
                                    },
                                    desktoplg: {
                                        breakpoint: {
                                            max: 2400,
                                            min: 1800,
                                        },
                                        items: 3,
                                    },
                                    desktop: {
                                        breakpoint: {
                                            max: 1800,
                                            min: 1400,
                                        },
                                        items: 3,
                                    },
                                    mobilelg: {
                                        breakpoint: {
                                            max: 1100,
                                            min: 960,
                                        },
                                        items: 2,
                                    },
                                    mobilemd: {
                                        breakpoint: {
                                            max: 960,
                                            min: 850,
                                        },
                                        items: 2,
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
                                        items: 2,
                                    },
                                    tablet: {
                                        breakpoint: {
                                            max: 1400,
                                            min: 1100,
                                        },
                                        items: 2,
                                    },
                                }}
                                rewind={true}
                                rewindWithAnimation={true}
                                rtl={false}
                                shouldResetAutoplay
                                showDots={true}
                                sliderClass="gap-2 overflow-auto"
                                slidesToSlide={1.04}
                                customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                                customRightArrow={<CustomRightArrow onClick={() => { }} />}
                                swipeable>
                                <img src="images/home/ad_slide.png" className="w-full h-auto" alt="" />
                                <img src="images/home/ad_slide.png" className="w-full h-auto" alt="" />
                                <img src="images/home/ad_slide.png" className="w-full h-auto" alt="" />
                                <img src="images/home/ad_slide.png" className="w-full h-auto" alt="" />
                                <img src="images/home/ad_slide.png" className="w-full h-auto" alt="" />
                                <img src="images/home/ad_slide.png" className="w-full h-auto" alt="" />
                            </Carousel>
                        </div>
                        <button className='pt-3 pb-3 pr-6 pl-6 mt-10 bg-black text-[white] rounded-lg text-lg font-normal font-sans'>Sell all formats</button>
                    </div>
                    <div className='flex flex-col gap-6 justify-start items-start w-full'>
                        <span className='fotn-sans font-semibold text-3xl text-[black]'>Targeting on Donamix</span>
                        <span className='fotn-inter font-normal text-base text-[black]'>Donamix offers unique targeting options to <br></br>expand your reach.</span>
                    </div>
                    <div className='flex lg:flex-row flex-col gap-10 justify-between mb-11'>
                        <div className='group flex flex-col gap-5 justify-center items-center p-6 rounded-t-3xl bg-[#EEF4F9] hover:bg-black lg:w-[30%] w-full mt-[105px] relative'>
                            <img src="images/home/speech1.png" alt="" className='w-[60px] h-[60px] m-3 group-hover:hidden' />
                            <img src="images/home/speech.png" alt="" className='w-[60px] h-[60px] m-3 hidden group-hover:block' />
                            <span className='font-sans text-xl font-bold text-black group-hover:text-[white] mt-8'>By conversation</span>
                            <span className='font-montserrat text-sm font-normal text-black group-hover:text-[white] w-full text-center'>Choose from our perspective conversation topics to target their participating audiences.</span>
                        </div>
                        <div className='group flex flex-col gap-5 justify-center items-center p-6 rounded-t-3xl bg-[#EEF4F9] hover:bg-black lg:w-[30%] w-full mt-[105px] relative'>
                            <img src="images/home/follow1.png" alt="" className='w-[60px] h-[60px] m-3 group-hover:hidden' />
                            <img src="images/home/follow.png" alt="" className='w-[60px] h-[60px] m-3 hidden group-hover:block' />
                            <span className='font-sans text-xl font-bold text-black group-hover:text-[white] mt-8'>By Interests</span>
                            <span className='font-montserrat text-sm font-normal text-black group-hover:text-[white] w-full text-center'>Reach high-converting users with interests similar to an account's followers.</span>
                        </div>
                        <div className='group flex flex-col gap-5 justify-center items-center p-6 rounded-t-3xl bg-[#EEF4F9] hover:bg-black lg:w-[30%] w-full mt-[105px] relative'>
                            <img src="images/home/calendar1.png" alt="" className='w-[60px] h-[60px] m-3 group-hover:hidden' />
                            <img src="images/home/calendar.png" alt="" className='w-[60px] h-[60px] m-3 hidden group-hover:block' />
                            <span className='font-sans text-xl font-bold text-black group-hover:text-[white] mt-8'>By events</span>
                            <span className='font-montserrat text-sm font-normal text-black group-hover:text-[white] w-full text-center'>Reach high-converting users with interests similar to an account's followers.</span>
                        </div>
                    </div>
                    <div className='w-full rounded-t-3xl flex flex-col justify-center items-center bg-white p-10 gap-8'>
                        <span className='font-sans text-[black] text-3xl font-bold'>Ready to start advertising?</span>
                        <span>Donamix offers unique targeting options to expand your reach.</span>
                        <button onClick={() => { navigate('/launch') }} className='pt-3 pb-3 pl-5 pr-5 font-normal font-sans text-lg text-[white] bg-black rounded-xl'>Launch a Campaign today</button>
                    </div>
                    <div className='flex lg:flex-row flex-col font-sans font-semibold text-lg  gap-5 justify-center items-center w-full '>
                        <button className='text-[#240000] font-sans pt-3 pb-3 pr-6 pl-6 rounded-lg border border-black'>Ask in Forum</button>
                        <button className='text-[#240000] font-sans pt-3 pb-3 pr-6 pl-6 rounded-lg border border-black'>Subscribe to our newslater</button>
                    </div>
                </div>
                {isAuth === true && <RightSidebar />}

            </div>
        </>
    )
}
