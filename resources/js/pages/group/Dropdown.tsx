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
import Footer from '@/components/custom/home/Footer';
import ProfileFooter from '@/components/custom/home/ProfileFooter';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import { AiFillPlayCircle } from "react-icons/ai";
import ImageModal from "../../components/widgets/post/ImageModal";

import YouTube from 'react-youtube';


import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
import { updateBlog } from '@/api/blog';
import { useAuthContext } from '@/context/AuthContext';
import EditGroup from './EditGroup';
import { Group } from '@/lib/validation/group';
import axios, { AxiosError } from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

dayjs.extend(relativeTime);

const Dropdown = ({load, item}) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { categories } = useBlogContext();
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setcurrentItem] = useState({});
    // const [urlLink, seturlLink] = useState<string>('');

    const [isEditGroupOpen, setIsEditGroupOpen] = useState<boolean>(false)
    
    const opts = {
        height: '350',
        outerWidth: '300',
        playerVars: {
            autoplay: 0,
        },
    };


    const onEditGroup = (item: Group) => {
        setIsEditGroupOpen(true);
        setcurrentItem(item)
    }
    const onCloseEditGroup = () => {
        setIsEditGroupOpen(false);
    }

    const loadApply = () => {
        load();
        onCloseEditGroup();
    }

    const [isExpanded, setIsExpanded] = useState(false);
    const [isTextOverflowed, setIsTextOverflowed] = useState(true);

    // Check if the text overflows and show the "See more" button accordingly

    const deleteForum = () => {
        let data = {
            id: item?.id,
        }
        console.log("====edit_group:", data);
        axios
            .delete(`${apiUrl}/group/delete/${item?.id}`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    toast.success('Success')
                    loadApply();
                } else {
                    console.log(res);
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while getting my albums:', err);
            })
            .finally(() => {
            });
    }

    return (
        <div className="flex flex-col gap-2">
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
                            <div className="font-montserrat font-medium text-base text-black" onClick={() => onEditGroup(item)}>Edit Post</div>
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
                                            deleteForum();
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
            <EditGroup open={isEditGroupOpen} onClose={onCloseEditGroup} loadApply={loadApply} item={item}/>
        </div>
    );
};

export default Dropdown;
