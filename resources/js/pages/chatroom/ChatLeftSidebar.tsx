import React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import UserManagePopup from './UserManagePopup';
import { PiWebcamFill } from "react-icons/pi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa";
import { IoIosSearch } from 'react-icons/io'
import { getAll, getGroupAll, getFriends, unFriend } from '@/api/users';
import { getList } from '@/api/chat';
import { useAuthContext } from '@/context/AuthContext';
import { Slider } from "@material-tailwind/react";
import CONSTANTS from '@/config/constants';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import VideoCall from './VideoCall';
import { useDispatch } from 'react-redux';
import { setUsers, setUser, setPrivate } from '@/actions/chatSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/actions/store';
import { ListItemSecondaryAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
interface IChatLeftSidebarProps {
    isPrivateChat: boolean;
    setIsPrivateChat: Function;
    setMem: Function;
    setMobile?: Function;
}

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const ChatLeftSidebar: React.FC<IChatLeftSidebarProps> = ({ isPrivateChat, setIsPrivateChat, setMem, setMobile }) => {
    const [users, setUserss] = useState(null)
    const { user } = useAuthContext();
    const params = useParams();
    const navigate = useNavigate()
    const [selectUser, setSelectUser] = useState(null);
    const [rooms, setRoom] = useState([])
    const [friends, setFriend] = useState([])
    const dispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.chat.users);
    const contactRef = useRef(contacts)
    const userinfo = useSelector((state: RootState) => state.chat.userinfo);
    const userinfoRef = useRef(userinfo);
    const isPrivate = useSelector((state: RootState) => state.chat.isPrivate);
    const isPrivateRef = useRef(isPrivate);
    const [searchKey, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [isNew, setNew] = useState(false)
    const [page, setPage] = useState(0)

    contactRef.current = contacts
    userinfoRef.current = userinfo
    isPrivateRef.current = isPrivate

    const privateSelect = (id) => {
        setIsPrivateChat(true);
        dispatch(setPrivate(true))
        setMem(id)
        if(isMobileDevice()) {
            setMobile(true)
        }
        const currentMessages = contactRef.current
        let temp = []
        currentMessages.forEach((item) => {
            if (item.id === id) {
                console.log(item.id)
                temp.push({
                    'id': item.id,
                    'name': item.name,
                    'firstName': item.firstName,
                    'lastName': item.lastName,
                    'gender': item.gender,
                    'status': item.status,
                    'birthday': item.birthday,
                    'role': item.role,
                    'avatar': item.avatar,
                    'is_mute': item.is_mute,
                    'is_cam': item.is_cam,
                    'is_block': item.is_block,
                    'message': '',
                    'is_logout': item.is_logout,
                    'count': 0
                })
            }
            else {
                temp.push({
                    'id': item.id,
                    'name': item.name,
                    'firstName': item.firstName,
                    'lastName': item.lastName,
                    'gender': item.gender,
                    'status': item.status,
                    'birthday': item.birthday,
                    'role': item.role,
                    'avatar': item.avatar,
                    'is_mute': item.is_mute,
                    'is_cam': item.is_cam,
                    'is_block': item.is_block,
                    'message': '',
                    'is_logout': item.is_logout,
                    'count': 0
                })
            }
        })
        setUserss(temp);
        dispatch(setUsers(temp));
    }
    const [isSelectedTab, setIsSeletedTab] = useState(0);
    const selectTab = (num) => {
        setIsSeletedTab(num);
    };

    const onCloseVideo: DialogProps['onClose'] = (e, reason) => {
        if (reason && reason == "backdropClick") return;
        setOpen(false)
    }



    const load = () => {
        getGroupAll({ 'room_id': params.id })
            .then((res: any) => {
                if (res.message === CONSTANTS.SUCCESS) {
                    let temp = []
                    res.data.map((item) => {
                        temp.push({
                            'id': item.id,
                            'name': item.name,
                            'avatar': item.avatar,
                            'role': item.role,
                            'is_mute': item.is_mute,
                            'is_cam': 0,
                            'is_logout': 0,
                            'is_block': item.is_block,
                            'firstName': item.firstName,
                            'lastName': item.lastName,
                            'gender': item.gender,
                            'status': item.status,
                            'birthday': item.formattedDate,
                            'message': item.message,
                            'count': 0
                        })
                    })
                    setUserss(temp);
                    dispatch(setUsers(temp));
                }
                else {
                    toast.error('Failed!');
                }
            })
            .catch((err) => {
                console.warn('Error while loading upgrade titles', err);
            })
            .finally(() => {
            });
        getList()
            .then((res: any) => {
                setRoom(res)
            })
            .catch((err) => toast.error("Failed!"))

        getFriends()
            .then((res) => {
                if (res.code == CONSTANTS.SUCCESS) {
                    setFriend(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
                console.error('Failed Load!')
            })
    }

    useEffect(() => {
        load()
    }, [])

    const onMessageReceive = useCallback((data) => {
        if (data.message[1] == params.id) {
            const currentMessages = contactRef.current
            const updates = currentMessages.filter(item => item.id !== data.message[0]);
            setUserss(updates);
            dispatch(setUsers(updates));
        }
    }, [])

    const onMuteReceive = useCallback((data) => {
        if (data.message[1] == params.id) {
            const currentMessages = contactRef.current
            let updates = [];
            currentMessages.forEach((item) => {
                if (item.id === data.message[0]) {
                    updates.push({
                        'id': item.id,
                        'name': item.name,
                        'firstName': item.firstName,
                        'lastName': item.lastName,
                        'gender': item.gender,
                        'status': item.status,
                        'birthday': item.formattedDate,
                        'role': item.role,
                        'avatar': item.avatar,
                        'is_mute': 1,
                        'count': 0,
                        'is_cam': 0,
                        'is_block': item.is_block,
                        'message': 'Muted by ' + data.message[3]
                    })
                }
                else {
                    updates.push(item)
                }
            })
            setUserss(updates);
            dispatch(setUsers(updates));
        }
    }, [])

    const onUnMuteReceive = useCallback((data) => {
        if (data.message[1] == params.id) {
            const currentMessages = contactRef.current
            let updates = [];
            currentMessages.forEach((item) => {
                if (item.id === data.message[0]) {
                    updates.push({
                        'id': item.id,
                        'name': item.name,
                        'firstName': item.firstName,
                        'lastName': item.lastName,
                        'gender': item.gender,
                        'status': item.status,
                        'birthday': item.formattedDate,
                        'role': item.role,
                        'avatar': item.avatar,
                        'is_block': item.is_block,
                        'is_mute': 0,
                        'is_cam': 0,
                        'count': 0,
                        'message': ''
                    })
                }
                else {
                    updates.push(item)
                }
            })
            setUserss(updates);
            dispatch(setUsers(updates));
        }
    }, [])

    const onPrivateReceive = useCallback((data) => {
        const currentMessages = contactRef.current
        const is_private = isPrivateRef.current
        const info = userinfoRef.current
        console.log('============', data.message[0].room_id, params.id, data.message[0].member_id, is_private, data.message[0].is_private, data.message[0].user_id)
        if (data.message[0].room_id === parseInt(params.id) && data.message[0].member_id == info.id && is_private === false && data.message[0].is_private == 1) {
            let temp = []
            currentMessages.forEach((item) => {
                if (item.id === data.message[0].user_id) {
                    console.log(item.id)
                    temp.push({
                        'id': item.id,
                        'name': item.name,
                        'firstName': item.firstName,
                        'lastName': item.lastName,
                        'gender': item.gender,
                        'status': item.status,
                        'birthday': item.birthday,
                        'role': item.role,
                        'avatar': item.avatar,
                        'is_mute': item.is_mute,
                        'is_cam': item.is_cam,
                        'is_block': item.is_block,
                        'message': '',
                        'is_logout': item.is_logout,
                        'count': item.count + 1
                    })
                }
                else {
                    temp.push({
                        'id': item.id,
                        'name': item.name,
                        'firstName': item.firstName,
                        'lastName': item.lastName,
                        'gender': item.gender,
                        'status': item.status,
                        'birthday': item.birthday,
                        'role': item.role,
                        'avatar': item.avatar,
                        'is_mute': item.is_mute,
                        'is_cam': item.is_cam,
                        'is_block': item.is_block,
                        'message': '',
                        'is_logout': item.is_logout,
                        'count': 0
                    })
                }
            })
            setUserss(temp);
            dispatch(setUsers(temp));
        }
    }, [])

    const onLogoutReceive = useCallback((data) => {
        const currentMessages = contactRef.current
        let updates = [...currentMessages];
        let temp = []
        updates.map((item) => {
            if (item.id != data.message) {
                temp.push(item)
            }
        })
        setUserss(temp);
        dispatch(setUsers(temp));
    }, [])

    const onOutReceive = useCallback((data) => {
        const currentMessages = contactRef.current
        let updates = [...currentMessages];
        updates.filter(item => item.id !== data.message)
        setUserss(updates);
        dispatch(setUsers(updates));
    }, [])

    const onCamoffReceive = useCallback((data) => {
        console.log('=====================', data)
        const currentMessages = contactRef.current
        let updates = [];
        currentMessages.forEach((item) => {
            if (item.id === data.message[0]) {
                updates.push({
                    'id': item.id,
                    'name': item.name,
                    'firstName': item.firstName,
                    'lastName': item.lastName,
                    'gender': item.gender,
                    'status': item.status,
                    'birthday': item.formattedDate,
                    'role': item.role,
                    'avatar': item.avatar,
                    'is_mute': 0,
                    'is_block': item.is_block,
                    'is_cam': 0,
                    'count': 0,
                    'message': ''
                })
            }
            else {
                updates.push(item)
            }
        })
        setUserss(updates);
        dispatch(setUsers(updates));
    }, [])

    const onLogonReceive = useCallback((data) => {
        const currentMessages = contactRef.current
        let updates = [...currentMessages];
        let flag = false
        const info = userinfoRef.current
        console.log('logon', data.message.id, info.id)
        currentMessages.forEach((item) => {
            if (item.id === data.message.id || info.id === data.message.id) {
                flag = true
            }
        })
        if (!flag) {
            updates.push({
                'id': data.message.id,
                'name': data.message.name,
                'firstName': data.message.firstName,
                'lastName': data.message.lastName,
                'gender': data.message.gender,
                'status': data.message.status,
                'birthday': data.message.birthday,
                'role': data.message.role,
                'avatar': data.message.avatar,
                'is_mute': 0,
                'is_cam': 0,
                'is_block': data.message.is_block,
                'message': '',
                'is_logout': 0,
                'count': 0,
            })
        }
        setUserss(updates);
        dispatch(setUsers(updates));
    }, [])

    const onStartReceive = useCallback((data) => {
        console.log('---------------------', data)
        const currentMessages = contactRef.current
        let updates = [];
        currentMessages.forEach((item) => {
            if (item.id === data.message[0].userToStart) {
                updates.push({
                    'id': item.id,
                    'name': item.name,
                    'firstName': item.firstName,
                    'lastName': item.lastName,
                    'gender': item.gender,
                    'status': item.status,
                    'birthday': item.formattedDate,
                    'role': item.role,
                    'avatar': item.avatar,
                    'is_mute': 0,
                    'is_block': item.is_block,
                    'is_cam': 1,
                    'count': 0,
                    'message': ''
                })
            }
            else {
                updates.push(item)
            }
        })
        setUserss(updates);
        dispatch(setUsers(updates));
    }, [])

    const handleUnfriend = (id) => {
        unFriend({ 'id': id })
            .then((res: any) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    toast.success('Success!')
                    setFriend(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        if (isSelectedTab == 0) {
            if (e.target.value !== '') {
                let temp = users
                const filters = temp.filter(item => item.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
                console.log(filters)
                setUserss(filters)
            }
            else {
                getGroupAll({ 'room_id': params.id })
                    .then((res: any) => {
                        if (res.message === CONSTANTS.SUCCESS) {
                            setUserss(res.data);
                        }
                        else {
                            toast.error('Failed!');
                        }
                    })
                    .catch((err) => {
                        console.warn('Error while loading upgrade titles', err);
                    })
                    .finally(() => {
                    });
            }
        }
        else if (isSelectedTab == 1) {
            if (e.target.value !== '') {
                const filters = rooms.filter(item => item.title.toLowerCase().startsWith(e.target.value.toLowerCase()))
                setRoom(filters)
            }
            else {
                getList()
                    .then((res: any) => {
                        setRoom(res)
                    })
                    .catch((err) => toast.error("Failed!"))
            }
        }
        else if (isSelectedTab == 2) {
            if (e.target.value !== '') {
                const filters = friends.filter(item => item.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
                setFriend(filters)
            }
            else {
                getFriends()
                    .then((res) => {
                        if (res.code == CONSTANTS.SUCCESS) {
                            setFriend(res.data)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        console.error('Failed Load!')
                    })
            }
        }
    }

    useEffect(() => {
        const pusher = new Pusher('e1d8debb6b5791133889', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('kick', onMessageReceive)

        const channel_msg = pusher.subscribe('chat');
        channel_msg.bind('message', onPrivateReceive)

        const channel_start = pusher.subscribe('chat');
        channel_start.bind('start', onStartReceive)

        const channel_mute = pusher.subscribe('chat');
        channel_mute.bind('mute', onMuteReceive)

        const channel_unmute = pusher.subscribe('chat');
        channel_unmute.bind('unmute', onUnMuteReceive)

        const channel_logon = pusher.subscribe('chat');
        channel_logon.bind('logon', onLogonReceive)

        const channel_logout = pusher.subscribe('chat');
        channel_logout.bind('logout', onLogoutReceive)

        const channel_out = pusher.subscribe('chat');
        channel_out.bind('out', onOutReceive)

        const channel_camoff = pusher.subscribe('chat');
        channel_camoff.bind('camoff', onCamoffReceive)
        return () => {
            channel.unbind_all();
            channel.unsubscribe();

            channel_msg.unbind_all();
            channel_msg.unsubscribe();
            channel_mute.unbind_all();
            channel_mute.unsubscribe();
            channel_unmute.unbind_all();
            channel_unmute.unsubscribe();
            channel_start.unbind_all();
            channel_start.unsubscribe();
            channel_logon.unbind_all();
            channel_logon.unsubscribe();
            channel_logout.unbind_all();
            channel_logout.unsubscribe();
            channel_out.unbind_all();
            channel_out.unsubscribe();
            channel_camoff.unbind_all();
            channel_camoff.unsubscribe();
        }
    }, [])

    useEffect(() => {
        console.log(user)
        dispatch(setUser(user))
    }, [user])

    return (
        <div className='flex flex-col sm:w-[328px] w-full h-full'>
            {/* <div className='flex flex-row rounded-t-xl bg-black relative'>
                <img src='/images/chatroom/microphone.png' className='w-[105px] h-[94px]' alt='' />
                <FaPlay className='absolute top-[52.5px] left-[50px] transform -translate-x-1/2 -translate-y-1/2' size='20' style={{ color: 'white' }} />
                <div className='p-2 flex-1 flex-col gap-2'>
                    <p className=' font-montserrat font-bold text-base text-white'>Donamix - Radio</p>
                    <p className=' font-montserrat font-bold text-xs text-white'>Interactive Internet Radio</p>
                    <div className='w-full flex justify-end'>
                        <HiOutlineSpeakerWave size='25' style={{ color: 'white' }} />
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
                        <p className=' font-montserrat font-bold text-base text-[#828282]'>1 Users</p>
                    </div>
                </div>
                <div className='flex flex-row pl-[60px] gap-10 items-center'>
                    <div className='flex flex-row gap-2 items-center'>
                        <img src="/images/money.svg" width="24" height="24" alt='' />
                        <p className='font-inter font-semibold text-sm text-white'>{user && (user.credit === null ? 0 : user.credit)} wallet</p>
                    </div>
                    <Button variant='secondary' className='rounded-full font-montserrat font-semibold text-sm h-[28px] w-[52px]'>Buy</Button>
                </div>
            </div>
            <div className='flex flex-col w-full bg-[#F0F0F0]'>
                <div className="relative p-5">
                    {/* Icon appearing as part of the placeholder */}
                    <IoIosSearch className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />

                    {/* Input field */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-3 py-2 w-full border rounded-full focus:outline-none"
                        onChange={handleSearch}
                    />
                </div>
            </div>
            {isMobileDevice() ? <div className='flex flex-end justify-end bg-[#F0F0F0] pr-2 cursor-pointer' onClick={() => setMobile(false)}>Go to Chat Room &gt;</div> : <></>}
            <div className='flex-1 flex flex-col overflow-y-hidden'>
                {/* <div className='h-full flex flex-col'> */}
                <div className='flex flex-row gap-5 items-center h-[50px] bg-[#F0F0F0]' >
                    <div style={{ color: isSelectedTab === 0 ? 'black' : '#B9B9B9' }} className='w-1/3 text-center align-bottom font-poppins font-medium text-sm border-b border-[#C9C9C9] hover:cursor-pointer' onClick={() => selectTab(0)}>User</div>
                    <div style={{ color: isSelectedTab === 1 ? 'black' : '#B9B9B9' }} className='w-1/3 text-center align-bottom font-poppins font-medium text-sm border-b border-[#C9C9C9] hover:cursor-pointer' onClick={() => selectTab(1)} >All Rooms</div>
                    <div style={{ color: isSelectedTab === 2 ? 'black' : '#B9B9B9' }} className='w-1/3 text-center align-bottom font-poppins font-medium text-sm border-b border-[#C9C9C9] hover:cursor-pointer' onClick={() => selectTab(2)} >Friends</div>
                </div>
                <div className='flex-1 flex flex-col overflow-y-scroll'>
                    {isSelectedTab == 0 && <div className='px-2 py-4 flex-1 flex flex-col gap-5 w-full bg-white'>
                        {users && users.map((item, i) => (
                            <div className='flex flex-row w-full gap-2 items-center hover:bg-gray-300 hover:cursor-pointer p=1 rounded-lg'>
                                <UserManagePopup member={item.id} muted={item.is_mute} name={item.name} block={item.is_block} privateSelect={() => privateSelect(item)} username={item.username} key={i}>
                                    <div className='relative'>
                                        <Avatar className='w-[43px] h-[43px]'>
                                            <AvatarImage src={item.avatar} />
                                        </Avatar>
                                        <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-green-300 rounded-full"></span>
                                    </div>
                                </UserManagePopup>
                                <div className='flex flex-col w-full justify-between'>
                                        <div className='flex flex-row justify-between'>
                                            <UserManagePopup member={item.id} muted={item.is_mute} name={item.name} block={item.is_block} privateSelect={() => privateSelect(item)} key={i}>
                                                <p className=' font-poppins font-medium text-base'>{item.name}</p>
                                            </UserManagePopup>
                                            <div className='flex flex-row gap-2'>
                                                {item.count !== 0 && <p className=' font-poppins font-normal text-xs text-[white] rounded-full bg-[red] w-[20px] h-[20px] flex items-center justify-center cursor-pointer' onClick={() => privateSelect(item)}>{item.count}</p>}
                                                {item.role === 'VIP' && <span className='font-poppins font-semibold text-xs text-white bg-black p-1 rounded-sm'>{item.role}</span>}
                                                {item.role === 'Moderator' && <span className='font-poppins font-semibold text-xs text-white bg-green-600 p-1 rounded-sm'>{item.role}</span>}
                                                {item.role === 'Admin' && <span className='font-poppins font-semibold text-xs text-white  bg-red-500 p-1 rounded-sm'>{item.role}</span>}
                                            </div>
                                        </div>
                                    {item.is_mute == 1 ? <p className=' font-poppins font-normal text-base text-red-500'>{item.message}</p> : ''}
                                    {item.is_block == 1 ? <p className=' font-poppins font-normal text-base text-red-500'>Blocked</p> : ''}
                                    {item.is_cam == 1 ? <PiWebcamFill size='20' className='cursor-pointer' onClick={() => {
                                        setSelectUser(item)
                                        console.log('call')
                                        setOpen(true)
                                        axios.post(`${apiUrl}/chat/call-user`, { 'channel_name': "test", 'user_to_call': item.id })
                                        .then((res) => {
                                            console.log('successs')
                                            })
                                            .catch((err) => toast.error('Failed'))
                                    }} /> : ''}
                                </div>
                            </div>
                        ))}
                    </div>}
                    {user && selectUser &&  <VideoCall open={open} onClose={onCloseVideo} start={selectUser} allUsers={users} authUser={user.name} authUserId={user.id} agoraId='e5d2917dfd7c4078bc6d4f8eddb1a5ca' />}
                    {isSelectedTab == 1 && <div className='px-2 py-4 flex-1 flex flex-col w-full bg-white gap-5'>
                        {rooms && rooms.slice(0, 16).map((room, i) => (
                            <div className='flex flex-row gap-3 cursor-pointer' onClick={() => { setNew(true); setPage(i) }}>
                                <img src={`/images/chatroom/${i + 1}.jpg`} className='w-[50px] h-[50px]' alt='' />
                                <div className='flex items-center'>
                                    <p className='font-poppins font-semibold text-sm'>{room.title}</p>
                                    {/* <p className='font-poppins font-semibold text-sm text-[#ABABAB]'>20 Users</p> */}
                                </div>
                            </div>
                        ))}
                    </div>}
                    <Dialog open={isNew} onClose={() => setNew(false)}  >
                        {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
                        <DialogContent className="">
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                    <p>Switching to a new chat room. Proceed?</p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                            onClick={() => {
                                                setNew(false);
                                            }}
                                        >
                                            No
                                        </button>
                                        <button
                                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                            onClick={() => {
                                                setNew(false)
                                                navigate('/rooms/page/' + (page + 1));
                                                window.location.reload();
                                            }}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    {isSelectedTab == 2 && <div className='px-2 py-4 flex-1 flex flex-col w-full bg-white gap-7'>
                        {friends && friends.map((friend, i) => (
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <Avatar className='w-[40px] h-[40px]'>
                                        <AvatarImage src={friend.avatar} className='' />
                                    </Avatar>
                                    <p className=' font-poppins font-medium text-base'>{friend.name}</p>
                                </div>
                                <Button className='bg-white outline outline-1 font-poppins font-medium text-xs text-black hover:text-white h-[30px]' onClick={() => handleUnfriend(friend.id)}>Unfriend</Button>
                            </div>
                        ))}
                    </div>}
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default ChatLeftSidebar;
