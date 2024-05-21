import React from 'react'
import { useState, useEffect } from 'react';

import { Post, postValidator } from '@/lib/validation/post';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { updatePost, deletePhoto } from '@/api/post';
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

interface IEditPostProps {
    currentItem: Post;
    user: User,
    open: boolean;
    onClose: () => void;
    saveEditedItem: (arg: Post) => void,
    destroyPhoto: (arg: any) => void
}

const EditPost: React.FC<IEditPostProps> = ({
    currentItem,
    open,
    user,
    onClose,
    saveEditedItem,
    destroyPhoto
}) => {

    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [item, setItem] = useState<Post>({});
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
                description: currentItem.description,
                is_perspective: currentItem.is_perspective,
                user_id: currentItem.user_id,
                video_link: currentItem.video_link,
                medias: currentItem.medias,
                tags: currentItem.tags,
                new_medias: [],
            }));
        }
    }, [currentItem]);

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setItem((prev) => ({
            ...prev,
            [name]: value,
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

    const CheckTag = (tg: Tag) => {

        let tags = item.tags.map((tag) => {
            if (tag.name === tg.name) {
                tag.is_checked = !tag.is_checked
                return tg;
            } else {
                return tag;
            }
        })

        setItem((prev) => ({
            ...prev,
            tags: tags,
        }));
    }

    const saveTopic = () => {
        item.tags.push({ 'is_checked': true, 'name': newTopic })
        setItem(item);
        setNewTopic('')
    }


    const uploadFiles = (file: File[]) => {
        item.new_medias.push(file)
    }

    const deleteFiles = (file: File) => {
        item.new_medias[0] = item.new_medias[0].filter((media) => media.name != file.name)
    }

    const removePhoto = (photo) => {

        if (confirm('Do you want to remove')) {

            deletePhoto(photo.id)
                .then((res) => {
                    if (res.code === CONSTANTS.SUCCESS) {

                        setItem((prev) => ({
                            ...prev,
                            medias: item.medias.filter((media) => media.url != photo.url),
                        }));

                        destroyPhoto(photo)

                    } else toast.error(res.message);
                })
                .catch((err) => {
                    console.log('Error while creating a blog:', err);
                })
                .finally(() => {
                    setIsSaving(false);
                });

        }

    }

    const editPost = () => {

        setIsSaving(true);
        updatePost(item)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    saveEditedItem(res.data)
                    onClose()
                    toast.success(res.message);


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
        <Dialog open={open} handler={onClose}>
            {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
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
                        <div className="flex flex-row gap-3 flex-wrap">
                            {item.is_perspective == true && (

                                item.tags.map((item, i) => (

                                    item.is_checked ? (
                                        <Button key={`tag-${i}`} className="font-poppins font-medium text-sm p-5" onClick={() => CheckTag(item)}>#{item.name}</Button>

                                    ) : (
                                        <Button key={`tag-${i}`} className="font-poppins font-medium text-sm p-5 bg-[#F4F4F4] text-black" onClick={() => CheckTag(item)}>#{item.name}</Button>
                                    )

                                ))

                            )
                            }

                            {item.is_perspective == true && (
                                <Button className="font-poppins font-medium text-sm p-5 bg-[#B5B5B5]" onClick={() => setAddTopic(!addTopic)}>Add Topic</Button>
                            )}

                            {item.is_perspective == true && addTopic && (

                                <>
                                    <input type="text"
                                        value={newTopic}
                                        name="newTopics"
                                        placeholder='Entrer your topic..'
                                        onChange={event => setNewTopic(event.target.value)}
                                        onKeyUp={event => {
                                            if (event.key === 'Enter') {
                                                saveTopic()
                                            }
                                        }}
                                        className='w-full min-h-[40px]
                                            font-medium
                                            font-poppins
                                            text-sm !border-0 focus:outline-0 bg-transparent'/>

                                    <small className='text-[12px]'>Type enter to add topic</small>

                                </>

                            )}



                        </div>

                        <Button className="font-inter font-semibold text-xs" disabled={isSaving || item.description == ''} onClick={editPost}>Post</Button>

                    </div>



                    {(item.medias && item.medias.length > 0) &&
                        <div className="w-full h-auto rounded-2xl flex flex-wrap gap-2 min-h-[100px] ">
                            {item.medias.map((item, i) => (
                                <div className="relative">
                                    <img className="w-[100px]" src={"/" + item.url} alt="dummy-image" />
                                    <button className="absolute rounded-full w-[35px] top-0 bg-gray-500 text-white p-1 hover:bg-gray-800 m-1" onClick={() => removePhoto(item)}>x</button>
                                </div>
                            ))}
                        </div>
                    }
                    {showAddMedia && (
                        <DropzoneArea
                            filesLimit={15}
                            dropzoneClass="drapdrop"
                            showAlerts={false}
                            dropzoneText="Add Photos / Videos or Drag and Drop"
                            onDrop={acceptedFiles => uploadFiles(acceptedFiles)}
                            onDelete={acceptedFiles => deleteFiles(acceptedFiles)}
                        />
                    )}


                    <div className="flex flex-row gap-3 items-center cursor-pointer" onClick={() => setShowAddMedia(!showAddMedia)}>
                        <img src='/images/home/Framephoto.png' alt="" />
                        <div className="md:block hidden font-inter font-semibold text-xs text-[#999999]">Photo/Video</div>
                    </div>

                </Card>
            </DialogBody>
        </Dialog>
    )
}

export default EditPost;
