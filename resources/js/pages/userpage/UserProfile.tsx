import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsBriefcaseFill } from 'react-icons/bs';
import Button from '@/components/common/Button';
import { Chip } from '@material-tailwind/react';
import { Comment } from '@/lib/validation/comment';
import { FaGraduationCap } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useAuthContext } from '@/context/AuthContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import LeftSidebar from '../profile/layout/LeftSidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/custom/home/Footer';
import { cn } from '@/lib/utils';
import FileUpload from '@/components/common/FileUpload';
import { useDispatch } from 'react-redux';
import { setChat } from '@/actions/chatSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/actions/store';
import { getComment, getPrivateChat } from '@/api/chat';
import { getProfile, connectUser, changeStatusFriend, connectCancel } from '@/api/users';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CONSTANTS, { Option } from '@/config/constants';
import { User } from '@/lib/validation/user';
import { toast } from 'react-hot-toast';
import { createPost, getPostsByUser } from '@/api/post';
import { Post, postValidator } from '@/lib/validation/post';
import WaveRight from '@/pages/chatroom/WaveRight';
import Waveform from '@/pages/chatroom/Waveform';
import UserManagePopup from '@/pages/chatroom/UserManagePopup';
import { BsEmojiSmile } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import { FaTimes } from 'react-icons/fa';
import { HiOutlineMicrophone } from "react-icons/hi2";
import axios from 'axios';
import PostCard from '@/components/widgets/post/PostCard';
import ProfileCard from '@/components/widgets/profile/ProfileCard';
import { getIDProfile } from '@/api/users';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
const apiUrl = import.meta.env.VITE_BACKEND_API as string;

interface IUserProfileProps { }

