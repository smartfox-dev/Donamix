import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getComment, getPrivateChat } from '@/api/chat';
import { useDispatch } from 'react-redux';
import { setChat } from '@/actions/chatSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/actions/store';
import Button from '@/components/common/Button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import WaveRight from '@/pages/chatroom/WaveRight';
import Waveform from '@/pages/chatroom/Waveform';
import { useAuthContext } from '@/context/AuthContext';
import UserManagePopup from '@/pages/chatroom/UserManagePopup';
import { BsEmojiSmile } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import { FaTimes } from 'react-icons/fa';
import { HiOutlineMicrophone } from "react-icons/hi2";
import axios from 'axios';
import { User } from '@/lib/validation/user';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
import CONSTANTS from '@/config/constants';

export type Contact = {
    avatar: string;
    name: string;
    role: string;
};

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

interface IContactItemProps {
    item: User;
}

const ContactItem: React.FunctionComponent<IContactItemProps> = ({
    item,
}) => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('profile/userprofile');
    }
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const mimeType = "audio/webm";
    const { user } = useAuthContext();
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
    const visualizerRef = useRef<HTMLCanvasElement>(null)
    const [activePlaying, setActivePlaying] = useState(null);
    const [isMax, setMax] = useState(false);

    const triggers = {
        onmouseup: () => setOpen(true),
        onmousedown: () => setOpen(false),
    }

    messagesRef.current = messages;
    const commentListRef = useRef(null);
    const [description, setDescription] = useState('')

    useEffect(() => {
        // Make sure to replace 'chat' with the actual channel name you're using
        // and 'MessageSent' with the event name you're broadcasting from Laravel
        const pusher = new Pusher('e1d8debb6b5791133889', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', onMessageReceive)
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
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

    const handleMessage = () => {
        const formData = new FormData();
        formData.append("member_id", item.id);
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
                                'member_id': item.id,
                                'room_id': 17,
                                'audio': res.data.data.audio,
                                'description': description
                            })
                            dispatch(setChat(temp));
                            setDescription('')
                            setTimeout(updateScrollPos, 1)
                        }
                    })
                    .catch((err) => toast.error('Failed sending message!'))
            }
            else {
                axios.post(`${apiUrl}/chat/store`, {
                    'member_id': item.id,
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
                                'member_id': item.id,
                                'audio': '',
                                'room_id': 17,
                                'description': description
                            })
                            dispatch(setChat(temp));
                            setDescription('')
                            setTimeout(updateScrollPos, 1)
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
                                'id': res.data.data.id,
                                'user_id': user.id,
                                'member_id': item.id,
                                'audio': res.data.data.audio,
                                'room_id': 17,
                                'description': description
                            })
                            dispatch(setChat(temp));
                            setDescription('')
                            setTimeout(updateScrollPos, 1)
                        }
                    })
                    .catch((err) => toast.error('Failed sending message!'))
            }
        }
    }

    const handlePlayer = () => {
        setPlayer(!player);
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

    const load = () => {
        getPrivateChat({ 'room_id': 17, 'member_id': item.id })
            .then((res: any) => {
                dispatch(setChat(res));
                setTimeout(updateScrollPos, 1)
            })
            .catch((err) => { toast.error('Failed Data Load!') })
    }

    const onMessageReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        let temp: any = [...currentMessages]
        if (data.message[0].room_id == "17") {
            if (data.message[0].member_id == user.id && data.message[0].user_id == item.id) {
                temp.push({
                    'user_id': data.message[0].user_id,
                    'member_id': item.id,
                    'audio': data.message[0].audio,
                    'room_id': data.message[0].room_id,
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
    }, [])


    useEffect(() => {
        load()
        console.log('load')
    }, [])

    return (
        <div className="p-3 bg-[#F2F2F2] rounded-xl flex flex-row justify-between items-center">
            <div className="flex items-start gap-4 relative">
                <Avatar className="w-[50px] hover:w-[50px] h-[50px]" onClick={handleOnClick}>
                    <AvatarImage src={item.avatar} alt="" />
                    <AvatarFallback>
                        {item.name
                            .split(' ')
                            .map((subName) => subName.slice(0, 1))
                            .join('')}
                    </AvatarFallback>
                </Avatar>
                <span className="top-0 left-9 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                <div className="flex-1">
                    <h5 className="font-medium text-black font-poppins">
                        {item.name}
                    </h5>
                    <p
                        className={cn(
                            'font-poppins text-xs font-medium',
                            item.role === 'VIP'
                                ? 'text-[#8874DC]'
                                : item.role === 'Moderator'
                                    ? 'text-[#4C7737]'
                                    : 'text-[#AAA]'
                        )}
                    >
                        {item.role}
                    </p>
                </div>
            </div>
            <div className="items-center">
                {isMax ?
                    <div className='absolute p-2 bg-white rounded-full z-40'>
                        <Avatar className='w-[100px] h-[100px] hover:cursor-pointer' >
                            <AvatarImage src={item.avatar} />
                        </Avatar>
                        <img src='/images/home/cross_1.svg' className='w-[15px] h-[15px] absolute top-[15px] right-[10px] bg-white rounded-full shadow-xl' alt='' onClick={() => {
                            setMax(false)
                            setOpen(false)
                        }} />
                        <div className='flex justify-center items-center p-1 bg-white shadow-lg w-[25px] h-[25px] absolute top-[-10px] right-[25px]  rounded-full'>
                            <img src='/images/home/max.svg' className='' alt='' onClick={() => {
                                setOpen(true)
                                setMax(false)
                            }} />
                        </div>
                    </div>
                    : ''}
                <Popover placement="left-start" open={open} handler={setOpen} offset={50}>
                    <PopoverHandler >
                        <div
                            className="relative max-w-[150px] mx-auto flex items-center justify-center text-base bg-black cursor-pointer text-white p-3 pr-5 pl-5 rounded-xl"
                        >
                            Chat
                        </div>
                    </PopoverHandler>
                    <PopoverContent >
                        <div className='flex flex-row w-full h-[50px] justify-between items-center pr-3 pl-3'>
                            <div className='font-poppins text-xl font-semibold text-black'>{item.name}</div>
                            <div className='flex flex-row gap-5'>
                                <img src='/images/home/min.svg' onClick={() => {
                                    setOpen(false)
                                    setMax(true)
                                }} />
                                <img src='/images/home/cross_1.svg' alt='' onClick={() => {
                                    navigate('/inbox')
                                }} />
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col w-[30vw] min-w-[350px] justify-between p-5 max-h-[500px] bg-white overflow-hidden'>
                            <div className='flex-1 flex flex-col gap-4 overflow-y-auto' ref={commentListRef}>
                                {messages && messages.map((comment, i) => {
                                    if (user) {

                                        if (comment.user_id === user.id) {
                                            return (<div className='flex justify-end' key={i}>
                                                <div className='flex flex-row rounded-s-2xl rounded-tl-3xl rounded-bl-3xl rounded-tr-2xl bg-black items-center py-2 px-4'>
                                                    {comment.audio !== '' ? <Waveform src={comment.audio} /> : <p className=' font-poppins font-normal text-sm text-white'>{comment.description}</p>}
                                                </div>
                                            </div>)
                                        }
                                        else {
                                            return (<div className='flex flex-row gap-3 justify-start' key={i}>
                                                <UserManagePopup >
                                                    <div className='relative'>
                                                        <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                                                            <AvatarImage src={comment.user.avatar} />
                                                        </Avatar>
                                                        <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-green-300 rounded-full"></span>
                                                    </div>
                                                </UserManagePopup>
                                                <div className='flex flex-col gap-5 rounded-e-2xl rounded-tl-2xl bg-[#E4E4E4D4] py-2 px-4 min-w-[230px]'>
                                                    <div className='flex flex-row w-full items-center justify-between'>
                                                        <p className='font-poppins font-semibold text-sm'>{comment.user.name}</p>
                                                        {comment.user.role === 'VIP' && <span className='font-poppins font-semibold text-xs text-white bg-black p-1 rounded-sm'>{comment.user.role}</span>}
                                                        {comment.user.role === 'Moderator' && <span className='font-poppins font-semibold text-xs text-black bg-green-600 p-1 rounded-sm'>{comment.user.role}</span>}
                                                        {comment.user.role === 'Admin' && <span className='font-poppins font-semibold text-xs text-white bg-red-500 p-1 rounded-sm'>{comment.user.role}</span>}
                                                    </div>
                                                    {comment.audio !== '' ? <WaveRight src={comment.audio} /> : <p className=' font-poppins font-normal text-sm text-whtie'>{comment.description}</p>}
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
                    </PopoverContent>

                </Popover>
            </div>
        </div>
    );
};

export default ContactItem;
