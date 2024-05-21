import React, { Fragment } from 'react';
import LeftSidebar from '@/pages/dashboard/layout/LeftSidebar';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

const UpgradedUser = () => {
    const { setIsLeftSidebarOpen } = useAppContext();
    const [users, setUsers] = useState(null)
    const [isLoad, setLoad] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        return () => setIsLeftSidebarOpen(true);
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/users/upgraded`)
            .then((res) => {
                if (res.data.message == 'success') {
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
            <div className='flex flex-col w-full gap-5 p-20'>
                <div className='flex flex-row justify-between w-full'>
                    <div className='font-inter font-semibold text-xl'>Premium Members</div>
                    <button className='bg-black text-[white] rounded-lg font-montserrat font-normal text-md pl-5 pr-5 pt-2 pb-2' onClick={() => navigate('/upgrade')}>Upgrade</button>
                </div>
                <div className='flex lg:flex-row md:flex-row flex-col gap-5 pt-8 flex-wrap justify-between'>
                    {isLoad ? users && users.map((item, i) => (
                        <div className='bg-[white] rounded-2xl h-auto lg:w-[30%] md:w-1/2 w-full p-5 flex flex-col gap-4 items-center' key={i}>
                            <img src={item.avatar} alt="" className='w-[80px] h-[80px] rounded-full' />
                            <span className='font-inter font-semibold text-[black] text-xl'>{item.name}</span>
                            <span className='font-inter font-normal text-[#969696] text-md'>{item.country}</span>
                            <img src="/images/home/money.svg" alt="" className='w-[30px] h-auto' />
                            <span className='font-inter font-semibold text-[black] text-2xl'>{item.credit}</span>
                            <span className='font-inter font-normal text-[#969696] text-md'>Coins Spent</span>
                            {item.role === 'VIP' && <span className='font-inter font-bold text-[#6A69AA] text-lg mb-10'>{item.role}</span>}
                            {item.role === 'Moderator' && <span className='font-inter font-bold text-[#4C7737] text-lg mb-10'>{item.role}</span>}
                            {item.role === 'BLOGGER' && <span className='font-inter font-bold text-[#AAAAAA] text-lg mb-10'>{item.role}</span>}
                            {item.role === 'Admin' && <span className='font-inter font-bold text-[red] text-lg mb-10'>{item.role}</span>}

                        </div>
                    )) : users && users.slice(0, 5).map((item, i) => (
                        <div className='bg-[white] rounded-2xl h-auto lg:w-[30%] md:w-1/2 w-full p-5 flex flex-col gap-4 items-center' key={i}>
                            <img src={item.avatar} alt="" className='w-[80px] h-[80px] rounded-full' />
                            <span className='font-inter font-semibold text-[black] text-xl'>{item.name}</span>
                            <span className='font-inter font-normal text-[#969696] text-md'>{item.country}</span>
                            <img src="/images/home/money.svg" alt="" className='w-[30px] h-auto' />
                            <span className='font-inter font-semibold text-[black] text-2xl'>{item.credit}</span>
                            <span className='font-inter font-normal text-[#969696] text-md'>Coins Spent</span>
                            {item.role === 'VIP' && <span className='font-inter font-bold text-[#6A69AA] text-lg mb-10'>{item.role}</span>}
                            {item.role === 'Moderator' && <span className='font-inter font-bold text-[#4C7737] text-lg mb-10'>{item.role}</span>}
                            {item.role === 'BLOGGER' && <span className='font-inter font-bold text-[#AAAAAA] text-lg mb-10'>{item.role}</span>}
                            {item.role === 'Admin' && <span className='font-inter font-bold text-[red] text-lg mb-10'>{item.role}</span>}

                        </div>
                    ))}
                </div>
                {users && users.length > 5 && <div className='flex flex-col w-full justify-center items-center mb-10'>
                    <button className='w-[200px] h-[50px] rounded-full text-[white] bg-black font-bold' onClick={() => setLoad(true)}>Load More</button>
                </div>}

            </div>
        </div>
    );
};

export default UpgradedUser;
