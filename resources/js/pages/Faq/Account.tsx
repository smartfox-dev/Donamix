import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus } from "react-icons/ai";

interface IAboutProps { }

const Account: React.FC<IAboutProps> = ({ }) => {
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
            {first ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 cursor-pointer'  onClick={() => {setFirst(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I register to get my own account?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>To register for your own account Click Here. Once you fill out all of the fields on the registration form and submit. Make sure you check your inbox and junk mail for your activation email. If you do not receive it in either regular inbox or junk mail please contact us.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer ' />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10  mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFirst(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I register to get my own account?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer'  />
            </div>}

            {second ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5  cursor-pointer' onClick={() => {setSecond(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I didn't get an email to activate my account</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>To get an activation email resent please log in and on top header click ( Resend verification Email ) Depending on your email settings your activation email may land in your junk mail folder. If your settings are set to delete all junk mail then please contact us Here.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSecond(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I didn't get an email to activate my account</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' />
            </div>}

            {third ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5  cursor-pointer' onClick={() => {setThird(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I can't verify my account. Can you help?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Sure thing! Please send us an email at support@donamix.com and include your name, country, and the email address you use to access your account. We can manually verify profiles that include all of this information.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer'  />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setThird(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I can't verify my account. Can you help?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setThird(true)}} />
            </div>}

            {four ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 ' onClick={() => {setFour(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '> How do I delete my account?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>To delete your account go to My Profile &gt; Edit Profile &gt; Account Settings</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFour(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFour(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I delete my account?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFour(true)}} />
            </div>}

            {five ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 ' onClick={() => {setFive(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Forgotten password. What do I do?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>You can reset your password using our Forgotten Password form. You can access the form by Clicking Here. If you need help please contact us.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFive(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFive(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Forgotten password. What do I do?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFive(true)}} />
            </div>}

            {six ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 ' onClick={() => {setSix(false)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>06</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I change my nickname?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>To change your name go to Edit Profile &gt; Edit basic information</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setSix(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSix(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>06</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How do I change my nickname?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setSix(true)}} />
            </div>}
        </div>
    );
};

export default Account;
