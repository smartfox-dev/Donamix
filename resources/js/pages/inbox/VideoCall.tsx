import React, { useState, useEffect, useCallback, useRef } from "react";
import { AgoraRTCProvider, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish, useRTCClient, useRemoteAudioTracks, useRemoteUsers, RemoteUser, LocalVideoTrack } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { User } from "@/lib/validation/user";
// import "./style.css";
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
import useAgora from "@/pages/chatroom/Hook";
import Controls from "@/pages/chatroom/Controls";
import WebDashboard from "@/pages/chatroom/WebDashboard";
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
    const {user} = useAuthContext()
    const [name, setName] = useState('')
    const [item, setItem] = useState(null)
    const client = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
    const [channelName, setChannelName] = useState("call-video");
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
        if(user.id === data.message[0].from || user.id === data.message[0].to) {
            if(data.message[0].is_accept === 1) {
                setShow(true)
            }
            else {
                if(user.id === data.message[0].from){
                    setShow(false)
                    toast.error('Your call has been declined!')
                    onClose()
                }
            }
        }
    }, [])


    useEffect(() => {
        const pusher = new Pusher('e1d8debb6b5791133889', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('video-accept', onMessageReceive)
        // const channel_accept = pusher.subscribe('chat');
        // channel_accept.bind('accept', onAcceptReceive)

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [])


    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}  >
                <DialogHeader>
                    <img src='/images/home/cross_1.svg' className="cursor-pointer" alt='' onClick={() => {
                        onClose()
                    }} />
                </DialogHeader>
                <DialogContent className="">
                    <Card className="flex flex-col w-full h-auto rounded-2xl py-5 px-5 justify-between items-center border-none">
                        {isShow ? <AgoraRTCProvider client={client}>
                            {token !== '' && <><Controls channelName={channelName} isShow={isShow} AppID={AppID} token={token} client={client} onClose={onClose} />
                            </>}
                        </AgoraRTCProvider>: <span>Calling...</span>}

                    </Card>
                </DialogContent>
            </Dialog>

        </>
    );
};

export default VideoCall;
