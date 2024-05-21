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
import { useNavigate } from 'react-router-dom';



export default function SiteMap() {

    const navigate = useNavigate()

    return (
        <>
            <div className='flex flex-col justify-center items-center pt-14 pb-20 lg:pl-40 md:pl-10 sm:pl-5 pl-3 lg:pr-40 md:pr-10 sm:pr-5 pr-3 w-full'>
                <div className='flex flex-col rounded-2xl bg-white p-10 justify-start gap-10 w-full'>
                    <span className='font-montserrat text-2xl font-semibold text-[black]'>Sitemap</span>
                    <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col justify-between items-start p-5'>
                        <div className='lg:w-[30%] md:w-[30%] sm:w-[80%] w-[80%] flex flex-col justify-center items-start gap-10'>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Static Pages</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/')}>Home</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/chatrooms')}>Chat Rooms</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/feed/download')}>Donwload Chat</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Search</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/feed/search')}>Search</span>
                                        {/* <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('')}>Search Users</span> */}
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/blog')}>Search Blog Post</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Other Pages</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/waitlist')}>Wait List</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/aboutus')}>About Us</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/faq')}>FAQ</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/press')}>Press & Media</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/conduct')}>Community Guidelines</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/terms')}>Terms</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/policy')}>Private Policy</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Social</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/group')}>Groups</span>
                                        {/* <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/group')}>Create a Group</span> */}
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/marketplace')}>Marketplace</span>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/mymarketplace')}>My Marketplace</span>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/forum')}>Forum</span>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/jobs')}>Job</span>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/donation')}>Donation</span>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/donation/payment')}>Donation Payment</span>
                                        {/* <span className='font-montserrat text-md font-normal'>Create Marketplace</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Advertise</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/advertise')}>Advertise</span>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/promote')}>Promote</span>
                                        {/* <span className='font-montserrat text-md font-normal'>Create Marketplace</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[30%] md:w-[30%] sm:w-[80%] w-[80%] flex flex-col justify-center items-start gap-10'>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Blog</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/blog')}>Blog</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/blog/create')}>Create new Blog Post</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/myblog')}>My Blog</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>User profile Settings</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/profile?page=info')}>Edit Basic</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/profile?page=education')}>Edit Education</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/profile?page=interests')}>Edit Interest</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/profile?page=change-password')}>Change Password</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/profile?page=profile-picture')}>Change Profile Picture</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Authentication</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/auth')}>Login</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/auth')}>Register</span>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/auth')}>Forgot Password</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[30%] md:w-[30%] sm:w-[80%] w-[80%] flex flex-col justify-center items-start gap-10'>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>User Profile</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/profile')}>User Profile</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/profile?page=about')}>About User</span>
                                        <span className='font-montserrat text-md font-normal  cursor-pointer' onClick={() => navigate('/profile?page=albums')}>User Images</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/profile?page=friends')}>User Friends</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Search</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/')}>Home</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/feed/search')}>Search Images</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/feed/video')}>Search Videos</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/feed/download')}>Search Download</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/feed/nearby')}>Nearby Users</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/mycontacts/friends')}>Friends</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span className='font-montserrat text-lg font-bold text-[black]'>Chat</span>
                                <div className='flex flex-row gap-5 justify-start'>
                                    <div className='w-3 h-auto bg-black'></div>
                                    <div className='flex flex-col justify-end gap-4 mt-5'>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/chat/admin')}>Admin</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/chat/rules')}>Rules</span>
                                        <span className='font-montserrat text-md font-normal cursor-pointer' onClick={() => navigate('/chat/safety')}>Safety</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
