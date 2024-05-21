import React from 'react'
import { useState, useEffect } from 'react';

import { Video, videoValidator } from '@/lib/validation/video';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { updatePost, deletePhoto } from '@/api/post';
import { videoEdit } from '@/api/video';
import { User } from '@/lib/validation/user';
import YouTube from 'react-youtube';
import { DropzoneArea } from 'material-ui-dropzone'

import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from '@material-tailwind/react';
// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Button from '@/components/common/Button'


export type Tag = {
    is_checked: boolean;
    name: string;
};

interface IEditVideoProps {
    currentItem: Video;
    user: User,
    open: boolean;
    onClose: () => void;
    saveEditedItem: (arg: Video) => void,
    destroyPhoto: (arg: any) => void
}

const EditVideo: React.FC<IEditVideoProps> = ({
    currentItem,
    open,
    user,
    onClose,
    saveEditedItem,
    destroyPhoto
}) => {

    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [item, setItem] = useState<Video>({});
    const [showAddMedia, setShowAddMedia] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([]);
    const [newTopic, setNewTopic] = useState('');
    const [addTopic, setAddTopic] = useState<boolean>(false);
    const opts = {
        height: '300',
        width: '490',
        playerVars: {
            autoplay: 0,
        },
    };

    useEffect(() => {
        if (currentItem) {
            setItem((prev) => ({
                ...prev,
                id: currentItem.id,
                user_id: currentItem.user_id,
                description: currentItem.description,
                video_link: currentItem.video_link,
            }));
        }
    }, [currentItem]);

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setItem((prev) => ({
            ...prev,
            description: value,
        }));

        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = value.match(regExp);
        let id = (match && match[7].length == 11) ? match[7] : '';
        if (id) {
            setItem((prev) => ({
                ...prev,
                video_link: id,
            }));
        }

    };


    const editPost = () => {

        setIsSaving(true);
        videoEdit(item)
            .then((res: any) => {
                    saveEditedItem(res.data)
                    onClose()
                    toast.success(res.message);
            })
            .catch((err) => {
                console.log('Error while creating a blog:', err);
            })
            .finally(() => {
                setIsSaving(false);
            });
    }

    return (
        <Dialog open={open} >
            <DialogBody className="">
                <Card className="flex flex-col w-full h-auto rounded-2xl py-5 px-5 justify-between border-none gap-3">
                    <div className="flex flex-row items-center gap-5">
                        <Avatar className="w-[65px] h-[65px]">
                            <AvatarImage src={user && user.avatar} alt="" />
                            <AvatarFallback>
                                {user && user.username
                                    .split(' ')
                                    .map((subName) => subName.slice(0, 1))
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="font-medium font-poppins text-lg">{user && user.username}</div>
                    </div>

                    <div className="px-2 rounded-t-3xl py-2 h-auto bg-[#F7F7F7] font-poppins font-medium text-sm text-[#818181]">
                        <textarea
                            value={item.description}
                            name="description"
                            onChange={onInputChange}
                            placeholder="Share your thought, engage in meaningful discussions by expressing your insights, perspectives, and personal encounters on a wide range of topics."
                            className="
                                w-full pt-3 min-h-[100px]
                                font-medium
                                font-poppins
                                text-sm !border-0 focus:outline-0 bg-transparent">{item.description}
                        </textarea>
                    </div>

                    {item.video_link && (

                        <div className="flex flex-row justify-between w-[100px] h-auto">
                            <YouTube
                                videoId={item.video_link}
                                opts={opts}
                                onReady={(event) => {
                                    // access to player in all event handlers via event.target
                                    event.target.pauseVideo();
                                }}
                            />
                        </div>

                    )}


                    <div className="flex flex-row justify-between mt-5">

                        <Button className="font-inter font-semibold text-xs" disabled={isSaving } onClick={editPost}>Post</Button>
                        <Button className="font-inter font-semibold text-xs" disabled={isSaving } onClick={onClose}>Cancel</Button>

                    </div>


                </Card>
            </DialogBody>
        </Dialog>
    )
}

export default EditVideo;
