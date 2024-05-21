import React, { useState } from 'react'
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
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
import FileUpload from '@/components/common/FileUpload';
import countryList from '@/components/common/CountryList';
const apiUrl = import.meta.env.VITE_BACKEND_API as string;

interface ICreateJobProps {
    open: boolean;
    onClose: () => void;
    loadApply: () => void;
}

const CreateJob: React.FC<ICreateJobProps> = ({
    open,
    onClose,
    loadApply,
}) => {

    const { user } = useAuthContext();
    const [errors, setErrors] = useState({});
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [logo, setLogo] = useState('')
    const [companyName, setcompanyName] = useState('')
    const [employType, setEmployType] = useState('')
    const [country, setCountry] = useState('')
    const [salary, setSalary] = useState('')

    const handleEmployType = (event) => {
        setEmployType(event)
    }

    const handleCountry = (event) => {
        setCountry(event)
    }

    const onUploadFile = ({ url }) => {
        console.log("===url:", url)
        setLogo(url);
    }
    const submitForum = () => {
        axios
            .post(`${apiUrl}/job`, {
                logo: logo,
                title: title,
                user_id: user.id,
                companyName: companyName,
                salary: salary,
                employ_type: employType,
                country: country,
                description: content
            })
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    toast.success('Success')
                    loadApply();
                } else {
                    console.log(res);
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while getting my jobs:', err);
            })
            .finally(() => {
            });
    }

    return (
        <Dialog open={open} handler={onClose}>
            <DialogBody className="flex flex-col p-3 gap-5">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold text-lg">Create Job</h3>
                    <IoMdCloseCircle className="text-[#DDDDDD] scale-150 cursor-pointer" onClick={onClose} />
                </div>
                <div className='flex flex-col justify-center items-center gap-4 cursor-pointer'>
                    <FileUpload onSuccess={onUploadFile}>
                        <label
                            className={`w-24 h-24 rounded-full flex justify-center items-center cursor-pointer ${logo ? '' : 'bg-gray-300'}`}
                            style={{
                                background: logo ? `url('${logo}') center center/cover` : '',
                            }}
                        >
                            {!logo && (
                                <img src='/images/job/upload_icon.png' />
                            )}
                        </label>
                    </FileUpload>
                </div>
                <div className="flex flex-col w-[100%] gap-3 items-center">
                    <input type="text" placeholder="Insert Title" className="text-sm p-3 bg-[#F0F0F0] rounded-lg w-[90%]" onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Company Name" className="text-sm p-3 bg-[#F0F0F0] rounded-lg w-[90%]" onChange={(e) => setcompanyName(e.target.value)} />
                    <input type="number" placeholder="Salary" className="text-sm p-3 bg-[#F0F0F0] rounded-lg w-[90%]" min="10" onChange={(e) => setSalary(e.target.value)} />
                    <div className="flex flex-col w-[100%] gap-3 items-center">
                        <div className="flex flex-col gap-6 w-[90%]">
                            <Select variant="outlined" label="Type of Employment" className="p-3 rounded-lg bg-[#F0F0F0]" onChange={(val) => setEmployType(val)} value={employType}>
                                <Option value="Full Time">Full Time</Option>
                                <Option value='Part Time'>Part Time</Option>
                                <Option value='Contract'>Contract</Option>
                                <Option value='Internship'>Internship</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col w-[100%] gap-3 items-center">
                        <div className="flex flex-col gap-6 w-[90%]">
                            <Select variant="outlined" label="Country" className="p-3 rounded-lg bg-[#F0F0F0]" onChange={(val) => setCountry(val)} value={country}>
                                {countryList.map((item, index) => (
                                    <Option value={item.label} key={index}>{item.label}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col w-[90%] gap-3 bg-white py-2">
                        <ReactSunEditor
                            height="100px"
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
                            <Button className="bg-black text-white left-0 " onClick={submitForum}>Create Job</Button>
                        </div>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    )
}

export default CreateJob;