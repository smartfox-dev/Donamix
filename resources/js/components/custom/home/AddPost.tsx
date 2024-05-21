import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import YouTube from 'react-youtube';

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
import { User } from '@/lib/validation/user';
import { Post } from '@/lib/validation/post';
import FileUpload from '@/components/common/FileUpload';
import Dropzone from 'react-dropzone'
import { DropzoneArea } from 'material-ui-dropzone'

export type Tag = {
    is_checked: boolean;
    name: string;
};

export type Media = {
    url: string;
};

interface IAddPostProps {
    open: boolean;
    isPerspective: boolean;
    showPhotos: boolean;
    user: User,
    savePerspective: (post: Post) => any,
    onClose: () => void;
}
const AddPost: React.FC<IAddPostProps> = ({
    open,
    isPerspective,
    showPhotos,
    user,
    savePerspective,
    onClose,
}) => {

    const [tags, setTags] = useState<Tag[]>([]);
    const [showAddMedia, setShowAddMedia] = useState<boolean>(false);


    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [newTopic, setNewTopic] = useState('');
    const [addTopic, setAddTopic] = useState<boolean>(false);
    const [urlLink, seturlLink] = useState<string>('');

    const [input, setInput] = useState<{
        description: string;
        video_link: string;
        is_perspective: boolean,
        tags: Array<Tag>,
        medias: Array<File[]>,
    }>({
        description: '',
        video_link: '',
        is_perspective: isPerspective,
        tags: [],
        medias: [],
    });

    const opts = {
        height: '300',
        width: '490',
        playerVars: {
            autoplay: 0,
        },
    };


    useEffect(() => {

        setShowAddMedia(showPhotos)
        setTags([
            {
                is_checked: false,
                name: 'Trends',
            },
            {
                is_checked: false,
                name: 'travel',
            },
            {
                is_checked: false,
                name: 'social',
            },
        ])
    }, [showPhotos]);

    const uploadFiles = (file: File[]) => {
        input.medias.push(file)
    }

    const deleteFiles = (file: File) => {
        input.medias[0] = input.medias[0].filter((media) => media.name != file.name)
    }

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));


        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = value.match(regExp);
        let id = (match && match[7].length == 11) ? match[7] : '';
        console.log("====youtube_id:", id);
        if (id) {
            seturlLink(id)
        }
    };

    const savePostPers = () => {
        if (!user) return;

        input.tags = tags

        input.is_perspective = isPerspective
        input.video_link = urlLink

        setIsSaving(true);

        savePerspective(input)
            .then((res) => {
                setInput((prev) => ({
                    ...prev,
                    description: '',
                    medias: [],
                }));

                setShowAddMedia(false)

                setTags([
                    {
                        is_checked: false,
                        name: 'Trends',
                    },
                    {
                        is_checked: false,
                        name: 'travel',
                    },
                    {
                        is_checked: false,
                        name: 'social',
                    },
                ])
                setIsSaving(false);

            })
    }

    const saveTopic = () => {
        setTags(current => [{ 'is_checked': true, 'name': newTopic }, ...current]);
        setNewTopic('')
    }
    const CheckTag = (tg: Tag) => {
        setTags(
            tags.map((tag) => {
                if (tag.name === tg.name) {
                    tag.is_checked = !tag.is_checked
                    return tg;
                } else {
                    return tag;
                }
            }));
    }

    return (
        <Dialog open={open} handler={onClose}>
            {/* <DialogHeader>sgergdsfgdgf</DialogHeader> */}
            <DialogBody className="">
                <Card className="flex flex-col w-full h-auto rounded-2xl py-5 px-5 justify-between border-none gap-3">
                    <div className="flex flex-row items-center gap-5">
                        <Avatar className='w-[28.11px] h-[28.11px]'>
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
                            value={input.description}
                            name="description"
                            onChange={onInputChange}
                            placeholder={isPerspective ? 'Share your thought, engage in meaningful discussions by expressing your insights, perspectives, and personal encounters on a wide range of topics.' : 'Share your voice!'}
                            className="
                                w-full p-3 min-h-[100px]
                                font-medium
                                font-poppins
                                text-sm !border-0 focus:outline-0 bg-transparent">
                        </textarea>


                    </div>

                    {isPerspective && (
                        <small>Who can see my Perspective?<br></br>Anyone<br></br>My Connections</small>
                    )}

                    {urlLink && (

                        <div className="flex flex-row justify-between w-[100px] h-auto">
                            <YouTube
                                videoId={urlLink}
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
                            {isPerspective && (

                                tags.map((item, i) => (

                                    item.is_checked ? (
                                        <Button key={`tag-${i}`} className="font-poppins font-medium text-sm p-5" onClick={() => CheckTag(item)}>#{item.name}</Button>

                                    ) : (
                                        <Button key={`tag-${i}`} className="font-poppins font-medium text-sm p-5 bg-[#F4F4F4] text-black" onClick={() => CheckTag(item)}>#{item.name}</Button>
                                    )

                                ))

                            )
                            }

                            {isPerspective && (
                                <Button className="font-poppins font-medium text-sm p-5 bg-[#B5B5B5]" onClick={() => setAddTopic(!addTopic)}>Add Topic</Button>
                            )}



                        </div>

                        <Button className="font-inter font-semibold text-xs" disabled={isSaving || input.description == ''} onClick={savePostPers}>Post</Button>

                    </div>
                    <div className='flex flex-row w-full'>
                        {isPerspective && addTopic && (
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
                                            text-sm border-1 focus:outline-0 bg-transparent'/>
                        )}
                        {isPerspective && newTopic && (
                            <Button className="font-inter font-semibold text-xs" onClick={() => saveTopic()}>Save</Button>
                        )}
                    </div>
                    {showAddMedia && (
                        <DropzoneArea
                            filesLimit={15}
                            dropzoneClass="drapdrop"
                            showAlerts={false}
                            dropzoneText="Add Photos / Videos or Drag and Drop"
                            onDrop={acceptedFiles => uploadFiles(acceptedFiles)}
                            onDelete={acceptedFiles => deleteFiles(acceptedFiles)}
                        />
                    )

                    }


                    <div className="flex flex-row gap-3 items-center cursor-pointer" onClick={() => setShowAddMedia(!showAddMedia)}>
                        <img src='/images/home/Framephoto.png' alt="" />
                        <div className="md:block hidden font-inter font-semibold text-xs text-[#999999]">Photo/Video</div>
                    </div>
                </Card>
            </DialogBody>
        </Dialog>
    )
}

export default AddPost;
