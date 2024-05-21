import React, { useEffect, useState } from "react";
import useAgora from "./Hook";
import { AgoraRTCProvider, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish, useRTCClient, useRemoteAudioTracks, useRemoteUsers, RemoteUser, LocalVideoTrack, useTrackEvent, useConnectionState, RemoteVideoTrack, useRemoteVideoTracks,LocalUser, useClientEvent } from "agora-rtc-react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

const returnGrid = (remoteUsers) => {
    return {
        gridTemplateColumns:
            remoteUsers.length > 8
                ? unit.repeat(4)
                : remoteUsers.length > 3
                    ? unit.repeat(3)
                    : remoteUsers.length > 0
                        ? unit.repeat(2)
                        : unit,
    };
};
const unit = "minmax(0, 1fr) ";
const styles = {
    grid: {
        width: "300px",
        height: "300px",
        display: "grid",
    },
    gridCell: { height: "100%", width: "100%" },
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
    },
};

const Controls = (props) => {
    const { AppID, channelName, token, client, onClose } = props;
    const [play, setPlay] = useState(false)
    useJoin({
        appid: AppID,
        channel: channelName,
        token: token === "" ? null : token,
    });
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    usePublish([localMicrophoneTrack, localCameraTrack]);
    // console.log(token)
    const remoteUsers = useRemoteUsers();
    console.log(remoteUsers)

    const connection = useConnectionState()
    console.log('state: ', connection)
    // useClientEvent(client, 'connection-state-change', () => {
    //     if(useConnectionState() == "DISCONNECTED") {
    //         console.log('state------: ', connection)
    //         usePublish([localMicrophoneTrack, localCameraTrack]);
    //         // console.log(token)
    //         useJoin({
    //             appid: AppID,
    //             channel: channelName,
    //             token: token === "" ? null : token,
    //         });
    //     }
    // })



    const handleClose = () => {
        onClose();
        localCameraTrack.close()
        localCameraTrack.stop()
        localCameraTrack.setEnabled(false)
        localMicrophoneTrack.setEnabled(false)
        localMicrophoneTrack.close()
        localMicrophoneTrack.stop()

        axios.get(`${apiUrl}/chat/camoff`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))

        client.unpublish([localMicrophoneTrack, localCameraTrack])

        usePublish([localMicrophoneTrack, localCameraTrack], false);
    }

    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    const { videoTracks } = useRemoteVideoTracks(remoteUsers)
    audioTracks.map((track) => track.play());

    const deviceLoading = isLoadingMic || isLoadingCam;
    if (deviceLoading) return <div style={styles.grid}>Loading devices...</div>;

    return (
        <div className="w-full h-[500px] flex flex-col justify-center items-center gap-2">
            <LocalUser videoTrack={localCameraTrack} audioTrack={localMicrophoneTrack} cameraOn={true} micOn={true} playAudio={true} playVideo={true} style={styles.gridCell} />
            {/* Remote videos here */}
                {remoteUsers.map((user, i) => (
                    <RemoteUser user={user} style={styles.gridCell} key={i} />
                        // {/* <RemoteVideoTrack play={true} track={videoTracks[i]} /> */}
                    // </RemoteUser>
                ))}
            <button className="h-[30px]" onClick={() => {handleClose()}}>End Call</button>
        </div>
    );
};
export default Controls;
