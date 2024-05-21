import React, { useState } from 'react'

import Button from '@/components/common/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MyComponent from '@/components/common/RichTextEditor';

import { FaRegCommentDots } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getGuide } from '@/api/forum';
import CONSTANTS from '@/config/constants';

export default function ForumGuide({ selectButton }) {

    const [guides, setGuide] = useState([])

    const updateStateButton = (val) => {
        // console.log(val, "---------------------");
        selectButton(val);
    }

    const load = () => {
        getGuide()
            .then((res: any) => {
                console.log(res)
                setGuide(res);
            })
            .catch((err) => { })
    }


    return (
        <div className="flex flex-col w-full gap-6">
            <div className="flex sm:flex-row flex-col rounded-t-3xl bg-black items-center gap-8 justify-center p-6">
                <div className="flex flex-row flex-wrap gap-6 items-center">
                    <FaArrowLeftLong className="text-white font-bold rounded-full border-none scale-150 cursor-pointer" onClick={() => updateStateButton(0)} />
                    <p className="font-sans font-bold text-lg text-white text-center">Welcome to Donamix Forums, Your Infotainment Specialist!</p>
                </div>
                <div className="bg-secondary text-black font-bold p-2 rounded-md">Guidelines</div>
            </div>
            <div className="flex flex-col w-full gap-6">
                {guides.map((item, i) => (

                    <div className="w-full h-auto rounded-t-3xl flex flex-col gap-5 bg-white p-5" key={i}>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3">
                                <Avatar className='w-[50px] h-[50px]'>
                                    <AvatarImage src={item.avatar} alt="" />
                                    <AvatarFallback>
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <h3 className="font-poppins font-medium text-lg">{item.hero}</h3>
                                    <p className="font-sans font-normal text-sm text-[#999999]">{item.time_ago}</p>
                                </div>
                            </div>
                        </div>
                        <p className="w-full font-sans font-normal text-sm text-[#6D6D6D] sm:pl-16 sm:pr-10 pl-4 pr-4 break-words"></p>
                        <div className="flex flex-row gap-3 items-center pl-16">
                            <FaRegCommentDots className="scale-150" />
                            <p className="font-montserrat font-bold text-lg">te</p>
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
                <MyComponent />
            </div>
        </div>
    )
}
