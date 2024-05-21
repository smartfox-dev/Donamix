import React, { useState, useEffect, useCallback, useRef } from "react";
import { AgoraRTCProvider, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish, useRTCClient, useRemoteAudioTracks, useRemoteUsers, RemoteUser, LocalVideoTrack } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { User } from "@/lib/validation/user";
import "./style.css";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogHeader from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import CONSTANTS from "@/config/constants";
import toast from "react-hot-toast";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAuthContext } from "@/context/AuthContext";
import { FcEndCall } from "react-icons/fc";
import useAgora from "./Hook";
import Controls from "./Controls";
import WebDashboard from "./WebDashboard";
import ReactDOM from "react-dom";
import { domainToASCII } from "url";


const apiUrl = import.meta.env.VITE_BACKEND_API as string;

interface IVideoCallProps {
    open: boolean;
    onClose: () => void;
    allUsers: User[];
    authUser: string;
    authUserId: number;
    agoraId: string;
    start?: any;
}

const VideoCall: React.FC<IVideoCallProps> = ({
    open,
    onClose,
    start,
    allUsers,
    authUser,
    authUserId,
    agoraId,
}) => {
    // const channelName = "video";
    const [token, setToken] = useState('')
    const [allow, setAllow] = useState(false)
    const { user } = useAuthContext()
    const [name, setName] = useState('')
    const [item, setItem] = useState(null)
    const client = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
    const [channelName, setChannelName] = useState("test");
    const [AppID, setAppID] = useState("e5d2917dfd7c4078bc6d4f8eddb1a5ca");
    const [inCall, setInCall] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
    const [isShow, setShow] = useState(false)
    let count = 0


    useEffect(() => {
        axios.post(`${apiUrl}/chat/token`, { 'channelName': channelName })
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    setToken(res.data.data)
                }
                else {
                    toast.error('Failed!')
                }
            })
            .catch((err) => toast.error('Failed'))
    }, [])

    const onMessageReceive = useCallback((data) => {
        setName(data.message[1])
        if (user.id === data.message[0].userToCall) {
            setAllow(true)
            setItem(data.message[0])
        }
        console.log("---------")
    }, [user])

    const onAcceptReceive = useCallback((data) => {
        console.log(data, start, '-------------')
        if (start != undefined) {
            if (data.message[0].from == start.id) {
                if (data.message[0].is_accept == 1) {
                    setShow(true)
                }
                else {
                    toast.error(start.name + ' declined call request!')
                }
            }
        }
    }, [])

    useEffect(() => {
        const pusher = new Pusher('e1d8debb6b5791133889', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('call', onMessageReceive)
        const channel_accept = pusher.subscribe('chat');
        channel_accept.bind('accept', onAcceptReceive)

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            channel_accept.unbind_all();
            channel_accept.unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (start == undefined) {
            setShow(true)
        }
    }, [start])

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth} >
                <DialogHeader>
                    {isShow &&
                        <img src='/images/home/cross_1.svg' className="cursor-pointer" alt='' onClick={() => {
                            onClose()
                            axios.get(`${apiUrl}/chat/camoff`)
                                .then((res) => {
                                    console.log(res)
                                })
                                .catch((err) => console.log(err))
                        }} />
                    }
                </DialogHeader>
                <DialogContent className="">
                    {isShow ? (<AgoraRTCProvider client={client}>
                        {token !== '' && <><Controls channelName={channelName} AppID={AppID} token={token} client={client} onClose={onClose} />
                        </>}
                    </AgoraRTCProvider>) : (
                        <>
                            <div className="flex flex-col justify-center items-center">
                                <span className="mb-5">Your request has been sent to view {start && start.name} camera.</span>
                            </div>
                            <div className="flex flex-col w-full justify-center items-center">
                                <button
                                    className="px-4 py-2 mt-5 text-white bg-green-500 rounded-lg"
                                    onClick={() => {
                                        onClose()
                                    }}
                                >
                                    OK
                                </button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
            <Dialog open={allow} onClose={() => setAllow(false)}  >
                {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
                <DialogContent className="">
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                        <div className="relative z-10 p-4 bg-white rounded-lg">
                            <span><b>{name}</b> want to view your cam</span>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                    onClick={() => {
                                        setAllow(false);
                                    }}
                                >
                                    Decline
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                    onClick={() => {
                                        setAllow(false)
                                        // setShow(true)
                                        axios.post(`${apiUrl}/chat/call-accept`, { 'channel_name': "test", 'user_to_call': item.from, 'is_accept': 1 })
                                            .then((res) => {
                                                console.log('success')
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
        </>
    );
};

export default VideoCall;
