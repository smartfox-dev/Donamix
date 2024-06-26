
import React from 'react'
import { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import SharePopup from '@/components/custom/blog/SharePopup';
import GroupCommentC from '@/components/custom/GroupComment'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createGroupOrUpdateComment } from '@/api/post/comment';
import { emoticonGroup } from '@/api/post';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { GroupComment, groupcommentValidator } from '@/lib/validation/groupcomment';
import { Group } from '@/lib/validation/group';
import { User } from '@/lib/validation/user';
import { IconTooltip } from './IconTooltip';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';

import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
} from '@material-tailwind/react';

import { useSearchParams } from 'react-router-dom';
import { Share } from 'lucide-react';
import { FaHeart } from "react-icons/fa6";
import { BsMegaphone } from "react-icons/bs";
import { BsChatText } from "react-icons/bs";
import { ImShare2 } from "react-icons/im";
import { TbRefresh } from "react-icons/tb";


interface IFooterProps {
    user: User;
    group: Group;
    appendComment: (cmt: GroupComment) => void,
    editComment: (cmt: GroupComment) => void,
    removeComment: (cmt: GroupComment) => void,
    addEmoticon: (arg: String) => void,
    group_id: any;
}

const GroupFooter: React.FC<IFooterProps> = ({
    group,
    user,
    appendComment,
    editComment,
    removeComment,
    addEmoticon,
    group_id
}) => {
    console.log("=============group_id", group_id)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [IsSavingEmoticon, setIsSavingEmoticon] = useState<boolean>(false);
    const [input, setInput] = useState<{
        description: string;
        is_edit: number;
        id: number;

    }>({
        description: '',
        is_edit: 0,
        id: 0,
    });
    const onCommentOpen = () => {
        setIsCommentOpen(true);
    }
    const onCloseComment = () => {
        setIsCommentOpen(false);
    }

    const onEmoticon = (arg: String) => {


        if (user && IsSavingEmoticon == false) {

            addEmoticon(arg)

            setIsSavingEmoticon(true);
            emoticonGroup(arg, group_id)
                .then((res) => {
                    if (res.code === CONSTANTS.SUCCESS) {

                    } else toast.error(res.message);
                })
                .catch((err) => {
                    console.log('Error while creating a blog:', err);
                })
                .finally(() => {
                    setIsSavingEmoticon(false);
                });

        }


    }


    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const newComment = (item: GroupComment) => {
        console.log("=========NEWCOMMENT:", item)
        appendComment(item)
    }

    const updateComment = (item: GroupComment) => {
        editComment(item)
    }

    const deleteComment = (item: GroupComment) => {
        removeComment(item)
    }

    const saveComment = () => {
        setIsSaving(true);
        const newComment: GroupComment = groupcommentValidator.parse({
            ...input,
            user_id: user.id,
            group_id: group_id,
        });

        createGroupOrUpdateComment(newComment)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {

                    appendComment(res.data)

                    setInput((prev) => ({
                        ...prev,
                        description: '',
                    }));


                } else toast.error(res.message);
            })
            .catch((err) => {
                console.log('Error while creating a blog:', err);
            })
            .finally(() => {
                setIsSaving(false);
            });
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <>
                        <SpeedDial placement="top-start">
                            <SpeedDialHandler>

                                <div className="flex flex-row gap-3 items-center">
                                    <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => onEmoticon('like')}>
                                        {group && group.is_like || group.is_clap || group.is_heart || group.is_laugh ? (
                                            <img src="/images/home/like.svg" alt="" className="w-6 h-6 cursor-pointer" />
                                        ) : (
                                            <img src="/images/home/unlike.svg" alt="" className="w-6 h-6 cursor-pointer" />
                                        )}
                                        <div className="lg:block hidden font-montserrat font-bold text-sm">Like</div>
                                    </div>

                                </div>
                            </SpeedDialHandler>

                            {user && (
                                <SpeedDialContent>
                                    <div className="flex flex-row gap-5 shadow-lg bg-white p-2 rounded-md items-center">
                                        <IconTooltip content="Like">
                                            {group && group.is_like ? (
                                                <img src="/images/home/like.svg" alt="" className="w-6 h-6 cursor-pointer hover:scale-150 hover:-translate-y-3" onClick={() => onEmoticon('unlike')} />
                                            ) : (
                                                <img src="/images/home/unlike.svg" alt="" className="w-6 h-6 cursor-pointer hover:scale-150 hover:-translate-y-3" onClick={() => onEmoticon('like')} />
                                            )}
                                        </IconTooltip>
                                        <IconTooltip content="Bravo">
                                            {group && group.is_clap ? (
                                                <img src="/images/home/clap.svg" alt="" className="w-6 h-6 cursor-pointer hover:scale-150 hover:-translate-y-3" onClick={() => onEmoticon('unclap')} />
                                            ) : (
                                                <img src="/images/home/clap.svg" alt="" className="w-6 h-6 cursor-pointer hover:scale-150 hover:-translate-y-3" onClick={() => onEmoticon('clap')} />
                                            )}
                                        </IconTooltip>
                                        <IconTooltip content="Love">
                                            {group && group.is_heart ? (
                                                <img src="/images/home/heart.svg" className="cursor-pointer w-6 h-6 hover:scale-150 hover:-translate-y-3" onClick={() => onEmoticon('unheart')} />
                                            ) : (
                                                <img src="/images/home/heart.svg" alt="" className="cursor-pointer w-6 h-6   hover:scale-150 hover:-translate-y-3" onClick={() => onEmoticon('heart')} />
                                            )}
                                        </IconTooltip>
                                        <IconTooltip content="Joyful">
                                            {group && group.is_laugh ? (
                                                <img src="/images/home/laugh.svg" alt="" className="w-6 h-6 cursor-pointer hover:scale-150 hover:-translate-y-3" onClick={() => onEmoticon('unlaugh')} />
                                            ) : (
                                                <img src="/images/home/laugh.svg" alt="" className="w-6 h-6 cursor-pointer hover:scale-150 hover:-translate-y-3" onClick={() => onEmoticon('laugh')} />
                                            )}
                                        </IconTooltip>
                                    </div>
                                </SpeedDialContent>
                            )}

                        </SpeedDial>
                    </>
                    {/* <div className="flex flex-row items-center gap-2">
                        <BsMegaphone className="scale-150"/>
                        <div className="lg:block hidden font-montserrat font-bold text-sm">{post && group.laugh +  group.heart + group.clap + group.like}</div>
                    </div> */}
                    <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={onCommentOpen}>
                        <img src="/images/home/comment.svg" className="scale-125" alt="" />

                        <div className="md:block hidden font-montserrat font-bold text-sm">{group && group.comments.length} Comments</div>
                    </div>
                    <SharePopup link={group && 'https://donamix.org/posts/' + group_id} post={group}>
                        <div className="flex flex-row items-center gap-2 cursor-pointer">
                            <img src="/images/home/share.svg" className="w-5 h-5" alt="" />
                            <div className="md:block hidden font-montserrat font-bold text-sm">Share</div>
                        </div>
                    </SharePopup>
                    <Popover placement="bottom-start">
                        <PopoverHandler>
                            <div className="flex flex-row items-center gap-2 cursor-pointer">
                                <img src="/images/home/repost.svg" className="w-5 h-5" alt="" />
                                <div className="md:block hidden font-montserrat font-bold text-sm">Repost</div>
                            </div>
                        </PopoverHandler>
                        <PopoverContent>
                            <>
                                <div className="flex flex-col w-[350px] gap-4 pt-3">

                                    <div className="flex flex-row items-center gap-3 cursor-pointer">
                                        <img src="/images/home/light.svg" alt="" />
                                        <span className="md:block font-montserrat font-bold text-sm text-black" >Share your thoughts:
                                            <span className="font-montserrat font-medium text-black text-xm" > Repost and add your insights to keep the conversation going!</span>
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-center gap-3 cursor-pointer">
                                        <img src="/images/home/refresh.svg" alt="" />
                                        <span className="md:block font-montserrat font-bold text-sm text-black" >Instant repost:
                                            <span className="font-montserrat font-medium text-black text-xm" > Share this content instantly with your connections.</span>
                                        </span>
                                    </div>
                                </div>
                            </>
                        </PopoverContent>

                    </Popover>
                    <GroupCommentC open={isCommentOpen} onClose={onCloseComment} group={group} user={user} appendComment={newComment} editComment={updateComment} deleteComment={deleteComment} />
                </div>
                <SpeedDial placement="top-end">
                    <SpeedDialHandler>
                        <div className="flex flex-row items-center">
                            <div className="flex flex-row items-center cursor-pointer m-[-10px]">
                                <img src="/images/home/like.svg" className="w-6 h-6" alt="" />
                            </div>
                            <div className="flex flex-row mx-0">
                                <img src="/images/home/clap.svg" className="w-6 h-6" alt="" />
                            </div>
                            <div className="flex flex-row mx-0 ml-[-5px]">
                                <img src="/images/home/heart.svg" className="w-6 h-6" alt="" />
                            </div>
                            <div className="flex flex-row gap-2 mx-0 ml-[-5px]">
                                <img src="/images/home/laugh.svg" className="w-6 h-6" alt="" />
                                <div className="font-montserrat font-bold text-base">{group && group.all}</div>
                            </div>
                        </div>
                    </SpeedDialHandler>
                    {user && (
                        <SpeedDialContent>
                            <div className="flex flex-row gap-5 shadow-lg bg-white p-2 rounded-md items-center">
                                <IconTooltip content="All">
                                    <div className="flex flex-row gap-2 mx-0">
                                        <div className="font-montserrat font-bold text-base">All</div>
                                        <div className="font-montserrat font-bold text-base">{group && group.all}</div>
                                    </div>
                                </IconTooltip>
                                <IconTooltip content="Like">
                                    <div className="flex flex-row gap-2 mx-0">
                                        <img src="/images/home/like.svg" alt="" className="w-6 h-6" />
                                        <div className="font-montserrat font-bold text-base">{group && group.like}</div>
                                    </div>
                                </IconTooltip>
                                <IconTooltip content="Bravo">
                                    <div className="flex flex-row gap-2 mx-0">
                                        <img src="/images/home/clap.svg" alt="" className="w-6 h-6 " />
                                        <div className="font-montserrat font-bold text-base">{group && group.clap}</div>
                                    </div>
                                </IconTooltip>
                                <IconTooltip content="Love">
                                    <div className="flex flex-row gap-2 mx-0">
                                        <img src="/images/home/heart.svg" className="cursor-pointer w-6 h-6 " />
                                        <div className="font-montserrat font-bold text-base">{group && group.heart}</div>
                                    </div>
                                </IconTooltip>
                                <IconTooltip content="Joyful">
                                    <div className="flex flex-row gap-2 mx-0">
                                        <img src="/images/home/laugh.svg" alt="" className="w-6 h-6 cursor-pointer " />
                                        <div className="font-montserrat font-bold text-base">{group && group.laugh}</div>
                                    </div>
                                </IconTooltip>
                            </div>
                        </SpeedDialContent>
                    )}
                </SpeedDial>
            </div>
            {user && (
                <div className="flex flex-row gap-3 items-center">
                    <img src={"/images/group/adidas.png"} />
                    <input
                        value={input.description}
                        name="description"
                        onChange={onInputChange}
                        type='text'
                        placeholder='Add a comment'
                        className="flex-1 border-2 border-gray-300 rounded-sm px-3 py-2"
                        onKeyUp={event => {
                            if (event.key === 'Enter' && !isSaving && input.description) {
                                saveComment()
                            }
                        }} />
                </div>
            )}

        </div>
    )
}

export default GroupFooter;
