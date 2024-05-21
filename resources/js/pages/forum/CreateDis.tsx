import React, { useState } from 'react'
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from '@material-tailwind/react';
import  Button  from '@/components/common/Button';
import { Select, Option } from "@material-tailwind/react";
import MyComponent from '@/components/common/RichTextEditor';
import { useAuthContext } from '@/context/AuthContext';
import axios, { AxiosError } from 'axios';

import { Forum, forumValidator } from '@/lib/validation/forum';
import CONSTANTS from '@/config/constants';
import { toast } from 'react-hot-toast';

import { IoMdCloseCircle } from "react-icons/io";
import ReactSunEditor from 'suneditor-react';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
interface ICreateDisProps {
    open: boolean;
    onClose: () => void;
}

const CreateDis: React.FC<ICreateDisProps> = ({
    open,
    onClose,
}) => {

    const { user } = useAuthContext();
    const [errors, setErrors] = useState({});
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')

    const handleCategory = (event) => {
        setCategory(event)
    }

    const submitForum = () => {
        axios
            .post(`${apiUrl}/forum/store`, {
                'title': title,
                'user_id': user.id,
                'category_id': parseInt(category),
                'description': content
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
                    <h3 className="font-bold text-lg">Create Discussion</h3>
                    <IoMdCloseCircle className="text-[#DDDDDD] scale-150 cursor-pointer" onClick={onClose} />
                </div>
                <div className="flex flex-row flex-wrap gap-4 justify-between">
                    <div className="flex flex-col sm:w-[48%] w-[100%] gap-3 items-center">
                        <label htmlFor="title" className="font-bold text-sm">Title of Discussion</label>
                        <input id="title" type="text" placeholder="Enter Title of Discussion" className="text-sm p-3 bg-[#F0F0F0] rounded-lg w-[90%]" onChange={(e) => setTitle(e.target.value)} />
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
                        onChange={setContent}
                    />
                    <div className="flex justify-end mt-3 p-2">
                        <Button variant="secondary" className="bg-black text-white left-0 " onClick={submitForum}>Submit</Button>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    )
}

export default CreateDis;
