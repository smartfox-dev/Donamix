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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { jobValidator } from '@/lib/validation/job';
import { createJob } from '@/api/career';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
interface IApplyJobProps {
    open: boolean;
    selectedJob: {},
    onClose: () => void;
    loadApply: () => void;
}

const ApplyJob: React.FC<IApplyJobProps> = ({
    open,
    selectedJob,
    onClose,
    loadApply,
}) => {

    const { user } = useAuthContext();
    const [errors, setErrors] = useState({});
    const [cvLetter, setCvLetter] = useState('');
    const [cvLink, setCvLink] = useState('');
    const onUploadFile = ({ url }) => {
        setCvLink(url);
    }

    const submitForum = () => {
        const newJob = jobValidator.parse({
            'user_id': user.id,
            'job_id': selectedJob?.id,
            'cv_letter': cvLetter,
            'cv_link': cvLink,
        })
        createJob(newJob)
            .then((job_res) => {
                if (job_res.code === CONSTANTS.SUCCESS) {
                    axios.post(`${apiUrl}/chat/store`, {
                        'member_id': selectedJob?.user_id,
                        'description':
                            `New Job Application from ${user?.name} <br><br>
                            Hi ${selectedJob?.companyName}, <br><br>
                            I am interested in the job position you posted for ${selectedJob?.title}. <br>
                            Could you please provide me with more details or discuss the application process? <br><br>
                            ${cvLink} <br><br>
                            Looking forward to hearing from you soon.
                            `
                        ,
                        'audio': '',
                        'room_id': 17
                    })
                        .then((res) => {
                            if (res.data.message === CONSTANTS.SUCCESS) {
                                toast.success('Applied successfully');
                                setCvLetter('');
                                setCvLink('');
                                setErrors({});
                                loadApply();
                            }
                        })
                }
            })
            .catch((err) => {
                setErrors(err.errors);
                console.log('Error while getting my jobs:', err);
            })

    }

    return (
        <Dialog open={open} handler={onClose}>
            <DialogBody className="flex flex-col p-3 gap-5">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold text-lg">Apply Job</h3>
                    <IoMdCloseCircle className="text-[#DDDDDD] scale-150 cursor-pointer" onClick={onClose} />
                </div>
                <div className="px-4 py-4 flex gap-1">
                    <img className="w-20 h-20" src={selectedJob?.logo} />
                    <div className="flex flex-col justify-between pl-5">
                        <span className="text-[25px] font-bold text-[#3C3C3C] ml-2">{selectedJob?.title}</span>
                        <div className='flex flex-row gap-2'>
                            <img className='w-4 h-4' src='/images/job/map-pin.png' />
                            <span className="text-sm text-[#3C3C3C]">{selectedJob?.country}</span>
                        </div>
                        <div className='flex flex-row gap-5 mt-6 font-bold'>
                            <span className="text-sm text-[#3C3C3C]">Freelance</span>
                            <span className="text-sm text-[#3C3C3C]">{selectedJob?.employ_type}</span>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-300 h-[1px] ml-8 mr-4' />
                <div className='flex flex-col justify-center gap-2 items-center px-2'>
                    <span className='w-full text-sm font-bold text-left text-black'>To Apply</span>
                    <textarea className='h-[100px] text-sm p-3 bg-[#F0F0F0] rounded-lg w-[100%] text-black relative'
                        placeholder='Cover Letter'
                        value={cvLetter}
                        onChange={(e) => { setCvLetter(e.target.value) }}
                    />
                </div>
                {errors?.cv_letter &&
                    <div className="text-base text-red-600 px-4">This filed is required!</div>
                }
                <div className='flex flex-col justify-center gap-2 items-center px-2'>
                    <span className='w-full text-sm font-bold text-left text-black'>Attach CV:</span>
                    <div className='flex justify-center items-center h-[150px] text-sm p-3 bg-[#F0F0F0] rounded-lg w-[100%] cursor-pointer'>
                        <FileUpload onSuccess={onUploadFile}>
                            {cvLink ?
                                <CheckCircleIcon sx={{ fontSize: '60px' }} />
                                :
                                <img src='/images/job/Upload_File.png' />
                            }
                        </FileUpload>
                    </div>
                </div>
                {errors?.cv_link &&
                    <div className="text-base text-red-600 px-4">This filed is required!</div>
                }
                <div className="flex w-full mt-3 p-2">
                    <Button className="bg-black text-white left-0 w-full" onClick={submitForum}>Apply to This Job</Button>
                </div>
            </DialogBody>
        </Dialog>
    )
}

export default ApplyJob;