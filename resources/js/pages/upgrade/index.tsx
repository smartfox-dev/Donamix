import React, { Fragment } from 'react';
import LeftSidebar from '@/pages/dashboard/layout/LeftSidebar';
import { useEffect, useState } from 'react';
import { getTitle } from '@/api/upgrade';
import { useAppContext } from '@/context/AppContext';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { Spinner } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const Upgrade = () => {
    const { setIsLeftSidebarOpen } = useAppContext();
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const gotoPayment = (id) => navigate('/payment/' + id);
    const [is_black, setBlack] = useState(false);
    const [blogColor, setBlogColor] = useState('black');
    const [btnblogColor, setBtnBlogColor] = useState('white');
    const [is_black_mod, setBlackMod] = useState(false);
    const [ModColor, setModColor] = useState('black');
    const [btnModColor, setBtnModColor] = useState('white');
    const [is_black_admin, setBlackAdmin] = useState(false);
    const [AdminColor, setAdminColor] = useState('black');
    const [btnAdminColor, setBtnAdminColor] = useState('white');
    const [is_black_vip, setBlackVip] = useState(false);
    const [VipColor, setVipColor] = useState('black');
    const [btnVipColor, setBtnVipColor] = useState('white');

    const handleEnter = () => {
        document.getElementsByClassName('package-blogger')[0].classList.add('bg-[#1B1B1B]')
        setBlogColor('white');
        setBtnBlogColor('black')
        setBlack(true)
    }

    const handleLeave = () => {
        document.getElementsByClassName('package-blogger')[0].classList.remove('bg-[#1B1B1B]')
        setBlogColor('black');
        setBtnBlogColor('white')
        setBlack(false)
    }

    const handleEnter_mod = () => {
        document.getElementsByClassName('pack-mod')[0].classList.add('bg-[#1B1B1B]')
        setModColor('white');
        setBtnModColor('black')
        setBlackMod(true)
    }

    const handleLeave_mod = () => {
        document.getElementsByClassName('pack-mod')[0].classList.remove('bg-[#1B1B1B]')
        setModColor('black');
        setBtnModColor('white')
        setBlackMod(false)
    }

    const handleEnter_admin = () => {
        document.getElementsByClassName('pack-admin')[0].classList.add('bg-[#1B1B1B]')
        setAdminColor('white');
        setBtnAdminColor('black')
        setBlackAdmin(true)
    }

    const handleLeave_admin = () => {
        document.getElementsByClassName('pack-admin')[0].classList.remove('bg-[#1B1B1B]')
        setAdminColor('black');
        setBtnAdminColor('white')
        setBlackAdmin(false);
    }

    const handleEnter_vip = () => {
        document.getElementsByClassName('pack-vip')[0].classList.add('bg-[#1B1B1B]')
        setVipColor('white');
        setBtnVipColor('black')
        setBlackVip(true)
    }

    const handleLeave_vip = () => {
        document.getElementsByClassName('pack-vip')[0].classList.remove('bg-[#1B1B1B]')
        setVipColor('black');
        setBtnVipColor('white')
        setBlackVip(false);
    }

    const load = () => {
        setIsLoading(true);
        getTitle()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    setTitles(res.data);
                    setIsLoading(false);
                }
                else {
                    toast.error('Failed!');
                }
            })
            .catch((err) => {
                console.warn('Error while loading upgrade titles', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        load();
        return () => setIsLeftSidebarOpen(true);
    }, []);

    if (isLoading)
        return (
            <div className="items-center justify-center flex w-full h-[300px]">
                <Spinner />
            </div>
        );

    return (
        <div className="w-full h-full relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
            <LeftSidebar onStateChange={true} />
            <div className="min-h-[700px] flex flex-col justify-start p-10 flex-1">
                <div>
                    <h3 className="text-xl font-semibold text-black font-poppins">
                        Choose Plan
                    </h3>
                    <p className="text-[#7D7D7D] font-medium font-poppins mt-[10px]">
                        Unlock the Full Potential of Your Profile - Upgrade your account today and access exclusive features!
                    </p>
                </div>
                <div className='flex flex-col md:flex-row gap-1 justify-between mt-10'>
                    <div className='flex flex-col rounded-lg w-[25%] md:min-w-[100px] min-w-[300px] max-w-[300px] package-blogger cursor-pointer' onClick={() => {gotoPayment(36)}} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                        <div className='flex flex-col items-center justify-center h-[300px] mt-10'>
                            <div className='w-[60px] h-[60px] rounded-full flex items-center justify-center '>
                                <img src="/images/home/Crown.png" className="w-12 h-12" alt="" />
                            </div>
                            <div className='font-spartan flex items-center font-bold text-xl mt-10 title-blogger' style={{ color: blogColor }}>Blogger</div>
                            <div className='flex flex-row justify-between mt-10 items-bottom'>
                                <div className='font-spartan flex font-bold text-3xl items-end title-blogger' style={{ color: blogColor }}>$36</div>
                                <div className='font-spartan flex items-center font-bold text-sm ml-5 title-blogger' style={{ color: blogColor }}>per month</div>
                            </div>
                            <div className='rounded-full h-[50px] w-[150px] bg-black flex items-center text-white justify-center mt-5 font-bold' style={{ backgroundColor: blogColor, color: btnblogColor }}>Upgrade Now</div>
                        </div>
                        <div className='pl-3 pr-3 mb-20' >
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3 list-blogger" style={{ color: blogColor }}>
                                    Featured member
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    Verified Badge
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    5 Free Credits
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    Profile customization
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    Auto approved blogs
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    We promote your work
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    World wide audience
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    Posting on the go
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    HD Video/Audio Calls
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" />
                                <div className=" font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    Priority listing in search
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" />
                                <div className=" font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    Priority customer support
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" />
                                <div className=" font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    Priority listing in chatroom
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" /><div className=" font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    Enjoy Ad-free browsing
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" /><div className=" font-poppins flex items-center ml-3" style={{ color: blogColor }}>
                                    See profile visitors
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col rounded-lg w-[25%] md:min-w-[100px] min-w-[300px] max-w-[300px] pack-mod cursor-pointer' onClick={() => {gotoPayment(66)}} onMouseEnter={handleEnter_mod} onMouseLeave={handleLeave_mod}>
                        <div className='flex flex-col items-center justify-center h-[300px] mt-10'>
                            <div className='w-[60px] h-[60px] rounded-full flex items-center justify-center '>
                                <img src="/images/home/Crown.png" className="w-12 h-12" alt="" />
                            </div>
                            <div className='font-spartan flex items-center font-bold text-xl mt-10' style={{ color: ModColor }}>Moderator</div>
                            <div className='flex flex-row justify-between mt-10 items-bottom'>
                                <div className='font-spartan flex font-bold text-3xl items-end' style={{ color: ModColor }}>$66</div>
                                <div className='  font-spartan flex items-center font-bold text-sm ml-5' style={{ color: ModColor }}>per month</div>
                            </div>
                            <div className='rounded-full h-[50px] w-[150px] bg-black flex items-center text-white justify-center mt-5 font-bold' style={{ backgroundColor: ModColor, color: btnModColor }}>Upgrade Now</div>
                        </div>
                        <div className='pl-3 pr-3 mb-20'>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Featured member
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Verified Badge
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    8 Free Credits
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Profile Customization
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Priority customer support
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Colored name in chat
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Priority listing in chatroom
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Enhanced messaging options
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Mute users in chatroom
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_mod ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    HD Video/Audio Calls
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" /><div className=" font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Priority listing in search
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" /><div className=" font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Enjoy Ad-free browsing
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" /><div className=" font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    See profile visitors
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                <img src="/images/home/delete-button.png" className="w-6 h-6" alt="" /><div className=" font-poppins flex items-center ml-3" style={{ color: ModColor }}>
                                    Kick users in chatroom
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col rounded-lg w-[25%] md:min-w-[100px] min-w-[300px] max-w-[300px] pack-admin cursor-pointer' onClick={() => {gotoPayment(111)}} onMouseEnter={handleEnter_admin} onMouseLeave={handleLeave_admin} >
                        <div className='flex flex-col items-center justify-center h-[300px] mt-10'>
                            <div className='w-[60px] h-[60px] rounded-full flex items-center justify-center '>
                                <img src="/images/home/Crown.png" className="w-12 h-12" alt="" />
                            </div>
                            <div className=' font-spartan flex items-center font-bold text-xl mt-10' style={{ color: AdminColor }}>Admin</div>
                            <div className='flex flex-row justify-between mt-10 items-bottom'>
                                <div className=' font-spartan flex font-bold text-3xl items-end' style={{ color: AdminColor }}>$111</div>
                                <div className=' font-spartan flex items-center font-bold text-sm ml-5' style={{ color: AdminColor }}>per month</div>
                            </div>
                            <div className='rounded-full h-[50px] w-[150px] bg-black flex items-center text-white justify-center mt-5 font-bold' style={{ backgroundColor: AdminColor, color: btnAdminColor }}>Upgrade Now</div>
                        </div>
                        <div className='pl-3 pr-3 mb-20'>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Featured member
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Verified Badge
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    10 Free Credits
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Profile customization
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Auto approved articles
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Priority listing in search
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Priority customer support
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Enhanced messaging options
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Enjoy Ad-free browsing
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    See profile visitors
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Colored name in chat
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Mute users in chatroom
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    Kick users in chatroom
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_admin ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: AdminColor }}>
                                    HD Video/Audio Calls
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col rounded-lg w-[25%] md:min-w-[100px] min-w-[300px] max-w-[300px] pack-vip cursor-pointer' onClick={() => {gotoPayment(488)}} onMouseEnter={handleEnter_vip} onMouseLeave={handleLeave_vip} >
                        <div className='flex flex-col items-center justify-center h-[300px] mt-10'>
                            <div className='w-[60px] h-[60px] rounded-full flex items-center justify-center '>
                                <img src="/images/home/Crown.png" className="w-12 h-12" alt="" />
                            </div>
                            <div className='font-spartan flex items-center font-bold text-xl mt-10' style={{ color: VipColor }}>VIP</div>
                            <div className='flex flex-row justify-between mt-10 items-bottom'>
                                <div className=' font-spartan flex font-bold text-3xl items-end' style={{ color: VipColor }}>$488</div>
                                <div className=' font-spartan flex items-center font-bold text-sm ml-5' style={{ color: VipColor }}>lifetime</div>
                            </div>
                            <div className='rounded-full h-[50px] w-[150px] bg-black flex items-center text-white justify-center mt-5 font-bold' style={{ backgroundColor: VipColor, color: btnVipColor }}>Upgrade Now</div>
                        </div>
                        <div className='pl-3 pr-3 mb-20'>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Featured member
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Verified Badge
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    15 Free Credits
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Profile customization
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Auto approved articles
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Priority listing in search
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Priority customer support
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Enhanced messaging options
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Enjoy Ad-free browsing
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    See Profile Visotors
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className="  font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Colored name in chat
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Priority listing in chatroom
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    Mute & Kick users in chatroom
                                </div>
                            </div>
                            <div className='flex justify-start items-center p-3' >
                                {is_black_vip ? <img src="/images/home/check.png" className="w-6 h-6" alt="" /> : <img src="/images/home/black_check.png" className="w-6 h-6" alt="" />}
                                <div className=" font-poppins flex items-center ml-3" style={{ color: VipColor }}>
                                    HD Video/Audio Calls
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upgrade;
