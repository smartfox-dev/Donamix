import React, { useState, useEffect } from 'react';

import { Input, Spinner } from '@material-tailwind/react';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
import { Select, Option } from "@material-tailwind/react";
import Switch from 'react-switch'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteMarket, edit } from '@/api/market';
import toast from 'react-hot-toast';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useAuthContext } from '@/context/AuthContext';
import ImageGridItem from './ImageGridItem';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;


const ImageGrid = ({ numbers, updateStateButton, updateMarket }) => {
    const {user} = useAuthContext()
    const [loadedImages, setLoadedImages] = useState(0);
    const [market, setMarket] = useState([])
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [is_check, setCheck] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [showModal, setShowModal] = useState(false);

    // Function to handle image load
    const handleImageLoad = () => {
        setLoadedImages((prevCount) => prevCount + 1);
    };

    const handleCategory = (e) => {
        setCategory(e)
    }

    const handleLocation = (e) => {
        setLocation(e)
    }

    const handleCheck = (e) => {
        setCheck(e)
        console.log(e)
    }

    const handleDelete = (id: any) => {
        deleteMarket({ 'id': id })
            .then((res) => {
                toast.success('Success')
                window.location.reload()
            })
            .catch((err) => {
                toast.error('Failed delete!')
            })
    }

    const handleEdit = (id: any) => {
        edit({
            'id': id,
            'title': title,
            'description': description,
            'price': price,
            'category': category,
            'location': location,
            'is_sold': is_check
        }).then((res) => {
            toast.success("Success")
            window.location.reload()
        })
            .catch((err) => {
                toast.error('Please fill all the fields correctly!')
            })
    }

    const handleContent = (data: any) => {
        console.log(1)
        setTitle(data.title)
        setDescription(data.description)
        setPrice(data.price)
        setCheck(data.is_sold == 1 ? true : false)
    }

    useEffect(() => {
        setLoadedImages(numbers.length); // Reset the count
        setAllImagesLoaded(true); // Indicate that not all images are loaded yet
        setMarket(numbers)
    }, [numbers]);

    useEffect(() => {
        if(user) setLocation(user.country)
    }, [user])

    // Effect to check whether all images have been loaded


    return (
        <div>
            {!allImagesLoaded && (
                // Spinner shown while images are loading...
                <div className="flex justify-center">
                    <Spinner />
                </div>
            )}
            <div className={`grid md:grid-cols-2 grid-cols-1 gap-4 ${!allImagesLoaded ? 'invisible' : ''}`}>
                {numbers.map((number, index) => (
                    <ImageGridItem number={number} updateStateButton={updateStateButton} updateMarket={updateMarket} key={index} />
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;
