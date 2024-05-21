import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus } from "react-icons/ai";

interface IAboutProps { }

const General: React.FC<IAboutProps> = ({ }) => {
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
            {first ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 cursor-pointer' onClick={() => {setFirst(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>What is Donamix?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>DONAMIX is an all-inclusive online community that offers a range of amazingly free services. Founded in November 2009, Started as a small chatting site only, Donamix is geared towards providing excellent services, superior communication, and bringing people together at one platform.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer'  />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFirst(true)}} >
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>What is Donamix?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' />
            </div>}

            {second ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 cursor-pointer'onClick={() => {setSecond(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why to join? What can I do here?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>You can connect with friends and family, create articles write your knowledge, experience, stories, listen to music, meet new people, enjoy live audio-video chat rooms, enjoy photo & video sharing, have fun with the like-minded people, find people nearby, enjoy our radio. We have live DJ's that interact with our listeners. Donamix offers unlimited free access to everything it has for you. If you really want to be a part of the rapidly growing community where you've full emancipation to do whatever you want to quench your social thirst, you must join us. So if you haven't registered yet, SIGN UP NOW and feel free to contact our round-the-clock technical support team if you need any assistance.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer'  />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer'  onClick={() => {setSecond(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why to join? What can I do here?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' />
            </div>}

            {third ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5  cursor-pointer' onClick={() => {setThird(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>What is Featured Members?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Featured Members are contributors to Donamix and they have upgraded their account to Blogger, Moderator, Admin or VIP. Bloggers can publish articles, Moderator, Admin and VIP have access to more features in chat rooms and website. You can also become a featured member by Upgrading your account.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer'  />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setThird(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>What is Featured Members?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer'  />
            </div>}

            {four ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5  cursor-pointer' onClick={() => {setFour(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why Should i Donate to Donamix?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>If you want to see new Features We need your SUPPORT that can be moral, ethnic, financial, or whatsoever suits you. With your moral support and FINANCIAL ASSISTANCE, Donamix is going to improve its standards and bring new features & benefits to the platform, which is eventually going to provide us with high volume traffic and server improvements. As a result, we may get stable! So, feel free to contribute as much as you can to be a part of this noble cause promotion. We'll make sure that we make best use of your funding; even if, you reward us with just $5. The more you're gonna contribute, the more efficiently we're gonna move forward. So, your generous contribution is expected as much as you can do!</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer'  />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center  cursor-pointer' onClick={() => {setFour(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why Should i Donate to Donamix?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer'  />
            </div>}

            {five ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5  cursor-pointer' onClick={() => {setFive(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Who can see my blogs, photos, videos and my profile?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Once you sign up you will be able to control from your account settings who can see your blog post, music posts, friends, videos, or photo album. If you don't want them to be public you can set it to private only you and your friends can view them. This includes your profile information. to control your profile privacy settings Go to My Profile then Edit Profile.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer'  />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center  cursor-pointer' onClick={() => {setFive(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Who can see my blogs, photos, videos and my profile?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer'  />
            </div>}

            {six ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5  cursor-pointer' onClick={() => {setSix(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>06</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I contact Donamix?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Report Abuse: If you see inappropriate content or behavior on Donamix, please click the Report found in the top right-hand corner of donamix.com website. In the next screen that comes up, indicate what you saw that was inappropriate and click the "Report" button.
                        If using Donamix on Mobile, tap the “ Report ” button in the top right to send in a report.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer'  />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSix(true)}} >
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>06</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I contact Donamix?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' />
            </div>}

            {seven ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5  cursor-pointer' onClick={() => {setSeven(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>07</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why is my account suspended?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>If your account is Suspended you will not be able to access your profile because of policy violations or someone has reported you. If you feel our decision to suspend your account may have been in error, please reach out to our team. One of our admins will get back to you within 2 business days.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer'  />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSeven(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>07</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why is my account suspended?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' />
            </div>}

            {eight ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5  cursor-pointer'  onClick={() => {setEight(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>08</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why I can't write on the forum?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>You should verify your account in order to post on our forum.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setEight(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>08</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Why I can't write on the forum?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer'  />
            </div>}
        </div>
    );
};

export default General;
