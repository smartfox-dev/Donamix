import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import CreateDis from './CreateDis';
import axios, { AxiosError } from 'axios';
import { getForums, getIntro, getGuide, getEducation, getContribution, getHelp, getGeneral, getFeedback, getRandom, getChat, getMobile } from '@/api/forum';
import { useNavigate } from 'react-router-dom';

export default function ForumHome({ selectButton }) {
    const [forums, setForum] = useState([])
    const [fiveforums, setFiveForum] = useState([])
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const updateStateButton = (val) => {
        if( val == 1) {
            getIntro()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 2) {
            getGuide()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 3) {
            getEducation()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 4) {
            getContribution()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 5) {
            getHelp()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 6) {
            getGeneral()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 7) {
            getFeedback()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 8) {
            getRandom()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 9) {
            getChat()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
        else if(val == 10) {
            getMobile()
                .then((res: any) => {
                    console.log(res)
                    setForum(res);
                })
                .catch((err) => { })
        }
    }

    const loading = () => {
        setLoading(true)
    }

    const [isCreateDisOpen, setIsCreateDisOpen] = useState<boolean>(false)
    const onCreateDis = () => {
        setIsCreateDisOpen(true);
    }
    const onCloseCreateDis = () => {
        setIsCreateDisOpen(false);
    }

    const load = () => {
        getForums()
            .then((res: any) => {
                console.log(res)
                setForum(res);
                setFiveForum(res.slice(0, 5))
                setIsCreateDisOpen(false);
            })
            .catch((err) => {console.log(err)})
    }

    const handleDetail = (id: any) => {
        navigate('/forum/' + id)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row rounded-t-3xl bg-black items-center gap-8 justify-center p-6">
                <FaPlus className="bg-white rounded-full border-none scale-150 cursor-pointer" onClick={onCreateDis} />
                <CreateDis open={isCreateDisOpen} onClose={onCloseCreateDis} />
                <p className="font-sans font-bold text-lg text-white">New Discussion</p>
            </div>
            <div className="grid md:grid-cols-5 md:gap-4 grid-cols-2 gap-1">
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(1)}>Introductions</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(2)}>Guidelines</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(3)}>Education</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(4)}>Contribution</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(5)}>Help & Support</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(6)}>General</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(7)}>Feedback</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(8)}>Random</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(9)}>Chat Rooms</Button>
                <Button className="col-span-1 hover:bg-primary hover:text-white bg-secondary text-black" onClick={() => updateStateButton(10)}>Mobile App</Button>
            </div>
            <div className="flex flex-col gap-6">
                {isLoading ? forums.map((forum, i) => (
                    <div className="w-full h-auto rounded-t-3xl flex flex-col gap-5 bg-white p-5 cursor-pointer" key={i} onClick={(e) => {handleDetail(forum.id)}}>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3">
                                <img src={forum.user.avatar} className="w-[53px] h-[53px]" alt="logo" />
                                <div className="flex flex-col">
                                    <h3 className="font-sans font-bold text-lg">{forum.title}</h3>
                                    <p className="font-sans font-normal text-sm text-[#999999]">Posted by {forum.user.username} {forum.time_ago}</p>
                                    <p className="font-sans font-normal text-sm text-[#999999] sm:hidden block">{forum.category.title}</p>
                                </div>
                            </div>
                            <div className="min-w-[125px] p-2 sm:flex sm:justify-center sm:items-center text-white text-base font-bold align-middle bg-black rounded-md hidden">{forum.category}</div>
                        </div>
                        <div className="flex flex-row gap-3 items-center pl-16">
                            <img src="/images/home/comment.svg" className="scale-125" alt="" />
                            <p className="font-montserrat font-bold text-lg">{forum.comments && forum.comments.length ? forum.comments.length : 0}</p>
                        </div>
                    </div>
                )) : fiveforums.map((forum, i) => (
                    <div className="w-full h-auto rounded-t-3xl flex flex-col gap-5 bg-white p-5 cursor-pointer" key={i} onClick={(e) => {handleDetail(forum.id)}}>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3">
                                <img src={forum.user.avatar} className="w-[53px] h-[53px]" alt="logo" />
                                <div className="flex flex-col">
                                    <h3 className="font-sans font-bold text-lg">{forum.title}</h3>
                                    <p className="font-sans font-normal text-sm text-[#999999]">Posted by {forum.user.username} {forum.time_ago}</p>
                                    <p className="font-sans font-normal text-sm text-[#999999] sm:hidden block">{forum.category.title}</p>
                                </div>
                            </div>
                            <div className="min-w-[125px] p-2 sm:flex sm:justify-center sm:items-center text-white text-base font-bold align-middle bg-black rounded-md hidden">{forum.category}</div>
                        </div>
                        <div className="flex flex-row gap-3 items-center pl-16">
                            <img src="/images/home/comment.svg" className="scale-125" alt="" />
                            <p className="font-montserrat font-bold text-lg">{forum.comments && forum.comments.length ? forum.comments.length : 0}</p>
                        </div>
                    </div>))}

                <div className="flex justify-center">
                    {forums.length >= 6 && <Button
                        className="mt-3 rounded-full"
                        onClick={loading}
                    >
                        Load More
                    </Button>}

                </div>
            </div>
        </div>
    )
}
