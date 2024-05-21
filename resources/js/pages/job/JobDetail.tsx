import React from 'react'
import { useState, useEffect } from 'react';
// import { SelectedButtonProvider } from './SelectedButtonContext';
// import { useSelectedButtonState } from './SelectedButtonContext';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import ApplyJob from './ApplyJob';
import PopularJob from './PopularJob';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuthContext } from '@/context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const apiUrl = import.meta.env.VITE_BACKEND_API as string;
declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[];
    }
}

export default function JobDetail() {
    const navigate = useNavigate();
    const [itemCount, setItemCount] = useState(4);
    const { id } = useParams();
    const [detail, setDetail] = useState("description");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user } = useAuthContext();
    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState({});
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const load = () => {
        setIsLoading(true);
        axios.get(`${apiUrl}/job`)
            .then((res: any) => {
                const item = res.data.find((job) => job.id == id);
                const items = res.data.filter((job) => job.id != id)
                setJobs(items)
                setSelectedJob(item);
                console.log("=====selected_job:", item)
                setIsLoading(false)
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })
    }

    useEffect(() => {
        load();
    }, []);

    const handleDetail = (info) => {
        setDetail(info);
    }

    const [isApplyJobOpen, setIsApplyJobOpen] = useState<boolean>(false)
    const onApplyJob = () => {
        setIsApplyJobOpen(true);
    }
    const onCloseApplyJob = () => {
        setIsApplyJobOpen(false);
    }

    const loadApply = () => {
        load();
        onCloseApplyJob();
    }

    if (isLoading) {
        return (
            <div className="items-center justify-center flex w-full h-[300px]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="sm:flex-1 flex-col bg-dashboard-background w-full">
            <div className="px-4 w-full h-full flex flex-col gap-8">
                <div className="rounded-t-full">
                    <ins className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-5794587985510139"
                        data-ad-slot="3734166205"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
                <div className='bg-white rounded-xl px-4 py-3'>
                    <ArrowBackIcon className="cursor-pointer mt-2" onClick={() => navigate('/jobs')} />
                    <div className='flex flex-col justify-center items-center pt-8 gap-2'>
                        <img className="w-[135px] h-[135px]" src={selectedJob?.logo} />
                        <span className='text-[25px] font-bold'>{selectedJob?.title}</span>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <img className='w-6 h-6 mr-2' src='/images/job/map-pin.png' />
                            <span className="text-sm text-[#3C3C3C]">{selectedJob?.country}</span>
                        </div>
                        <div className='flex flex-row gap-3 font-bold'>
                            <span className="text-sm text-[#3C3C3C] bg-[#F0F0F0] p-3 rounded-md">Freelance</span>
                            <span className="text-sm text-[#3C3C3C] bg-[#F0F0F0] p-3 rounded-md">{selectedJob?.employ_type}</span>
                        </div>
                    </div>
                    <div className='bg-gray-300 h-[1px] mt-5' />
                    <div className='bg-[#F0F0F0] flex flex-row justify-center items-center mt-5 rounded-md'>
                        {
                            detail === "description" ? <Button className='w-1/3' onClick={() => { handleDetail("description") }}>Description</Button> : <span className='w-1/3 text-center cursor-pointer' onClick={() => { handleDetail("description") }}>Description</span>
                        }
                        {
                            detail === "company" ? <Button className='w-1/3' onClick={() => { handleDetail("company") }}>Company</Button> : <span className='w-1/3 text-center cursor-pointer' onClick={() => { handleDetail("company") }}>Company</span>
                        }
                        {
                            detail === "applicant" ? <Button className='w-1/3' onClick={() => { handleDetail("applicant") }}>Applicant</Button> : <span className='w-1/3 text-center cursor-pointer' onClick={() => { handleDetail("applicant") }}>Applicant</span>
                        }
                    </div>
                    <div className='flex flex-col mt-10'>
                        {
                            detail === 'description' &&
                            <div className='gap-5'>
                                <h1 className='text-[25px] font-bold px-1'>Job Descriptions</h1>
                                <div className="py-4 px-1">
                                    {showFullDescription ? (
                                        <span dangerouslySetInnerHTML={{ __html: selectedJob?.description }} />
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: `${selectedJob?.description?.slice(0, 100)}...` }} />
                                    )}
                                    <div onClick={toggleDescription} className="flex cursor-pointer text-blue-500 underline w-full justify-end">
                                        {showFullDescription ? 'Read Less' : 'Read More'}
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            detail === 'company' &&
                            <div className='flex flex-row items-baseline gap-1'>
                                <span className='text-[18px]'>Name: </span>
                                <h1 className='text-[20px]'>{selectedJob?.companyName}</h1>
                            </div>
                        }
                        {
                            detail === 'applicant' &&
                            <div className='flex flex-col items-baseline gap-1'>
                                <Stack direction="row" spacing={2}>
                                    <Avatar alt="Travis Howard"
                                        sx={{ width: 85, height: 85 }}
                                        src={selectedJob?.user?.avatar
                                            ? selectedJob?.user?.avatar :
                                            selectedJob?.user?.name.substring(0, 2)
                                        }
                                        className='rounded-full'
                                    />
                                </Stack>
                                <div className='flex flex-row items-baseline'>
                                    <span className='text-[18px]'>Name:</span>
                                    <h1 className='text-[20px]'>&nbsp;{ selectedJob?.user?.name}</h1>
                                </div>
                            </div>
                        }
                        <Button onClick={() => onApplyJob()} className='mt-8'>Apply for this Job Now</Button>
                    </div>
                    <ApplyJob
                        open={isApplyJobOpen}
                        selectedJob={selectedJob}
                        onClose={onCloseApplyJob}
                        loadApply={loadApply}
                    />
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-[25px] font-bold'>Popular Jobs</span>
                    <span className='text-[18px] cursor-pointer' onClick={() => { setItemCount(jobs.length) }}>See All</span>
                </div>
                {jobs.slice(0, itemCount).map((item, index) => (
                    <PopularJob
                        key={index}
                        JobIcon={item.logo}
                        JobTitle={item.title}
                        CompanyName={item.companyName}
                        JobLocation={item.country}
                        id={item.id}
                        fav={item.favorite}
                        employ_type={item.employ_type}
                    />
                ))}
            </div>
        </div >
    )
}