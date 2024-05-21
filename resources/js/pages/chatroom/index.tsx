import React from 'react';
import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import queryString from 'query-string'; // Install this package if it's not yet installed

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
import Collapsible from './Collapsible'
import { getList } from '@/api/chat';
import { useParams } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import {USA} from './USA'
import {Exchange} from './Exchange'
import {Global} from './Global'
import {Entre} from './Entre'
import {Tech} from './Tech'
import {Business} from './Business'
import {Movie} from './Movie'
import {Lebanon} from './Lebanon'
import {Pet} from './Pet'
import {Chat} from './Chat'
import {Creative} from './Creative'
import {Sparkling} from './Sparkling'
import {Travel} from './Travel'
import {Friendly} from './Friendly'
import {Fitness} from './Fitness'
import {Music} from './Music'
import { useAuthContext } from '@/context/AuthContext';
import ChatLeftSidebar from './ChatLeftSidebar';
import ChatRoom from './ChatRoom';
import toast from 'react-hot-toast';

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const Index = () => {
    const location = useLocation();
    const params = useParams();
    console.log(params.id)
    const [list, setList] = useState([])
    const {user} = useAuthContext()
    const [mobile, setMobile] = useState(true)
    const [isPrivateChat, setIsPrivateChat] = useState(false);
    const [mem, setMem] = useState(null)

    const privateSelect = () => {
        setIsPrivateChat(true);
    };


    const load = () => {
        getList()
            .then((res:  any) => {
                setList(res);
            })
            .catch((err) => {
                toast.error('Failed!');
            })
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <div className='flex flex-col lg:p-10 p-5 gap-5'>
                <div className='w-full h-[50px] flex flex-row justify-center items-center'>
                    <span className='font-normal font-montserrat text-lg'><b>Welcome to </b>
                    {list && list.map((item, i) => {
                        if(i === parseInt(params.id)-1) {
                            return (
                                item.title
                            )
                        }
                    })} {user && user.name.toUpperCase()}, Start a Conversation!</span>
                </div>
            <div className='flex lg:flex-row md:flex-row sm:flex-row flex-col w-full h-[90vh]'>
                {!isMobileDevice() ? <>
                    <ChatLeftSidebar isPrivateChat={isPrivateChat} setMem={setMem} setIsPrivateChat={setIsPrivateChat} />
                    <ChatRoom isPrivateChat={isPrivateChat} mem={mem} setIsPrivateChat={setIsPrivateChat} />
                </> : (mobile ? <ChatLeftSidebar isPrivateChat={isPrivateChat} setMobile={setMobile} setMem={setMem} setIsPrivateChat={setIsPrivateChat} /> : <ChatRoom isPrivateChat={isPrivateChat} mem={mem} setMobile={setMobile} setIsPrivateChat={setIsPrivateChat} />)}
            </div>
            {params && params.id === "13" && <USA />}
            {params && params.id === "2" && <Exchange />}
            {params && params.id === "3" && <Global />}
            {params && params.id === "4" && <Entre />}
            {params && params.id === "5" && <Tech />}
            {params && params.id === "6" && <Business />}
            {params && params.id === "7" && <Movie />}
            {params && params.id === "8" && <Lebanon />}
            {params && params.id === "9" && <Pet />}
            {params && params.id === "10" && <Chat />}
            {params && params.id === "11" && <Creative />}
            {params && params.id === "12" && <Sparkling />}
            {params && params.id === "1" && <Travel />}
            {params && params.id === "14" && <Friendly />}
            {params && params.id === "15" && <Fitness />}
            {params && params.id === "16" && <Music />}
        </div>
    )
}

export default Index;
