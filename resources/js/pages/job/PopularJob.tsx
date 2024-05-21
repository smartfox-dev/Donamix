import { Button } from "@/components/ui/button";
import Job from ".";
import { useState } from "react";
import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios, { AxiosError } from "axios";
import CONSTANTS from "@/config/constants";
import { toast } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

const PopularJob = ({ JobIcon, JobTitle, CompanyName, JobLocation, id, fav, employ_type }) => {
    const [favorite, setFavorite] = useState(fav);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleClick = () => {
        console.log("-------------------")
        setFavorite(favorite == 0 ? 1 : 0);
        axios
            .post(`${apiUrl}/job/favorite`, {
                id: id,
                favorite: favorite == 0 ? 1 : 0,
            })
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    toast.success('Saved successfully')
                } else {
                    console.log(res);
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while getting my jobs:', err);
            })
    }
    return (
        <>
            <div className="bg-white rounded-xl cursor-pointer">
                <div className="px-4 py-4 flex">
                    <img className="w-16 h-16" src={JobIcon} />
                    <div className="flex flex-col justify-center pl-5 w-full relative">
                        <div className="flex flex-row justify-between w-full">
                            <span className="text-sm text-[#3C3C3C]">{CompanyName}</span>
                            <div className="absolute right-[5px] cursor-pointer">
                                {favorite == 0 ?
                                    <FavoriteBorderIcon onClick={handleClick} sx={{ color: 'red' }} />
                                    :
                                    <FavoriteIcon onClick={handleClick} sx={{ color: 'red' }} />
                                }
                            </div>
                        </div>
                        <span className="text-[25px] font-bold text-[#3C3C3C]">{JobTitle}</span>
                    </div>
                </div>
                <div className="px-4 py-2 flex gap-2">
                    <div className='flex flex-row justify-center items-center rounded-full font-normal text-sm'>
                        <img className='w-6 h-6 mr-2' src='/images/job/map-pin.png' />
                        <span className="text-sm text-[#3C3C3C]">{JobLocation}</span>
                    </div>
                </div>
                <div className='px-4 py-2 flex gap-2 font-bold'>
                    <span className="text-sm text-[#3C3C3C] bg-[#F0F0F0] p-3 rounded-md">Freelance</span>
                    <span className="text-sm text-[#3C3C3C] bg-[#F0F0F0] p-3 rounded-md">{employ_type}</span>
                </div>
            </div>
        </>
    )
}

export default PopularJob;