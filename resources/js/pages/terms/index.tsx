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

export default function Terms() {
    const { user } = useAuthContext();
    const [tab, setTab] = useState('general')

    return (
        <>
            <div className='flex flex-col justify-center items-center pt-14 pb-20 lg:pl-40 md:pl-10 sm:pl-5 pl-3 lg:pr-40 md:pr-10 sm:pr-5 pr-3 w-full'>
                <div className='flex flex-col rounded-2xl bg-white p-10 justify-center gap-10 w-full'>
                    <div className='flex flex-col w-full gap-10 lg:pl-20 md:pl-10 sm:pl-5 pl-3 lg:pr-20 md:pr-10 sm:pr-5 pr-3'>

                        <span className='font-semibold text-2xl font-montserrat text-[black] mt-8 leading-8'>Terms and Conditions ("Terms")</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://www.donamix.com website and the Donamix mobile application (the "Service") operated by Donamix ("us", "we", or "our").</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</span>
                        <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</span>

                        <div className='font-normal text-md font-montserrat text-[#656565] mt-1 flex flex-col gap-1'>
                            <span className='font-bold text-md font-montserrat text-[black] mt-1'>Purchases</span>
                            <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your …</span>
                        </div>
                        <div className='font-normal text-md font-montserrat text-[#656565] mt-1 flex flex-col gap-1'>
                            <span className='font-bold text-md font-montserrat text-[black] mt-1'>Subscriptions</span>
                            <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring ...</span>
                        </div>
                        <div className='font-normal text-md font-montserrat text-[#656565] mt-1 flex flex-col gap-1'>
                            <span className='font-bold text-md font-montserrat text-[black] mt-1'>Content</span>
                            <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>Our Service allows you to post, links, jobs, classifieds, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the …</span>
                        </div>
                        <div className='font-normal text-md font-montserrat text-[#656565] mt-1 flex flex-col gap-1'>
                            <span className='font-bold text-md font-montserrat text-[black] mt-1'>Links To Other Web Sites</span>
                            <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>Our Service may contain links to third-party web sites or services that are not owned or controlled by Donamix.</span>
                            <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>Donamix has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Donamix shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</span>
                        </div>
                        <div className='font-normal text-md font-montserrat text-[#656565] mt-1 flex flex-col gap-1'>
                            <span className='font-bold text-md font-montserrat text-[black] mt-1'>Changes</span>
                            <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</span>
                        </div>
                        <div className='font-normal text-md font-montserrat text-[#656565] mt-1 flex flex-col gap-1'>
                            <span className='font-bold text-md font-montserrat text-[black] mt-1'>Contact Us</span>
                            <span className='font-normal text-md font-montserrat text-[#656565] mt-1 leading-8'>If you have any questions about these Terms, please contact us.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
