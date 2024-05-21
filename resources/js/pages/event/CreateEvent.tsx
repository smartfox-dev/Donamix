import React from 'react'
import { useState, useEffect } from 'react';
// import { SelectedButtonProvider } from './SelectedButtonContext';
// import { useSelectedButtonState } from './SelectedButtonContext';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import EventSimple from './EventSimple';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
import CONSTANTS from '@/config/constants';
import { toast } from 'react-hot-toast';
import { getGroups } from '@/api/group';
import { useAuthContext } from '@/context/AuthContext';
const apiUrl = import.meta.env.VITE_BACKEND_API as string;

export default function CreateEvent() {
  const location = useLocation();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(null);
  const [visibleGroups, setVisibleGroups] = useState(4);
  const handleLoadMore = () => {
    setVisibleGroups(prevVisibleGroups => prevVisibleGroups + 4);
  };

  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState<boolean>(false)
  const onCreateGroup = () => {
    setIsCreateGroupOpen(true);
  }
  const onCloseCreateGroup = () => {
    setIsCreateGroupOpen(false);
  }

  const load = () => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    setPage(page);
    setIsLoading(true);
    getGroups({ params: { page: page } })
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          if (res.data) {
            console.log("====groups_data:", res.data)
            setGroups(res.data)
          }
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.warn('Error while loading blogs', err);
      })
      .finally(() => {
        setIsLoading(false);
      });


    // axios.get(`${apiUrl}/group`, { params: { page: page } })
    //     .then((res: any) => {
    //         console.log("===group:", res.data)
    //         const item = res.data.find((group) => group.id == id);
    //         const items = res.data.filter((group) => group.id != id)
    //         setGroups(items)
    //         setSelectedGroup(item)
    //         setIsLoading(false)
    //     })
    //     .catch((err) => {
    //         console.warn('Error while loading blogs', err);
    //     })
    //     .finally(() => {
    //     });
  }

  useEffect(() => {
    load();
  }, [location.search]);

  const loadApply = () => {
    load();
    onCloseCreateGroup();
  }

  if (isLoading) {
    return (
      <div className="items-center justify-center flex w-full h-[300px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="sm:flex-1 flex-col bg-dashboard-background w-full mainBody">
      <div className="mt-5 sm:px-5 px-2 w-full h-full flex flex-col gap-8">
        <div className="rounded-t-full">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5794587985510139"
            data-ad-slot="3734166205"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
        <span className='text-[30px] font-bold'>Events</span>
        <div className='flex flex-col md:flex-row justify-between gap-5'>
          <div className='flex flex-col sm:flex-row gap-2'>
            <button className='text-black hover:text-white bg-white hover:bg-black px-6 rounded-full text-[15px]  h-10'>For you</button>
            <button className='text-black hover:text-white bg-white hover:bg-black px-6 rounded-full text-[15px]  h-10'>Local</button>
            <button className='text-black hover:text-white bg-white hover:bg-black px-6 rounded-full text-[15px]  h-10'>This Week</button>
            <button className='text-black hover:text-white bg-white hover:bg-black px-6 rounded-full text-[15px]  h-10'>Friends</button>
          </div>
          <Button variant='filled' className='rounded-full font-normal' onClick={onCreateGroup}>
            <img className='w-6 h-6 mr-2' src='/images/job/plus-circle.png' />
            Create Event
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {groups.slice(0, visibleGroups).map((item, index) => (
            <EventSimple
              key={index}
              id={item.id}
              CoverImg={item.cover_photo}
              GroupName={item.group_name}
              GroupContent={item.description}
              page={page}
              userList={item.user_list}
              item={item}
            />
          ))}
        </div>
        {groups.length >= visibleGroups ?
          <div className="mt-20 flex justify-center items-center">
            <Button variant='filled' className="rounded-full" onClick={handleLoadMore}>Load More</Button>
          </div>
          :
          <div />
        }
      </div>
    </div >
  )
}