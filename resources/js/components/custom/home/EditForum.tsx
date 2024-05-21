import React from 'react'
import { useState, useEffect } from 'react';

import { Forum } from '@/lib/validation/forum';
import CONSTANTS from '@/config/constants';
import { toast } from 'react-hot-toast';
import { updatePost, deletePhoto } from '@/api/post';
import { User } from '@/lib/validation/user';
import YouTube from 'react-youtube';
import { DropzoneArea } from 'material-ui-dropzone'
import { Select, Option } from "@material-tailwind/react";
import MyComponent from '@/components/common/RichTextEditor';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import ReactSunEditor from 'suneditor-react';
import { IoMdCloseCircle } from "react-icons/io";
import Button from '@/components/common/Button';
import axios, { AxiosError } from 'axios';
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from '@material-tailwind/react';
const apiUrl = import.meta.env.VITE_BACKEND_API as string;



interface IEditPostProps {
    currentItem: Forum;
    user: User,
    open: boolean;
    onClose: () => void;
}

const EditForum: React.FC<IEditPostProps> = ({
    currentItem,
    open,
    user,
    onClose,
}) => {

    const [item, setItem] = useState<Forum>({});
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const handleCategory = (event) => {
        setCategory(event)
    }

    useEffect(() => {
        if (currentItem) {
            setItem((prev) => ({
                ...prev,
                id: currentItem.id,
                title: currentItem.title,
                description: currentItem.description,
                category_id: currentItem.category_id
            }));
            console.log(currentItem)
            let category_id = currentItem.category_id
            setCategory(category_id.toString());
            setContent(currentItem.description)
            setTitle(currentItem.title)
        }
    }, [currentItem]);

    const onInputChange = (
        e
    ) => {
        setContent(e)
        console.log(e)
    };

    const submitForum = () => {
        axios
            .post(`${apiUrl}/forum/edit`, {
                'title': title,
                'user_id': user.id,
                'category_id': parseInt(category),
                'description': content,
                'id': item.id
            })
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    toast.success('Success')
                    window.location.reload();
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
        <Dialog open={open} handler={onClose}>
            <DialogBody className="flex flex-col p-3 gap-5">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold text-lg">Edit Discussion</h3>
                    <IoMdCloseCircle className="text-[#DDDDDD] scale-150 cursor-pointer" onClick={onClose} />
                </div>
                <div className="flex flex-row flex-wrap gap-4 justify-between">
                    <div className="flex flex-col sm:w-[48%] w-[100%] gap-3 items-center">
                        <label htmlFor="title" className="font-bold text-sm">Title of Discussion</label>
                        <input id="title" type="text" placeholder="Enter Title of Discussion" className="text-sm p-3 bg-[#F0F0F0] rounded-lg w-[90%]" onChange={(e) => setTitle(e.target.value)} defaultValue={item.title} />
                    </div>
                    <div className="flex flex-col sm:w-[48%] w-[100%] gap-3 items-center">
                        <label htmlFor="category" className="font-bold text-sm">Select a Categories</label>
                        <div className="flex flex-col gap-6 w-[90%]">
                            <Select variant="outlined" label="Choose Categories" className="p-3 rounded-lg bg-[#F0F0F0]" onChange={handleCategory} value={category}>
                                <Option value="1">Introductions</Option>
                                <Option value='2'>Guidelines</Option>
                                <Option value='3'>Education</Option>
                                <Option value='4'>Contribution</Option>
                                <Option value='5'>Help & Support</Option>
                                <Option value='6'>General</Option>
                                <Option value='7'>Feedback</Option>
                                <Option value='8'>Random</Option>
                                <Option value='9'>Chat Rooms</Option>
                                <Option value='10'>Mobile App</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full bg-white p-2">
                    <ReactSunEditor
                        height="300px"
                        width="100%"
                        setOptions={{
                            resizingBar: false,
                            buttonList: [
                                // [
                                //   'formatBlock',
                                //   'font',
                                //   'fontSize',
                                //   'bold',
                                //   'underline',
                                //   'italic',
                                //   'strike',
                                //   'superscript',
                                //   'subscript',
                                //   'removeFormat',
                                // ],
                                [
                                    'blockquote',
                                    'showBlocks',
                                    'fontColor',
                                    'hiliteColor',
                                    'outdent',
                                    'indent',
                                    'align',
                                    'list',
                                    'horizontalRule',
                                    'table',
                                    'link',
                                    'image',
                                    'video',
                                ],
                                // '/',
                                // ['undo', 'redo'],
                                // ['preview'],
                            ],
                        }}
                        defaultValue={currentItem.description}
                        onChange={onInputChange}
                        // onImageUploadBefore={handleUpload}
                    />
                    <div className="flex justify-end mt-3 p-2">
                        <Button  className="bg-black text-white left-0" onClick={submitForum}>Submit</Button>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    )
}

export default EditForum;
