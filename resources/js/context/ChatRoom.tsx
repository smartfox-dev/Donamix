import React, { useCallback, useRef } from 'react'
import { useState, useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserManagePopup from '@/pages/chatroom/UserManagePopup';
import Pusher from 'pusher-js'
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSettings, IoMdPlay, IoIosPause, IoIosCloseCircle } from 'react-icons/io'
import { PiWebcamFill } from "react-icons/pi";
import { BsEmojiSmile } from "react-icons/bs";
import { FaCheckCircle, FaGooglePlay, FaApple, FaReply } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdOutlinePhonelinkLock, MdOutlineForum } from "react-icons/md";
import { CgScreenMirror } from "react-icons/cg";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { FaTimes } from 'react-icons/fa';
import { BsSend } from "react-icons/bs";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { getComment } from '@/api/chat';
import { useDispatch } from 'react-redux';
import { setChat } from '@/actions/chatSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/actions/store';
import Waveform from '@/pages/chatroom/Waveform';
import WaveRight from '@/pages/chatroom/WaveRight';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

import { Slider } from "@material-tailwind/react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    // Button,
} from "@material-tailwind/react";
import CONSTANTS from '@/config/constants';

interface IChatRoomProps {
    isPrivateChat: boolean;
    setIsPrivateChat: Function;
}

