import React, { useRef, useState, useEffect } from 'react';
import WaveSurfer from 'react-wavesurfer';
// import 'wavesurfer.js/dist/wavesurfer.css';
import { IoIosSettings, IoMdPlay, IoIosPause, IoIosCloseCircle } from 'react-icons/io'

const Waveform = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveformReady, setWaveformReady] = useState(false);
    const audioRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [audio, setAudio] = useState(null);

    // useEffect(() => {
    //     if (wavesurferRef.current) {
    //         wavesurferRef.current.load(audioRef.current);
    //     }
    // }, []);

    const handlePlayPause = () => {
        const audioElement = audioRef.current;

        if (!isPlaying) {
            audioElement.play();
            setIsPlaying(true);
        } else {
            audioElement.pause();
            setIsPlaying(false);
        }
    };

    const handleWaveformReady = () => {
        setWaveformReady(true);
    };

    useEffect(() => {
        setAudio(src)
        // console.log(src)
    }, [src])

    return (
        <div className='w-[200px] relative'>
            <button onClick={handlePlayPause} className='absolute top-2 right-0'>
                {isPlaying ? <div className='relative'>
                    <div className='w-[34px] h-[34px] rounded-full bg-white' />
                    <IoIosPause className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                </div> : <div className='relative hover:cursor-pointer'>
                    <div className='w-[34px] h-[34px] rounded-full bg-white' />
                    <IoMdPlay className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                </div>}
            </button>
            {src && (
            <div className='mr-10'>
                <WaveSurfer
                    audioFile={src}
                    // onReady={handleWaveformReady}
                    options={{
                        barWidth: 2,
                        cursorWidth: 2,
                        height: 50,
                        waveColor: 'gray',
                        progressColor: 'orange',
                    }}
                    playing={isPlaying}
                // ref={wavesurferRef}
                />
            </div>
            )}
            <audio ref={audioRef} src={src} controls style={{ display: 'none' }}></audio>
        </div>
    );
};

export default Waveform;

