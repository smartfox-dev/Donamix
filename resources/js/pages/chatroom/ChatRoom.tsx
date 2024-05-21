import React, { useCallback, useRef } from 'react'
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactWaves from '@dschoon/react-waves';
import { AudioVisualizer } from 'react-audio-visualize';
import UserManagePopup from './UserManagePopup';
import MailPopup from './MailPopup';
import Pusher from 'pusher-js'
import Echo from 'laravel-echo';
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSettings, IoMdPlay, IoIosPause, IoIosCloseCircle } from 'react-icons/io'
import { PiWebcamFill } from "react-icons/pi";
import { BsEmojiSmile } from "react-icons/bs";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FaCheckCircle, FaGooglePlay, FaApple, FaReply } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdOutlinePhonelinkLock, MdOutlineForum } from "react-icons/md";
import { CgScreenMirror } from "react-icons/cg";
import { ImBin, ImBlocked } from "react-icons/im";
import { BiPlusMedical, BiSolidVolumeMute } from "react-icons/bi";
import { FcCloseUpMode, FcRules } from "react-icons/fc";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { FaTimes } from 'react-icons/fa';
import { BsSend } from "react-icons/bs";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getComment, roomReg, roomOut } from '@/api/chat';
import { useDispatch } from 'react-redux';
import { setChat, setUser, setPrivate } from '@/actions/chatSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/actions/store';
import Waveform from './Waveform';
import { getRoomName, getPrivateRoom } from '@/api/chat';
import WaveRight from './WaveRight';
import VideoCall from './VideoCall';
import { getGroupAll } from '@/api/users';
import { useLocation } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

import { Slider } from "@material-tailwind/react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    // Button,
} from "@material-tailwind/react";
import CONSTANTS from '@/config/constants';
import { useLoadScript } from '@react-google-maps/api';

