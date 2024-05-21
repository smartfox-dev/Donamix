import React, { Fragment, useState } from 'react';
import LeftSidebar from '@/pages/dashboard/layout/LeftSidebar';
import RightSidebar from '@/pages/dashboard/layout/RightSidebar';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

const Contacts = () => {
    const { setIsLeftSidebarOpen } = useAppContext();
    const [users, setUsers] = useState(null)
    const [isLoad, setLoad] = useState(false)

    useEffect(() => {
      return () => setIsLeftSidebarOpen(true);
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/users/friends`)
            .then((res) => {
                if(res.data.message == 'success') {
                    setUsers(res.data.data)
                }
                else {
                    console.log(res)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="w-full h-full relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
            <LeftSidebar onStateChange={true} />
            <div className='flex flex-col w-full gap-5 p-10'>
                <div className='flex lg:flex-row md:flex-row flex-col gap-5 pt-8 flex-wrap justify-center'>
                    {isLoad ? users && users.map((item, i) => (
                        <div key={i} className='bg-[white] rounded-2xl h-[300px] lg:w-[45%] md:w-[45%] w-full flex flex-col items-center relative'>
                            <div style={{backgroundImage: `url(${item.banner})`}} className='w-full h-[150px] bg-cover' />
                            <div className='flex flex-col w-full h-[150px] bg-white p-5 rounded-2xl'>
                                <div className='flex flex-row w-full justify-between pl-2 pr-2'>
                                    <div></div>
                                    <button className='bg-black text-[white] font-inter font-normal p-3 w-[120px] rounded-lg'>Connected</button>
                                </div>
                                <div className='flex flex-col justify-between w-full pl-2 pr-2'>
                                    <div className='flex flex-row justify-start w-full'>
                                        <span className='font-bold font-inter text-lg text-[black]'>{item.name}</span>
                                    </div>
                                    <div className='flex flex-row justify-between w-full'>
                                        <span className='font-normal font-inter text-sm text-[#969696]'>Student at Harvard</span>
                                        <span className='font-bold font-inter text-sm text-[red]'>Remove Friend</span>
                                    </div>
                                </div>
                            </div>
                            <img src={item.avatar} className='w-[90px] h-[90px] p-1 bg-white rounded-full absolute top-[100px] left-[30px]' alt="" />
                        </div>
                    )) : users && users.slice(0, 5).map((item, i) => (
                        <div key={i} className='bg-[white] rounded-2xl h-[300px] lg:w-[45%] md:w-[45%] w-full flex flex-col items-center relative'>
                            <div style={{backgroundImage: `url(${item.banner})`}} className='w-full h-[150px] bg-cover rounded-tr-2xl rounded-tl-2xl' />
                            <div className='flex flex-col w-full h-[150px] bg-white p-5 rounded-2xl'>
                                <div className='flex flex-row w-full justify-between pl-2 pr-2'>
                                    <div></div>
                                    <button className='bg-black text-[white] font-inter font-normal p-3 w-[120px] rounded-lg'>Connected</button>
                                </div>
                                <div className='flex flex-col justify-between w-full pl-2 pr-2'>
                                    <div className='flex flex-row justify-start w-full'>
                                        <span className='font-bold font-inter text-lg text-[black]'>{item.name}</span>
                                    </div>
                                    <div className='flex flex-row justify-between w-full'>
                                        <span className='font-normal font-inter text-sm text-[#969696]'>Student at Harvard</span>
                                        <span className='font-bold font-inter text-sm text-[red] cursor-pointer'>Remove Friend</span>
                                    </div>
                                </div>
                            </div>
                            <img src={item.avatar} className='w-[90px] h-[90px] p-1 bg-white rounded-full absolute top-[100px] left-[30px]' alt="" />
                        </div>
                    ))}

                </div>
                {users && users.length > 5 && <div className='flex flex-col w-full justify-center items-center mb-10'>
                    <button className='w-[200px] h-[50px] rounded-full text-[white] bg-black font-bold' onClick={() => setLoad(true)}>Load More</button>
                </div>}

            </div>
            <RightSidebar />
        </div>
    );
};

export default Contacts;
