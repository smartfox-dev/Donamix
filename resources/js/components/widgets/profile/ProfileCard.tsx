import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import { Post } from '@/lib/validation/post';
import { Comment } from '@/lib/validation/comment';
import { User } from '@/lib/validation/user';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useBlogContext } from '@/context/BlogContext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Button from '@/components/common/Button'
import { deletePost } from '@/api/post';
import CONSTANTS from '@/config/constants';
import { toast } from 'react-hot-toast';
import EditPost from '@/components/custom/home/EditPost';
import Carousel from 'react-multi-carousel';
import CustomLeftArrow from '@/components/custom/CustomLeftArrow';
import CustomRightArrow from '@/components/custom/CustomRightArrow';
import { AiFillPlayCircle } from "react-icons/ai";
import ImageModal from "./ImageModal";

import YouTube from 'react-youtube';


import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
import { updateBlog } from '@/api/blog';

dayjs.extend(relativeTime);

interface IPostCardProps {
    item: Post;
    currentUser: User;
    removePost: (arg: Post) => void
    updatePost: (arg: Post) => void
    addComment: (cmt: Comment, post: Post) => void,
    updateComment: (cmt: Comment, post: Post) => void,
    destroyComment: (cmt: Comment, post: Post) => void,
    updateEmoticon: (arg: String, post: Post) => void
    removePhoto: (arg: any, post: Post) => void
}

