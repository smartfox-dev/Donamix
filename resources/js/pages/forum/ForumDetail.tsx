import React, { useEffect, useState } from 'react'

import Button from '@/components/common/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MyComponent from '@/components/common/RichTextEditor';
import { FaPlus } from "react-icons/fa";
import EditForum from '@/components/custom/home/EditForum';
import { FaRegCommentDots } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getDetail, deleteForum } from '@/api/forum';
import {Forum} from '@/lib/validation/forum'
import CONSTANTS from '@/config/constants';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { createOrUpdateForumComment } from '@/api/post/comment';
import { Comment, commentValidator } from '@/lib/validation/comment';
import { useAuthContext } from '@/context/AuthContext';
import ReactSunEditor from 'suneditor-react';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

export default function ForumDetail() {
    const params = useParams();
    const [intros, setIntro] = useState([])
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('')
    const {user} = useAuthContext();
    const [currentItem, setcurrentItem] = useState({});
    const [isCreateDisOpen, setIsCreateDisOpen] = useState<boolean>(false)
    const [isPost, setLoadingPost] = useState(false)
    const [fiveposts, setFivePost] = useState([]);

    const handlePost = () => {
        setLoadingPost(true)
    }


    const onEditPost = (item: Forum) => {
        setIsCreateDisOpen(true);
        setcurrentItem(item)
    }

    const onCloseCreateDis = () => {
        setIsCreateDisOpen(false);
    }
    const [input, setInput] = useState<{
        description: string;
        is_edit: number;
        id: number;

    }>({
        description: '',
        is_edit: 0,
        id: 0,
    });

    const onInputChange = (
        e
    ) => {
        setContent(e.target.value)
        console.log(e.target.value)
        setInput((prev) => ({
            ...prev,
            description: e.target.value
        }));
    };
    const removeForum = (post: Forum) => {
        let filteredArray = intros.filter(item => item !== post)
        setIntro(filteredArray);
        navigate('/forum')
    }

    const submitForum = () => {
        console.log(content)
        setInput((prev) => ({
            ...prev,
            description: content
        }));
        const newComment: Comment = commentValidator.parse({
            ...input,
            user_id: user.id,
            post_id: parseInt(params.id),
        });
        createOrUpdateForumComment(newComment)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    console.log(res.data)

                    setIntro(res.data)
                    setFivePost(res.data[0].comments.slice(0,5))
                } else toast.error(res.message);
            })
            .catch((err) => {
                console.log('Error while creating a blog:', err);
            })
            .finally(() => {
            });
    }

    const load = () => {
        console.log(params.id)
        getDetail({ 'id': params.id })
            .then((res: any) => {
                console.log(res)
                setIntro(res);
                setFivePost(res[0].comments.slice(0,5))
            })
            .catch((err) => { })
    }

    useEffect(() => {
        load();
    }, [])

    return (

        <div className="sm:flex-1 flex-col bg-dashboard-background w-full mainBody">
            <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
                <div className="rounded-t-full">
                    <ins className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-5794587985510139"
                        data-ad-slot="3734166205"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
                <div className="flex flex-col w-full gap-6">
                    <div className="flex sm:flex-row flex-col rounded-t-3xl bg-black items-center gap-8 justify-center p-6">
                        <div className="flex flex-row flex-wrap gap-6 items-center">
                            <FaArrowLeftLong className="text-white font-bold rounded-full border-none scale-150 cursor-pointer" onClick={() => navigate('/forum')} />
                            <p className="font-sans font-bold text-lg text-white text-center">{intros[0] && intros[0].title}</p>
                        </div>
                        <div className="bg-secondary text-black font-bold p-2 rounded-md">{intros[0] && intros[0].category}</div>
                    </div>
                    <div className="flex flex-col w-full gap-6">
                        {intros.map((item, i) => (
                            <>
                                <div className="w-full h-auto rounded-t-3xl flex flex-col gap-5 bg-white p-5" key={i}>
                                    <div className="flex justify-between items-center w-full">
                                        <div className='w-2 h-2'></div>
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
                                                                        deleteForum({'id': item.id})
                                                                            .then((res: any) => {
                                                                                removeForum(item)
                                                                                toast.success(res);

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
                                    </div>
                                    <p className="w-full font-sans font-normal text-sm text-[#6D6D6D] sm:pl-16 sm:pr-10 pl-4 pr-4 break-words"></p>
                                    <div className="flex flex-row gap-3 items-center pl-16">
                                        <p className="w-full font-sans font-normal text-lg break-words"><div dangerouslySetInnerHTML={{ __html: item.description }} /></p>
                                    </div>
                                </div>
                                {isPost ? item.comments.map((comment: any, j:any) => (
                                    <div className="w-full h-auto rounded-t-3xl flex flex-col gap-5 bg-white p-5" key={j}>
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="flex flex-row gap-3">
                                                <img src={comment.user.avatar} className="w-[53px] h-[53px]" alt="logo" />
                                                <div className="flex flex-col">
                                                    <h3 className="font-sans font-bold text-lg">{comment.user.name}</h3>
                                                    <p className="font-sans font-normal text-sm text-[#999999]">{comment.time_ago}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="font-sans font-normal text-sm text-[#6D6D6D] pl-16 break-words"><div dangerouslySetInnerHTML={{ __html: comment.description }} /></p>

                                    </div>
                                )) : fiveposts.map((comment: any, j:any) => (
                                    <div className="w-full h-auto rounded-t-3xl flex flex-col gap-5 bg-white p-5" key={j}>
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="flex flex-row gap-3">
                                                <img src={comment.user.avatar} className="w-[53px] h-[53px]" alt="logo" />
                                                <div className="flex flex-col">
                                                    <h3 className="font-sans font-bold text-lg">{comment.user.name}</h3>
                                                    <p className="font-sans font-normal text-sm text-[#999999]">{comment.time_ago}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="font-sans font-normal text-sm text-[#6D6D6D] pl-16 break-words"><div dangerouslySetInnerHTML={{ __html: comment.description }} /></p>

                                    </div>
                                ))}
                            <EditForum open={isCreateDisOpen} onClose={onCloseCreateDis} currentItem={item} user={user} />
                            <div className="flex justify-center">
                                {item.comments.length >= 6 && <Button
                                    className="mt-3 rounded-full"
                                    onClick={handlePost}
                                >
                                    Load More
                                </Button>}
                            </div>
                            </>
                        ))}
                        <div className="flex flex-col w-full bg-white p-2">
                            <textarea
                                style={{
                                    height: "300px",
                                    width: "100%",
                                    border: '1px solid lightgray',
                                    padding: '10px'
                                }}
                                onChange={onInputChange}
                            ></textarea>
                            <div className="flex justify-end mt-3 p-2">
                                <Button className="bg-black text-white left-0" onClick={submitForum}>Submit Response</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