interface IChatRoomProps {
    isPrivateChat: boolean;
    setIsPrivateChat: Function;
    setMobile?: Function;
    mem: any;
}

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const ChatRoom: React.FC<IChatRoomProps> = ({ isPrivateChat, setIsPrivateChat, mem, setMobile }) => {

    const [description, setDescription] = useState('')
    const params = useParams();
    const location = useLocation();
    const { user } = useAuthContext();
    const [users, setUsers] = useState([])
    const [profile, setProfile] = useState(null)
    const dispatch = useDispatch()
    const [room, setRoom] = useState(null)
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
    const userinfo = useSelector((state: RootState) => state.chat.userinfo);
    const isPrivate = useSelector((state: RootState) => state.chat.isPrivate)
    const userinfoRef = useRef(userinfo);
    const messagesRef = useRef(messages);
    const isPrivateRef = useRef(isPrivate);
    const [open, setOpen] = useState(false)
    const visualizerRef = useRef<HTMLCanvasElement>(null)
    const [activePlaying, setActivePlaying] = useState(null);
    const [connector, setConnector] = useState(false)
    const [isModal, setModal] = useState(false)
    const [mute, setMute] = useState(false)
    const [kick, setKick] = useState(false)
    const [muteName, setMuteName] = useState('')
    const [kickName, setKickName] = useState('')

    const navigate = useNavigate()
    messagesRef.current = messages;
    userinfoRef.current = userinfo;
    isPrivateRef.current = isPrivate

    const commentListRef = useRef(null);

    const activePlayerhandler = (id) => {
        setActivePlaying(id);
    }

    const onCloseVideo: DialogProps['onClose'] = (e, reason) => {
        if (reason && reason == "backdropClick") return;
        setOpen(false)
    }

    const onOpenVideo = () => {
        setOpen(true)
        axios.post(`${apiUrl}/chat/call-start`, { 'channel_name': "test" })
            .then((res) => {
                console.log('successs')
            })
            .catch((err) => toast.error('Failed'))
    }

    const privateSelect = () => {
        const is_private = true
        setIsPrivateChat(true);
        dispatch(setPrivate(is_private))
    }
    const handleArrow = () => {
        const is_private = false
        setIsPrivateChat(false);
        dispatch(setPrivate(is_private))
        // window.location.reload()
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
        const is_private = isPrivateChat ? 1 : 0;
        const formData = new FormData();
        console.log(mem)
        formData.append("member_id", isPrivateChat ? mem.id : 0);
        formData.append("description", description);
        formData.append("room_id", parseInt(params.id));
        formData.append("audio", audioFile);
        formData.append("is_private", is_private);
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
                                'id': res.data.data.id,
                                'user_id': user.id,
                                'member_id': 0,
                                'room_id': parseInt(params.id),
                                'audio': res.data.data.audio,
                                'is_error': 0,
                                'description': description
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
                    .catch((err) => console.log(err.response))
            }
            else {
                axios.post(`${apiUrl}/chat/store`, {
                    'member_id': isPrivateChat ? mem.id : 0,
                    'description': description,
                    'audio': '',
                    'room_id': parseInt(params.id),
                    'is_private': is_private
                })
                    .then((res) => {
                        if (res.data.message === CONSTANTS.SUCCESS) {
                            let temp: any = [...messages]
                            temp.push({
                                'id': res.data.data.id,
                                'user_id': user.id,
                                'member_id': 0,
                                'audio': '',
                                'is_error': 0,
                                'room_id': parseInt(params.id),
                                'description': description,
                                'is_private': is_private
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
                            let temp: any = [...messages]
                            handleCancel();
                            temp.push({
                                'id': res.data.data.id,
                                'user_id': user.id,
                                'member_id': 0,
                                'audio': res.data.data.audio,
                                'room_id': parseInt(params.id),
                                'is_error': 0,
                                'description': description
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
                console.log(err.message);
            }
        } else {
            console.log("The MediaRecorder API is not supported in your browser.");
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
            console.log(audioBlob)
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log(audioUrl)
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
        roomReg({ 'room': parseInt(params.id) })
            .then((res) => {
                console.log('success reg room')
            })
            .catch((err) => {
                toast.error('Failed!')
            })
    }

    const onMessageReceive = (data) => {
        const currentMessages = messagesRef.current
        let temp: any = [...currentMessages]
        const info = userinfoRef.current
        const is_private = isPrivateRef.current
        console.log(info, data.message[0].user_id, data.message[0].is_private, is_private)
        if (data.message[0].user_id !== info.id) {

            if (is_private == true && data.message[0].is_private == 1 && data.message[0].member_id === info.id && data.message[0].user_id == mem.id) {
                console.log(data.message, '--------')
                temp.push({
                    'id': data.message[0].id,
                    'user_id': data.message[0].user_id,
                    'member_id': 0,
                    'audio': data.message[0].audio,
                    'is_error': 0,
                    'room_id': data.message[0].room_id,
                    'description': data.message[0].description,
                    'user': {
                        'id': data.message[4],
                        'avatar': data.message[2],
                        'name': data.message[1],
                        'role': data.message[3],
                        'username': data.message[5]
                    }
                })
            }
            else if (is_private == false && data.message[0].is_private == 0) {
                temp.push({
                    'id': data.message[0].id,
                    'user_id': data.message[0].user_id,
                    'member_id': 0,
                    'audio': data.message[0].audio,
                    'is_error': 0,
                    'room_id': data.message[0].room_id,
                    'description': data.message[0].description,
                    'user': {
                        'id': data.message[4],
                        'avatar': data.message[2],
                        'name': data.message[1],
                        'role': data.message[3],
                        'username': data.message[5],
                    }
                })
            }
            console.log(temp)
            dispatch(setChat(temp));
            setTimeout(updateScrollPos, 1)
        }
    }

    const onKickReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        let temp: any = [...currentMessages]
        const info = userinfoRef.current
        console.log(data.message)
        temp.push({
            'id': 0,
            'user_id': 0,
            'member_id': 0,
            'audio': '',
            'is_error': 1,
            'room_id': data.message[1],
            'description': data.message[2],
            'user': {
                'id': data.message[4],
                'avatar': data.message[2],
                'name': data.message[1],
                'role': data.message[3],
                'username': data.message[5],
            }
        })
        if (info.id == data.message[0] && params.id === data.message[1]) {
            setKick(true)
            setKickName(data.message[3])
        }
        console.log(temp)
        dispatch(setChat(temp));
        setTimeout(updateScrollPos, 1)
    }, [])

    const onMuteReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        const info = userinfoRef.current
        let temp: any = [...currentMessages]
        temp.push({
            'id': 0,
            'user_id': 0,
            'member_id': 0,
            'audio': '',
            'is_error': 1,
            'room_id': data.message[1],
            'description': data.message[2],
            'user': {
                'id': data.message[4],
                'avatar': data.message[2],
                'name': data.message[1],
                'role': data.message[3],
                'username': data.message[5],
            }
        })
        if (info.id == data.message[0] && params.id === data.message[1]) {
            setMute(true)
            setMuteName(data.message[3])
        }
        console.log(temp)
        dispatch(setChat(temp));
        setTimeout(updateScrollPos, 1)
    }, [])

    const onUnMuteReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        let temp: any = [...currentMessages]
        console.log(data.message)
        temp.push({
            'id': 0,
            'user_id': 0,
            'member_id': 0,
            'audio': '',
            'is_error': 1,
            'room_id': data.message[1],
            'description': data.message[2],
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
    }, [])

    const onBotReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        let temp: any = [...currentMessages]
        const info = userinfoRef.current
        if(info.id === data.message[1]) {
            temp.push({
                'id': 0,
                'user_id': 0,
                'member_id': 0,
                'audio': '',
                'is_error': 0,
                'room_id': 0,
                'description': data.message[0],
                'user': {
                    'id': 0,
                    'avatar': 0,
                    'name': 0,
                    'role': 0
                }
            })
            console.log(temp)
            dispatch(setChat(temp));
            setTimeout(updateScrollPos, 1)
        }
    }, [])

    const onMailReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        let temp: any = [...currentMessages]
        console.log(data.message)
        temp = temp.filter(item => item.id !== data.message)

        dispatch(setChat(temp));
    }, [])

    const onLogoutReceive = useCallback((data) => {
        load()
    }, [])

    useEffect(() => {

        const pusher = new Pusher('e1d8debb6b5791133889', {
            cluster: 'ap2'
        });

        pusher.connection.bind('connecting', (payload) => {

            /**
             * All dependencies have been loaded and Channels is trying to connect.
             * The connection will also enter this state when it is trying to reconnect after a connection failure.
             */

            console.log('connecting...');
            const currentMessages = messagesRef.current
            let temp: any = [...currentMessages]
            if (temp[temp.length - 1].is_error === 2) {
                temp = temp.filter((item, i) => item.is_error !== 2)
                console.log(temp)
                temp.push({
                    'id': 0,
                    'user_id': 0,
                    'member_id': 0,
                    'audio': '',
                    'is_error': 3,
                    'room_id': 1,
                    'description': 'Reconnecting...',
                    'user': {
                        'id': 0,
                        'avatar': '',
                        'name': '',
                        'role': ''
                    }
                })
                dispatch(setChat(temp));
                setTimeout(updateScrollPos, 1)
            }
        });

        pusher.connection.bind('connected', (payload) => {

            /**
             * The connection to Channels is open and authenticated with your app.
             */

            const currentMessages = messagesRef.current
            console.log('connected!', currentMessages);
            roomReg({ 'room': parseInt(params.id) })
                .then((res) => {
                    console.log('success reg room')
                })
                .catch((err) => {
                    toast.error('Failed!')
                })
            let temp: any = [...currentMessages]
            if (temp[temp.length - 1].is_error > 2) {
                temp = temp.filter((item, i) => i !== currentMessages.length - 1)
                console.log(temp)
                temp.push({
                    'id': 0,
                    'user_id': 0,
                    'member_id': 0,
                    'audio': '',
                    'is_error': 4,
                    'room_id': 1,
                    'description': 'Back online!',
                    'user': {
                        'id': 0,
                        'avatar': '',
                        'name': '',
                        'role': ''
                    }
                })
                dispatch(setChat(temp));
                setTimeout(updateScrollPos, 1)
                setTimeout(() => {
                    const currentMessages = messagesRef.current
                    let temp: any = [...currentMessages]
                    if (temp[temp.length - 1].is_error == 4) {
                        temp = temp.filter((item, i) => i !== currentMessages.length - 1)
                        dispatch(setChat(temp));
                    }
                    setTimeout(updateScrollPos, 1)
                }, 5000)
            }
        });

        pusher.connection.bind('unavailable', (payload) => {

            /**
             *  The connection is temporarily unavailable. In most cases this means that there is no internet connection.
             *  It could also mean that Channels is down, or some intermediary is blocking the connection. In this state,
             *  pusher-js will automatically retry the connection every 15 seconds.
             */

            console.log('unavailable', payload);
            const currentMessages = messagesRef.current
            let temp: any = [...currentMessages]
            if (currentMessages[currentMessages.length - 1].is_error < 2) {

                temp.push({
                    'id': 0,
                    'user_id': 0,
                    'member_id': 0,
                    'audio': '',
                    'is_error': 2,
                    'room_id': 1,
                    'description': 'Connection lost Trying to Reconnect',
                    'user': {
                        'id': 0,
                        'avatar': '',
                        'name': '',
                        'role': ''
                    }
                })
                console.log(temp, '---------')
                dispatch(setChat(temp));
                setTimeout(updateScrollPos, 1)
            }
        });

        pusher.connection.bind('failed', (payload) => {

            /**
             * Channels is not supported by the browser.
             * This implies that WebSockets are not natively available and an HTTP-based transport could not be found.
             */

            console.log('failed', payload);


        });

        pusher.connection.bind('disconnected', (payload) => {

            /**
             * The Channels connection was previously connected and has now intentionally been closed
             */

            console.log('disconnected', payload);
            const currentMessages = messagesRef.current
            let temp: any = [...currentMessages]
            if (currentMessages[currentMessages.length - 1].is_error < 2) {

                temp.push({
                    'id': 0,
                    'user_id': 0,
                    'member_id': 0,
                    'audio': '',
                    'is_error': 2,
                    'room_id': 1,
                    'description': 'Connection lost Trying to Reconnect',
                    'user': {
                        'id': 0,
                        'avatar': '',
                        'name': '',
                        'role': ''
                    }
                })
                console.log(temp)
                dispatch(setChat(temp));
                setTimeout(updateScrollPos, 1)
            }
        });


    }, [])



    useEffect(() => {
        // Make sure to replace 'chat' with the actual channel name you're using
        // and 'MessageSent' with the event name you're broadcasting from Laravel
        const pusher = new Pusher('e1d8debb6b5791133889', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', onMessageReceive)

        const channel_kick = pusher.subscribe('chat');
        channel_kick.bind('kick', onKickReceive)

        const channel_mute = pusher.subscribe('chat');
        channel_mute.bind('mute', onMuteReceive)

        const channel_unmute = pusher.subscribe('chat');
        channel_unmute.bind('unmute', onUnMuteReceive)

        const channel_bot = pusher.subscribe('chat');
        channel_bot.bind('bot', onBotReceive)

        const channel_mail = pusher.subscribe('chat');
        channel_mail.bind('delete', onMailReceive)

        const channel_logout = pusher.subscribe('chat');
        channel_logout.bind('logout', onLogoutReceive)
        return () => {
            channel.unbind_all();
            channel_kick.unbind_all();
            channel_mute.unbind_all();
            channel_unmute.unbind_all();
            channel_bot.unbind_all();
            channel_mail.unbind_all();
            channel_logout.unbind_all();

            channel.unsubscribe();
            channel_bot.unsubscribe();
            channel_kick.unsubscribe();
            channel_mute.unsubscribe();
            channel_unmute.unsubscribe();
            channel_mail.unsubscribe();
            channel_logout.unsubscribe();
        }
    }, []);

    const handleClean = () => {
        dispatch(setChat([]));
    }

    const handleLogout = () => {
        navigate('/logout');
        roomOut()
            .then((res) => console.log('Success logout'))
            .catch((err) => console.log('error logout'))
    }

    const gotoBlock = () => {
        navigate('/profile/edit?page=blocked-user')
    }

    const gotoRoom = () => {
        navigate('/chatrooms')
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        console.log(user)
        dispatch(setUser(user))
    }, [user])

    useEffect(() => {
        dispatch(setChat([]))
        getRoomName({ 'id': params.id })
            .then((res: any) => {
                setRoom(res)
            })
            .catch((err) => {
                toast.error('Failed Room!')
            })
        getGroupAll({ 'room_id': params.id })
            .then((res: any) => {
                if (res.message === CONSTANTS.SUCCESS) {
                    setUsers(res.data);
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

    }, [params.id])

    useEffect(() => {
        if (mem && mem.id !== user.id && isPrivateChat == true) {
            console.log('Private chat')
            getPrivateRoom({
                'room_id': parseInt(params.id),
                'member_id': mem.id
            }).then((res: any) => {
                dispatch(setChat(res));
                setTimeout(updateScrollPos, 1)
            })
                .catch((err) => {
                    console.warn('Error while loading upgrade titles', err);
                })
                .finally(() => {
                });

        }
        else if (mem && mem.id !== user.id && isPrivateChat !== true) {
            getComment({ 'room_id': params.id })
                .then((res: any) => {
                    dispatch(setChat(res));
                    setTimeout(updateScrollPos, 1)
                })
                .catch((err) => { toast.error('Failed Data Load!') })
        }
    }, [mem, isPrivateChat])

    return (
        <div className='flex-1 flex flex-col rounded-t-xl h-full'>
            <div className='flex flex-row justify-between items-center p-3 bg-[#EBEBEB]'>
                {isMobileDevice() ? <span className='font-poppins font-medium text-base' onClick={() => setMobile(true)}>&lt; Back to Messages</span> : ''}
                {isPrivateChat === true ?
                    <div className='flex flex-row gap-3 items-center'>
                        <FaArrowLeft size='30' onClick={handleArrow} />
                        <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                            <AvatarImage src={mem && mem.avatar} />
                        </Avatar>
                        <p className=' font-poppins font-medium text-base'>{mem && mem.name}</p>
                        <p></p>
                    </div> :
                    <div className='flex flex-row gap-3 items-center'>
                        <div className='flex flex-row gap-1 items-center'>
                            {room && <img src={`/images/chatroom/${room.id}.jpg`} className='w-[43px] h-[43px] rounded-full' alt='' />}
                            <p className='font-poppins font-semibold text-sm'>{room && room.title} </p>
                        </div>
                    </div>
                }
                <div className='flex flex-row gap-7 items-center'>
                    <PiWebcamFill size='30' onClick={() => setModal(true)} />
                    <Dialog open={isModal} onClose={() => setModal(false)}  >
                        {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
                        <DialogContent className="">
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                    <p>Are you sure you wish to start your camera?</p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                            onClick={() => {
                                                setModal(false);
                                            }}
                                        >
                                            No
                                        </button>
                                        <button
                                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                            onClick={() => {
                                                onOpenVideo()
                                                setModal(false)
                                            }}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={mute} onClose={() => setMute(false)}  >
                        {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
                        <DialogContent className="">
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                    <p>You have been muted by {muteName}</p>
                                    <div className="flex justify-end mt-4">

                                        <button
                                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                            onClick={() => {
                                                setMute(false)
                                            }}
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={kick} onClose={() => setKick(false)}  >
                        {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
                        <DialogContent className="">
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                    <p>You have been kicked by {kickName}</p>
                                    <div className="flex justify-end mt-4">

                                        <button
                                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                            onClick={() => {
                                                setKick(false)
                                                navigate('/chatrooms')
                                            }}
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Popover placement='bottom-end'>
                        <PopoverHandler>
                            <div>
                                <IoIosSettings size='30' className='hover:cursor-pointer' />
                            </div>
                        </PopoverHandler>
                        <PopoverContent className='flex flex-col gap-7 shadow-sm w-[250px] p-4'>
                            <div className='flex flex-row gap-3 items-center cursor-pointer' onClick={handleLogout}>
                                <IoLogOut size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Log out</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center cursor-pointer' onClick={() => gotoBlock()}>
                                <MdOutlinePhonelinkLock size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Block List</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center cursor-pointer' onClick={handleClean}>
                                <CgScreenMirror size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Clear Screen</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center cursor-pointer' onClick={() => navigate('/feed/download')}>
                                <FaGooglePlay size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Download app</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center cursor-pointer' onClick={() => navigate('/feed/download')}>
                                <FaApple size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Download app</p>
                            </div>
                            <div className='flex flex-row gap-3 items-center cursor-pointer' onClick={() => gotoRoom()}>
                                <IoIosCloseCircle size='20' className='text-black' />
                                <p className=' font-montserrat font-medium text-base text-black'>Exit</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            {user && <VideoCall open={open} onClose={onCloseVideo} allUsers={users} authUser={user.name} authUserId={user.id} agoraId='e5d2917dfd7c4078bc6d4f8eddb1a5ca' />}
            <div className='flex-1 flex flex-col justify-between p-5 bg-[#F5F5F5] overflow-hidden'>
                <div className='flex-1 flex flex-col gap-4 overflow-y-auto' ref={commentListRef}>
                    {messages && messages.map((comment, i) => {
                        if (user && comment.user_id === user.id && comment.is_error == 0) {

                            return (<div className='flex justify-end' key={i}>
                                <div className='flex flex-row rounded-s-2xl rounded-tl-3xl rounded-bl-3xl rounded-tr-2xl bg-black items-center py-2 px-4'>
                                    {comment.audio !== '' ? <Waveform src={comment.audio} /> : <p className=' font-poppins font-normal text-sm text-white'>{comment.description}</p>}
                                </div>
                            </div>)
                        }
                        else if (comment.is_error == 1) {
                            return (
                                <div className='flex w-full items-center justify-center py-2 bg-[#D9D9D9]' key={i}>
                                    <p className='font-poppins font-semibold text-sm text-[red]'>{comment.description}</p>
                                </div>
                            )
                        }
                        else if (comment.is_error == 2) {
                            return (
                                <div className='flex w-full items-center justify-center py-2 bg-[#C63B00B3]' key={i}>
                                    <p className='font-poppins font-semibold text-sm text-[white]'>Connection lost Trying to connect</p>
                                </div>
                            )
                        }
                        else if (comment.is_error == 3) {
                            return (
                                <div className='flex w-full items-center justify-center py-2 bg-[#C63B00B3]' key={i}>
                                    <p className='font-poppins font-semibold text-sm text-[white]'>Reconnecting...</p>
                                </div>
                            )
                        }
                        else if (comment.is_error == 4) {
                            return (
                                <div className='flex w-full items-center justify-center py-2 bg-[green]' key={i}>
                                    <p className='font-poppins font-semibold text-sm text-[white]'>Back online!</p>
                                </div>
                            )
                        }
                        else if (comment.room_id === 0) {
                            return (
                                <div className='flex flex-col w-full items-start justify-start py-2 pl-5 pr-5 bg-[#D9D9D9]' key={i}>
                                    <p className='font-poppins font-semibold text-sm text-[black]'>Donamix Bot</p>
                                    <p className='font-poppins font-normal text-sm text-[black]'>{comment.description}  <a href="/upgrade">Click here</a> to subscribe now. Thank you for your support!</p>
                                </div>
                            )
                        }
                        else {
                            return (<div className='flex flex-row gap-3 justify-start' key={i}>
                                <MailPopup member={comment.user.id} privateSelect={privateSelect} mail_id={comment.id} username={comment.user.username}>
                                    <div className='relative'>
                                        <Avatar className='w-[43px] h-[43px] hover:cursor-pointer' >
                                            <AvatarImage src={comment.user.avatar} />
                                        </Avatar>
                                        <span className="top-[5px] left-[35px] absolute w-2 h-2 bg-green-300 rounded-full"></span>
                                    </div>
                                </MailPopup>
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
