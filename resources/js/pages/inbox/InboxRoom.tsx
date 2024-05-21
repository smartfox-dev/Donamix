import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import UserManagePopup from './UserManagePopup';
import { getPrivateChat } from '@/api/chat';

import { IoMdPlay, IoIosPause } from 'react-icons/io'
import { PiWebcamFill, PiChecksBold, PiCheckBold } from "react-icons/pi";
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMicrophone } from "react-icons/hi2";
import toast from 'react-hot-toast';
import { getIDProfile } from '@/api/users';
import { useNavigate } from 'react-router-dom';
import WaveRight from '@/pages/chatroom/WaveRight';
import Waveform from '@/pages/chatroom/Waveform';
import { useAuthContext } from '@/context/AuthContext';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { User } from '@/lib/validation/user';
import CONSTANTS from '@/config/constants';
import { useDispatch } from 'react-redux';
import { setChat, setUser } from '@/actions/chatSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/actions/store';
import { Slider } from "@material-tailwind/react";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import VideoCall from './VideoCall';
import VoiceCall from './/VoiceCall';
import { format } from 'date-fns';
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    // Button,
} from "@material-tailwind/react";

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

interface IInboxRoomProps {
    isPrivateChat: boolean;
    setIsPrivateChat: Function;
    setMobile?: Function;
}
let dateTime = '';

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
let realmem = 0

