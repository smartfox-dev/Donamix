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
import General from './General';
import Account from './Account';
import Privacy from './Privacy';
import Conversations from './Conversations';
import Blog from './Blog';

import { FiPlusCircle } from "react-icons/fi";

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

export default function Faq() {
    const [tab, setTab] = useState('general')

    return (
        <>
            <div className=" relative mt-10 z-0 mb-10 h-auto">
                <Tabs value={tab} orientation="vertical" className=" flex flex-row min-h-[700px] w-full">
                    <div className="flex-1 py-5">
                        <div className="flex-col lg:px-[100px] sm:px-[40px] px-[10px] justify-center">
                            <div className='flex flex-col bg-black pt-5 pb-5 rounded-xl w-full'>
                                <TabsHeader className="flex sm:flex-row flex-col bg-transparent rounded-none"
                                indicatorProps={{
                                    className: 'hidden',
                                }}>
                                    {pages.map((val, i) => (
                                        <Tab
                                            key={`profile-page-${i}`}
                                            value={val.value}
                                            onClick={() => {
                                                setTab(val.value);
                                                // setPage(val.value);
                                            }}
                                            className={cn(
                                                'font-bold font-poppins text-lg',
                                                tab === val.value ? 'text-white' : 'text-[#818181]'
                                            )}
                                        >
                                            {val.title}
                                        </Tab>
                                    ))}
                                </TabsHeader>
                            </div>

                            <TabsBody className="min-h-[700px] ">
                                <TabPanel value="general" className='p-0'>
                                    <General />
                                </TabPanel>
                                <TabPanel value="account" className='p-0'>
                                    <Account />
                                </TabPanel>
                                <TabPanel value="privacy" className='p-0'>
                                    <Privacy />
                                </TabPanel>
                                <TabPanel value="conversations" className='p-0'>
                                    <Conversations />
                                </TabPanel>
                                <TabPanel value="blog" className='p-0'>
                                    <Blog />
                                </TabPanel>

                            </TabsBody>
                        </div>
                    </div>
                </Tabs>
            </div>
        </>
    )
}
