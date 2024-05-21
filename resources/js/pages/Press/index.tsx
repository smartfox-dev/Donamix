import React, { useState, useEffect } from 'react'
import { Button, buttonVariants, ButtonProps } from '@/components/ui/button';

import { useAuthContext } from '@/context/AuthContext';

import { FiPlusCircle } from "react-icons/fi";
import Carousel from 'react-multi-carousel';
import CustomLeftArrow from '@/components/custom/CustomLeftArrow';
import CustomRightArrow from '@/components/custom/CustomRightArrow';
import Box from '@mui/material/Box';
import { AiFillPlayCircle } from "react-icons/ai";

export default function Press() {
    const { user } = useAuthContext();

    async function download(url) {
        const a = document.createElement("a");
        a.href = await toDataURL(url);
        a.download = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function toDataURL(url) {
        return fetch(url)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                return URL.createObjectURL(blob);
            });
    }

    return (
        <>
            <div className='flex flex-col gap-10 mt-10'>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <span className='font-sans font-semibold text-6xl text-[black]'>Press & Media</span>
                    <span className='font-montserrat font-normal text-lg items-center text-[#434343] text-center'>Our press team loves collaborating with journalists<br></br> to share captivating and distinctive stories.</span>
                </div>
                <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col w-full relative'>
                    <div className='flex flex-col justify-center h-auto gap-10 lg:w-[50vw] md:w-[50vw] sm:w-full w-full bg-black rounded-tr-xl rounded-tl-xl lg:ml-10  p-10 pr-32 text-[white]'>
                        <span className='font-semibold text-2xl font-sans'>Contact us</span>
                        <span className='font-normal text-md font-sans leading-8'>Welcome to the Donamix Press and Media page, your go-to source for the latest news, updates, and media coverage surrounding our company. Stay up-to-date with our groundbreaking projects, innovative solutions, and industry insights. Explore our press releases, media kits, and featured articles to get an exclusive look into our achievements and contributions. Connect with our team of experts, thought leaders, and visionaries through interviews and media engagements. Discover how Donamix is shaping the future of social media through our cutting-edge technologies, strategic partnerships, and impactful initiatives. Join us on this exciting journey as we continue to make headlines and leave our mark in the world of social networking. Explore the power of Donamix through our press and media resources today!</span>
                        <div className='flex flex-col gap-5'>
                            <span className='font-sans text-lg text-[white] font-normal'>Email</span>
                            <span className='font-sans text-lg text-[white] font-normal'>donamix.com@gmail.com</span>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <span className='font-semibold text-xl font-sans'>Brand assets</span>
                            <div className='flex lg:flex-row md:flex-row flex-col gap-20 justify-start z-10'>
                                <div className='flex flex-col gap-2'>
                                    <span className='font-normal font-sans text-lg text-[white]'>Logo</span>
                                    <div className='relative w-[200px] h-[100px] rounded-tr-lg rounded-tl-lg bg-cover flex flex-col justify-center items-center'>
                                        <img src="/images/black_logo.png" className="pt-6 pb-6 pl-3 pr-3 w-[200px] h-[100px] rounded-tr-3xl rounded-tl-3xl bg-white" alt="" />
                                        <button className='bg-black text-[white] w-[90px] h-[30px] rounded-md absolute' onClick={() => {download('/images/black_logo.png')}}>Download</button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span className='font-normal font-sans text-lg text-[white]'>Office Photo</span>
                                    <div className='relative w-[200px] h-[100px] rounded-tr-lg rounded-tl-lg bg-cover flex flex-col justify-center items-center' style={{ backgroundImage: 'url(/images/home/download.svg)' }}>
                                        <button className='bg-black text-[white] w-[90px] h-[30px] rounded-md' onClick={() => { download('/images/home/download.svg')}}>Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-row w-[50vw] gap-4 overflow-x-hidden lg:block md:block sm:hidden hidden absolute top-[10%] right-0">
                        <Carousel
                            additionalTransfrom={0}
                            arrows={true}
                            autoPlay={true}
                            autoPlaySpeed={5000}
                            centerMode={false}
                            className="w-full"
                            containerClass="gap-2"
                            dotListClass="custom-dot-list-style"
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
                                    items: 2,
                                },
                                desktoplg: {
                                    breakpoint: {
                                        max: 2400,
                                        min: 1800,
                                    },
                                    items: 2,
                                },
                                desktop: {
                                    breakpoint: {
                                        max: 1800,
                                        min: 1400,
                                    },
                                    items: 2,
                                },
                                mobilelg: {
                                    breakpoint: {
                                        max: 1100,
                                        min: 960,
                                    },
                                    items: 3,
                                },
                                mobilemd: {
                                    breakpoint: {
                                        max: 960,
                                        min: 850,
                                    },
                                    items: 4,
                                },
                                mobilesm: {
                                    breakpoint: {
                                        max: 850,
                                        min: 650,
                                    },
                                    items: 3,
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
                                    items: 3,
                                },
                            }}
                            rewind={true}
                            rewindWithAnimation={true}
                            rtl={false}
                            shouldResetAutoplay
                            showDots={true}
                            sliderClass="gap-2 overflow-auto"
                            slidesToSlide={1.04}
                            swipeable>
                            <img src="images/home/slide_press.png" className="w-[100%] h-[100%] bg-cover" alt="" />
                            <img src="images/home/slide2.jpg" className="w-[100%] h-[100%] bg-cover rounded-t-3xl" alt="" />
                            <img src="images/home/slide3.jpg" className="w-[100%] h-[100%] bg-cover rounded-t-3xl" alt="" />
                            <img src="images/home/slide4.jpg" className="w-[100%] h-[100%] bg-cover rounded-t-3xl" alt="" />
                        </Carousel>
                    </div>
                </div>
                <div className='flex flex-col p-20'>
                    <span className='font-semibold font-sans text-xl'>Press coverage</span>
                    <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col justify-between gap-10 mt-10'>
                        <div className='flex flex-col justify-between'>
                            <img src="/images/home/bbc.svg" alt="" className='w-[100px] h-[50px]' />
                            <p className='w-[80%] h-[1px] bg-black mt-5 mb-5 '></p>
                            <span className='font-normal font-sans text-[#898989] text-md leading-3 mb-5'>Lorem Ipsum is simply dummy text of the printing and </span>
                            <span className='font-bold font-sans text-[black] text-md'>November 3, 2005</span>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <img src="/images/home/abc.svg" alt="" className='w-[100px] h-[50px] scale-150' />
                            <p className='w-[80%] h-[1px] bg-black mt-5 mb-5 '></p>
                            <span className='font-normal font-sans text-[#898989] text-md leading-3 mb-5'>Lorem Ipsum is simply dummy text of the printing and </span>
                            <span className='font-bold font-sans text-[black] text-md'>November 3, 2005</span>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <img src="/images/home/forbes.svg" alt="" className='w-[100px] h-[50px]' />
                            <p className='w-[80%] h-[1px] bg-black mt-5 mb-5 '></p>
                            <span className='font-normal font-sans text-[#898989] text-md leading-3 mb-5'>Lorem Ipsum is simply dummy text of the printing and </span>
                            <span className='font-bold font-sans text-[black] text-md'>November 3, 2005</span>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <img src="/images/home/bbc.svg" alt="" className='w-[100px] h-[50px]' />
                            <p className='w-[80%] h-[1px] bg-black mt-5 mb-5 '></p>
                            <span className='font-normal font-sans text-[#898989] text-md leading-3 mb-5'>Lorem Ipsum is simply dummy text of the printing and </span>
                            <span className='font-bold font-sans text-[black] text-md'>November 3, 2005</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
