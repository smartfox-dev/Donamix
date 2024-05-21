import React from 'react'
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import { Comment } from '@/lib/validation/comment';
import PopularGroup from './PopularGroup';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CreateGroup from './CreateEvent';
import { calculateTimeDifference } from '@/lib/utils';
import { Group, groupValidator } from '@/lib/validation/group';
import CONSTANTS from '@/config/constants';
import { toast } from 'react-hot-toast';
import { deleteGroup, getGroups, setJoinStatus } from '@/api/group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuthContext } from '@/context/AuthContext';
import Stack from '@mui/material/Stack';
import PostGroup from './PostGroup';
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PostCard from '@/components/widgets/post/PostCard';
import { createPost, getPosts } from '@/api/post';
import { Post, postValidator } from '@/lib/validation/post';
import AddPost from '@/components/custom/home/AddPost';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
import EditGroup from './EditGroup';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[];
    }
}

export default function GroupDetail() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const [page, setPage] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState<Group>({});
    const [tempList, setTempList] = useState([]);
    const [isCreateGroupOpen, setIsEditGroupOpen] = useState<boolean>(false)
    const [status, setStatus] = useState(false);

    const [posts, setPosts] = useState<Post[]>([]);
    const [isPerspective, setisPerspective] = useState<boolean>(false);
    const [showPhotos, setShowPhotos] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(-1);
    const [realCount, setRealCount] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const onEditGroup = () => {
        setIsEditGroupOpen(true);
    }
    const onCloseEditGroup = () => {
        setIsEditGroupOpen(false);
    }
    const handleClick = () => {
        const searchParams = new URLSearchParams(location.search)
        const page = searchParams.get('page');
        if (page == "info") {
            navigate('/group/edit/?page=info');
        } else {
            navigate('/group');
        }
    }
    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false);
    const onAddPost = (is_perspective: boolean, is_photo: boolean) => {
        setisPerspective(is_perspective)
        setShowPhotos(is_photo)
        setIsAddPostOpen(true);
    }
    const onCloseAddPost = () => {
        setIsAddPostOpen(false);
    }

    const handleJoin = () => {
        setStatus(!status);
        const updatedList = [...tempList];
        const index = updatedList.indexOf(user.id);
        if (index !== -1) {
            // User ID exists in the tempList, remove it
            updatedList.splice(index, 1);
        } else {
            // User ID doesn't exist in the tempList, add it
            updatedList.push(user.id);
        }
        setTempList(updatedList);
        setJoinStatus({ id: id, user_id: user.id, user_list: JSON.stringify(updatedList) })
            .then((res) => {
                if (res.code == CONSTANTS.SUCCESS) {
                }
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })


        // const searchParams = new URLSearchParams(location.search)
        // const page = searchParams.get('page');
        // if (page == "info") {
        //     navigate('/group/edit/?page=info');
        // } else {
        //     navigate('/group');
        // }
    }
    const load = () => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page');
        setPage(page);
        setIsLoading(true);
        console.log("==========groupdetail_id", { 'group_id': id })
        getPosts({ params: { group_id: id } })
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
        getGroups({ params: { page: page } })
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        const item = res.data.find((group) => group.id == id);
                        console.log("=====selected_group_item:", item)
                        if (item == undefined || item == null) {
                            handleClick();
                        }
                        setSelectedGroup(item)
                        // const items = res.data.filter((group) => group.id != id)
                        // setGroups(items)
                        setTempList(item?.user_list ? JSON.parse(item?.user_list) : []);
                        setIsLoading(false)
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


    // axios.get(`${apiUrl}/group`, { params: { page: page } })
    //     .then((res: any) => {
    //         console.log("===group:", res.data)
    //         const item = res.data.find((group) => group.id == id);
    //         const items = res.data.filter((group) => group.id != id)
    //         setGroups(items)
    //         setSelectedGroup(item)
    //         setIsLoading(false)
    //     })
    //     .catch((err) => {
    //         console.warn('Error while loading blogs', err);
    //     })
    //     .finally(() => {
    //     });

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

    const savePerspective = async (newInput: Post) => {
        return new Promise<{ success: string }>(
            (resolve, reject) => {

                const newPost: Post = postValidator.parse({
                    ...newInput,
                    user_id: user.id,
                    group_id: id,
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
                        console.log('Error while creating a blog:', err);
                        reject({
                            success: false,
                        });
                    })
                    .finally(() => {
                        reject({
                            success: false,
                        });
                    });
            }

        );
    }

    useEffect(() => {
        load();
    }, []);

    const loadApply = () => {
        load();
        onCloseEditGroup();
    }

    useEffect(() => {
        if (tempList && user?.id) {
            const index = tempList.indexOf(user.id);
            if (index !== -1) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        }
    }, [tempList, user])

    if (isLoading) {
        return (
            <div className="items-center justify-center flex w-full h-[300px]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="sm:flex-1 flex-col bg-dashboard-background w-full mainBody">
            <div className="mt-5 sm:px-5 px-2 w-full h-full flex flex-col gap-8">
                <div className="rounded-t-full">
                    <ins className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-5794587985510139"
                        data-ad-slot="3734166205"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
                {!status &&
                    <div className='flex flex-col gap-5 text-center'>
                        <span className='font-sans text-[22px]'>Join the group to view the content. Click the 'Join Group' button to become a member and access the latest updates, discussions, and more within the group.</span>
                    </div>
                }
                <div className="bg-white rounded-t-xl">
                    <div className='flex flex-row justify-between items-center'>
                        <ArrowBackIcon className="cursor-pointer mt-5 ml-4" onClick={handleClick} />
                        {user && selectedGroup.user_id === user.id &&
                            <div className='mt-5 mr-4'>
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
                                                <div className="font-montserrat font-medium text-base text-black" onClick={onEditGroup}>Edit Group</div>
                                            </div>
                                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                                                <img src="/images/home/dustbin.png" alt="" />
                                                <div className="font-montserrat font-medium text-base text-black"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                    }}>
                                                    Delete Group</div>
                                            </div>
                                        </div>


                                        {showModal && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                                    <p>Are you sure you want to delete group?</p>
                                                    <div className="flex justify-end mt-4">
                                                        <button
                                                            className="px-4 py-2 text-white bg-green-500 rounded-lg mr-2"
                                                            onClick={() => {
                                                                setShowModal(false);
                                                                deleteGroup(selectedGroup.id!)
                                                                    .then((res) => {
                                                                        if (res.code === CONSTANTS.SUCCESS) {
                                                                            handleClick();
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
                                                        <button
                                                            className="px-4 py-2 text-white bg-red-500 rounded-lg"
                                                            onClick={() => {
                                                                setShowModal(false);
                                                            }}
                                                        >
                                                            No
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </PopoverContent>

                                </Popover>
                            </div>
                        }
                        <EditGroup item={selectedGroup} open={isCreateGroupOpen} onClose={onCloseEditGroup} loadApply={loadApply} />
                    </div>
                    <div className="flex flex-col p-4">
                        <img src={selectedGroup?.cover_photo} className='max-h-[270px]' />
                    </div>
                    <div className="flex flex-col w-full gap-4 items-center">
                        <div className="flex flex-row gap-4 px-5 w-full items-center">
                            <Avatar className="w-[70px] h-[70px]">
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
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-[22px] font-bold">{selectedGroup?.group_name}</span>
                                </div>
                                <span>{selectedGroup?.description}</span>
                            </div>
                        </div>
                        <div className="flex flex-col mt-3 gap-4 w-full px-4 justify-center">
                            <div className="flex flex-row gap-2">
                                <img className="w-5 h-5" src="/images/group/users.png" />
                                <span>{tempList.length} Members</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <img className="w-5 h-5" src="/images/group/global.png" />
                                <span>{selectedGroup?.url}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <img className="w-5 h-5" src="/images/group/category.png" />
                                <span>{selectedGroup?.category}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-5 p-4">
                        <Button onClick={handleJoin}>{status ? "Leave Group" : "Join Group"}</Button>
                    </div>
                </div>
                {status &&
                    <div className="h-full flex flex-col gap-3">
                        <Card className="flex flex-col w-full h-auto rounded-t-3xl rounded-b-none py-5 px-5 justify-between gap-3">
                            <div className="flex flex-col px-2 rounded-t-3xl py-3 h-auto bg-[#F7F7F7] hover:bg-[#f2f2f2]">
                                <div className="flex flex-row gap-3 py-2">
                                    <Avatar className="w-[50px] h-[50px]">
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
                        ))}
                    </div>
                }
            </div>
        </div >
    )
}