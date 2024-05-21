import React from 'react';
// import 'react-multi-carousel/lib/u';
import { useState, useEffect } from 'react';
import LeftSidebar from './dashboard/layout/LeftSidebar';
import RightSidebar from './dashboard/layout/RightSidebar';
import { Button, buttonVariants } from '@/components/ui/button'

export default function Aboutus() {
    const [sidbarExpanded, setSidebarExpanded] = useState(null)
    const showSidebar: () => void = () => {
        setSidebarExpanded(true)
    }
    const hideSidebar: () => void = () => {
        setSidebarExpanded(false)
    }

    return (
        // <div className="relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
        //   <LeftSidebar onStateChange={showSidebar}/>
        <div className="mx-auto my-10 bg-dashboard-background w-full mainBody">
            <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                    <div className="font-sans font-bold text-3xl justify-start">About us</div>
                    <div className="bg-[#FFFFFF] rounded-t-[30px] flex flex-col">
                        <img src="/images/aboutus/aboutimage.png" className="w-full h-full object-cover rounded-t-[30px]" alt="" />
                        <div className="font-montserrat font-medium text-sm text-[#565656] p-2"><span className="font-bold text-[#060000]">DONAMIX</span> is an all-inclusive global community that offers a range of amazingly free services. Founded in November 2009, As a large-scale social community, Donamix keeps on offering high-end services, so that the users could experience a new feel of life. As the world becomes more connected, it's important to have a platform that brings people together from all around the globe. That's why we created Donamix, the ultimate social network experience. At Donamix, we believe that everyone should have the opportunity to connect, share, discover, and explore boundless possibilities.</div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="font-sans font-bold text-3xl justify-start">What We Do?</div>
                    <div className="flex sm:flex-row flex-col p-3 items-center gap-4 relative justify-between">
                        <div className="flex flex-col items-center p-4 gap-5 bg-[#EEF4F9] sm:w-[30%] w-[100%] rounded-t-xl">
                            <img src="/images/aboutus/innovation.png" className="w-[65px] h-[66px]" alt="" />
                            <div className="font-sans font-semibold text-2xl">Innovation</div>
                            <div className="font-montserrat font-medium text-xs text-center">We leverage cutting-edge technology</div>
                        </div>
                        <div className="flex flex-col items-center p-4 gap-5 bg-black sm:w-[30%] w-[100%] rounded-t-xl">
                            <img src="/images/aboutus/integrity.png" className="w-[64px] h-[66px]" alt="" />
                            <div className="font-sans font-semibold text-2xl text-white">Integrity</div>
                            <div className="font-montserrat font-medium text-xs text-center text-white">We foster cultural connections</div>
                        </div>
                        <div className="flex flex-col items-center p-4 gap-5 bg-[#EEF4F9] sm:w-[30%] w-[100%] rounded-t-xl">
                            <img src="/images/aboutus/networking.png" className="w-[58px] h-[60px]" alt="" />
                            <div className="font-sans font-semibold text-2xl">Networking</div>
                            <div className="font-montserrat font-medium text-xs text-center">Connect and Socialize with Ease</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="p-4 w-full bg-white rounded-br-xl relative">
                            <span className="absolute top-[-8px] left-[-10px] w-[30px] h-[30px] text-center pt-1 rounded-full bg-black text-white font-montserrat font-bold text-base">1</span>
                            <div className="font-montserrat font-semibold text-base text-[#999999] pt-6">
                                <span className="font-bold text-[#050000]">Connect:</span> Donamix facilitates connections by providing a platform for users to connect and engage with others who share similar interests and passions. It fosters a sense of community and enables meaningful interactions.
                            </div>
                        </div>
                        <div className="p-4 w-full bg-white rounded-br-xl relative">
                            <span className="absolute top-[-8px] left-[-10px] w-[30px] h-[30px] text-center pt-1 rounded-full bg-black text-white font-montserrat font-bold text-base">2</span>
                            <div className="font-montserrat font-semibold text-base text-[#999999] pt-6">
                                <span className="font-bold text-[#050000]">Empower:</span> Donamix empowers individuals by giving them the tools and resources to express themselves, share their talents, and build their personal brand. It provides a supportive environment for users to showcase their skills and achieve their goals.
                            </div>
                        </div>
                        <div className="p-4 w-full bg-white rounded-br-xl relative">
                            <span className="absolute top-[-8px] left-[-10px] w-[30px] h-[30px] text-center pt-1 rounded-full bg-black text-white font-montserrat font-bold text-base">3</span>
                            <div className="font-montserrat font-semibold text-base text-[#999999] pt-6">
                                <span className="font-bold text-[#050000]">Innovate:</span> Donamix is at the forefront of innovation in the social networking space. It continuously introduces new features and functionalities to enhance the user experience and stay ahead of industry trends. It strives to redefine how people connect and communicate online.
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        //   <RightSidebar/>
        // </div>
    )
}