const ChatRoom: React.FC<IChatRoomProps> = ({ isPrivateChat, setIsPrivateChat }) => {

    // const [isPrivateChat, setIsPrivateChat] = useState(false);
    const [description, setDescription] = useState('')
    const params = useParams();
    const { user } = useAuthContext();
    const dispatch = useDispatch()
    const mimeType = "audio/webm";
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
    const [activePlaying,setActivePlaying]=useState(null);
    messagesRef.current = messages;

    const commentListRef = useRef(null);

    const activePlayerhandler=(id)=>{
        setActivePlaying(id);
      }

    const privateSelect = () => {
        setIsPrivateChat(true);
    }
    const handleArrow = () => {
        setIsPrivateChat(false);
    }

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
        formData.append("member_id", 0);
        formData.append("description", description);
        formData.append("room_id", params.id);
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
                                'member_id': 0,
                                'room_id': params.id,
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
                    'member_id': 0,
                    'description': description,
                    'audio': '',
                    'room_id': params.id
                })
                    .then((res) => {
                        if (res.data.message === CONSTANTS.SUCCESS) {
                            console.log(res.data)
                            let temp: any = [...messages]
                            temp.push({
                                'user_id': user.id,
                                'member_id': 0,
                                'audio': '',
                                'room_id': params.id,
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
                                'user_id': user.id,
                                'member_id': 0,
                                'audio': res.data.data.audio,
                                'room_id': params.id,
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

    // const getCameraPermission = async () => {
    //     setRecordedVideo(null);
    //     if ("MediaRecorder" in window) {
    //         try {
    //             const videoConstraints = {
    //                 audio: false,
    //                 video: true,
    //             };
    //             const audioConstraints = { audio: true };
    //             // create audio and video streams separately
    //             const audioStream = await navigator.mediaDevices.getUserMedia(
    //                 audioConstraints
    //             );
    //             const videoStream = await navigator.mediaDevices.getUserMedia(
    //                 videoConstraints
    //             );
    //             setPermission(true);
    //             //combine both audio and video streams
    //             const combinedStream = new MediaStream([
    //                 ...videoStream.getVideoTracks(),
    //                 ...audioStream.getAudioTracks(),
    //             ]);
    //             setStream(combinedStream);
    //             //set videostream to live feed player
    //             liveVideoFeed.current.srcObject = videoStream;
    //         } catch (err) {
    //             alert(err.message);
    //         }
    //     } else {
    //         alert("The MediaRecorder API is not supported in your browser.");
    //     }
    // };

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
        getComment({ 'room_id': params.id })
            .then((res: any) => {
                dispatch(setChat(res));
                setTimeout(updateScrollPos, 1)
            })
            .catch((err) => { toast.error('Failed Data Load!') })
    }

    const onMessageReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        let temp: any = [...currentMessages]
        if(data.message[0].room_id === params.id.toString()){
            temp.push({
                'user_id': data.message[0].user_id,
                'member_id': 0,
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
    }, [])

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


    useEffect(() => {
        load()
        console.log('load')
    }, [])

    useEffect(() => {
        console.log(params.id)
    }, [params])

    return (
        <div className='flex-1 flex flex-col rounded-t-xl h-full'>
            <div className='flex flex-row justify-between items-center p-3 bg-[#EBEBEB]'>
                {isPrivateChat === true ?
                    <div className='flex flex-row gap-3 items-center'>
                        <FaArrowLeft size='30' onClick={handleArrow} />
                        <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                            <AvatarImage src='/images/avatar_1.jpg' />
                        </Avatar>
                        <p className=' font-poppins font-medium text-base'>Smith Mathew</p>
                        <p></p>
                    </div> :
                    <div className='flex flex-row gap-3 items-center'>
                        <div className='flex flex-row gap-1 items-center'>
                            <img src='/images/chatroom/germanflag.png' className='w-[43px] h-[43px]' alt='' />
                            <p className='font-poppins font-semibold text-sm'>Germany Chat Room</p>
                        </div>
                    </div>
                }
                <div className='flex flex-row gap-7 items-center'>
                    <PiWebcamFill size='30' />
                    <Popover placement='bottom-end'>
                        <PopoverHandler>
                            <div>
                                <IoIosSettings size='30' className='hover:cursor-pointer' />
                            </div>
                        </PopoverHandler>
                        <PopoverContent className='flex flex-col gap-7 shadow-sm w-[250px] p-4'>
                            <div className='flex flex-row gap-3 items-center'>
                                <IoLogOut size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Log out</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <MdOutlinePhonelinkLock size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Blocked User</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <CgScreenMirror size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Clear Screen</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <FaGooglePlay size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Download app</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <FaApple size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Download app</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <IoIosCloseCircle size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Exit</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-between p-5 bg-[#F5F5F5] overflow-hidden'>
                <div className='flex-1 flex flex-col gap-4 overflow-y-auto' ref={commentListRef}>
                    {messages && messages.map((comment, i) => {
                        if (user && comment.user_id === user.id) {
                            return (<div className='flex justify-end' key={i}>
                                <div className='flex flex-row rounded-s-2xl rounded-tl-3xl rounded-bl-3xl rounded-tr-2xl bg-black items-center py-2 px-4'>
                                    {comment.audio !== '' ? <Waveform src={comment.audio} /> : <p className=' font-poppins font-normal text-sm text-white'>{comment.description}</p>}
                                </div>
                            </div>)
                        }
                        else {
                            return (<div className='flex flex-row gap-3 justify-start' key={i}>
                                <UserManagePopup privateSelect={privateSelect}>
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

                    })}
                </div>
                <div className='flex flex-row'>
                    <div className="relative p-5 w-full">
                        {/* Icon appearing as part of the placeholder */}
                        <BsEmojiSmile className="absolute left-9 top-1/2 transform -translate-y-1/2 text-black hover:cursor-pointer" size={20} />

                        {/* Input field */}
                        <input
                            type="text"
                            placeholder="Message type..."
                            className="pl-10 pr-3 py-2 w-full border rounded-full focus:outline-none"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleMessage()
                                }
                            }}
                        />
                        {recordingStatus == "inactive" ? <HiOutlineMicrophone className='absolute right-20 top-1/2 transform -translate-y-1/2 text-black hover:cursor-pointer' size={20} onClick={startRecording} /> : <HiOutlineMicrophone className='absolute right-20 top-1/2 transform -translate-y-1/2 text-gray hover:cursor-pointer' size={25} onClick={stopRecording} />}

                        <BsSend className='absolute right-10 top-1/2 transform -translate-y-1/2 text-black hover:cursor-pointer' size={20} onClick={() => handleMessage()} />
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

export default ChatRoom