const ProfileCard: React.FC<IPostCardProps> = ({
    item,
    currentUser,
    removePost,
    updatePost,
    addComment,
    updateComment,
    destroyComment,
    updateEmoticon,
    removePhoto,
}) => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/profile/' + item.username);
    }
    const { categories } = useBlogContext();
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setcurrentItem] = useState({});
    // const [urlLink, seturlLink] = useState<string>('');

    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false)
    const [commentCards, setcommentCards] = useState<Comment[]>([]);
    const [videoPlay, setVideoPlay] = useState(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImageIndex, setSeletedImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setSeletedImageIndex(index);
        setImageModalOpen(true);
    };

    const opts = {
        height: '350',
        outerWidth: '300',
        playerVars: {
            autoplay: 0,
        },
    };


    useEffect(() => {
        if (item) {
            setcommentCards(item.comments);
        }

        // seturlLink(getIdYoutube(item))

    }, [item]);



    // const getIdYoutube = ((item) => {
    //   var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    //   var match = item.description.match(regExp);
    //   let id = (match&&match[7].length==11)? match[7] : '';
    //   return id;
    // })

    const openImageModal = () => {
        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        setImageModalOpen(false);
    };

    const handlePlay = () => {
        setVideoPlay(true)
    }


    const onEditPost = (item: Post) => {
        setIsAddPostOpen(true);
        setcurrentItem(item)
    }
    const onCloseAddPost = () => {
        setIsAddPostOpen(false);
    }


    const appendComment = (comment: Comment) => {
        addComment(comment, item)
    }

    const editComment = (comment: Comment) => {
        updateComment(comment, item)
    }

    const removeComment = (comment: Comment) => {
        destroyComment(comment, item)
    }

    const destroyPhoto = (arg: any) => {
        removePhoto(arg, item)
    }

    const addEmoticon = (arg: String) => {
        updateEmoticon(arg, item)
    }


    const saveEditedItem = (item: Post) => {
        updatePost(item)
    }


    const [isExpanded, setIsExpanded] = useState(false);
    const [isTextOverflowed, setIsTextOverflowed] = useState(true);

    useEffect(() => {
        const textElement = document.getElementById(`expandable-text-${item.id}`);
        const buttonElement = document.getElementById(`see-more-btn-${item.id}`);

        const handleButtonClick = () => {
            setIsExpanded(!isExpanded);
        };

        if (textElement && buttonElement) {
            const isOverflowed = textElement.scrollHeight > 120;
            setIsTextOverflowed(isOverflowed);

            if (isExpanded) {
                textElement.classList.remove("line-clamp-6");
                buttonElement.textContent = "See less";
            } else {
                textElement.classList.add("line-clamp-6");
                buttonElement.textContent = "See more";
            }

            buttonElement.addEventListener('click', handleButtonClick);
        }
        // Cleanup the event listener when the component unmounts
        return () => {
            if (buttonElement) {
                buttonElement.removeEventListener('click', handleButtonClick);
            }
        };
    }, [isExpanded, item.id]);

    // Check if the text overflows and show the "See more" button accordingly



    return (
        <Card className="flex flex-col w-full h-auto rounded-t-3xl rounded-b-none p-5 gap-4 justify-between">
            <div className="flex flex-col gap-2">
                <div className="px-2 flex flex-row items-center gap-3 w-full">
                    <Avatar className="w-[65px] h-[65px]" onClick={handleOnClick}>
                        <AvatarImage src={item && item.avatar} alt="" />
                        <AvatarFallback>
                            {currentUser && currentUser.username
                                .split(' ')
                                .map((subName) => subName.slice(0, 1))
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col gap-2">
                            <div className="font-montserrat font-bold text-[14px]">{item.username}</div>
                            <div className="flex flex-row items-center gap-2">
                                <div className="font-montserrat font-bold text-sm text-[#9F9F9F] cursor-pointer" onClick={() => {
                                    navigate('/posts/' + item.uuid);
                                }}>
                                    {item.time_ago}
                                </div>
                            </div>
                        </div>
                        <Popover placement="bottom-end">
                            <PopoverHandler>
                                <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                                    <img src="/images/home/Frame3dots.png" className="w-auto h-auto" alt="" />
                                </div>
                            </PopoverHandler>
                            <PopoverContent>
                                {currentUser && item.user_id === currentUser.id ? (

                                    <div className="flex flex-col w-[253px] gap-4 pt-3">
                                        <div className="flex flex-row items-center gap-3 cursor-pointer">
                                            <img src="/images/home/Edit.png" alt="" />
                                            <div className="font-montserrat font-medium text-base text-black" onClick={() => onEditPost(item)}>Edit Post</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3 cursor-pointer">
                                            <img src="/images/home/dustbin.png" alt="" />
                                            <div className="font-montserrat font-medium text-base text-black"
                                                onClick={() => {
                                                    setShowModal(true);
                                                }}>
                                                Delete Post</div>
                                        </div>
                                    </div>) : (
                                    <div className="flex flex-col w-[253px] gap-4 pt-3">
                                        <div className="flex flex-row items-center gap-3 cursor-pointer">
                                            <img src="/images/home/savepost.png" alt="" />
                                            <div className="font-montserrat font-medium text-base text-black">Save Post</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3 cursor-pointer"
                                            onClick={() => {
                                                navigator.clipboard.writeText('https://donamix.org/posts/' + item.uuid);
                                                setIsCopied(true);
                                                setTimeout(() => {
                                                    setIsCopied(false);
                                                }, 2000);
                                            }}>
                                            <img src="/images/home/copylink.png" alt="" />
                                            <div className="font-montserrat font-medium text-base text-black">{isCopied ? 'Copied' : 'Copy link this post'}</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3 cursor-pointer">
                                            <img src="/images/home/hide.png" alt="" />
                                            <div className="font-montserrat font-medium text-base text-black">Don't want to see this</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3 cursor-pointer">
                                            <img src="/images/home/unfriend.png" alt="" />
                                            <div className="font-montserrat font-medium text-base text-black">Unfriend this Contact</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3 cursor-pointer">
                                            <img src="/images/home/report.png" alt="" />
                                            <div className="font-montserrat font-medium text-base text-black">Report</div>
                                        </div>
                                    </div>
                                )

                                }

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
                                                        deletePost(item.id!)
                                                            .then((res) => {
                                                                if (res.code === CONSTANTS.SUCCESS) {
                                                                    removePost(item)
                                                                    toast.success(res.message);
                                                                } else {
                                                                    toast.error(res.message);
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
                        <EditPost
                            open={isAddPostOpen}
                            onClose={onCloseAddPost}
                            currentItem={currentItem}
                            saveEditedItem={saveEditedItem}
                            user={currentUser}
                            destroyPhoto={destroyPhoto}
                        />

                    </div>

                </div>
                {item.is_perspective == true && item.tags.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-3 ml-[83px]">
                        {item.tags.length > 0 && item.tags.map((tag, i) => (
                            <Button key={`tag-${i}`} className="bg-[#F7F7F7] font-montserrat font-bold text-sm p-2 text-[#4F4F4F]">{tag.name}</Button>
                        ))
                        }
                    </div>
                )}
                <div className="relative">
                    <div id={`expandable-text-${item.id}`} className={`px-2 font-montserrat font-normal text-sm mb-6 break-words $(isExpanded ? '' : 'line-clamp-6')`}>
                        {item.description}
                    </div>
                    {isTextOverflowed && (
                        <button
                            id={`see-more-btn-${item.id}`}
                            className=" text-gray-600 font-bold cursor-pointer absolute bottom-0 right-0 p-2 bg-white"
                        // onClick={toggleTextExpansion}
                        >
                            {isExpanded ? 'See less' : 'See more'}
                        </button>
                    )}

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

                        // <div className="relative px-6 py-10 bg-white">

                        //         <AiFillPlayCircle onClick={handlePlay} className={`absolute top-[90px] left-[160px] bg-white opacity-40 cursor-pointer hover:scale-105 w-[100px] h-[100px] rounded-full ${videoPlay?'hidden':'block'}`}/>
                        //       </div>
                    )}


                    <div className="flex flex-row gap-3 justify-center">
                        <Carousel
                            additionalTransfrom={0}
                            arrows={true}
                            autoPlay={true}
                            autoPlaySpeed={5000}
                            centerMode={false}
                            className="w-[96%]"
                            containerClass="gap-2"
                            dotListClass="custom-dot-list-style"
                            draggable={false}
                            focusOnSelect={false}
                            infinite={false}
                            itemClass=""
                            keyBoardControl
                            minimumTouchDrag={80}
                            partialVisible
                            pauseOnHover
                            renderArrowsWhenDisabled={false}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            responsive={{
                                desktopxl: {
                                    breakpoint: {
                                        max: 3000,
                                        min: 2400,
                                    },
                                    items: 5,
                                },
                                desktoplg: {
                                    breakpoint: {
                                        max: 2400,
                                        min: 1800,
                                    },
                                    items: 4,
                                },
                                desktop: {
                                    breakpoint: {
                                        max: 1800,
                                        min: 1400,
                                    },
                                    items: 3,
                                },
                                mobilelg: {
                                    breakpoint: {
                                        max: 1100,
                                        min: 960,
                                    },
                                    items: 3,
                                },
                                mobilemd: {
                                    breakpoint: {
                                        max: 960,
                                        min: 850,
                                    },
                                    items: 4,
                                },
                                mobilesm: {
                                    breakpoint: {
                                        max: 850,
                                        min: 650,
                                    },
                                    items: 3,
                                },
                                mobilexs: {
                                    breakpoint: {
                                        max: 650,
                                        min: 0,
                                    },
                                    items: 2,
                                },
                                tablet: {
                                    breakpoint: {
                                        max: 1400,
                                        min: 1100,
                                    },
                                    items: 3,
                                },
                            }}
                            rewind={true}
                            rewindWithAnimation={true}
                            rtl={false}
                            shouldResetAutoplay
                            showDots={false}
                            sliderClass="gap-2 overflow-auto"
                            slidesToSlide={1.04}
                            swipeable
                            customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                            customRightArrow={<CustomRightArrow onClick={() => { }} />}
                        >


                            {item.medias && item.medias.map((media, index) => (
                                <img
                                    key={media.url}
                                    src={'/' + media.url}
                                    alt={`Carousel ${index}`}
                                    onClick={() => handleImageClick(index)}
                                    style={{
                                        cursor: 'pointer',
                                        width: '250px',
                                        height: '265px',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        borderBottomLeftRadius: '0px',
                                        borderBottomRightRadius: '0px'
                                    }}
                                />
                            ))
                            }
                        </Carousel>
                        {isImageModalOpen && (
                            <ImageModal
                                isOpen={isImageModalOpen}
                                onClose={() => setImageModalOpen(false)}
                                images={item.medias.map(media => media.url)}
                                initialIndex={selectedImageIndex} // Pass the initial index to the ImageModal
                            />
                        )}


                    </div>

                </div>
            </div>

            <Footer
                post={item}
                user={currentUser}
                appendComment={appendComment}
                editComment={editComment}
                removeComment={removeComment}
                addEmoticon={addEmoticon} />
        </Card>

    );
};

export default ProfileCard;
