import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { FiClock } from "react-icons/fi";
import { getList } from '@/api/chat';
import toast from 'react-hot-toast';
import { roomReg, roomMember, kickroom } from '@/api/chat';
import { useParams } from 'react-router-dom';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function ChatroomList() {
    const count1 = 4;
    const count2 = 12;
    const [lists, setList] = useState([])
    const [rooms, setRooms] = useState([])
    const params = useParams();
    const navigate = useNavigate();
    const [banned, setBan] = useState(false)
    const gotoChatroom = () => navigate('/rooms/page');

    const load = () => {
        getList()
            .then((res: any) => {
                setList(res);
            })
            .catch((err) => {
                toast.error('Failed!');
            })
        roomMember()
            .then((res: any) => {
                setRooms(res)
                console.log(res)
            })
            .catch((err) => {
                toast.error('Failed!')
            })
    }


    useEffect(() => {
        load()
    }, [])

    return (
        <div className="flex-1 bg-dashboard-background w-full mainBody">
            <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
                <div className="rounded-t-full">
                    <img src="/images/home/home.png" className="w-full h-auto" alt="" />
                </div>
                <div className='flex flex-col w-full'>
                    <div className='w-full px-4 py-4 font-montserrat text-white font-semibold text-sm rounded-2xl bg-black'>
                        Donamix Chat: Free, Live Audio-Video Chat Service
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 p-4 bg-white shadow-sm'>
                        {
                            lists.slice(0, 4).map((list, i) => (
                                <div className='w-full flex flex-row bg-[#E6EFF6] p-3 gap-3 rounded-t-2xl' key={i}>
                                    <img src={`/images/chatroom/${i + 1}.jpg`} className='w-[33px] h-[33px] rounded-full' alt='' />
                                    <div className='flex flex-col gap-3 w-full'>
                                        <h3 className='font-poppins font-semibold text-md'>{list.title}</h3>
                                        <p className='font-poppins font-normal text-[10px] text-[#5B5B5B]'>{list.description}</p>
                                        <div className='flex flex-row gap-1 items-center'>
                                            <FiClock className='text-[#989898] text-[12px]' />
                                            <p className='font-poppins font-semibold text-[10px] text-[#989898]'>{list.created_at}</p>
                                        </div>
                                        <div className='flex flex-row flex-wrap gap-2 items-center justify-between'>
                                            <div className='flex flex-row-reverse items-center'>
                                                {rooms && rooms.length > 0 &&( rooms[i].length > 3 ? <>
                                                    <p className=' font-bold text-xs text-[#B49C5D]'>+{rooms[i].length - 3}</p>
                                                    <div className='flex flex-row-reverse items-center relative'>
                                                        <Avatar className='w-[20px] h-[20px] border-[1px] border-white right-0'>
                                                            <AvatarImage src={rooms[i][0].avatar} alt="" />
                                                            <AvatarFallback>
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <Avatar className='w-[20px] h-[20px] border-[1px] border-white right-[-5px]'>
                                                            <AvatarImage src={rooms[i][1].avatar} alt="" />
                                                            <AvatarFallback>
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <Avatar className='w-[20px] h-[20px] border-[1px] border-white right-[-10px]'>
                                                            <AvatarImage src={rooms[i][2].avatar} alt="" />
                                                            <AvatarFallback>
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div></> : <>
                                                    <div className='flex flex-row-reverse items-center relative'>
                                                        {rooms[i].map((item, j) => (
                                                            <Avatar className='w-[20px] h-[20px] border-[1px] border-white right-0' key={j}>
                                                                <AvatarImage src={item.avatar} alt="" />
                                                                <AvatarFallback>
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        ))}
                                                    </div></>)}

                                            </div>
                                            <Button variant='default' className='font-poppins font-semibold text-xs h-[30px] py-1 px-5' onClick={() => {

                                                kickroom({'room_id': i + 1})
                                                    .then((res) => {
                                                        navigate('/rooms/page/' + (i + 1))
                                                    })
                                                    .catch((err) => setBan(true))
                                            }}>Join Conversation</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <Dialog open={banned} onClose={() => setBan(false)}  >
                        {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
                        <DialogContent className="">
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                    <p>You are temporarily banned. Please try again in 5 hours or join another room and make sure to follow our chat rules to prevent any future restrictions.</p>
                                    <div className="flex justify-end mt-4">

                                        <button
                                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                            onClick={() => {
                                                setBan(false)
                                            }}
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                <div className='flex flex-col w-full'>
                    <div className='w-full px-4 py-4 font-montserrat text-white font-semibold text-sm rounded-2xl bg-black'>
                        Conversations: Select your preferred visually appealing chat rooms and enjoy connecting with individuals who share similar interests!
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 p-4 bg-white shadow-sm'>
                        {lists.slice(4, 16).map((list, i) => (
                            <div key={i} className='w-full flex flex-row bg-[#E6EFF6] p-3 gap-3 rounded-t-2xl'>
                                <img src={`/images/chatroom/${i + 5}.jpg`} className='w-[33px] h-[33px] rounded-full' alt='' />
                                <div className='flex flex-col gap-3 w-full'>
                                    <h3 className='font-poppins font-semibold text-md'>{list.title}</h3>
                                    <p className='font-poppins font-normal text-[10px] text-[#5B5B5B]'>{list.description}</p>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <FiClock className='text-[#989898] text-[12px]' />
                                        <p className='font-poppins font-semibold text-[10px] text-[#989898]'>{list.created_at}</p>
                                    </div>
                                    <div className='flex flex-row flex-wrap gap-2 items-center justify-between'>
                                        <div className='flex flex-row-reverse items-center'>
                                            {rooms && rooms.length > 0 && (rooms[i+5] && rooms[i+5].length > 3 ? <>
                                                <p className=' font-bold text-xs text-[#B49C5D]'>+{rooms[i+5].length - 3}</p>
                                                <div className='flex flex-row-reverse items-center relative'>
                                                    <Avatar className='w-[20px] h-[20px] border-[1px] border-white right-0'>
                                                        <AvatarImage src={rooms[i+5][0].avatar} alt="" />
                                                        <AvatarFallback>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <Avatar className='w-[20px] h-[20px] border-[1px] border-white right-[-5px]'>
                                                        <AvatarImage src={rooms[i+5][1].avatar} alt="" />
                                                        <AvatarFallback>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <Avatar className='w-[20px] h-[20px] border-[1px] border-white right-[-10px]'>
                                                        <AvatarImage src={rooms[i+5][2].avatar} alt="" />
                                                        <AvatarFallback>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div></> : <>
                                                <div className='flex flex-row-reverse items-center relative'>
                                                    {rooms[i+5] && rooms[i+5].map((item, j) => (
                                                        <Avatar className='w-[20px] h-[20px] border-[1px] border-white right-0' key={j}>
                                                            <AvatarImage src={item.avatar} alt="" />
                                                            <AvatarFallback>
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    ))}
                                                </div></>)}
                                        </div>
                                        <Button variant='default' className='font-poppins font-semibold text-xs h-[30px] py-1 px-5' onClick={() => { navigate('/rooms/page/' + (i + 5)) }}>Join Conversation</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
