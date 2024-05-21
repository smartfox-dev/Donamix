import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Group } from '@/lib/validation/group';
import { User } from '@/lib/validation/user';
import { GroupComment, groupcommentValidator } from '@/lib/validation/groupcomment';
import { createGroupOrUpdateComment } from '@/api/post/comment';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import CONSTANTS, { Option } from '@/config/constants';

import {
    Button as DialogButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import CommentCardItem, { CommentCard } from '@/components/custom/GroupCommentCard';
import SubCommentCardItem from '@/components/custom/SubCommentCard';
import '../../assets/css/comment.css';
interface ICommentProps {
    user: User;
    group: Group;
    open: boolean;
    onClose: () => void;
    appendComment: (cmt: GroupComment) => void,
    editComment: (cmt: GroupComment) => void,
    deleteComment: (cmt: GroupComment) => void,

}

const GroupCommentC: React.FC<ICommentProps> = ({
    user,
    group,
    open,
    onClose,
    appendComment,
    editComment,
    deleteComment
}) => {

    const [commentCards, setcommentCards] = useState<GroupComment[]>([]);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [input, setInput] = useState<{
        description: string;
        is_edit: number;
        id: number;

    }>({
        description: '',
        is_edit: 0,
        id: 0,
    });

    const scrollBottom = useRef(null)
    useEffect(() => {
        if (group) {
            setcommentCards(group.comments);
        }
    }, [group]);

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const scrollToBottom = () => {
        scrollBottom.current?.scrollIntoView(
            {
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            })
    }

    const sendItem = (item: CommentCard) => {
        setInput((prev) => ({
            ...prev,
            description: item.description,
            is_edit: 1,
            id: item.id,
        }));
    }

    const deleteItem = (item: CommentCard) => {
        deleteComment(item)
    }

    const saveComment = () => {
        setIsSaving(true);

        const newComment: GroupComment = groupcommentValidator.parse({
            ...input,
            user_id: user.id,
            group_id: group.id,
        });
        createGroupOrUpdateComment(newComment)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {

                    if (input.is_edit == 1) {
                        editComment(res.data)
                    } else {
                        appendComment(res.data)
                        setTimeout(function () {
                            scrollToBottom()
                        }, 700);
                    }

                    setInput((prev) => ({
                        ...prev,
                        description: '',
                        is_edit: 0,
                        id: 0,
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
        <Dialog open={open} handler={onClose} >
            <DialogHeader className="font-poppins font-medium text-xl text-black mt-4">Comments</DialogHeader>
            <DialogBody className="max-h-[70vh] overflow-y-scroll commentDialog">
                {/* <div className> */}
                <div className="flex flex-row flex-wrap gap-3">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="font-poppins font-medium text-base">All</div>
                        <div className="font-poppins font-medium text-base">{group && group.like + group.clap + group.heart + group.laugh}</div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <img src="/images/home/like.png" className="w-6 h-6" alt="" />
                        <div className="font-poppins font-medium text-base">{group && group.like}</div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <img src="/images/home/clap.png" className="w-6 h-6" alt="" />
                        <div className="font-poppins font-medium text-base">{group && group.clap}</div>
                    </div>
                    <div className="flex flex-row gap-2 items-Dcenter">
                        <img src="/images/home/heart.png" className="w-6 h-6" alt="" />
                        <div className="font-poppins font-medium text-base">{group && group.heart}</div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <img src="/images/home/laugh.png" className="w-6 h-6" alt="" />
                        <div className="font-poppins font-medium text-base">{group && group.laugh}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 pt-3" ref={scrollBottom}>
                    {commentCards.map((item, i) => (
                        item.isSub ?

                            item.childs.map((child, j) => (

                                <SubCommentCardItem key={`comment-card-${j}`} item={child} />
                            ))

                            : <CommentCardItem key={`comment-card-${i}`} item={item} sendItem={sendItem} deleteItem={deleteItem} />
                    ))}
                </div>
                {/* </div> */}
            </DialogBody>
            {user && (
                <DialogFooter className="flex flex-row gap-3 px-10 mb-5">
                    <Avatar className="w-[65px] h-[65px] sm:block hidden">
                        <AvatarImage src={user && user.avatar} alt="" />
                        <AvatarFallback>
                            {user && user.username
                                .split(' ')
                                .map((subName) => subName.slice(0, 1))
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
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
                    <DialogButton onClick={saveComment} disabled={isSaving || input.description == ''}>SEND</DialogButton>
                </DialogFooter>
            )}
        </Dialog>
    )
}
export default GroupCommentC;
