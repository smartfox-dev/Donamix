import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus } from "react-icons/ai";

interface IAboutProps { }

const Blog: React.FC<IAboutProps> = ({ }) => {
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [four, setFour] = useState(false)
    const [five, setFive] = useState(false)

    return (
        <div className="flex flex-col mt-2 w-full">
            {first ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I want to write arrticles. How do I do that?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>To post your own articles subscribe to Blogger and become a featured Member.
                        Click Here to upgrade your account.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFirst(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFirst(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I want to write arrticles. How do I do that?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFirst(true)}} />
            </div>}

            {second ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Can I write about a variety of topics?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Yes you can write your knowledge, experience, stories, articles of variety topics . Except the following topics:<br />
                        •Porn, Adult material<br />
                        •Violent content<br />
                        •Racial content<br />
                        •Hacking/Cracking<br />
                        •Gambling/Casino<br />
                        •Selling Drugs, Alcohol (Beer or hard alcohol)<br />
                        •Selling Weapons and ammunition<br />
                        •Distribution of course work. Eg: Student Essays</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setSecond(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSecond(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Can I write about a variety of topics?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setSecond(true)}} />
            </div>}

            {third ? <div className='flex flex-row bg-[#F2F9FF] justify-between p-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why would I want to use Donamix Blog?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Here at Donamix, We offer unlimited blogging experience we prominently display blog post views. Your articles will be seen by millions of members on Donamix. You can also share your blog post URL with your friends and on social media.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setThird(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setThird(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why would I want to use Donamix Blog?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setThird(true)}} />
            </div>}

            {four ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How long will it take for my blog link to appear?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>If you are subscribed to Blogger your blog links will immediately appear.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFour(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFour(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How long will it take for my blog link to appear?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFour(true)}} />
            </div>}

            {five ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why was my blog post deleted from Donamix?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Though we appreciate all the great blogging contributions to Donamix, not all blog posts are eligible for inclusion on the site. Below are a few types of posts that we do not allow.<br />
                        •Porn, Adult material<br />
                        •Violent content<br />
                        •Racial content<br />
                        •Hacking/Cracking<br />
                        •Gambling/Casino<br />
                        •Selling Drugs, Alcohol (Beer or hard alcohol)<br />
                        •Selling Weapons and ammunition<br />
                        •Distribution of course work. Eg: Student Essays</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFive(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFive(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why was my blog post deleted from Donamix?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFive(true)}} />
            </div>}
        </div>
    );
};

export default Blog;
