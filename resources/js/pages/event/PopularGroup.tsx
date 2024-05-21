
import { Button } from "@/components/ui/button";
import Job from ".";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GroupFooter from '@/components/common/GroupFooter';
import { useAuthContext } from "@/context/AuthContext";
import { Group } from '@/lib/validation/group';
import { User } from '@/lib/validation/user';
import { GroupComment } from '@/lib/validation/groupcomment';
import Dropdown from './Dropdown';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PostCard from '@/components/widgets/post/PostCard';

// interface IPostCardProps {
//     id: any,
//     coverPhoto: any,
//     name: any,
//     difTime: any;
//     load: any,
//     page: any,
//     item: Group,
//     addComment: (cmt: GroupComment, post: Group) => void,
//     updateComment: (cmt: GroupComment, post: Group) => void,
//     destroyComment: (cmt: GroupComment, post: Group) => void,
//     updateEmoticon: (arg: String, post: Group) => void
//     removePhoto: (arg: any, post: Group) => void
// }


const PopularGroup = ({
    id,
    // coverPhoto,
    group_id,
    name,
    difTime,
    load,
    item,
    addComment,
    updateComment,
    destroyComment,
    updateEmoticon,
}) => {
    console.log("=========================item================", group_id)
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthContext();
    const handleClick = () => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page');
        if (page == 'info') {
            navigate(`/group/${id}/?page=info`);
        }
        else {
            navigate(`/group/${id}`);
        }
        window.location.reload();
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

    const addEmoticon = (arg: String) => {
        updateEmoticon(arg, item)
    }
    return (
        <>
            <div className="bg-white rounded-xl px-4 mt-2">
                <div className="flex flex-row gap-3 justify-between items-center py-4 ">
                    <div className="flex flex-row gap-2">
                        <Stack direction="row" spacing={1}>
                            <Avatar alt="Travis Howard"
                                sx={{ width: 60, height: 60 }}
                                src={item?.avatar
                                    ? item?.avatar :
                                    item?.name.substring(0, 2)
                                }
                                className='rounded-full'
                            />
                        </Stack>
                        <div className="flex flex-col gap-3 justify-center">
                            <span className="font-bold">{name}</span>
                            <span>{difTime} ago</span>
                        </div>
                    </div>
                    <Dropdown load={load} item={item} />
                </div>
                <div className="flex justify-center w-full">
                    <img className="w-full max-h-[270px]" src={'/' + item?.medias[0]?.url} />
                </div>
                <div className="py-5">
                    <GroupFooter
                        group={item}
                        user={user}
                        appendComment={appendComment}
                        editComment={editComment}
                        removeComment={removeComment}
                        addEmoticon={addEmoticon}
                        group_id={group_id}
                    />
                </div>
            </div>
        </>
    )
}

export default PopularGroup;