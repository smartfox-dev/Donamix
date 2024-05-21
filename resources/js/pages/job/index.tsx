import React from 'react'
import { useState, useEffect } from 'react';
// import { SelectedButtonProvider } from './SelectedButtonContext';
// import { useSelectedButtonState } from './SelectedButtonContext';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import JobSimple from './JobSimple';
import CreateJob from './CreateJob';
import ApplyJob from './ApplyJob';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { calculateTimeDifference } from '@/lib/utils';
const apiUrl = import.meta.env.VITE_BACKEND_API as string;

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

export default function Job() {
  const [isSelectedButton, setIsSelectedButton] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [jobs, setJobs] = useState([])
  const [visibleJobs, setVisibleJobs] = useState(6);

  const handleLoadMore = () => {
    setVisibleJobs(prevVisibleJobs => prevVisibleJobs + 6);
  };

  const load = () => {
    setIsLoading(true);
    axios.get(`${apiUrl}/job`)
      .then((res: any) => {
        console.log("=====job_data:", res.data)
        setJobs(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.warn('Error while loading blogs', err);
      })
      .finally(() => {
      });
  }
  useEffect(() => {
    load();
  }, []);

  const [isCreateJobOpen, setIsCreateJobOpen] = useState<boolean>(false)
  const onCreateJob = () => {
    setIsCreateJobOpen(true);
  }
  const onCloseCreateJob = () => {
    setIsCreateJobOpen(false);
  }

  const loadApply = () => {
    load();
    onCloseCreateJob();
  }
  const [isSelectJob, setIsSelectJob] = useState<boolean>(false)
  const navigate = useNavigate();
  const onSelectJob = () => {
    setIsSelectJob(true);
  }
  const onSearchInput = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  }
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      job.description.toLowerCase().includes(searchValue.toLowerCase())
  );
  if (isLoading) {
    return (
      <div className="items-center justify-center flex w-full h-[300px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="sm:flex-1 flex-col bg-dashboard-background w-full mainBody">
      <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
        <div className="rounded-t-full">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5794587985510139"
            data-ad-slot="3734166205"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
        <div className='flex flex-row justify-between'>
          <span className='text-[30px] font-bold'>Jobs</span>
          <Button className='rounded-full font-normal' onClick={onCreateJob}>
            <img className='w-6 h-6 mr-2' src='/images/job/plus-circle.png' />
            Create Job
          </Button>
          <CreateJob open={isCreateJobOpen} onClose={onCloseCreateJob} loadApply={loadApply} />
        </div>
        <div className='flex flex-row justify-between rounded-full bg-white mt-5'>
          <input className='w-full px-8 py-4 rounded-full' type='input' placeholder='Search'
            value={searchValue}
            onChange={onSearchInput}
          >
          </input>
          <img className='h-full w-auto p-4' src='/images/job/search.png' />
        </div>
        <div className='flex flex-col gap-4'>
          {
            filteredJobs.slice(0, visibleJobs).map((job, index) => <JobSimple
              key={index}
              id={job.id}
              logo={job.logo}
              title={job.title}
              description={job.description}
              companyName={job.companyName}
              salary={job.salary}
              country={job.country}
              employ_type={job.employ_type}
              fav={job.favorite}
              diffTime={calculateTimeDifference(job.created_at)}
            />)
          }
        </div>
        {filteredJobs.length >= visibleJobs ?
          <div className="mt-20 flex justify-center items-center">
            <Button className="rounded-full" onClick={handleLoadMore}>Load More</Button>
          </div>
          :
          <div />
        }
      </div>
    </div >
  )
}