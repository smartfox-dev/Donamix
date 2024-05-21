import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus } from "react-icons/ai";

interface IAboutProps { }

const Privacy: React.FC<IAboutProps> = ({ }) => {
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [four, setFour] = useState(false)
    const [five, setFive] = useState(false)
    const [six, setSix] = useState(false)
    const [seven, setSeven] = useState(false)
    const [eight, setEight] = useState(false)

    return (
        <div className="flex flex-col mt-2 w-full">
            {first ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I edit my profile?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>To Edit your profile go to Edit Profile &gt; Edit basic information
                        You must be logged in to edit.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFirst(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFirst(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I edit my profile?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFirst(true)}} />
            </div>}

            {second ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I add pictures to my photo album?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>You can add or remove pictures from your photo album by going to My Profile &gt; My Photos
                            Note you must be logged into your account. Uploading any pornographic images will be removed and your account could be suspended.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setSecond(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSecond(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I add pictures to my photo album?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setSecond(true)}} />
            </div>}

            {third ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I add members to my Friend list?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Donamix Friend list allows you to add friends to share and communicate with. In order to send a friend request please use the Add Friend button. You can manage your friends by going to My Profile &gt; My Friends on the menu.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setThird(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setThird(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I add members to my Friend list?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setThird(true)}} />
            </div>}

            {four ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I add my age/location to my profile?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>To add age or location to your profile please click on the menu My Profile &gt; Edit Profile &gt; Edit basic information make sure you have typed all correct information then click on Save Changes.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFour(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFour(true)}} >
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I add my age/location to my profile?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFour(true)}} />
            </div>}

            {five ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How to block or report profiles?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Go to the user profile and click on (...) next to Message button.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFive(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center  cursor-pointer' onClick={() => {setFive(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How to block or report profiles?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFive(true)}} />
            </div>}
        </div>
    );
};

export default Privacy;