const InboxRoom: React.FC<IInboxRoomProps> = ({ isPrivateChat, setIsPrivateChat, setMobile }) => {
    // const [isPrivateChat, setIsPrivateChat] = useState(false);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [call, setCall] = useState(false)
    const mimeType = "audio/webm";
    const { user } = useAuthContext();
    const { member } = useAuthContext();
    const [profile, setProfile] = useState(null)
    const [permission, setPermission] = useState(false);
    const [player, setPlayer] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioFile, setAudioFile] = useState(null);
    const [audio, setAudio] = useState(null);
    const messages = useSelector((state: RootState) => state.chat.data);
    const messagesRef = useRef(messages);
    const userinfo = useSelector((state: RootState) => state.chat.userinfo);
    const userinfoRef = useRef(userinfo);
    const [isModal, setModal] = useState(false)
    const [isPhoneModal, setPhoneModal] = useState(false)
    const visualizerRef = useRef<HTMLCanvasElement>(null)
    const [activePlaying, setActivePlaying] = useState(null);
    messagesRef.current = messages;
    userinfoRef.current = userinfo;
    const commentListRef = useRef(null);
    const [description, setDescription] = useState('')
    const [isVideo, setVideo] = useState(false)
    const [member_name, setMemberName] = useState('')
    const [member_id, setMemberID] = useState('')

    const privateSelect = () => {
        setIsPrivateChat(true);
    }
    const handleArrow = () => {
        setIsPrivateChat(false);
    }

    useEffect(() => {
        // Make sure to replace 'chat' with the actual channel name you're using
        // and 'MessageSent' with the event name you're broadcasting from Laravel
        const pusher = new Pusher('e1d8debb6b5791133889', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', onMessageReceive)

        const channel_market = pusher.subscribe('chat');
        channel_market.bind('market', onMarketReceive)

        const channel_video = pusher.subscribe('chat');
        channel_video.bind('video-start', onVideoReceive)

        const channel_audio = pusher.subscribe('chat');
        channel_audio.bind('audio-start', onAudioReceive)

        const channel_inbox = pusher.subscribe('chat');
        channel_inbox.bind('inbox', onInboxReceive)

        // const channel_audiodecline = pusher.subscribe('chat');
        // channel_audiodecline.bind('audio-accept', onAudioDeclineReceive)

        return () => {
            channel.unbind_all();
            channel.unsubscribe();

            channel_market.unbind_all();
            channel_market.unsubscribe();

            channel_video.unbind_all();
            channel_video.unsubscribe();

            channel_audio.unbind_all();
            channel_audio.unsubscribe();

            channel_inbox.unbind_all();
            channel_inbox.unsubscribe();
        }
    }, []);

    const updateScrollPos = () => {
        if (commentListRef) {
            commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
        }
    }

    const handleCancel = () => {
        setAudio('');
        setAudioFile('');
    }

    const onOpenVideo = (id) => {
        setOpen(true)
        axios.post(`${apiUrl}/chat/call-videostart`, { 'channel_name': "call-video", 'member_id': id })
            .then((res) => {
                console.log('successs')
            })
            .catch((err) => toast.error('Failed'))
    }

    const onCloseVideo: DialogProps['onClose'] = (e, reason) => {
        if (reason && reason == "backdropClick") return;
        setOpen(false)
    }

    const handleAccept: DialogProps['onClose'] = (e, reason) => {
        if (reason && reason == "backdropClick") return;
        setVideo(false)
    }

    const onOpenCall = (id) => {
        setCall(true)
        axios.post(`${apiUrl}/chat/call-audiostart`, { 'channel_name': "call-audio", 'member_id': id })
            .then((res) => {
                console.log('successs')
            })
            .catch((err) => toast.error('Failed'))
    }

    const onCloseCall: DialogProps['onClose'] = (e, reason) => {
        if (reason && reason == "backdropClick") return;
        setCall(false)
    }

    const handleAudioAccept: DialogProps['onClose'] = (e, reason) => {
        if (reason && reason == "backdropClick") return;
        setModal(false)
    }

    const load = () => {
        getPrivateChat({ 'room_id': 17, 'member_id': member })
            .then((res: any) => {
                dispatch(setChat(res));
                setTimeout(updateScrollPos, 1)
            })
            .catch((err) => { toast.error('Failed Data Load!') })

        getIDProfile(member)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        setProfile(res.data);
                    }
                }
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })
            .finally(() => {

            });
    }

    const getCurrentTime = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0'); // Add leading zero if needed
        const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
        return `${hours}:${minutes}`;
    };

    const handleMessage = () => {
        if (member !== 0 && member != user.id) {
            const formData = new FormData();
            const currentDate = new Date(); // Get the current date and time
            const formattedDateTime = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
            formData.append("member_id", member);
            formData.append("description", description);
            formData.append("room_id", 17);
            formData.append("audio", audioFile);
            console.log(audio)
            if (description !== '') {
                if (audio != null) {
                    axios.post(`${apiUrl}/chat/store`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                        .then((res) => {
                            if (res.data.message === CONSTANTS.SUCCESS) {
                                console.log(res.data)
                                let temp: any = [...messages]
                                handleCancel();
                                temp.push({
                                    'user_id': user.id,
                                    'member_id': member,
                                    'room_id': 17,
                                    'audio': res.data.data.audio,
                                    'description': description,
                                    'created_at': getCurrentTime(),
                                    'date': formattedDateTime
                                })
                                dispatch(setChat(temp));
                                setDescription('')
                                setTimeout(updateScrollPos, 1)
                            }
                            else if (res.data.message === 'muted') {
                                toast.error('You have been muted!')
                            }
                            else if (res.data.message === 'blocked') {
                                toast.error('You have been blocked!')
                            }
                            else if (res.data.message === 'kicked') {
                                toast.error('You have been kicked!')
                            }
                        })
                        .catch((err) => toast.error('Failed sending message!'))
                }
                else {
                    axios.post(`${apiUrl}/chat/store`, {
                        'member_id': member,
                        'description': description,
                        'audio': '',
                        'room_id': 17
                    })
                        .then((res) => {
                            if (res.data.message === CONSTANTS.SUCCESS) {
                                console.log(res.data)
                                let temp: any = [...messages]
                                temp.push({
                                    'user_id': user.id,
                                    'member_id': member,
                                    'audio': '',
                                    'room_id': 17,
                                    'description': description,
                                    'created_at': getCurrentTime(),
                                    'date': formattedDateTime
                                })
                                dispatch(setChat(temp));
                                setDescription('')
                                setTimeout(updateScrollPos, 1)
                            }
                            else if (res.data.message === 'muted') {
                                toast.error('You have been muted!')
                            }
                            else if (res.data.message === 'blocked') {
                                toast.error('You have been blocked!')
                            }
                            else if (res.data.message === 'kicked') {
                                toast.error('You have been kicked!')
                            }
                        })
                        .catch((err) => toast.error('Failed sending message!'))
                }
            }
            else {
                if (audio != null) {
                    axios.post(`${apiUrl}/chat/store`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                        .then((res) => {
                            if (res.data.message === CONSTANTS.SUCCESS) {
                                console.log(res.data)
                                let temp: any = [...messages]
                                handleCancel();
                                temp.push({
                                    'user_id': user.id,
                                    'member_id': member,
                                    'audio': res.data.data.audio,
                                    'room_id': 17,
                                    'description': description,
                                    'created_at': getCurrentTime(),
                                    'date': formattedDateTime
                                })
                                dispatch(setChat(temp));
                                setDescription('')
                                setTimeout(updateScrollPos, 1)
                            }
                            else if (res.data.message === 'muted') {
                                toast.error('You have been muted!')
                            }
                            else if (res.data.message === 'blocked') {
                                toast.error('You have been blocked!')
                            }
                            else if (res.data.message === 'kicked') {
                                toast.error('You have been kicked!')
                            }
                        })
                        .catch((err) => toast.error('Failed sending message!'))
                }
            }
        }
        else {
            toast.error('Select Member!')
        }
    }

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }

    };

    const startRecording = async () => {
        getMicrophonePermission();
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        console.log(mediaRecorder.current)
        //stops the recording instance
        if (!mediaRecorder.current) {
            console.log('No media Recorder')
            return;
        }
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            setAudioFile(audioBlob)
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
            console.log(audioUrl)
        };
    };

    const onMessageReceive = (data) => {
        const currentMessages = messagesRef.current
        const info = userinfoRef.current;
        let temp: any = [...currentMessages]
        console.log(member, realmem)
        if (data.message[0].room_id == "17") {
            if (data.message[0].member_id == info.id && data.message[0].user_id == realmem) {
                temp.push({
                    'user_id': data.message[0].user_id,
                    'member_id': realmem,
                    'audio': data.message[0].audio,
                    'room_id': data.message[0].room_id,
                    'description': data.message[0].description,
                    'created_at': '',
                    'date': data.message[0].created_at,
                    'user': {
                        'id': data.message[4],
                        'avatar': data.message[2],
                        'name': data.message[1],
                        'role': data.message[3]
                    }
                })
                console.log(temp)
                dispatch(setChat(temp));
                setTimeout(updateScrollPos, 1)
            }
        }
    }

    const onVideoReceive = useCallback((data) => {
        const info = userinfoRef.current;
        if (data.message[0].to === info.id) {
            setMemberName(data.message[0].name);
            setVideo(true)
            setMemberID(data.message[0].from)
        }
    }, [])

    const onAudioReceive = useCallback((data) => {
        const info = userinfoRef.current;
        if (data.message[0].to === info.id) {
            setMemberName(data.message[0].name);
            setModal(true)
            setMemberID(data.message[0].from)
        }
    }, [])

    const onAudioDeclineReceive = useCallback((data) => {
        console.log(user, data)
        if (user && data.message[0].to === user.id) {
            setMemberName(data.message[0].name);
            setModal(true)
            setMemberID(data.message[0].from)
        }
    }, [])

    const onInboxReceive = useCallback((data) => {
        const list = data.message;
        list.map((item) => {
            if(item === member) {
                getPrivateChat({ 'room_id': 17, 'member_id': member })
                    .then((res: any) => {
                        dispatch(setChat(res));
                        setTimeout(updateScrollPos, 1)
                    })
                    .catch((err) => { toast.error('Failed Data Load!') })
            }
        })
    }, [])

    const onMarketReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        const info = userinfoRef.current;
        let temp: any = [...currentMessages]

        if (data.message[0].is_market == 1) {
            if (data.message[0].member_id == info.id && data.message[0].user_id == member) {
                temp.push({
                    'user_id': data.message[0].user_id,
                    'member_id': member,
                    'audio': data.message[0].audio,
                    'room_id': data.message[0].room_id,
                    'is_market': data.message[0].is_market,
                    'description': data.message[0].description,
                    'user': {
                        'id': data.message[4],
                        'avatar': data.message[2],
                        'name': data.message[1],
                        'role': data.message[3]
                    }
                })
                console.log(temp)
                dispatch(setChat(temp));
                setTimeout(updateScrollPos, 1)
            }
        }
    }, [member, realmem])

    useEffect(() => {
        dispatch(setChat([]))
        load()
        if(member != 0) {
            console.log(member, 'member')
            realmem = member
        }
    }, [member])

    useEffect(() => {
        console.log(user)
        dispatch(setUser(user))
    }, [user])

    return (
        <div className='flex-1 flex flex-col rounded-t-xl h-full'>
            <div className='flex flex-row justify-between items-center p-3 bg-[#EBEBEB]'>
                {isMobileDevice() ? <div className='flex flex-row gap-3 items-center' onClick={() => {
                    setMobile(true)
                }}>
                    <span className='font-poppins font-medium text-base'>&lt; Back to Users list</span>
                </div> : <div className='flex flex-row gap-3 items-center'>
                    {/* <FaArrowLeft size='30' onClick={handleArrow}/> */}
                    <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                        <AvatarImage src={profile && profile.avatar} />
                    </Avatar>
                    <p className='font-poppins font-medium text-base'>{profile && profile.name}</p>
                    <p></p>
                </div>}


                <div className='flex flex-row gap-7 items-center'>
                    <PiWebcamFill size='30' onClick={() => {
                        console.log(profile)
                        if (profile == null) {
                            toast.error('Select User!')
                        }
                        else {
                            onOpenVideo(profile.id)
                        }
                    }} />
                    <FaPhoneAlt size='25' onClick={() => {
                        if (profile == null) {
                            toast.error('Select User!')
                        }
                        else {
                            onOpenCall(profile.id)
                        }
                    }} />

                </div>
            </div>
            <Dialog open={isVideo} onClose={handleAccept}  >
                <DialogContent className="">
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                        <div className="relative z-10 p-4 bg-white rounded-lg">
                            <span><b>{member_name}</b> want to have a video call with you</span>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                    onClick={() => {
                                        setVideo(false);
                                        axios.post(`${apiUrl}/chat/call-videoaccept`, { 'channel_name': "call-video", 'from': member_id, 'is_accept': 0 })
                                            .then((res) => {
                                                console.log('successs')
                                            })
                                            .catch((err) => toast.error('Failed'))
                                    }}
                                >
                                    Decline
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                    onClick={() => {
                                        setVideo(false)
                                        setOpen(true)
                                        axios.post(`${apiUrl}/chat/call-videoaccept`, { 'channel_name': "call-video", 'from': member_id, 'is_accept': 1 })
                                            .then((res) => {
                                                console.log('successs')
                                            })
                                            .catch((err) => toast.error('Failed'))
                                    }}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isModal} onClose={handleAudioAccept}  >
                <DialogContent className="">
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                        <div className="relative z-10 p-4 bg-white rounded-lg">
                            <span><b>{member_name}</b> want to have a voice call with you</span>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                    onClick={() => {
                                        setModal(false);
                                        axios.post(`${apiUrl}/chat/call-audioaccept`, { 'channel_name': "call-audio", 'from': member_id, 'is_accept': 0 })
                                            .then((res) => {
                                                console.log('successs')
                                            })
                                            .catch((err) => toast.error('Failed'))
                                    }}
                                >
                                    Decline
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                    onClick={() => {
                                        setModal(false)
                                        setCall(true)
                                        axios.post(`${apiUrl}/chat/call-audioaccept`, { 'channel_name': "call-audio", 'from': member_id, 'is_accept': 1 })
                                            .then((res) => {
                                                console.log('successs')
                                            })
                                            .catch((err) => toast.error('Failed'))
                                    }}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {user && <VideoCall open={open} onClose={onCloseVideo} allUsers={[]} authUser={user.name} authUserId={user.id} agoraId='e5d2917dfd7c4078bc6d4f8eddb1a5ca' />}
            {user && <VoiceCall open={call} onClose={onCloseCall} allUsers={[]} authUser={user.name} authUserId={user.id} agoraId='e5d2917dfd7c4078bc6d4f8eddb1a5ca' />}
            <div className='flex-1 flex flex-col justify-between p-5 bg-[#F5F5F5] overflow-hidden max-h-[90vh] min-h-[90vh]'>
                <div className='flex-1 flex flex-col gap-4 overflow-y-auto' ref={commentListRef}>
                    {messages && messages.map((comment, i) => {
                        if (user) {
                            const dateStr = comment.date;
                            const formattedDate = new Date(dateStr).toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
                            if (dateTime !== formattedDate) {
                                dateTime = formattedDate
                                if (comment.user_id === user.id && comment.is_market !== 1) {
                                    return (<>
                                        <div className='flex flex-col w-full items-center justify-center py-2 pl-5 pr-5' key={i}>
                                            <p className='font-poppins font-semibold text-sm text-[#C5BDBD]'>{formattedDate}</p>
                                        </div>
                                        <div className='grid  justify-end' key={i}>
                                            <div className='flex flex-row rounded-s-2xl rounded-tl-3xl rounded-bl-3xl rounded-tr-2xl bg-black items-center p-4'>
                                                {comment.audio !== '' ? <Waveform src={comment.audio} /> : <p className=' font-poppins font-normal text-sm text-white break-all' dangerouslySetInnerHTML={{ __html: comment.description}} />}
                                            </div>
                                            <div className='font-poppins font-normal text-xs p-1 text-[#C5BDBD] justify-self-end'>{comment.created_at}</div>
                                        </div>
                                    </>)
                                }
                                else if (comment.user_id !== user.id && comment.is_market == 1) {
                                    return (<>
                                        <div className='flex flex-col w-full items-center justify-center py-2 pl-5 pr-5' key={i}>
                                            <p className='font-poppins font-semibold text-sm text-[#C5BDBD]'>{formattedDate}</p>
                                        </div>
                                        <div className='flex flex-row gap-3 justify-start' key={i}>
                                            <div className='relative'>
                                                <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                                                    <AvatarImage src={comment.user.avatar} />
                                                </Avatar>
                                                <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-green-300 rounded-full"></span>
                                            </div>
                                            <div className='flex flex-col gap-5 rounded-e-2xl rounded-tl-2xl bg-[#E4E4E4D4] py-2 px-4 min-w-[230px]'>
                                                <div className='flex flex-row w-full items-center justify-between'>
                                                    <p className='font-poppins font-semibold text-sm'>{comment.user.name}</p>
                                                    {comment.user.role === 'VIP' && <span className='font-poppins font-semibold text-xs text-white bg-black p-1 rounded-sm'>{comment.user.role}</span>}
                                                    {comment.user.role === 'Moderator' && <span className='font-poppins font-semibold text-xs text-black bg-green-600 p-1 rounded-sm'>{comment.user.role}</span>}
                                                    {comment.user.role === 'Admin' && <span className='font-poppins font-semibold text-xs text-white bg-red-500 p-1 rounded-sm'>{comment.user.role}</span>}
                                                </div>
                                                <span className=' font-poppins font-normal text-sm text-whtie'>Message from Buyer Regarding Your Marketplace Item:</span>
                                                <span className=' font-poppins font-normal text-sm text-whtie'>Hi {user.username}</span>
                                                <span className=' font-poppins font-normal text-sm text-whtie'>I am I am interested in {comment.description}. Could you please provide me with more details or negotiate the price?</span>
                                                <span className=' font-poppins font-normal text-sm text-whtie'>Looking forward to hearing from you soon.</span>
                                            </div>
                                        </div>
                                    </>
                                    )
                                }
                                else if (comment.user_id !== user.id) {
                                    return (<>
                                        <div className='flex flex-col w-full items-center justify-center py-2 pl-5 pr-5' key={i}>
                                            <p className='font-poppins font-semibold text-sm text-[#C5BDBD]'>{formattedDate}</p>
                                        </div>
                                        <div className='flex flex-row gap-3 justify-start' key={i}>
                                            <div className='relative'>
                                                <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                                                    <AvatarImage src={comment.user.avatar} />
                                                </Avatar>
                                                {comment.user.is_live === 1 ? <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-green-300 rounded-full"></span> : <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-gray-300 rounded-full"></span>}
                                            </div>
                                            <div className='flex flex-col gap-5 rounded-e-2xl rounded-tl-2xl bg-[#E4E4E4D4] py-2 px-4 min-w-[230px]'>
                                                <div className='flex flex-row w-full items-center justify-between'>
                                                    <p className='font-poppins font-semibold text-sm'>{comment.user.name}</p>
                                                    {comment.user.role === 'VIP' && <span className='font-poppins font-semibold text-xs text-white bg-black p-1 rounded-sm'>{comment.user.role}</span>}
                                                    {comment.user.role === 'Moderator' && <span className='font-poppins font-semibold text-xs text-black bg-green-600 p-1 rounded-sm'>{comment.user.role}</span>}
                                                    {comment.user.role === 'Admin' && <span className='font-poppins font-semibold text-xs text-white bg-red-500 p-1 rounded-sm'>{comment.user.role}</span>}
                                                </div>
                                                {comment.audio !== '' ? <WaveRight src={comment.audio} /> : <p className=' font-poppins font-normal text-sm text-whtie break-all' dangerouslySetInnerHTML={{ __html: comment.description}} />}
                                            </div>
                                        </div>
                                    </>
                                    )
                                }
                            }
                            if (comment.user_id === user.id && comment.is_market !== 1) {
                                return (<div className='grid  justify-end' key={i}>
                                    <div className='flex flex-row rounded-s-2xl rounded-tl-3xl rounded-bl-3xl rounded-tr-2xl bg-black items-center p-4'>
                                        {comment.audio !== '' ? <Waveform src={comment.audio} /> : <p className=' font-poppins font-normal text-sm text-white break-all' dangerouslySetInnerHTML={{ __html: comment.description}} />}
                                    </div>
                                    <div className='font-poppins font-normal text-xs p-1 text-[#C5BDBD] justify-self-end'>{comment.created_at}</div>
                                </div>)
                            }
                            else if (comment.user_id !== user.id && comment.is_market == 1) {
                                return (<div className='flex flex-row gap-3 justify-start' key={i}>
                                    <div className='relative'>
                                        <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                                            <AvatarImage src={comment.user.avatar} />
                                        </Avatar>
                                        {comment.user.is_live === 1 ? <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-green-300 rounded-full"></span> : <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-gray-300 rounded-full"></span>}
                                    </div>
                                    <div className='flex flex-col gap-5 rounded-e-2xl rounded-tl-2xl bg-[#E4E4E4D4] py-2 px-4 min-w-[230px]'>
                                        <div className='flex flex-row w-full items-center justify-between'>
                                            <p className='font-poppins font-semibold text-sm'>{comment.user.name}</p>
                                            {comment.user.role === 'VIP' && <span className='font-poppins font-semibold text-xs text-white bg-black p-1 rounded-sm'>{comment.user.role}</span>}
                                            {comment.user.role === 'Moderator' && <span className='font-poppins font-semibold text-xs text-black bg-green-600 p-1 rounded-sm'>{comment.user.role}</span>}
                                            {comment.user.role === 'Admin' && <span className='font-poppins font-semibold text-xs text-white bg-red-500 p-1 rounded-sm'>{comment.user.role}</span>}
                                        </div>
                                        <span className=' font-poppins font-normal text-sm text-whtie'>Message from Buyer Regarding Your Marketplace Item:</span>
                                        <span className=' font-poppins font-normal text-sm text-whtie'>Hi {user.username}</span>
                                        <span className=' font-poppins font-normal text-sm text-whtie'>I am I am interested in {comment.description}. Could you please provide me with more details or negotiate the price?</span>
                                        <span className=' font-poppins font-normal text-sm text-whtie'>Looking forward to hearing from you soon.</span>
                                    </div>
                                </div>)
                            }
                            else if (comment.user_id !== user.id) {
                                return (<div className='flex flex-row gap-3 justify-start' key={i}>
                                    <div className='relative'>
                                        <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                                            <AvatarImage src={comment.user.avatar} />
                                        </Avatar>
                                        <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-green-300 rounded-full"></span>
                                    </div>
                                    <div className='flex flex-col gap-5 rounded-e-2xl rounded-tl-2xl bg-[#E4E4E4D4] py-2 px-4 min-w-[230px]'>
                                        <div className='flex flex-row w-full items-center justify-between'>
                                            <p className='font-poppins font-semibold text-sm'>{comment.user.name}</p>
                                            {comment.user.role === 'VIP' && <span className='font-poppins font-semibold text-xs text-white bg-black p-1 rounded-sm'>{comment.user.role}</span>}
                                            {comment.user.role === 'Moderator' && <span className='font-poppins font-semibold text-xs text-black bg-green-600 p-1 rounded-sm'>{comment.user.role}</span>}
                                            {comment.user.role === 'Admin' && <span className='font-poppins font-semibold text-xs text-white bg-red-500 p-1 rounded-sm'>{comment.user.role}</span>}
                                        </div>
                                        {comment.audio !== '' ? <WaveRight src={comment.audio} /> : <p className=' font-poppins font-normal text-sm text-whtie break-all' dangerouslySetInnerHTML={{ __html: comment.description}} />}
                                    </div>
                                </div>)
                            }
                        }

                    })}
                </div>
                <div className='flex flex-row'>
                    <div className="relative w-full pt-5 pb-5">
                        {/* Icon appearing as part of the placeholder */}
                        <BsEmojiSmile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black hover:cursor-pointer" size={20} />

                        {/* Input field */}
                        <input
                            type="text"
                            placeholder="Message type..."
                            className="pl-10 pr-3 py-2 w-full bg-[#F5F5F5] border rounded-full focus:outline-none"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleMessage()
                                }
                            }}
                        />
                        {recordingStatus == "inactive" ? <HiOutlineMicrophone className='absolute right-12 top-1/2 transform -translate-y-1/2 text-black hover:cursor-pointer' size={20} onClick={startRecording} /> : <HiOutlineMicrophone className='absolute right-12 top-1/2 transform -translate-y-1/2 text-gray hover:cursor-pointer' size={25} onClick={stopRecording} />}

                        <BsSend className='absolute right-5 top-1/2 transform -translate-y-1/2 text-black hover:cursor-pointer' size={20} onClick={() => handleMessage()} />
                    </div>
                </div>
                {audio ? (
                    <div className="flex flex-col">
                        <div className='flex flex-row'>
                            <audio src={audio} controls></audio>
                            <FaTimes className='cursor-pointer' onClick={handleCancel} />
                        </div>
                        <a download href={audio}>
                            Download Recording
                        </a>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default InboxRoom
