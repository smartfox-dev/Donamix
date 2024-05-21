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

export default function Safety() {
    const { user } = useAuthContext();
    const [tab, setTab] = useState('general')

    return (
        <>
            <div className='flex flex-col justify-center items-center pt-14 pb-20 lg:pl-40 md:pl-10 sm:pl-5 pl-3 lg:pr-40 md:pr-10 sm:pr-5 pr-3 w-full'>
                <div className='flex flex-col rounded-2xl bg-white p-10 justify-center gap-10 w-full'>
                    <div className='flex flex-col w-full gap-5'>
                        <span className='font-semibold text-xl font-montserrat text-[black]'>Online Safety Tips</span>
                        <span className='font-normal text-md font-montserrat text-[#767676] bg-[#F4F4F4] p-8 w-full rounded-2xl'>Along with the opportunity to learn, grow and connect, communication on the internet has its challenges. Although the challenges vary, there are some common areas of concern.</span>
                    </div>
                    <div className='flex flex-col w-full gap-5'>
                        <span className='font-semibold text-xl font-montserrat text-[black]'>“Consider the source!”</span>
                        <span className='font-normal text-md font-montserrat text-[#767676] bg-[#F4F4F4] p-8 w-full rounded-2xl'>The first area is the validity of information presented online. Those who use the internet must use similar precautions to those who read a newspaper or listen to a speaker. Is the source trustworthy? Is there an agreement over time or over a number of sources? This would apply to online articles and to email communication. It also applies to chat rooms. Although many chatters are people of integrity, there are those who will share information (about a topic or about themselves) that simply is not true. Always consider the source!</span>
                    </div>
                    <div className='flex flex-col w-full gap-5'>
                        <span className='font-semibold text-xl font-montserrat text-[black]'>Sharing personal information:</span>
                        <span className='font-normal text-md font-montserrat text-[#767676] bg-[#F4F4F4] p-8 w-full rounded-2xl'>Another major area of concern has to do with sharing personal information online, whether in chat rooms, instant messaging, blogs or emails. We attempt to make the interactive areas of our sites as safe as possible. We have a Privacy Policy for information shared within our sites.
                            This policy cannot control the use of information which you provide to others via chat, blogs or forums. Information shared there is “public” in that other users may use or abuse the information you offer. Once you share personal contact information, be aware that we have little or no control over how someone else may respond. The best safety tip is to never share personal information until you’re quite sure that it’s safe to do so.</span>
                    </div>
                    <div className='flex flex-col w-full gap-5'>
                        <span className='font-semibold text-xl font-montserrat text-[black]'>Hints for regaining control of your online connections:</span>
                        <span className='font-normal text-md font-montserrat text-[#767676] bg-[#F4F4F4] p-8 w-full rounded-2xl'>Here are a few general tips which we would recommend if you feel you are being compromised or harassed by someone online, outside of our interactive areas. The suggestions are general in nature; we cannot troubleshoot your software or settings.
                            For teens, enlist help from your parents and/or teachers to stay safe. If you ever feel threatened or unsafe online, be sure to let them know. Many adults are willing to assist you in redrawing the boundaries when necessary.</span>
                    </div>
                    <div className='flex flex-col w-full gap-5'>
                        <span className='font-semibold text-xl font-montserrat text-[black]'>If you are receiving unwanted emails:</span>
                        <div className='font-normal text-md font-montserrat text-[#767676] bg-[#F4F4F4] w-full rounded-2xl p-8'>
                            <div className='flex flex-row justify-start items-start'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Block the sender.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Do not open any additional emails from the person.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>If necessary, you may contact your Internet Service Provider or theirs to inquire about policies on abuse of email.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>If the problem continues, you may need to change your email address, and give the new one only to those who you consider “safe.”</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-5'>
                        <span className='font-semibold text-xl font-montserrat text-[black]'>If someone is harassing you on an instant messaging program:</span>
                        <div className='font-normal text-md font-montserrat text-[#767676] bg-[#F4F4F4] w-full rounded-2xl p-8'>
                            <div className='flex flex-row justify-start items-start'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Block the sender.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Do not respond to any further communication from the person involved.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>Check for settings so that any IM’s from that individual are automatically rejected.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>If necessary, check the terms of service for the IM program. There may be some built-in safeguards or limitations that will help you.</span>
                            </div>
                            <div className='flex flex-row justify-start items-start mt-3 mb-10'>
                                <img src="/images/home/comma.svg" className='text-[black] w-[8px] pt-1' />
                                <span className='pl-5'>If the problem continues, you may need to discontinue use of that IM identity. You could open a new identity or change IM programs, and give the new information only to trusted friends online.</span>
                            </div>
                            <span className='mt-10 font-normal text-md font-montserrat text-[black]'>You may find additional ideas by doing a search for “online safety” or “internet safety".</span>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