const UserProfile: React.FC<IUserProfileProps> = ({ }) => {
    const params = useParams();
    const [open, setOpen] = useState(false)
    const [isMax, setMax] = useState(false)
    const [profile, setProfile] = useState<User | null>(null);
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
    const dispatch = useDispatch()
    const messagesRef = useRef(messages);
    const visualizerRef = useRef<HTMLCanvasElement>(null)
    const [activePlaying, setActivePlaying] = useState(null);
    const [posts, setPosts] = useState<Post[]>([]);
    // const dropdownRef = useRef(null);
    const modalRef = useRef(null);
    const [from, setFrom] = useState<number>(0);
    const [isPerspective, setisPerspective] = useState<boolean>(false);
    const [showPhotos, setShowPhotos] = useState<boolean>(false);
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState<number>(0);
    messagesRef.current = messages;
    const commentListRef = useRef(null);
    const [description, setDescription] = useState('')

    const handleMenuClick = () => {
        setIsMenuOpen(isMenuOpen > 0 ? 0 : 1);
        console.log("MenuClick");
    };

    const triggers = {
        onmouseup: () => setOpen(true),
        onmousedown: () => setOpen(false),
    }

    const handleMenuItemClick = () => {
        setIsMenuOpen(0);
    };

    const handleOutsideClick = (event: any) => {
        console.log('123', event, event.type, isMenuOpen, event.type == 'click' && isMenuOpen == 2)
        if (event.type == 'click' && isMenuOpen == 2) {
            setIsMenuOpen(0);
        }
        if (event.type == 'click' && isMenuOpen == 1) {
            setIsMenuOpen(2);
        }

    };

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
        formData.append("member_id", profile.id);
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
                                'member_id': profile.id,
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
                    'member_id': profile.id,
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
                                'member_id': profile.id,
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
                                'user_id': user.id,
                                'member_id': profile.id,
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

    const connectFriend = (e) => {
        e?.preventDefault()
        connectUser(user.id, profile.username)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    setProfile({
                        ...profile,
                        is_sent_status: 0,
                        is_received_status: 1,
                        is_from: user.id,
                    })
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.warn(err);
            })
    };

    const cancelFriend = (e) => {
        e?.preventDefault()
        connectCancel(user.id, profile.username)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    setProfile({
                        ...profile,
                        is_sent_status: null,
                        is_received_status: null,
                        is_from: null,
                        is_to: null,
                    })
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.warn(err);
            })
    };

    const changeStatus = (status: Number) => {
        changeStatusFriend(profile.id, status)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    setProfile({
                        ...profile,
                        is_received_status: status,
                        is_to: profile.id,
                        is_from: user.id,
                    })
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.warn(err);
            })
    };

    const onMessageReceive = useCallback((data) => {
        const currentMessages = messagesRef.current
        let temp: any = [...currentMessages]
        if (data.message[0].room_id == "17") {
            if (data.message[0].member_id == user.id && data.message[0].user_id == profile.id) {
                temp.push({
                    'user_id': data.message[0].user_id,
                    'member_id': data.message[0].member_id,
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

    const load = () => {
        if (profile) {
            getPrivateChat({ 'room_id': 17, 'member_id': profile.id })
                .then((res: any) => {
                    dispatch(setChat(res));
                    setTimeout(updateScrollPos, 1)
                })
                .catch((err) => { toast.error('Failed Data Load!') })
        }
    }

    useEffect(() => {
        load()
    }, [profile])

    const loadProfile = () => {

        console.log("=========username_param:", params)
        if (params && params.username) {
            getProfile(params.username)
                .then((res) => {
                    if (res.code === CONSTANTS.SUCCESS) {
                        if (res.data) {
                            if (res.data.is_blocked == 1) {
                                navigate('/profile/blocked-user')
                            }
                            console.log("=====profile_data:", res.data)
                            setProfile(res.data);
                        }
                    }
                    else {
                        toast.error('Failed')
                    }
                })
                .catch((err) => {
                    console.warn('Error while loading blogs', err);

                })
                .finally(() => {

                });
        }
        if (params.username != null) {
            getPostsByUser(params.username)
                .then((res) => {
                    if (res.code === CONSTANTS.SUCCESS) {
                        if (res.data) {
                            const temp = res.data;
                            if (from === 0) setPosts(temp);
                            else setPosts((prev) => [...prev, ...temp]);
                            setFrom(from + temp.length);
                        }
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((err) => {
                    console.warn('Error while loading blogs', err);
                })
                .finally(() => {
                });
        }
    }
    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false)
    const onAddPost = (is_perspective: boolean, is_photo: boolean) => {
        setisPerspective(is_perspective)
        setShowPhotos(is_photo)
        setIsAddPostOpen(true);
    }
    const onCloseAddPost = () => {
        setIsAddPostOpen(false);
    }

    const removePost = (post: Post) => {
        let filteredArray = posts.filter(item => item !== post)
        setPosts(filteredArray);
    }

    const updatePost = (post: Post) => {
        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    return post;
                } else {
                    return item;
                }
            })
        )
    }


    const updateEmoticon = (arg: String, post: Post) => {

        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    switch (arg) {
                        case 'like':
                            item.like = item.like + 1
                            item.is_like = 1
                            break;

                        case 'unlike':
                            item.like = item.like - 1
                            item.is_like = 0
                            break;

                        case 'heart':
                            item.heart = item.heart + 1
                            item.is_heart = 1
                            break;

                        case 'unheart':
                            item.heart = item.heart - 1
                            item.is_heart = 0
                            break;

                        case 'clap':
                            item.clap = item.clap + 1
                            item.is_clap = 1
                            break;

                        case 'unclap':
                            item.clap = item.clap - 1
                            item.is_clap = 0
                            break;

                        case 'laugh':
                            item.laugh = item.laugh + 1
                            item.is_laugh = 1
                            break;

                        case 'unlaugh':
                            item.laugh = item.laugh - 1
                            item.is_laugh = 0
                            break;

                        default:
                            break;
                    }
                    return item;
                } else {
                    return item;
                }
            }));

    }

    const addComment = (comment: Comment, post: Post) => {

        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    item.comments.push(comment);
                    return item;
                } else {
                    return item;
                }
            }));

    }


    const destroyComment = (comment: Comment, post: Post) => {

        setPosts(
            posts.map((item) => {

                if (item.id == post.id) {

                    for (let index = 0; index < item.comments.length; index++) {
                        const element = item.comments[index];

                        if (element.id == comment.id) {
                            item.comments.splice(index, 1);
                        }
                    }

                    return item;
                } else {
                    return item;
                }
            }));

    }
    const removePhoto = (photo: any, post: Post) => {

        setPosts(
            posts.map((item) => {

                if (item.id == post.id) {

                    item.medias = item.medias.filter((media) => media.url != photo.url)

                    return item;
                } else {
                    return item;
                }
            }));

    }


    const updateComment = (comment: Comment, post: Post) => {

        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {

                    for (let index = 0; index < item.comments.length; index++) {
                        const element = item.comments[index];
                        if (element.id == comment.id) {
                            item.comments[index].description = comment.description
                            item.comments[index].is_edited = comment.is_edited
                        }
                    }

                    return item;
                } else {
                    return item;
                }
            }));

    }

    useEffect(() => {
        loadProfile()


        // console.log("isMenuOpen", isMenuOpen)
        // document.body.addEventListener("click", handleOutsideClick);

        // return () => {
        //     document.body.removeEventListener("click", handleOutsideClick);
        // };
    }, []);
    const [coverPhoto, setCoverPhoto] = useState<string | null | undefined>(null);

    // const handleClickOutside = (event: any) => {
    //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //     setIsMenuOpen(false);
    //   }
    // };

    // useEffect(() => {
    //   window.addEventListener('click', handleClickOutside);
    //   return () => {
    //     window.removeEventListener('click', handleClickOutside);
    //   };
    // }, []);

    return (
        <div className="">
            <div
                className={cn(
                    'relative w-full h-[300px] overflow-visible',
                    coverPhoto ? `bg-cover bg-center` : ''
                )}
                style={{
                    backgroundImage: coverPhoto ? `url(${coverPhoto})` : '',
                    backgroundColor: coverPhoto ? '' : 'black',
                }}
            >
            </div>
            <div className="flex flex-row">
                <LeftSidebar onStateChange={true} userid={''} username={params.username} />
                <div className="flex-1 xl:p-20 xl:pr-40 sm:p-10 p-4 w-full mainBody">
                    <div className="flex flex-col w-full gap-5">
                        <h3 className="text-2xl font-bold text-black font-poppins">About</h3>
                        <p className="text-[#7D7D7D] font-medium font-sans text-base">

                            {profile && profile.description
                                ? profile.description
                                : 'We are Perfect Resume, a reputable and reasonably priced writing service established in Dubai and five other major cities. We are here to provide resume writing services in Qatar and globally for the people who wanted to create resumes. Please allow us to review your resume so that we can advise whether a cover lette.'}
                        </p>

                        <section className="grid grid-cols-10 gap-2 mt-4 relative">

                            {isMax ?
                                <div className='absolute p-2 bg-white top-40 right-20 rounded-full z-40'>
                                    <Avatar className='w-[100px] h-[100px] hover:cursor-pointer' >
                                        <AvatarImage src={profile && profile.avatar} />
                                    </Avatar>
                                    <div className='flex justify-center items-center p-1 bg-white shadow-lg w-[20px] h-[20px] absolute top-[15px] right-[5px]  rounded-full'>
                                        <img src='/images/home/cross_1.svg' alt='' onClick={() => {
                                            setMax(false)
                                            setOpen(false)
                                        }} />
                                    </div>
                                    <div className='flex justify-center items-center p-1 bg-white shadow-lg w-[25px] h-[25px] absolute top-[-10px] right-[25px]  rounded-full'>
                                        <img src='/images/home/max.svg' onClick={() => {
                                            setOpen(true)
                                            setMax(false)
                                        }} />
                                    </div>
                                </div>
                                : ''}
                            <Popover placement="right-start" open={open} handler={setOpen} >
                                <PopoverHandler >
                                    <div className="sm:col-span-3 col-span-5 text-black bg-white whitespace-nowrap rounded-lg font-bold flex relative items-center justify-center hover:cursor-pointer">
                                        Send Message
                                    </div>
                                </PopoverHandler>
                                <PopoverContent >
                                    <div className='flex flex-row w-full h-[50px] justify-between items-center pr-3 pl-3'>
                                        <div className='font-poppins text-xl font-semibold text-black'>{profile && profile.name}</div>
                                        <div className='flex flex-row gap-5'>
                                            <img src='/images/home/min.svg' className='w-[20px] h-[20px]' alt='' onClick={() => {
                                                setOpen(false)
                                                setMax(true)
                                            }} />
                                            <img src='/images/home/cross_1.svg' className='w-[20px] h-[20px]' alt='' onClick={() => navigate('/inbox')} />
                                        </div>
                                    </div>
                                    <div className='flex-1 flex flex-col w-[30vw] min-w-[350px] justify-between p-5 max-h-[500px] bg-white overflow-hidden'>
                                        <div className='flex-1 flex flex-col gap-4 overflow-y-auto' ref={commentListRef}>
                                            {messages && messages.map((comment, i) => {
                                                if (user) {

                                                    if (comment.user_id === user.id) {
                                                        return (<div className='flex justify-end' key={i}>
                                                            <div className='flex flex-row rounded-s-2xl rounded-tl-3xl rounded-bl-3xl rounded-tr-2xl bg-black items-center py-2 px-4'>
                                                                {comment.audio !== '' ? <Waveform src={comment.audio} /> : <p className='break-all font-poppins font-normal text-sm text-white' dangerouslySetInnerHTML={{ __html: comment.description }} />}
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
                                                                {comment.audio !== '' ? <WaveRight src={comment.audio} /> : <p className='break-all font-poppins font-normal text-sm text-whtie' dangerouslySetInnerHTML={{ __html: comment.description }} />}
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
                            {(profile && user && ((!profile.is_to && !profile.is_from) || (profile.is_sent_status == 0 && profile.is_received_status == 0))) && (
                                <Button className="sm:col-span-3 col-span-5 text-black bg-white whitespace-nowrap" onClick={connectFriend}>
                                    Connect
                                </Button>
                            )
                            }

                            {(profile && user && profile.is_to == user.id && profile.is_received_status == 0) && (
                                <>
                                    <Button className="sm:col-span-3 col-span-5 text-black bg-white whitespace-nowrap" onClick={() => changeStatus(1)}>
                                        Accept
                                    </Button>
                                    <Button className="sm:col-span-3 col-span-5 text-black bg-white whitespace-nowrap" onClick={() => changeStatus(2)}>
                                        Cancel
                                    </Button>
                                </>
                            )
                            }

                            {(profile && user && profile.is_from && profile.is_from == user.id && (profile.is_received_status == 0 || profile.is_sent_status == 0)) && (
                                <>
                                    <Button className="sm:col-span-3 col-span-5 text-black bg-white whitespace-nowrap" onClick={cancelFriend}>
                                        Cancel Connect
                                    </Button>
                                </>
                            )
                            }

                            <Button className="sm:col-span-3 col-span-5 text-black bg-white whitespace-nowrap">
                                Send Gift

                            </Button>
                            <Button className="sm:col-span-1 col-span-5 p-0 text-lg text-black bg-white" onClick={handleMenuClick}>
                                <BiDotsVerticalRounded />
                            </Button>
                            {isMenuOpen > 0 && (
                                <div ref={modalRef} className="absolute right-4 z-10 w-52 mt-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                                    <div className="py-1">
                                        <a href={"/profile/report/" + profile.id} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-montserrat font-bold" onClick={handleMenuItemClick}>Report</a>
                                        <a href={"/profile/block/" + profile.id} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-montserrat font-bold" onClick={handleMenuItemClick}>Block</a>
                                    </div>
                                </div>
                            )}
                        </section>

                        <section className="bg-white rounded-[9px] mt-6 sm:p-4 px-2 py-4">
                            <div className="rounded-[9px] flex gap-5 px-[13px] justify-between">
                                <div className="flex gap-2">
                                    <span className="text-2xl">
                                        <BsBriefcaseFill />
                                    </span>
                                    <h6 className="text-base font-medium text-black font-poppins">
                                        Work
                                    </h6>
                                </div>
                                <p className="text-right">
                                    {profile && profile.experience
                                        ? profile.experience?.position
                                        : 'No experience'}
                                </p>
                            </div>
                            <div className="rounded-[9px] flex gap-5 px-[13px] justify-between mt-5">
                                <div className="flex gap-2">
                                    <span className="text-2xl">
                                        <FaGraduationCap />
                                    </span>
                                    <h6 className="text-base font-medium text-black font-poppins">
                                        Education
                                    </h6>
                                </div>
                                <p className="text-right">
                                    {profile && profile.education
                                        ? profile.education?.university
                                        : 'No education'}
                                </p>
                            </div>
                            <div className="rounded-[9px] flex gap-5 px-[13px] justify-between mt-5">
                                <div className="flex gap-2">
                                    <span className="text-2xl">
                                        <FaLocationDot />
                                    </span>
                                    <h6 className="text-base font-medium text-black font-poppins">
                                        Country
                                    </h6>
                                </div>
                                {profile && <p className="text-right">{profile.country}</p>}
                            </div>
                        </section>

                        <h5 className="mt-6 text-base font-bold">Interests</h5>
                        <section className="w-full p-4 mt-2 bg-white rounded-lg">
                            <div className="flex flex-wrap items-center gap-2 p-2">
                                {profile?.interests?.map((val) => (
                                    <Chip key={val} value={val} className="px-4 py-2 rounded-full" />
                                ))}
                            </div>
                        </section>

                        <section className="w-full p-4 mt-6 bg-white rounded-lg">
                            <h5 className="text-base font-bold">
                                Received Gifts <b className='font-poppins'>23</b>
                            </h5>
                            <div className='grid grid-cols-12 gap-4 mt-4'>
                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <img src='/images/gifts/1.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                                        <h6 className='text-base font-semibold'>
                                            Child
                                        </h6>
                                        <div className='flex gap-1'>
                                            <img src='/images/money.svg' width={16} height={16} />
                                            <p className='text-xs text-[#545454'>12</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <img src='/images/gifts/2.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                                        <h6 className='text-base font-semibold'>
                                            Crown
                                        </h6>
                                        <div className='flex gap-1'>
                                            <img src='/images/money.svg' width={16} height={16} />
                                            <p className='text-xs text-[#545454'>124</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <img src='/images/gifts/3.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                                        <h6 className='text-base font-semibold'>
                                            Cake
                                        </h6>
                                        <div className='flex gap-1'>
                                            <img src='/images/money.svg' width={16} height={16} />
                                            <p className='text-xs text-[#545454'>102</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <img src='/images/gifts/4.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                                        <h6 className='text-base font-semibold'>
                                            Orange
                                        </h6>
                                        <div className='flex gap-1'>
                                            <img src='/images/money.svg' width={16} height={16} />
                                            <p className='text-xs text-[#545454'>16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {posts.map((post: Post, i: number) => (
                            <PostCard
                                key={`post-${i}`}
                                item={post}
                                currentUser={user}
                                removePost={removePost}
                                updatePost={updatePost}
                                addComment={addComment}
                                updateComment={updateComment}
                                destroyComment={destroyComment}
                                updateEmoticon={updateEmoticon}
                                removePhoto={removePhoto}
                                profile={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
