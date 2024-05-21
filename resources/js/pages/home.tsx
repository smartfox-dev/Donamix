import React from 'react';
// import 'react-multi-carousel/lib/u';
import { useState, useEffect, useMemo } from 'react';
import { Post, postValidator } from '@/lib/validation/post';
import { Comment } from '@/lib/validation/comment';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import LeftSidebar from './dashboard/layout/LeftSidebar';
import RightSidebar from './dashboard/layout/RightSidebar';
import AddPost from '@/components/custom/home/AddPost';
import CustomCarousel from '@/components/custom/CustomCarousel';
import { createPost, getPosts } from '@/api/post';
import { getBirthdayMembers } from '@/api/home';
import { Spinner } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';

import { FaEarthAmericas } from "react-icons/fa6";
import { BiSolidHide } from "react-icons/bi";
import { BsXSquare } from "react-icons/bs";
import { BsExclamationSquare } from "react-icons/bs";
import { BsExclamationCircle } from "react-icons/bs";
import { BiHide } from "react-icons/bi";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdOutlineReport } from "react-icons/md";

import PostCard from '@/components/widgets/post/PostCard';

import { Outlet } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Button from '@/components/common/Button'
import BirthdayMemberItem, {
    BirthdayMember,
} from '@/components/common/BirthdayMemberItem';

// import { Textarea } from '@material-tailwind/react';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';


import '../App.css';
import { getFeedData, getGroupList } from '@/api/advertise';
import { Advertise } from '@/lib/validation/advertise';

import { GroupComment, groupcommentValidator } from '@/lib/validation/groupcomment';
import { Group } from '@/lib/validation/group';
import { createGroupOrUpdateComment } from '@/api/post/comment';


const responsiveOption = {
    desktopxl: {
        breakpoint: {
            max: 3000,
            min: 2400,
        },
        items: 1,
    },
    desktoplg: {
        breakpoint: {
            max: 2400,
            min: 1800,
        },
        items: 1,
    },
    desktop: {
        breakpoint: {
            max: 1800,
            min: 1400,
        },
        items: 1,
    },
    mobilelg: {
        breakpoint: {
            max: 1100,
            min: 960,
        },
        items: 1,
    },
    mobilemd: {
        breakpoint: {
            max: 960,
            min: 850,
        },
        items: 1,
    },
    mobilesm: {
        breakpoint: {
            max: 850,
            min: 650,
        },
        items: 1,
    },
    mobilexs: {
        breakpoint: {
            max: 650,
            min: 0,
        },
        items: 1,
    },
    tablet: {
        breakpoint: {
            max: 1400,
            min: 1100,
        },
        items: 1,
    },
}

const LIMIT = 10;

