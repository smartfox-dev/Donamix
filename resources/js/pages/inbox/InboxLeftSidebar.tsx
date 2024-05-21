import React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import UserManagePopup from './UserManagePopup';
import { useDispatch } from 'react-redux';
import { setChat, setUser, setUsers } from '@/actions/chatSlice';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa";
import { IoIosSearch } from 'react-icons/io'
import { PiCheckBold, PiChecksBold } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { RootState } from '@/actions/store';
import { getChatMember } from '@/api/users';
import { chatRead, chatSent, chatUnRead, chatDelete } from '@/api/chat';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';

import { Slider } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    // Button,
} from "@material-tailwind/react";
import CONSTANTS from '@/config/constants';
import { useStepContext } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IInboxLeftSidebarProps {
    isPrivateChat: boolean;
    setIsPrivateChat: Function;
    setMobile?: Function;
}

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const InboxLeftSidebar: React.FC<IInboxLeftSidebarProps> = ({ isPrivateChat, setIsPrivateChat, setMobile }) => {

    const privateSelect = () => {
        setIsPrivateChat(true);
    }
    const { user } = useAuthContext();
    const { setMember } = useAuthContext();
    const { member } = useAuthContext();
    const [selectedValue, setSelectedValue] = useState('option1')
    const [lists, setList] = useState([])
    const [members, setMembers] = useState([{
        'id': 0,
        'avatar': '',
        'name': '',
        'username': '',
        'msg': '',
        'is_live': 1,
        'date': '',
        'count': 0
    }])
    const navigate = useNavigate()
    const [read, setRead] = useState([])
    const [sent, setSent] = useState([])
    const [unread, setUnRead] = useState([])
    const dispatch = useDispatch()
    const userinfo = useSelector((state: RootState) => state.chat.userinfo);
    const userinfoRef = useRef(userinfo);
    const contacts = useSelector((state: RootState) => state.chat.users);
    const contactRef = useRef(contacts)
    userinfoRef.current = userinfo;
    contactRef.current = contacts;

    const handleSelectChange = (event) => {
        setSelectedValue(event);
    }

    const load = () => {
        getChatMember()
            .then((res: any) => {
                setList(res)
                let temp = []
                res.map((item, i) => {
                    temp.push({
                        'id': item.id,
                        'avatar': item.avatar,
                        'name': item.name,
                        'msg': item.msg,
                        'is_live': item.is_live,
                        'date': item.date,
                        'username': item.username,
                        'count': 0
                    })
                })
                console.log(temp)
                dispatch(setUsers(temp))
                setMembers(temp)
            })
            .catch((err) => {
                console.log(err)
                console.error('Failed Load!')
            })
        chatRead()
            .then((res: any) => {
                setRead(res)

            })
            .catch((err) => {
                console.log(err)
                console.error('Failed Load!')
            })
        chatSent()
            .then((res: any) => {
                setSent(res)
            })
            .catch((err) => {
                console.log(err)
                console.error('Failed Load!')
            })
        chatUnRead()
            .then((res: any) => {
                setUnRead(res)
            })
            .catch((err) => {
                console.log(err)
                console.error('Failed Load!')
            })
    }

    useEffect(() => {
        load()
    }, [user])

    const handleSelect = (id) => {
        setMember(id)

        let temp = [];
        members.map((item, i) => {
            if (item.id == id) {
                temp.push({
                    'id': item.id,
                    'name': item.name,
                    'avatar': item.avatar,
                    'is_live': item.is_live,
                    'msg': item.msg,
                    'date': item.date,
                    'username': item.username,
                    'count': 0
                })
            }
            else {
                temp.push(item)
            }
        })
        setMembers(temp)
        dispatch(setUsers(temp))
        if(isMobileDevice()){
            setMobile(false)
        }
    }

    const onMessageReceive = useCallback((data) => {
        const info = userinfoRef.current
        const contacts = contactRef.current
        console.log(contacts)
        if (data.message[0].room_id == "17") {
            if (data.message[0].member_id == info.id && data.message[0].user_id !== member) {
                let temp = [];
                console.log(contacts)
                contacts.map((item, i) => {
                    if (item.id == data.message[0].user_id) {
                        temp.push({
                            'id': item.id,
                            'name': item.name,
                            'avatar': item.avatar,
                            'msg': item.msg,
                            'is_live': item.is_live,
                            'date': item.date,
                            'username': item.username,
                            'count': 1
                        })
                    }
                    else {
                        temp.push(item)
                    }
                })
                setMembers(temp)
                dispatch(setUsers(temp))
            }
        }
    }, [members])

    const onInboxReceive = useCallback((data) => {
        const info = userinfoRef.current
        const contacts = contactRef.current
        console.log(data.message, contacts)
        let temp = []
        contacts.map((item, i) => {
            if(data.message[i][0] === item.id) {
                temp.push({
                    'id': item.id,
                    'name': item.name,
                    'avatar': item.avatar,
                    'msg': item.msg,
                    'is_live' : data.message[i][1],
                    'date': item.date,
                    'username': item.username,
                    'count': 0
                })
            }
            else {
                temp.push(item)
            }
        })
        setMembers(temp)
        dispatch(setUsers(temp))

    }, [])

    const onOutReceive = useCallback((data) => {
        const contacts = contactRef.current
        console.log(data.message)
        let temp = []
        contacts.map((item) => {
            if(data.message === item.id) {
                temp.push({
                    'id': item.id,
                    'name': item.name,
                    'avatar': item.avatar,
                    'msg': item.msg,
                    'is_live' : 0,
                    'date': item.date,
                    'username': item.username,
                    'count': 0
                })
            }
            else {
                temp.push(item)
            }
        })
        setMembers(temp)
        dispatch(setUsers(temp))

    }, [])

    const handleDelete = (id) => {
        chatDelete({'member_id': id})
            .then((res) => {
                let temp = [...members];
                temp = temp.filter(item => item.id !== id)
                setMembers(temp);
                dispatch(setUsers(temp))
                dispatch(setChat([]));
            })
    }

    useEffect(() => {
        // Make sure to replace 'chat' with the actual channel name you're using
        // and 'MessageSent' with the event name you're broadcasting from Laravel
        const pusher = new Pusher('e1d8debb6b5791133889', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', onMessageReceive)
        const channel_inbox = pusher.subscribe('chat');
        channel_inbox.bind('inbox', onInboxReceive)
        const channel_out = pusher.subscribe('chat');
        channel_out.bind('out', onOutReceive)
        return () => {
            channel.unbind_all();
            channel.unsubscribe();

            channel_inbox.unbind_all();
            channel_inbox.unsubscribe();

            channel_out.unbind_all();
            channel_out.unsubscribe();
        }
    }, []);

    useEffect(() => {
        dispatch(setUser(user))
    }, [user])

    return (
        <div className='flex flex-col sm:w-[328px] w-full'>
            {/* <div className='flex flex-row rounded-t-xl bg-black relative'>
                <img src='/images/chatroom/microphone.png' className='w-[105px] h-[94px]' alt='' />
                <FaPlay className='absolute top-[52.5px] left-[50px] transform -translate-x-1/2 -translate-y-1/2' size='20' style={{ color: 'white'}}/>
                <div className='p-2 flex-1 flex-col gap-2'>
                <p className=' font-montserrat font-bold text-base text-white'>Donamix - Radio</p>
                <p className=' font-montserrat font-bold text-xs text-white'>Interactive Internet Radio</p>
                <div className='w-full flex justify-end'>
                    <HiOutlineSpeakerWave size='25' style={{ color: 'white'}}/>
                </div>
                <Slider color='amber' size='sm' defaultValue={50} />
                </div>
            </div> */}
            <div className='flex flex-col rounded-tl-xl bg-black p-3 gap-3'>
                <div className='flex flex-row items-center gap-3'>
                    <div className='relative'>
                        <Avatar className='w-[72px] h-[72px] border-2 border-white'>
                            <AvatarImage src={user && user.avatar} className='' />
                        </Avatar>
                        <span className="top-[50px] left-[55px] absolute w-3.5 h-3.5 bg-green-300 rounded-full"></span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className=' font-montserrat font-bold text-base text-white'>{user && user.name}</p>
                        {/* <p className=' font-montserrat font-bold text-base text-[#828282]'>1 Users</p> */}
                    </div>
                </div>
                <div className='flex flex-row pl-[60px] gap-10 items-center'>
                    <div className='flex flex-row gap-2 items-center'>
                        <img src="/images/money.svg" width="24" height="24" alt='' />
                        <p className='font-inter font-semibold text-sm text-white'>1600 wallet</p>
                    </div>
                    <Button variant='secondary' className='rounded-full font-montserrat font-semibold text-sm h-[28px] w-[52px]'>Buy</Button>
                </div>
            </div>
            <div className='flex flex-col w-full bg-[#F0F0F0] p-5 gap-4'>
                <p className='font-montserrat font-bold text-xs'>All Conversation</p>
                <Select value={selectedValue} onChange={handleSelectChange}>
                    <Option value='option1'>All Messages</Option>
                    <Option value='option2'>Sent</Option>
                    <Option value='option3'>Read</Option>
                    <Option value='option4'>Unread</Option>
                </Select>
            </div>
            <div className='flex-1 flex flex-col gap-5 bg-white p-5 overflow-y-hidden'>
                {
                    selectedValue == 'option1' && members.map((list, i) => (
                        <div className='flex flex-row items-center justify-between cursor-pointer' onClick={() => { handleSelect(list.id) }}>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='relative'>
                                    <Avatar className='w-[43px] h-[43px]'>
                                        <AvatarImage src={list.avatar} />
                                    </Avatar>
                                    {list.is_live == 1 ? <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-green-300 rounded-full"></span> : <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-gray-300 rounded-full"></span>}

                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className=' font-poppins font-medium text-base'>{list.name}</p>
                                    <div className=' flex flex-row items-center gap-2 w-20'>
                                        <p className='font-poppins font-medium text-sm text-[#E5E5E5] truncate'>{list.msg}</p>
                                        {/* <PiChecksBold className='text-[#E5E5E5]' /> */}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col h-full items-end gap-3 p-3'>
                                <p className=' font-poppins font-normal text-xs text-[#C5BDBD]'>{list.date}</p>
                                <div className='flex flex-row gap-5'>
                                    {list.count !== 0 && <p className=' font-poppins font-normal text-xs text-[white] rounded-full bg-[red] w-[20px] h-[20px] flex items-center justify-center'>{list.count}</p>}
                                    <Popover placement='bottom-end'>
                                        <PopoverHandler>
                                            <div className='px-1 hover:cursor-pointer'>
                                                <HiDotsVertical className='text-[#BABABA]' />
                                            </div>
                                        </PopoverHandler>
                                        <PopoverContent className='flex flex-col p-5 gap-5 pl-5 bg-white shadow-lg'>
                                            <p className=' font-montserrat font-semibold text-xs text-[#979797] cursor-pointer' onClick={() => navigate('/profile/' + list.username)}>View Profile</p>
                                            <p className='font-montserrat font-semibold text-xs text-[#979797] cursor-pointer' onClick={() => handleDelete(list.id)}>Delete Conversation</p>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    ))
                }

                {
                    selectedValue == 'option2' && sent.map((list, i) => (
                        <div className='flex flex-row items-center justify-between cursor-pointer' onClick={() => {
                            setMember(list.user.id)
                            if(isMobileDevice()){
                                setMobile(false)
                            }
                        }}>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='relative'>
                                    <Avatar className='w-[43px] h-[43px]'>
                                        <AvatarImage src={list.user.avatar} />
                                    </Avatar>
                                    <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-green-300 rounded-full"></span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className=' font-poppins font-medium text-base'>{list.user.name}</p>
                                    {/* <div className=' flex flex-row items-center gap-2'>
                                        <p className='font-poppins font-medium text-sm text-[#E5E5E5]'>Hi David</p>
                                        <PiChecksBold className='text-[#E5E5E5]' />
                                    </div> */}
                                </div>
                            </div>
                            <div className='flex flex-col h-full items-end gap-3 p-3'>
                                {/* <p className=' font-poppins font-normal text-xs text-[#C5BDBD]'>29 mar</p> */}
                                <Popover placement='bottom-end'>
                                    <PopoverHandler>
                                        <div className='px-1 hover:cursor-pointer'>
                                            <HiDotsVertical className='text-[#BABABA]' />
                                        </div>
                                    </PopoverHandler>
                                    <PopoverContent className='flex flex-col p-5 gap-5 pl-5 bg-white shadow-lg'>
                                        <p className=' font-montserrat font-semibold text-xs text-[#979797] cursor-pointer' onClick={() => navigate('/profile/' + list.username)}>View Profile</p>
                                        <p className='font-montserrat font-semibold text-xs text-[#979797] cursor-pointer'>Delete Conversation</p>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    ))
                }
                {
                    selectedValue == 'option3' && read.map((list, i) => (
                        <div className='flex flex-row items-center justify-between cursor-pointer' onClick={() => {
                            setMember(list.id)
                            if(isMobileDevice()){
                                setMobile(false)
                            }
                            }}>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='relative'>
                                    <Avatar className='w-[43px] h-[43px]'>
                                        <AvatarImage src={list.avatar} />
                                    </Avatar>
                                    <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-green-300 rounded-full"></span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className=' font-poppins font-medium text-base'>{list.name}</p>
                                    {/* <div className=' flex flex-row items-center gap-2'>
                                        <p className='font-poppins font-medium text-sm text-[#E5E5E5]'>Hi David</p>
                                        <PiChecksBold className='text-[#E5E5E5]' />
                                    </div> */}
                                </div>
                            </div>
                            <div className='flex flex-col h-full items-end gap-3 p-3'>
                                {/* <p className=' font-poppins font-normal text-xs text-[#C5BDBD]'>29 mar</p> */}
                                <Popover placement='bottom-end'>
                                    <PopoverHandler>
                                        <div className='px-1 hover:cursor-pointer'>
                                            <HiDotsVertical className='text-[#BABABA]' />
                                        </div>
                                    </PopoverHandler>
                                    <PopoverContent className='flex flex-col p-5 gap-5 pl-5 bg-white shadow-lg'>
                                        <p className=' font-montserrat font-semibold text-xs text-[#979797] cursor-pointer' onClick={() => navigate('/profile/' + list.username)}>View Profile</p>
                                        <p className='font-montserrat font-semibold text-xs text-[#979797] cursor-pointer'>Delete Conversation</p>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    ))
                }
                {
                    selectedValue == 'option4' && unread.map((list, i) => (
                        <div className='flex flex-row items-center justify-between cursor-pointer' onClick={() => {
                            setMember(list.id)
                            if(isMobileDevice()){
                                setMobile(false)
                            }
                            }}>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='relative'>
                                    <Avatar className='w-[43px] h-[43px]'>
                                        <AvatarImage src={list.avatar} />
                                    </Avatar>
                                    <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-green-300 rounded-full"></span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className=' font-poppins font-medium text-base'>{list.name}</p>
                                    {/* <div className=' flex flex-row items-center gap-2'>
                                        <p className='font-poppins font-medium text-sm text-[#E5E5E5]'>Hi David</p>
                                        <PiChecksBold className='text-[#E5E5E5]' />
                                    </div> */}
                                </div>
                            </div>
                            <div className='flex flex-col h-full items-end gap-3 p-3'>
                                {/* <p className=' font-poppins font-normal text-xs text-[#C5BDBD]'>29 mar</p> */}
                                <Popover placement='bottom-end'>
                                    <PopoverHandler>
                                        <div className='px-1 hover:cursor-pointer'>
                                            <HiDotsVertical className='text-[#BABABA]' />
                                        </div>
                                    </PopoverHandler>
                                    <PopoverContent className='flex flex-col p-5 gap-5 pl-5 bg-white shadow-lg'>
                                        <p className=' font-montserrat font-semibold text-xs text-[#979797]' onClick={() => navigate('/profile/' + list.username)}>View Profile</p>
                                        <p className='font-montserrat font-semibold text-xs text-[#979797]'>Delete Conversation</p>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    ))
                }
                {/* <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center gap-3'>
                        <div className='relative'>
                            <Avatar className='w-[43px] h-[43px]'>
                                <AvatarImage src='/images/avatar_1.jpg' />
                            </Avatar>
                            <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-green-300 rounded-full"></span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className=' font-poppins font-medium text-base'>John Walton</p>
                            <div className=' flex flex-row items-center gap-2'>
                                <p className='font-poppins font-medium text-sm text-[#E5E5E5]'>Hi David</p>
                                <PiCheckBold className='text-[#E5E5E5]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col h-full items-end gap-3 p-3'>
                        <p className=' font-poppins font-normal text-xs text-[#C5BDBD]'>29 mar</p>
                        <Popover placement='bottom-end'>
                            <PopoverHandler>
                                <div className='px-1 hover:cursor-pointer'>
                                    <HiDotsVertical className='text-[#BABABA]' />
                                </div>
                            </PopoverHandler>
                            <PopoverContent className='flex flex-col p-5 gap-5 pl-5 bg-white shadow-lg'>
                                <p className=' font-montserrat font-semibold text-xs text-[#979797]'>View Profile</p>
                                <p className='font-montserrat font-semibold text-xs text-[#979797]'>Delete Conversation</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center gap-3'>
                        <div className='relative'>
                            <Avatar className='w-[43px] h-[43px]'>
                                <AvatarImage src='/images/avatar_1.jpg' />
                            </Avatar>
                            <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-green-300 rounded-full"></span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className=' font-poppins font-medium text-base'>John Walton</p>
                            <div className=' flex flex-row items-center gap-2'>
                                <p className='font-poppins font-medium text-sm text-[#E5E5E5]'>Hi David</p>
                                <PiChecksBold className=' text-blue-700' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col h-full items-end gap-3 p-3'>
                        <p className=' font-poppins font-normal text-xs text-[#C5BDBD]'>29 mar</p>
                        <Popover placement='bottom-end'>
                            <PopoverHandler>
                                <div className='px-1 hover:cursor-pointer'>
                                    <HiDotsVertical className='text-[#BABABA]' />
                                </div>
                            </PopoverHandler>
                            <PopoverContent className='flex flex-col p-5 gap-5 pl-5 bg-white shadow-lg'>
                                <p className=' font-montserrat font-semibold text-xs text-[#979797]'>View Profile</p>
                                <p className='font-montserrat font-semibold text-xs text-[#979797]'>Delete Conversation</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center gap-3'>
                        <div className='relative'>
                            <Avatar className='w-[43px] h-[43px]'>
                                <AvatarImage src='/images/avatar_1.jpg' />
                            </Avatar>
                            <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-green-300 rounded-full"></span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className=' font-poppins font-medium text-base'>John Walton</p>
                            <div className=' flex flex-row items-center gap-2'>
                                <p className='font-poppins font-medium text-sm text-[#E5E5E5]'>Hi David</p>
                                <PiCheckBold className='text-[#E5E5E5]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col h-full items-end gap-3 p-3'>
                        <p className=' font-poppins font-normal text-xs text-[#C5BDBD]'>29 mar</p>
                        <Popover placement='bottom-end'>
                            <PopoverHandler>
                                <div className='px-1 hover:cursor-pointer'>
                                    <HiDotsVertical className='text-[#BABABA]' />
                                </div>
                            </PopoverHandler>
                            <PopoverContent className='flex flex-col p-5 gap-5 pl-5 bg-white shadow-lg'>
                                <p className=' font-montserrat font-semibold text-xs text-[#979797]'>View Profile</p>
                                <p className='font-montserrat font-semibold text-xs text-[#979797]'>Delete Conversation</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center gap-3'>
                        <div className='relative'>
                            <Avatar className='w-[43px] h-[43px]'>
                                <AvatarImage src='/images/avatar_1.jpg' />
                            </Avatar>
                            <span className="top-[5px] left-[35px] absolute w-[7px] h-[7px] bg-green-300 rounded-full"></span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className=' font-poppins font-medium text-base'>John Walton</p>
                            <div className=' flex flex-row items-center gap-2'>
                                <p className='font-poppins font-medium text-sm text-[#E5E5E5]'>Hi David</p>
                                <PiCheckBold className=' text-blue-700' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col h-full items-end gap-3 p-3'>
                        <p className=' font-poppins font-normal text-xs text-[#C5BDBD]'>29 mar</p>
                        <Popover placement='bottom-end'>
                            <PopoverHandler>
                                <div className='px-1 hover:cursor-pointer'>
                                    <HiDotsVertical className='text-[#BABABA]' />
                                </div>
                            </PopoverHandler>
                            <PopoverContent className='flex flex-col p-5 gap-5 pl-5 bg-white shadow-lg'>
                                <p className=' font-montserrat font-semibold text-xs text-[#979797]'>View Profile</p>
                                <p className='font-montserrat font-semibold text-xs text-[#979797]'>Delete Conversation</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default InboxLeftSidebar;
