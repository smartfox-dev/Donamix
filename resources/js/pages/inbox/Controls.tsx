import React, { useEffect, useState } from "react";
import { AgoraRTCProvider, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish, useRTCClient, useRemoteAudioTracks, useRemoteUsers, RemoteUser, LocalVideoTrack, useTrackEvent, useConnectionState, RemoteVideoTrack, useRemoteVideoTracks, LocalAudioTrack, RemoteAudioTrack } from "agora-rtc-react";

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
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const [play, setPlay] = useState(false)
    const remoteUsers = useRemoteUsers();
    console.log(remoteUsers)
    usePublish([localMicrophoneTrack, localCameraTrack]);
    // console.log(token)
    useJoin({
        appid: AppID,
        channel: channelName,
        token: token === "" ? null : token,
    });

    const connection = useConnectionState()
    console.log('state: ', connection)
    const handleClose = () => {
        onClose();
        localCameraTrack.close()
        localCameraTrack.stop()
        localCameraTrack.setEnabled(false)

        localMicrophoneTrack.setEnabled(false)
        localMicrophoneTrack.close()
        localMicrophoneTrack.stop()

        client.unpublish([localMicrophoneTrack, localCameraTrack])

        usePublish([localMicrophoneTrack, localCameraTrack], false);
    }

    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    const {videoTracks} = useRemoteVideoTracks(remoteUsers)
    audioTracks.map((track) => track.play());

    const deviceLoading = isLoadingMic || isLoadingCam;
    if (deviceLoading) return <div style={styles.grid}>Loading devices...</div>;

    return (
        <div className="w-full h-[200px] flex flex-col justify-center items-center gap-2">
            <LocalAudioTrack track={localMicrophoneTrack} play={true}  />
            {/* Remote videos here */}
                {remoteUsers.map((user, i) => (
                        <RemoteAudioTrack play={true} track={audioTracks[i]} />
                ))}
            <button className="h-[30px]" onClick={() => {handleClose()}}>End Call</button>
        </div>
    );
};
export default Controls;