export default function Home() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/profile/' + user.username);
    }
    const [sidbarExpanded, setSidebarExpanded] = useState(null);
    const [groupList, setGroupList] = useState([]);
    const { user } = useAuthContext();
    const [input, setInput] = useState<{
        description: string;

    }>({
        description: '',
    });

    const [commentInput, setCommentInput] = useState<{
        description: string;
        is_edit: number;
        id: number;

    }>({
        description: '',
        is_edit: 0,
        id: 0,
    });

    const [birthdayMembers, setBirthdayMembers] = useState<BirthdayMember[]>([]);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isPerspective, setisPerspective] = useState<boolean>(false);
    const [showPhotos, setShowPhotos] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(-1);
    const [realCount, setRealCount] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [posts, setPosts] = useState<Post[]>([]);

    const [feedData, setFeedData] = useState<Advertise[]>([]);
    const [currentFeed, setCurrentFeed] = useState<Advertise>({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const availableLimit = useMemo(() => {
        if (realCount && realCount - from < LIMIT) return realCount - from;
        return LIMIT;
    }, [from, realCount]);


    const load = () => {
        setIsLoading(true);

        getBirthdayMembers()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        setBirthdayMembers(res.data)
                    }
                }
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })
            .finally(() => {

            });

        getFeedData()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        setFeedData(res?.data);
                        setCurrentFeed(res.data[0]);
                    }
                }
            })
            .catch((err) => {
                console.log("Error while loding feed", err)
            })

        getPosts({ params: { group_id: 0 } })
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        const temp = res.data;
                        if (from === 0) setPosts(temp);
                        else setPosts((prev) => [...prev, ...temp]);
                        setFrom(from + temp.length);
                        setIsLoading(false);

                    }
                    if (res.totalCount) {
                        if (totalCount < 0) setTotalCount(res.totalCount);
                        setRealCount(res.totalCount);
                    }
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (user?.id) {
            getGroupList()
                .then((res) => {
                    if (res.code === CONSTANTS.SUCCESS) {
                        if (res.data) {
                            const filteredData = res?.data.filter(item => {
                                if (item.user_list && item.user_list.length > 0) {
                                    return item.user_list.includes(user.id);
                                }
                                return false;
                            });
                            setGroupList(filteredData);
                        }
                    }
                })
                .catch((err) => {
                    console.log("Error while loding group list", err)
                });
        }
    }, [user])
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((preIndex) => {
                const newIndex = (preIndex + 1) % feedData.length;
                setCurrentFeed(feedData[newIndex]);
                return newIndex;
            })
        }, 16000)

        return () => clearInterval(interval)
    }, [feedData])
    const showSidebar: () => void = () => {
        setSidebarExpanded(true)
    }
    const hideSidebar: () => void = () => {
        setSidebarExpanded(false)
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

    const saveComment = async (description) => {
        console.log("****************groupList:", groupList)
        const saveCommentPromises = groupList.map(groupItem => {

            const newComment: GroupComment = groupcommentValidator.parse({
                id: 0,
                description: description,
                is_edit: 0,
                user_id: user?.id,
                group_id: groupItem?.id,
            });

            createGroupOrUpdateComment(newComment)
                .then((res) => {
                    if (res.code === CONSTANTS.SUCCESS) {
                    } else toast.error(res.message);
                })
                .catch((err) => {
                    console.log('Error while creating a blog:', err);
                })

        })
    }

    const savePerspective = async (newInput: Post) => {
        return new Promise<{ success: string }>(
            (resolve, reject) => {

                const newPost: Post = postValidator.parse({
                    ...newInput,
                    user_id: user.id,
                    group_id: null,
                });
                console.log("====new_post:", newPost)
                createPost(newPost)
                    .then((res) => {
                        if (res.code === CONSTANTS.SUCCESS) {

                            setPosts(current => [res.data, ...current]);
                            onCloseAddPost()
                            toast.success(res.message);

                            resolve({
                                success: true,
                            });

                        } else toast.error(res.message);
                    })
                    .catch((err) => {
                        setErrors(err.errors);
                        console.log('Error while creating a blog:', err);
                        reject({
                            success: false,
                        });
                    })
                    .finally(() => {
                        setIsSaving(false);
                        reject({
                            success: false,
                        });
                    });
            }

        );
    }


    // const savePost = () => {
    //   if (!user) return;

    //   setIsSaving(true);
    //   const newPost: Post = postValidator.parse({
    //     ...input,
    //     user_id: user.id,
    //     is_perspective: 0,
    //   });
    //   createPost(newPost)
    //     .then((res) => {
    //       if (res.code === CONSTANTS.SUCCESS) {

    //         setPosts(current => [res.data, ...current]);

    //         toast.success(res.message);
    //         setInput((prev) => ({
    //           ...prev,
    //           description: '',
    //         }));

    //       } else toast.error(res.message);
    //     })
    //     .catch((err) => {
    //       setErrors(err.errors);
    //       console.log('Error while creating a blog:', err);
    //     })
    //     .finally(() => {
    //       setIsSaving(false);
    //     });
    // }

    const customArrow = {
        customLeftArrow: <button style={{ position: 'absolute', top: '50%', left: '0' }}>Left</button>,
        customRightArrow: <button style={{ position: 'absolute', top: '50%', right: '0' }}>Right</button>,
    };


    if (isLoading) {
        return (
            <div className="items-center justify-center flex w-full h-[300px]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
            <LeftSidebar onStateChange={showSidebar} />
            <div className="flex-1 bg-dashboard-background w-full mainBody">
                <div className="mt-10 sm:px-10 px-2 h-full flex flex-col gap-5">
                    {/* <Outlet /> */}
                    {/* carousel insert here!!! */}

                    {birthdayMembers.length > 0 && (
                        <div>
                            <div className="font-bold font-[Open Sans] text-lg">Birthday Celebration</div>
                            <div className="flex flex-row gap-6 overflow-hidden">
                                <CustomCarousel showDots={true} n={"pb-10"}>
                                    {birthdayMembers.map((item, i) => (
                                        <BirthdayMemberItem key={`birthday-member-${i}`} item={item} />
                                    ))}
                                </CustomCarousel>

                            </div>
                        </div>
                    )}


                    <Card className="flex flex-col w-full h-auto rounded-t-3xl rounded-b-none py-5 px-5 justify-between gap-3">
                        <div className="flex flex-col px-2 rounded-t-3xl py-3 h-auto bg-[#F7F7F7] hover:bg-[#f2f2f2]">
                            <div className="flex flex-row gap-3 py-2">
                                <Avatar className="w-[50px] h-[50px]" onClick={handleOnClick}>
                                    <AvatarImage src={user && user.avatar} alt="" />
                                    <AvatarFallback>
                                        {user
                                            ? user.username
                                                .split(' ')
                                                .map((subName) => subName.slice(0, 1))
                                                .join('')
                                            : 'DM'}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    onClick={() => onAddPost(false, false)}
                                    className="
                                        cursor-pointer
                                        w-full pt-3 min-h-[40px]
                                        font-medium
                                        font-poppins
                                        text-[#B9B9B9]
                                        text-sm !border-0 focus:outline-0 bg-transparent">{user && (user.username + ', share your voice!')}
                                </div>
                            </div>

                            {/* <textarea
                                className=" !border-0 focus:outline-0 bg-transparent"
                            /> */}
                        </div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row gap-10">
                                <div className="flex flex-row gap-3 items-center" onClick={() => onAddPost(false, false)}>
                                    <img src='/images/home/Framecamera.png' alt="" />
                                    <div className="md:block hidden font-inter font-semibold text-xs text-[#999999]">Live&nbsp;Video</div>
                                </div>
                                <div className="flex flex-row gap-3 items-center cursor-pointer" onClick={() => onAddPost(false, true)}>
                                    <img src='/images/home/Framephoto.png' alt="" />
                                    <div className="md:block hidden font-inter font-semibold text-xs text-[#999999]">Photo/Video</div>
                                </div>

                                <div className="flex flex-row gap-3 items-center cursor-pointer" onClick={() => onAddPost(true, false)}>
                                    <img src='/images/home/perspective.png' alt="" />
                                    <div className="md:block hidden font-inter font-semibold text-xs text-[#999999]">Perspective</div>
                                </div>
                            </div>
                            {/* <Button className="font-inter font-semibold text-xs min-w-[107px]" disabled={isSaving || input.description == ''} onClick={savePost}>Post</Button> */}
                            <AddPost open={isAddPostOpen} onClose={onCloseAddPost} user={user} savePerspective={savePerspective} isPerspective={isPerspective} showPhotos={showPhotos} />
                        </div>
                    </Card>

                    {posts.map((post: Post, i: number) => (

                        i === 1 ? (
                            <>
                                <Card className="flex flex-col w-full h-auto rounded-t-3xl rounded-b-none p-5 gap-5 justify-between">
                                    <div className="px-2 flex flex-row items-center gap-3 w-full">
                                        <Avatar className="w-[65px] h-[65px]" onClick={handleOnClick}>
                                            <AvatarImage src='/images/logo.png' alt="" />
                                        </Avatar>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex flex-col">
                                                <div className="font-montserrat font-bold text-[20px]">Donamix</div>
                                                <div className="flex flex-row items-center gap-2">
                                                    <div className="font-montserrat font-bold text-sm text-[#9F9F9F]">Sponsored</div>
                                                    <FaEarthAmericas className="cursor-pointer" />
                                                </div>

                                            </div>
                                            <Popover placement="bottom-end">
                                                <PopoverHandler>
                                                    <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                                                        <img src="/images/home/Frame3dots.png" className="w-auto h-auto" alt="" />
                                                    </div>
                                                </PopoverHandler>
                                                <PopoverContent>
                                                    <div className="flex flex-col w-[300px] gap-4 pt-3">
                                                        <div className="flex flex-row items-center gap-5">
                                                            <BsXSquare className=" scale-150 text-black" />
                                                            <div className="flex flex-col">
                                                                <div className="font-montserrat font-medium text-base text-black">Hide ads</div>
                                                                <p>Go Ad Free & Enjoy additional benefits</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center gap-5">
                                                            <MdOutlineReport className=" scale-150 text-black" />
                                                            <div className="flex flex-col">
                                                                <div className="font-montserrat font-medium text-base text-black">Report ad</div>
                                                                <p>Tell us about a problem with this ad.</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center gap-5">
                                                            <RiAdvertisementLine className=" scale-150 text-black" />
                                                            <div className="flex flex-col">
                                                                <div className="font-montserrat font-medium text-base text-black">Advertise here</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div className="font-sans font-semibold">{currentFeed?.description ? currentFeed?.description : "THE NOVEMBER SALE: Shop the bestsellers, now up to 70% off. For a limited time only, on selected lines"}</div>
                                    {feedData && feedData.map((item, index) => (
                                        <div className={`flex flex-row gap-4 overflow-x-hidden ${index === currentIndex ? '' : 'hidden'}`} key={index} >
                                            <Carousel
                                                additionalTransfrom={0}
                                                arrows={true}
                                                autoPlay={true}
                                                autoPlaySpeed={4000}
                                                centerMode={false}
                                                className={`w-full h-auto pb-14`}
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
                                                responsive={responsiveOption}
                                                rewind={true}
                                                rewindWithAnimation={true}
                                                rtl={false}
                                                shouldResetAutoplay
                                                showDots={true}
                                                sliderClass="overflow-auto"
                                                slidesToSlide={1}
                                                swipeable>
                                                {JSON.parse(item.urls).map((itm) => (
                                                    <img onClick={(e) => { e.preventDefault(); navigate('/advertise') }} src={itm} className="w-full h-auto cursor-pointer" alt={itm.id} key={itm.id} />
                                                ))}
                                            </Carousel>
                                        </div>
                                    ))
                                    }
                                </Card>
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
                                    profile={true}
                                />
                            </>
                        ) : (
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
                                profile={true}
                            />
                        ))
                    )


                    }
                    {isLoading === true &&
                        [...Array(availableLimit)].map((_, i) => (
                            <div
                                key={`skeleton-${i}`}
                                className="bg-gray-700 rounded-t-2xl w-full h-[250px] animate-pulse"
                            ></div>
                        ))}
                </div>

            </div>
            <RightSidebar />
        </div>

    )
}
