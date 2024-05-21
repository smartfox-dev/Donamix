import { Button } from "@/components/ui/button";
import Job from ".";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import ReactSunEditor from 'suneditor-react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios, { AxiosError } from "axios";
import CONSTANTS from "@/config/constants";
import { toast } from 'react-hot-toast';
import { setFavoriteStatus } from "@/api/career";
import { useAuthContext } from "@/context/AuthContext";

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

const JobSimple = ({ logo, title, description, salary, companyName, id, country, employ_type, diffTime, fav }) => {
    const navigate = useNavigate();
    console.log("=====favorite", fav)
    const { user } = useAuthContext();
    const [status, setStatus] = useState(false);
    const [tempList, setTempList] = useState(JSON.parse(fav) == null ? [] : JSON.parse(fav));
    const [favorite, setFavorite] = useState(fav);

    const handleClick = () => {
        setStatus(!status);
        const updatedList = [...tempList];
        const index = updatedList.indexOf(user.id);
        if (index !== -1) {
            // User ID exists in the tempList, remove it
            updatedList.splice(index, 1);
        } else {
            // User ID doesn't exist in the tempList, add it
            updatedList.push(user.id);
        }
        setTempList(updatedList);
        console.log("====update_job_list:", updatedList)
        setFavoriteStatus({ id: id, user_id: user.id, favorite: JSON.stringify(updatedList) })
            .then((res) => {
                console.log("===save_data:", res.code)
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })
    }

    useEffect(() => {
        if (tempList && user?.id) {
            const index = tempList.indexOf(user.id);
            if (index !== -1) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        }
    }, [tempList, user])
    return (
        <>
            <div className="bg-white rounded-xl">
                <div className="px-8 py-4 flex relative">
                    <img className="w-20 h-20" src={logo} />
                    <div className="flex flex-col justify-between pl-5">
                        <span className="text-[25px] font-bold text-[#3C3C3C] ml-2 hover:underline cursor-pointer" onClick={() => navigate(`/jobs/${id}`)}>{title}</span>
                        <span className="text-sm text-[#3C3C3C]">{companyName}</span>
                    </div>
                    <div className="absolute right-[20px] cursor-pointer">
                        {status ?
                            <FavoriteIcon onClick={handleClick} sx={{ color: 'red' }} />
                            :
                            <FavoriteBorderIcon onClick={handleClick} sx={{ color: 'black' }} />
                        }
                    </div>
                </div>
                <div className="px-8 py-4 flex gap-2">
                    <Button className='rounded-full font-normal text-sm'>
                        <img className='w-6 h-6 mr-2' src='/images/job/location.png' />
                        {country}
                    </Button>
                    <Button className='rounded-full font-normal text-sm'>
                        <img className='w-6 h-6 mr-2' src='/images/job/school.png' />
                        3 years exp
                    </Button>
                    <Button className='rounded-full font-normal text-sm'>
                        <img className='w-6 h-6 mr-2' src='/images/job/schedule.png' />
                        {employ_type}
                    </Button>
                </div>
                <div className='px-8 py-4 flex flex-row gap-3 items-center'>
                    <img src='/images/job/history.png' />
                    <span>Posted {diffTime} ago</span>
                    <span className='text-[25px] font-bold pl-3'>${salary}/mo</span>
                </div>
            </div>
        </>
    )
}

export default JobSimple;
