import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from '@material-tailwind/react';
import Button from '@/components/common/Button'
import { Select, Option } from "@material-tailwind/react";
import MyComponent from '@/components/common/RichTextEditor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthContext } from '@/context/AuthContext';

import { IoMdCloseCircle } from "react-icons/io";
import { HiOutlinePhotograph } from "react-icons/hi";
import { create } from '@/api/market'
import { CountryDropdown } from 'react-country-region-selector';
import { DropzoneArea } from 'material-ui-dropzone'
import toast from 'react-hot-toast';

interface ICreateMarketProps {
    open: boolean;
    categories: any;
    onClose: () => void;
}

const CreateMarket: React.FC<ICreateMarketProps> = ({
    open,
    categories,
    onClose,
}) => {
    const { user } = useAuthContext();
    const [birthday, setBirthday] = useState('')
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])

    const handleCreate = () => {
        create({
            'title': title,
            'price': parseInt(price),
            'location': location,
            'category': category,
            'condition': condition,
            'description': description,
            'images': images
        })
            .then((res: any) => {
                    window.location.reload()
                    onClose()
            })
            .catch((err)=> {
                console.warn(err)
                toast.error('Please fill all the fields')
            })
    }

    const handleCategory = (e) => {
        setCategory(e)
    }

    const handleFile = (files) => {
        setImages(files)
    }

    useEffect(() => {
        console.log(user)
        if(user)
        setLocation(user.country)
    }, [user])

    return (
        <Dialog open={open} handler={onClose} >
            <DialogBody className="grid grid-cols-2 p-5 gap-5 overflow-scroll h-[100vh] z-0" style={{zIndex: '300!important'}}>
                <h3 className="col-span-2 font-sans font-extrabold text-2xl">Create Marketplace</h3>
                <div className="col-span-2 flex flex-row">
                    <div className="flex gap-4">
                        <Avatar className='w-[50px] h-[50px]'>
                            <AvatarImage src={user && user.avatar} alt="" />
                            {/* <AvatarFallback>
                                {item.name
                                .split(' ')
                                .map((subName) => subName.slice(0, 1))
                                .join('')}
                            </AvatarFallback> */}
                        </Avatar>
                        <div>
                            <h5 className="font-medium text-black font-poppins">
                                {user && user.name}
                            </h5>
                            <p className='font-poppins text-xs font-medium text-[#AAA]'>{user && user.birthday}</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                    <p className="font-inter font-semibold">Add Photo</p>
                    <div className="w-full h-[250px] rounded-lg bg-[#F3F3F3]">
                        <DropzoneArea
                            filesLimit={15}
                            showAlerts={false}
                            dropzoneText="Photos / Videos"
                            // onDrop={acceptedFiles => uploadFiles(acceptedFiles)}
                            // onDelete={acceptedFiles => deleteFiles(acceptedFiles)}
                            onChange={handleFile}
                        />
                    </div>
                </div>
                <div className="col-span-2 h-[56px] bg-[#F3F3F3] px-2 py-2 flex align-middle gap-2 rounded-xl">
                    <label htmlFor='titleInput' className="font-poppins font-semibold text-sm flex items-center">Title</label>
                    <input type='text' id='titleInput' className='flex-1 min-w-0 bg-[#F3F3F3] p-3' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="sm:col-span-1 col-span-2 h-[56px] bg-[#F3F3F3] px-2 py-2 flex align-middle gap-2 rounded-xl">
                    <label htmlFor='priceInput' className="font-poppins font-semibold text-sm flex items-center">Price</label>
                    <input type='number' id='priceInput' className='flex-1 min-w-0 bg-[#F3F3F3] p-3' onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="sm:col-span-1 col-span-2 h-[56px] bg-[#F3F3F3] px-2 py-2 flex align-middle gap-2 rounded-xl">
                    <label htmlFor='locationInput' className="font-poppins font-semibold text-sm flex items-center">Location</label>
                    <CountryDropdown
                        value={location}
                        name="country"
                        onChange={(val) => {
                            setLocation(val)
                        }}
                        classes="p-2 h-[42px] bg-secondary placeholder:text-sm rounded-lg border border-black-500 w-full"
                    />
                </div>
                <div className="col-span-2 h-[56px] bg-[#F3F3F3] px-2 py-2 flex align-middle gap-2 rounded-xl">
                    <label htmlFor='categoryInput' className="font-poppins font-semibold text-sm flex items-center">Categories</label>
                    <div className="flex flex-col gap-6 w-[90%]">
                        <Select className="p-3 rounded-lg bg-[#F0F0F0]" onChange={handleCategory} value={category}>
                            {categories.map((item, index) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="col-span-2 h-[56px] bg-[#F3F3F3] px-2 py-2 flex align-middle gap-2 rounded-xl">
                    <label htmlFor='conditionInput' className="font-poppins font-semibold text-sm flex items-center">Condition</label>
                    <Select className="p-3 rounded-lg bg-[#F0F0F0]" onChange={(e) => setCondition(e)} value={condition}>
                        <Option value="New">New</Option>
                        <Option value='Used'>Used</Option>
                        <Option value='Used - Like New'>Used - Like New</Option>
                        <Option value='Used Good'>Used Good</Option>
                        <Option value='Used Fair'>Used Fair</Option>
                    </Select>
                </div>
                <div className="col-span-2 h-[150px] bg-[#F3F3F3] px-2 py-2 flex flex-col gap-2 rounded-xl">
                    <label htmlFor='descriptionInput' className="font-poppins font-semibold text-sm flex items-center">Description</label>
                    <textarea id='descriptionInput' className='w-full h-full min-w-0 bg-[#F3F3F3] p-3' onChange={(e) => setDescription(e.target.value)} />
                </div>
                <Button className="col-span-2" onClick={handleCreate}>Add</Button>


            </DialogBody>
        </Dialog>
    )
}

export default CreateMarket;
