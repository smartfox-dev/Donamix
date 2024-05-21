import React, { useState, useEffect } from 'react'
import { Button, buttonVariants, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useAuthContext } from '@/context/AuthContext';
import { GoDotFill } from "react-icons/go";

const pages = [
    {
        value: 'general',
        title: 'General Questions',
    },
    {
        value: 'account',
        title: 'Account Settings',
    },
    {
        value: 'privacy',
        title: 'Privacy FAQ',
    },
    {
        value: 'conversations',
        title: 'Conversations FAQ',
    },
    {
        value: 'blog',
        title: 'BLOG FAQ',
    },
];

export default function Rules() {
    const { user } = useAuthContext();
    const [tab, setTab] = useState('general')

    return (
        <>
            <div className='flex flex-col justify-center items-center pt-14 pb-20 lg:pl-40 md:pl-10 sm:pl-5 pl-3 lg:pr-40 md:pr-10 sm:pr-5 pr-3 w-full'>
                <div className='flex flex-col rounded-2xl bg-white p-10 justify-center gap-10 w-full'>
                    <div className='flex flex-col w-full gap-5'>
                        <span className='font-semibold text-xl font-montserrat text-[black]'>Donamix – Conversations Etiquette</span>

                        <span className='font-normal text-md font-montserrat text-[#656565] mt-5'>Please make sure to follow the chat rules outlined below:</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-8'>- Refrain from sharing personal contact information such as phone numbers, emails, or instant messaging IDs in public.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Avoid asking for social network IDs like WhatsApp, Facebook, etc., in public chats.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Do not post your Skype ID in public or request others' Skype IDs in the chat room.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Please do not repeatedly ask other users to open their webcams.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Limit repeating the same message to three times to avoid automatic muting by the system.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Avoid using offensive language, racist remarks, or engaging in spamming/flooding.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- If you encounter any issues, seek assistance from admins or moderators.</span>

                        <span className='font-semibold text-md font-montserrat text-[#656565] mt-8'>Additional guidelines include:</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-8'>- Do not flood the chat room with spam or advertisements as it may result in a ban.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Welcome new joiners to the chat.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Respect all religions, cultures, races, and political beliefs.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Refrain from any form of sexual harassment towards other members.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Use English in the Global chat room for better communication.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- We have specific chat rooms for different languages.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- To inquire about becoming a moderator there are subscription options available.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Personal attacks, sexism, and explicit content are strictly prohibited.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Resolve personal conflicts outside the chat room to maintain a positive environment.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Avoid sharing personal information like email addresses or phone numbers in the main chat.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Do not post unauthorized links or engage in free advertising.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Respect others' privacy and avoid persistent messaging to unresponsive users.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1'>- Keep chat interactions friendly, respectful, and adhere to basic manners and courtesy.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-8 mb-20'>Thank you for your cooperation in upholding these guidelines for a pleasant chatting experience for all participants.</span>
                    </div>

                    <div className='flex flex-col w-full gap-5'>
                        <div className='font-normal text-md font-montserrat text-[#767676] bg-[#F4F4F4] w-full rounded-2xl p-8'>
                            <span className='font-semibold text-xl font-montserrat text-[black]'>We would appreciate it if everyone:</span>
                            <div className='flex flex-row justify-start items-start mt-5'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Please seek permission before initiating a private chat with others.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Kindly ask before sending private messages to fellow users.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Request permission before sending Webcam/Video Requests.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Maintain a respectful attitude towards all users in the room.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3 mb-10'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Extend a warm welcome to new users joining the chat room.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3 mb-10'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Chat Moderators/Admins reserve the right to issue warnings or permanent bans if chat rules are violated.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3 mb-10'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Respect others' boundaries and privacy by seeking permission before engaging in private interactions.</span>
                            </div>
                            <span className='mt-10 font-normal text-md font-montserrat text-[black]'>Have a great time and thank you for your attention</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
