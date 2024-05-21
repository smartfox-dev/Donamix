import React, {useState, useEffect} from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VideoFooter from '@/components/custom/home/VideoFooter';
import Button from '@/components/common/Button';
import { getVideo, videoDelete } from '@/api/video';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import { Comment } from '@/lib/validation/comment';
import { Video } from '@/lib/validation/video';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
import CONSTANTS from '@/config/constants';
import EditVideo from '@/components/custom/home/EditVideo';
import YouTube from 'react-youtube';

export default function index() {
    const [videos, setVideo] = useState([]);
    const [fivevideos, setFiveVideo] = useState([]);
    const {user} = useAuthContext();
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setcurrentItem] = useState({});
    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false)
    const [link, setLink] = useState('');
    const [isLoading, setLoading] = useState(false);

    const opts = {
        height: '350',
        outerWidth: '300',
        playerVars: {
            autoplay: 0,
        },
    };

    const addComment = (comment: Comment, post: Video) => {

        setVideo(
            videos.map((item) => {
                if (item.id === post.id) {
                    item.comments.push(comment);
                    return item;
                } else {
                    return item;
                }
            }));

    }

    const updateComment = (comment: Comment, post: Video) => {

        setVideo(
            videos.map((item) => {
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

    const destroyComment = (comment: Comment, post: Video) => {

        setVideo(
            videos.map((item) => {

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

    const updateEmoticon = (arg: String, post: Video) => {

        setVideo(
            videos.map((item) => {
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

    const removeVideo = (video: Video) => {
        let filterArray = videos.filter(item => item !== video);
        setVideo(filterArray);
    }

    const onEditVideo = (item: Video) => {
        setIsAddPostOpen(true);
        setcurrentItem(item)
    }

    const onCloseAddVideo = () => {
        setIsAddPostOpen(false);
    }

    const saveEditedItem = (item: Video) => {
        console.log(item)
        window.location.reload()
        setVideo(
            videos.map((video) => {
                if (video.id === item.id) {
                    return item;
                } else {
                    return video;
                }
            })
        )
    }

    const removePhoto = (photo: any, video: Video) => {

        setVideo(
            videos.map((item) => {

                if (item.id == video.id) {

                    return item;
                } else {
                    return item;
                }
            }));

    }

    const load = () => {
        getVideo()
            .then((res: any) => {
                setVideo(res);
            })
            .catch((err) => {
                toast.error('Failed!')
            })
    }

    useEffect(() => {
        load()
    }, []);

    return (
        <div className="sm:flex-1 flex-col bg-dashboard-background w-full mainBody">
            <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
                <div className="rounded-t-full">
                    <img src="/images/home/home.png" className="w-full h-auto" alt="" />
                </div>
                {isLoading ? videos.map((item, i) => (
                    <Card className="flex flex-col w-full h-auto rounded-t-3xl rounded-b-none p-5 gap-2 justify-between" key={i}>
                        <div className="px-2 flex flex-row items-center gap-3 w-full">
                            <Avatar className="w-[65px] h-[65px]">
                                <AvatarImage src={item.avatar} alt="" />
                            </Avatar>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col">
                                    <div className="font-montserrat font-bold text-[14px]">{item.name}</div>
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="font-montserrat font-bold text-sm text-[#9F9F9F]">{item.time_ago}</div>
                                    </div>
                                </div>
                                <Popover placement="bottom-end">
                                    <PopoverHandler>
                                        <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                                            <img src="/images/home/Frame3dots.png" className="w-auto h-auto" alt="" />
                                        </div>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <div className="flex flex-col w-[253px] gap-4 pt-3">
                                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                                                <img src="/images/home/Edit.png" alt="" />
                                                <div className="font-montserrat font-medium text-base text-black" onClick={() => onEditVideo(item)}>Edit Post</div>
                                            </div>
                                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                                                <img src="/images/home/dustbin.png" alt="" />
                                                <div className="font-montserrat font-medium text-base text-black"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                    }}>
                                                    Delete Post</div>
                                            </div>
                                        </div>
                                        {showModal && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                                    <p>Do you really want to delete this post?</p>
                                                    <div className="flex justify-end mt-4">
                                                        <button
                                                            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                                            onClick={() => {
                                                                setShowModal(false);
                                                            }}
                                                        >
                                                            No
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                                            onClick={() => {
                                                                setShowModal(false);
                                                                videoDelete({'id': item.id})
                                                                    .then((res: any) => {
                                                                        if (res === CONSTANTS.SUCCESS) {
                                                                            removeVideo(item)
                                                                            toast.success(res);
                                                                        } else {
                                                                            toast.error(res);
                                                                        }
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log('Delete Error:', err);
                                                                    });
                                                            }}
                                                        >
                                                            Yes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </PopoverContent>

                                </Popover>
                                <EditVideo
                                    open={isAddPostOpen}
                                    onClose={onCloseAddVideo}
                                    currentItem={currentItem}
                                    saveEditedItem={saveEditedItem}
                                    user={user}
                                    destroyPhoto={(arg: any) => {
                                        removePhoto(arg, item)
                                    }}
                                />
                            </div>
                        </div>
                        {item.video_link && (
                            <div className="relative w-full pt-[56.25%] overflow-hidden">
                                <YouTube
                                    videoId={item.video_link}
                                    iframeClassName='absolute top-0 left-0 w-[100%] h-[100%] allowfullscreen'
                                    className='w-full h-auto'
                                    opts={opts}
                                    onReady={(event) => {
                                        // access to player in all event handlers via event.target
                                        event.target.pauseVideo();
                                    }}
                                />
                            </div>
                        )}
                        <VideoFooter
                            post={item}
                            user={user}
                            appendComment={(comment: Comment) => {
                                addComment(comment, item)
                            }}
                            editComment={(comment: Comment) => {
                                updateComment(comment, item)
                            }}
                            removeComment={(comment: Comment) => {
                                destroyComment(comment, item)
                            }}
                            addEmoticon={(arg: String) => {
                                updateEmoticon(arg, item)
                            }} />
                    </Card>
                )): videos.slice(0 ,5).map((item, i) => (
                    <Card className="flex flex-col w-full h-auto rounded-t-3xl rounded-b-none p-5 gap-2 justify-between" key={i}>
                        <div className="px-2 flex flex-row items-center gap-3 w-full">
                            <Avatar className="w-[65px] h-[65px]">
                                <AvatarImage src={item.avatar} alt="" />
                            </Avatar>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col">
                                    <div className="font-montserrat font-bold text-[14px]">{item.name}</div>
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="font-montserrat font-bold text-sm text-[#9F9F9F]">{item.time_ago}</div>
                                    </div>
                                </div>
                                <Popover placement="bottom-end">
                                    <PopoverHandler>
                                        <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                                            <img src="/images/home/Frame3dots.png" className="w-auto h-auto" alt="" />
                                        </div>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <div className="flex flex-col w-[253px] gap-4 pt-3">
                                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                                                <img src="/images/home/Edit.png" alt="" />
                                                <div className="font-montserrat font-medium text-base text-black" onClick={() => onEditVideo(item)}>Edit Post</div>
                                            </div>
                                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                                                <img src="/images/home/dustbin.png" alt="" />
                                                <div className="font-montserrat font-medium text-base text-black"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                    }}>
                                                    Delete Post</div>
                                            </div>
                                        </div>
                                        {showModal && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                                    <p>Do you really want to delete this post?</p>
                                                    <div className="flex justify-end mt-4">
                                                        <button
                                                            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                                            onClick={() => {
                                                                setShowModal(false);
                                                            }}
                                                        >
                                                            No
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                                            onClick={() => {
                                                                setShowModal(false);
                                                                videoDelete({'id': item.id})
                                                                    .then((res: any) => {
                                                                        if (res === CONSTANTS.SUCCESS) {
                                                                            removeVideo(item)
                                                                            toast.success(res);
                                                                        } else {
                                                                            toast.error(res);
                                                                        }
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log('Delete Error:', err);
                                                                    });
                                                            }}
                                                        >
                                                            Yes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </PopoverContent>

                                </Popover>
                                <EditVideo
                                    open={isAddPostOpen}
                                    onClose={onCloseAddVideo}
                                    currentItem={currentItem}
                                    saveEditedItem={saveEditedItem}
                                    user={user}
                                    destroyPhoto={(arg: any) => {
                                        removePhoto(arg, item)
                                    }}
                                />
                            </div>
                        </div>
                        {item.video_link && (
                            <div className="relative w-full pt-[56.25%] overflow-hidden">
                                <YouTube
                                    videoId={item.video_link}
                                    iframeClassName='absolute top-0 left-0 w-[100%] h-[100%] allowfullscreen'
                                    className='w-full h-auto'
                                    opts={opts}
                                    onReady={(event) => {
                                        // access to player in all event handlers via event.target
                                        event.target.pauseVideo();
                                    }}
                                />
                            </div>
                        )}
                        <VideoFooter
                            post={item}
                            user={user}
                            appendComment={(comment: Comment) => {
                                addComment(comment, item)
                            }}
                            editComment={(comment: Comment) => {
                                updateComment(comment, item)
                            }}
                            removeComment={(comment: Comment) => {
                                destroyComment(comment, item)
                            }}
                            addEmoticon={(arg: String) => {
                                updateEmoticon(arg, item)
                            }} />
                    </Card>
                ))}
                <div className="flex justify-center">
                    {videos.length >= 6 && <Button
                        className="mt-3 rounded-full"
                        onClick={()=>{setLoading(true)}}
                    >
                        Load More
                    </Button>}

                </div>
            </div>
        </div>
    )
}
