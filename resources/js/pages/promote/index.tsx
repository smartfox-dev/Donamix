import React, { Fragment, useState } from 'react';
import LeftSidebar from '@/pages/dashboard/layout/LeftSidebar';
import RightSidebar from '@/pages/dashboard/layout/RightSidebar';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

const Promote = () => {
    const { setIsLeftSidebarOpen } = useAppContext();
    const [users, setUsers] = useState(null)
    const [isLoad, setLoad] = useState(false)

    useEffect(() => {
        return () => setIsLeftSidebarOpen(true);
    }, []);
    const text1 = '<a title="The Largest Social Network - Donamix" href="https://www.donamix.com/"><img style="border:1px solid #666;width:791px;height:248px;" src="https://www.donamix.com/front/banners/1674293291-320 x 100 – Large Mobile Banner.png" alt="The Largest Social Network - Donamix" /></a>'
    const text2 = '<a title="The Largest Social Network - Donamix" href="https://www.donamix.com/"><img style="border:1px solid #666;width:418px;height:347px;" src="https://www.donamix.com/front/banners/1674293351-336 x 280 – Large Rectangle.png" alt="The Largest Social Network - Donamix" /></a>'
    const text3 = '<a title="Free Video Chat - Donamix" href="https://www.donamix.com/"><img style="border:1px solid #666;width:300px;height:250px;" src="https://www.donamix.com/front/banners/1674293700-donamixMedium Rectangle.png" alt="Free Video Chat - Donamix" /></a>'
    const text4 = '<a title="Free Video Chat - Donamix" href="https://www.donamix.com/chatrooms"><img style="border:1px solid #666;width:160px;height:600px;" src="https://www.donamix.com/front/banners/1674293755-donamixWide Skyscraper.png" alt="Free Video Chat - Donamix" /></a>'
    const text5 = '<a title="Create a Blog - Donamix" href="https://www.donamix.com/chatrooms"><img style="border:1px solid #666;width:728px;height:90px;" src="https://www.donamix.com/front/banners/1674293784-donamixLeaderboard.png" alt="Create a Blog - Donamix" /></a>'
    const text6 = '<a title="The Largest Social Network - Donamix" href="https://www.donamix.com/"><img style="border:1px solid #666;width:301px;height:598px;" src="https://www.donamix.com/front/banners/1674294078-Half Page.png" alt="The Largest Social Network - Donamix" /></a>'
    const text7 = '<a title="The Largest Social Network - Donamix" href="https://www.donamix.com/"><img style="border:1px solid #666;width:1079px;height:125px;" src="https://www.donamix.com/front/banners/1674294092-Leaderboard.png" alt="The Largest Social Network - Donamix" /></a>'

    return (
        <div className="w-full h-full relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
            <LeftSidebar onStateChange={true} />
            <div className='flex flex-col w-full gap-5 p-10 justify-center items-center'>
                <div className="rounded-t-full w-full">
                    <img src="/images/home/home.png" className="w-full h-auto" alt="" />
                </div>
                <span className='font-sans text-3xl font-semibold text-[black] w-full text-start pt-5 pb-5'>Promote us</span>

                <img src="https://www.donamix.com/front/banners/1674293291-320 x 100 – Large Mobile Banner.png" className='w-full h-[auto] bg-cover'></img>
                <div className='w-full rounded-t-3xl  bg-white'>
                    <textarea value={text1} className='w-full h-[200px] p-10 rounded-t-3xl' />
                </div>
                <img src="https://www.donamix.com/front/banners/1674293351-336 x 280 – Large Rectangle.png" className='w-[auto] h-[auto] bg-cover'></img>
                <div className='w-full rounded-t-3xl  bg-white'>
                    <textarea value={text2} className='w-full h-[200px] p-10 rounded-t-3xl' />
                </div>
                <img src="https://www.donamix.com/front/banners/1674293700-donamixMedium Rectangle.png" className='w-[auto] h-[auto] bg-cover'></img>
                <div className='w-full rounded-t-3xl  bg-white'>
                    <textarea value={text3} className='w-full h-[200px] p-10 rounded-t-3xl' />
                </div>
                <img src="https://www.donamix.com/front/banners/1674293755-donamixWide Skyscraper.png" className='w-[auto] h-[auto] bg-cover'></img>
                <div className='w-full rounded-t-3xl  bg-white'>
                    <textarea value={text4} className='w-full h-[200px] p-10 rounded-t-3xl' />
                </div>
                <img src="https://www.donamix.com/front/banners/1674293784-donamixLeaderboard.png" className='w-[auto] h-[auto] bg-cover'></img>
                <div className='w-full rounded-t-3xl  bg-white'>
                    <textarea value={text5} className='w-full h-[200px] p-10 rounded-t-3xl' />
                </div>
                <img src="https://www.donamix.com/front/banners/1674294078-Half Page.png" className='w-[auto] h-[auto] bg-cover'></img>
                <div className='w-full rounded-t-3xl  bg-white'>
                    <textarea value={text6} className='w-full h-[200px] p-10 rounded-t-3xl' />
                </div>
                <img src="https://www.donamix.com/front/banners/1674294092-Leaderboard.png" className='w-[auto] h-[auto] bg-cover'></img>
                <div className='w-full rounded-t-3xl  bg-white'>
                    <textarea value={text7} className='w-full h-[200px] p-10 rounded-t-3xl' />
                </div>

            </div>
            <RightSidebar />
        </div>
    );
};

export default Promote;
