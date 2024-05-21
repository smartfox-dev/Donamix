import React, { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    // Button,
} from "@material-tailwind/react";
import { useAuthContext } from '@/context/AuthContext';
import { getIDProfile, sendKick, sendMute, sendUnMute, sendBot, mailDelete } from '@/api/users';
import { FaReply } from "react-icons/fa";
import { MdOutlineForum } from "react-icons/md";
import { ImBin, ImBlocked } from "react-icons/im";
import { BiPlusMedical, BiSolidVolumeMute, BiSolidVolume } from "react-icons/bi";
import { FcCloseUpMode, FcRules } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setMember } from '@/actions/chatSlice';
import { RootState } from '@/actions/store';
import { useSelector } from 'react-redux';
import CONSTANTS from '@/config/constants';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from 'react-router-dom';

interface IMailPopup {
    children: React.ReactNode;
    privateSelect?: Function;
    member?: Number;
    muted?: Number;
    name?: String;
    username?: String;
    mail_id?:Number;
}

const MailPopup: React.FC<IMailPopup> = ({ children, privateSelect, member, muted, name, mail_id, username }) => {
    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const { user } = useAuthContext();
    const [profile, setProfile] = useState(null);
    const params = useParams();
    const [isKick, setKick] = useState(false)
    const [isMute, setMute] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const openPopover = () => {
        setIsOpenPopover(true);
    }

    const onClickPrivate = () => {
        privateSelect();
        setIsOpenPopover(false);
    }

    const handleDelete = () => {
        setIsOpenPopover(false);
        mailDelete({'mail_id': mail_id})
                .then((res) => {
                    console.log('success')
                })
                .catch((err) => console.log('Network Error!'))
    }

    const handleKick = () => {
        setIsOpenPopover(false);
        if(user.role != 'Member' && user.role != ''){
            setKick(true);
        }
        else {
            sendBot()
                .then((res) => console.log(res))
                .catch((err) => console.log('Network Error!'))
        }
    }

    const handleMute = () => {
        setIsOpenPopover(false);
        if(user.role != 'Member' && user.role != '') {
            setMute(true)
        }
        else {
            sendBot()
                .then((res) => console.log(res))
                .catch((err) => console.log('Network Error!'))
        }
    }

    const handleUnMute = () => {
        setIsOpenPopover(false);
        sendUnMute({ 'id': member, 'room_id': params.id })
            .then((res) => {
                toast.success('Success UnMute!')
            })
            .catch((err) => {
                toast.error('Only Admin, Moderator or VIP can mute!')
            })
    }

    const handleView = () => {
        navigate('/profile/'+username)
    }

    return (
        <>
            <Popover placement='bottom-start'>
                <PopoverHandler onClick={openPopover}>
                    {children}
                </PopoverHandler>
                {isOpenPopover === true && <PopoverContent className='bg-black w-[250px] flex flex-col gap-5 p-4 z-[50]'>
                    {user && user.role === 'Admin' && <div className='flex flex-row items-center gap-3 cursor-pointer' onClick={handleDelete}>
                        <ImBin size='20' className='text-white'/>
                        <p className=' font-montserrat font-medium text-base text-white'>Delete Message</p>
                    </div>}

                    <div className='flex flex-row items-center gap-3 hover:cursor-pointer' onClick={onClickPrivate}>
                        <BiPlusMedical size='20' className=' text-green-600' />
                        <p className=' font-montserrat font-medium text-base text-white'>Private Message</p>
                    </div>
                    <div className='flex flex-row items-center gap-3 hover:cursor-pointer' onClick={handleView}>
                        <FaUserAlt size='20' className=' text-green-600' />
                        <p className=' font-montserrat font-medium text-base text-white'>View Profile</p>
                    </div>
                    <div className='flex flex-row items-center gap-3 hover:cursor-pointer'>
                        <FcCloseUpMode size='20' />
                        <p className=' font-montserrat font-medium text-base text-white'>Send gift</p>
                    </div>
                    <div className='flex flex-row items-center gap-3 hover:cursor-pointer'>
                        <ImBlocked size='20' className=' text-red-600' />
                        <p className=' font-montserrat font-medium text-base text-white'>Block</p>
                    </div>
                    <div className='flex flex-row items-center gap-3 hover:cursor-pointer' onClick={handleKick}>
                        <img src="/images/home/fired.png" className='w-[20px] h-[20px]' />
                        <p className=' font-montserrat font-medium text-base text-white'>Kick</p>
                    </div>
                    {muted == 1 ? <div className='flex flex-row items-center gap-3 hover:cursor-pointer' onClick={handleUnMute}>
                        <BiSolidVolume size='20' className='text-white' />
                        <p className=' font-montserrat font-medium text-base text-white'>UnMute</p>
                    </div> : <div className='flex flex-row items-center gap-3 hover:cursor-pointer' onClick={handleMute}>
                        <BiSolidVolumeMute size='20' className='text-white' />
                        <p className=' font-montserrat font-medium text-base text-white'>Mute</p>
                    </div>}
                    <div className='flex flex-row items-center gap-3 hover:cursor-pointer'>
                        <FcRules size='20' />
                        <p className=' font-montserrat font-medium text-base text-white'>Chat Etiquette</p>
                    </div>
                    <div className='flex flex-row items-center gap-3 hover:cursor-pointer'>
                        <MdOutlineForum size='20' className='text-white' />
                        <p className=' font-montserrat font-medium text-base text-white'>Forums</p>
                    </div>
                    {/* <div className='flex flex-row items-center gap-3'>
                    <FaReply size='20' className=' text-green-600'/>
                    <p className=' font-montserrat font-medium text-base text-white'>Reply</p>
                    </div> */}
                </PopoverContent>}
            </Popover>
            <Dialog open={isKick} onClose={() => setKick(false)}  >
                {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
                <DialogContent className="">
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                        <div className="relative z-10 p-4 bg-white rounded-lg">
                            <p>Are you sure you want to Kick {name}?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                    onClick={() => {
                                        setKick(false);
                                    }}
                                >
                                    No
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                    onClick={() => {
                                        setKick(false)
                                        dispatch(setMember(member));
                                        sendKick({ 'id': member, 'room_id': params.id })
                                            .then((res) => {
                                                toast.success('Success Kick!')
                                            })
                                            .catch((err) => {
                                                toast.error('Only Admin or VIP can kick!')
                                            })
                                    }}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isMute} onClose={() => setMute(false)}  >
                {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
                <DialogContent className="">
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                        <div className="relative z-10 p-4 bg-white rounded-lg">
                            <p>Are you sure you want to Mute {name}?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                    onClick={() => {
                                        setMute(false);
                                    }}
                                >
                                    No
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                    onClick={() => {
                                        setMute(false)
                                        sendMute({ 'id': member, 'room_id': params.id })
                                            .then((res) => {
                                                toast.success('Success Mute!')
                                            })
                                            .catch((err) => {
                                                toast.error('Only Admin, Moderator or VIP can mute!')
                                            })
                                    }}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MailPopup
