import React, { useState } from 'react'
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
} from '@material-tailwind/react';
import Button from '@/components/common/Button';
import { Select, Option } from "@material-tailwind/react";
import MyComponent from '@/components/common/RichTextEditor';
import { useAuthContext } from '@/context/AuthContext';
import axios, { AxiosError } from 'axios';

import { Forum, forumValidator } from '@/lib/validation/forum';
import CONSTANTS from '@/config/constants';
import { toast } from 'react-hot-toast';

import { IoMdCloseCircle } from "react-icons/io";
import ReactSunEditor from 'suneditor-react';
import RadioButton from '@/components/common/RadioButton';
import PhotoUpload from './UploadBack';
import FileUpload from '@/components/common/FileUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const categories = [
    'Arts & Crafts',
    'Books & Literature',
    'Business & Entrepreneurship',
    'Cooking & Baking',
    'Fashion & Beauty',
    'Fitness & Wellness',
    'Gaming',
    'Music & Film',
    'Outdoor Adventures',
    'Parenting & Family',
    'Photography',
    'Technology & Gadgets',
    'Travel & Exploration',
    'Writing & Poetry',
    'DIY & Home Improvement',
];

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

interface ICreateGroupProps {
    open: boolean;
    loadApply: () => void;
    onClose: () => void;
}

const CreateGroup: React.FC<ICreateGroupProps> = ({
    open,
    loadApply,
    onClose,
}) => {

    const { user } = useAuthContext();
    const [errors, setErrors] = useState({});
    const [coverPhoto, setCoverPhoto] = useState('');
    const [groupName, setGroupName] = useState('')
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState('public');

    const initData = () => {
        setCoverPhoto('');
        setGroupName('');
        setUrl('');
        setCategory('');
        setDescription('');
        setPrivacy('public');
    }
    const handleChange = (event) => {
        setPrivacy(event.target.value);
    };

    const onUploadFile = ({ url }) => {
        console.log("===url:", url)
        setCoverPhoto(url);
    }

    const submitForum = () => {
        let data = {
            user_id: user.id,
            cover_photo: coverPhoto,
            group_name: groupName,
            url: url,
            category: category,
            description: description,
            privacy: privacy
        }
        console.log("====create_group:", data);
        axios
            .post(`${apiUrl}/group/store`, data)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    toast.success('Success')
                    loadApply();
                    initData();
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
                <div className="flex flex-row justify-between items-center px-4">
                    <h3 className="font-bold text-lg text-black">Create Group</h3>
                    <IoMdCloseCircle className="text-[#DDDDDD] scale-150 cursor-pointer" onClick={onClose} />
                </div>
                <div className="flex flex-col w-[100%] gap-4 items-center pb-2">
                    <div className='flex justify-start w-[90%] text-black font-bold'>Add Cover Photo</div>
                    <div className='flex flex-row w-[90%] h-[200px] rounded-lg justify-center items-center gap-4 cursor-pointer bg-[#F0F0F0]'>
                        <FileUpload onSuccess={onUploadFile}>
                            {!coverPhoto ?
                                <div className='flex flex-col gap-3 justify-center items-center'>
                                    <img src='/images/group/instagram.png' />
                                    <span className="font-semibold text-gray-400">Upload Cover Photo</span>
                                </div>
                                :
                                <CheckCircleIcon sx={{ fontSize: '60px' }} />
                            }
                        </FileUpload>
                    </div>
                    <input id="title" type="text" placeholder="Group Name" className="text-sm p-3 bg-[#F0F0F0] rounded-lg w-[90%]" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    <input id="title" type="text" placeholder="Website" className="text-sm p-3 bg-[#F0F0F0] rounded-lg w-[90%]" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <div className="flex flex-col w-[100%] gap-3 items-center">
                        <div className='text-sm bg-[#F0F0F0] rounded-lg w-[90%]'>
                            <Select
                                variant="outlined"
                                label="Category"
                                // className="p-5 rounded-lg bg-white font-bold text-[15px] min-w-0"
                                onChange={(val) => { setCategory(val) }}
                            >
                                {categories.map((item, index) => (
                                    <Option key={index} value={item}>{item}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-2 items-center w-full'>
                        <textarea className='h-[100px] text-sm p-3 bg-[#F0F0F0] rounded-lg w-[90%] text-black'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            maxLength={150}
                        />
                    </div>
                    <div className="flex flex-col w-[90%] gap-3 justify-center bg-[#F0F0F0] py-3 px-4 rounded-lg">
                        <span className="text-black font-bold">Privacy</span>
                        <div className="flex flex-row">
                            <RadioButton
                                label="Public"
                                name="privacy"
                                value="public"
                                checked={privacy === 'public'}
                                onChange={handleChange}
                            />
                            <RadioButton
                                label="Private"
                                name="privacy"
                                value="private"
                                checked={privacy === 'private'}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <Button variant='filled' className="bg-black text-white left-0 w-[90%]" onClick={submitForum}>Create Group</Button>
                </div>

            </DialogBody>
        </Dialog >
    )
}

export default CreateGroup;