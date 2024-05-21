import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus } from "react-icons/ai";

interface IAboutProps { }

const Conversations: React.FC<IAboutProps> = ({ }) => {
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [four, setFour] = useState(false)
    const [five, setFive] = useState(false)
    const [six, setSix] = useState(false)
    const [seven, setSeven] = useState(false)
    const [eight, setEight] = useState(false)
    const [nine, setNine] = useState(false)

    return (
        <div className="flex flex-col mt-2 w-full">
            {first ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Can I add Donamix Chat on my website?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Yes you can, Donamix Chat offers the ability to incorporate a free Chat on your websites. No special software or web hosting requirements are needed. You can create an HTML code using our code generator. Simply Copy the code and paste it on your site where you want it to show Click Here to get the HTML code for your Website or Blog.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFirst(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFirst(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>01</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Can I add Donamix Chat on my website?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFirst(true)}} />
            </div>}

            {second ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How much is chat kicked-out time?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>If you get Kicked out of the room by Admin or Moderator you need to wait 24 hours before next entering the room again.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setSecond(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSecond(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>02</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How much is chat kicked-out time?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setSecond(true)}} />
            </div>}

            {third ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How to become Admin in Chat room?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>You can upgrade your account to (Admin) and support donamix.com for $105 per month. Admins will get more power in chat room and other special Features with ability to get on top of users in chat room, have a verified badge on your profile, red name in chat, send stickers, see profile visitors and more. It is not easy to become a staff member at Donamix! We work hard and pay for our chat server to give you the best service! If you really want to join our admins and be part of our community Click Here to upgrade your account to Admin and become a featured member.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setThird(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setThird(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>03</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How to become Admin in Chat room?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setThird(true)}} />
            </div>}

            {four ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How to become Moderator in Chat room?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>You can upgrade your account to (Moderator) and support donamix.com for $65 per month. Moderators get special Features with ability to be on top of users in chat room, mute users, have a verified badge on your profile, colored name in chat, bonus credits and customized theme. We work hard and pay for our chat server to give you the best service! If you really want to join our Moderator and be part of our community Click Here to upgrade your account to Moderator and become a featured member.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFour(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFour(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>04</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How to become Moderator in Chat room?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFour(true)}} />
            </div>}

            {five ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Is Donamix Chat app available Play Store & App Store?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Yes Donamix Chat is available on both Play Store and App Store<br />
                        Click Here to Download Play Store app<br />
                        Click Here to Download App Store app</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setFive(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setFive(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>05</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Is Donamix Chat app available Play Store & App Store?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setFive(true)}} />
            </div>}

            {six ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>06</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I am being harassed by another member</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>If you feel you are being harassed or being unfairly treated by another member or by Donamix Admins/Moderators our management team can help. Please contact us and include as much information as you can concerning the issue as well as screenshots.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setSix(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSix(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>06</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I am being harassed by another member</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setSix(true)}} />
            </div>}

            {seven ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>07</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I have been kicked from a room, what can I do?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Donamix Admins cannot interfere with any member who breaks the chat rules. Please follow Donamix Chat Rules to avoid being banned in Chat Rooms. Click Here to read Donamix Chat Rooms Rules!</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setSeven(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setSeven(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>07</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>I have been kicked from a room, what can I do?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setSeven(true)}} />
            </div>}

            {eight ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>08</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Can I connect to chat with IPAD?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Yes you can, all our chat rooms can be easily opened with iPad or Mobiles.</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setEight(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setEight(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>08</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Can I connect to chat with IPAD?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setEight(true)}} />
            </div>}

            {nine ? <div className='flex flex-row bg-[#F2F9FF] justify-between pt-5 pb-5 pl-10 pr-10 gap-5 '>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>09</span>
                <div className='flex flex-col gap-10'>
                    <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How to send a gift in chat room? What are Credits?</span>
                    <span className='font-normal font-inter text-[#5A5365] text-md lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>Credits in the Chat room are used for Sending gifts to other users, credits is the virtual currency in all of Donamix Chat rooms. You can send virtual gifts in the chat rooms which can be a great way of letting other chatters know what you think of them. Virtual gifts are paid for with chat room credits which can be received when you become a daily active member or by purchasing online credits so spend long time in Donamix Chat room and you can even buy them if you like. To Buy virtual credits Click Here<br />
                    <br />
                        To send a virtual gift to another chatter:<br />
                        1.Click on their name in the room list<br />
                        2.Choose 'Send gift' from the pop up menu<br />
                        3.Select a gift from one of the 3 tabs<br />
                        4.Click Submit<br />
                        5.You will see the gift appear on the screen for all to also see</span>
                </div>
                <img src="/images/home/cross_black.svg" alt="" className='cursor-pointer' onClick={() => {setNine(false)}} />
            </div> : <div className='flex flex-row justify-between bg-white pt-5 pb-5 pl-10 pr-10 mb-[2px] gap-5 items-center cursor-pointer' onClick={() => {setNine(true)}}>
                <span className='font-extrabold font-inter lg:text-3xl text-2xl text-[#9D96A8]'>09</span>
                <span className='font-bold font-inter text-[black] lg:text-2xl text-xl lg:w-[70vw] md:w-[60vw] sm:w-[50vw] w-[45vw] '>How to send a gift in chat room? What are Credits?</span>
                <AiOutlinePlus className='text-[black] cursor-pointer' onClick={() => {setNine(true)}} />
            </div>}
        </div>
    );
};

export default Conversations;
