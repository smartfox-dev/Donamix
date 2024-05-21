import { Button } from "@/components/ui/button";
import Job from ".";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setJoinStatus } from "@/api/group";
import { useAuthContext } from "@/context/AuthContext";
import CONSTANTS from "@/config/constants";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

const EventSimple = ({
    id,
    CoverImg,
    GroupName,
    GroupContent,
    page,
    userList,
    item,
}) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [status, setStatus] = useState(false);
    const [tempList, setTempList] = useState(JSON.parse(userList) == null ? [] : JSON.parse(userList));
    const handleClick = () => {
        if (page == 'info') {
            navigate(`/group/${id}/?page=info`)
        }
        else {
            navigate(`/group/${id}`)
        }
    }

    const handleOnClick = () => {
        navigate('/profile/' + item?.user?.username);
    }

    const handleJoin = () => {
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
        setJoinStatus({ id: id, user_id: user.id, user_list: JSON.stringify(updatedList) })
            .then((res) => {
                if (res.code == CONSTANTS.SUCCESS) {
                   
                }
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })


    }

    useEffect(() => {
        console.log("============temp_list:", tempList)
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
            <div className="bg-white rounded-t-xl">
                <div className="flex flex-col p-4 cursor-pointer" onClick={handleClick}>
                    <img src={CoverImg} className="max-h-[250px]" />
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="text-[23px] font-bold hover:underline cursor-pointer justify-start px-5">{GroupName}</div>
                    <div className="flex flex-row gap-4 w-full px-5">
                        <Stack direction="row" spacing={1} onClick={handleOnClick} className="cursor-pointer">
                            <Avatar alt="Travis Howard"
                                sx={{ width: 85, height: 85 }}
                                src={item?.user?.avatar
                                    ? item?.user?.avatar :
                                    item?.user?.name.substring(0, 2)
                                }
                                className='rounded-full'
                            />
                        </Stack>
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-row justify-between items-center">
                                <span className="text-[20px] font-bold hover:underline cursor-pointer">{GroupName}</span>
                                <div className="flex flex-row gap-2">
                                    <img src="/images/group/users.png" />
                                    <span>{tempList.length} Members</span>
                                </div>
                            </div>
                            <span>{GroupContent}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-5 p-4">
                    <Button onClick={handleJoin}>{status ? "Not Interested" : "Interested"} <KeyboardArrowDownIcon /></Button>
                </div>
            </div>
        </>
    )
}

export default EventSimple;