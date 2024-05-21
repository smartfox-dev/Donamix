import React, { useEffect, useState } from 'react'

import Button from '@/components/common/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MyComponent from '@/components/common/RichTextEditor';
import { FaPlus } from "react-icons/fa";
import CreateDis from './CreateDis';
import { FaRegCommentDots } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getIntro } from '@/api/forum';
import CONSTANTS from '@/config/constants';

export default function ForumIntro({ selectButton }) {

    const [intros, setIntro] = useState([])
    const [isCreateDisOpen, setIsCreateDisOpen] = useState<boolean>(false)
    const onCreateDis = () => {
        setIsCreateDisOpen(true);
    }
    const onCloseCreateDis = () => {
        setIsCreateDisOpen(false);
    }

    const updateStateButton = (val) => {
        // console.log(val, "---------------------");
        selectButton(val);
    }

    const load = () => {
        getIntro()
            .then((res: any) => {
                console.log(res)
                setIntro(res);
            })
            .catch((err) => { })
    }

    useEffect(() => {
        load();
    })

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row rounded-t-3xl bg-black items-center gap-8 justify-center p-6">
                <FaPlus className="bg-white rounded-full border-none scale-150 cursor-pointer" onClick={onCreateDis} />
                <CreateDis open={isCreateDisOpen} onClose={onCloseCreateDis} />
                <p className="font-sans font-bold text-lg text-white">New Discussion</p>
            </div>
            <div className="grid md:grid-cols-5 md:gap-4 grid-cols-2 gap-1">
                <Button className="col-span-1 hover:bg-secondary hover:text-black bg-primary text-white" onClick={() => updateStateButton(1)}>Introductions</Button>
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
                {intros.map((forum, i) => (
                    <div className="w-full h-auto rounded-t-3xl flex flex-col gap-5 bg-white p-5" key={i}>
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
                        <p className="font-sans font-normal text-sm text-[#6D6D6D] pl-16 break-words"><div dangerouslySetInnerHTML={{ __html: forum.description }} /></p>
                        <div className="flex flex-row gap-3 items-center pl-16">
                            <img src="/images/home/comment.svg" className="scale-125" alt="" />
                            <p className="font-montserrat font-bold text-lg">{forum.comment.length}</p>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center">
                    <Button
                        className="mt-3 rounded-full"
                    // onClick={load}
                    // disabled={isLoading || from >= realCount}
                    >
                        Load More
                    </Button>
                </div>
            </div>
        </div>
    )
}
