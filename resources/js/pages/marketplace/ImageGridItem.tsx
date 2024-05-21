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
import Carousel from 'react-multi-carousel';
import CustomLeftArrow from '@/components/custom/CustomLeftArrow';
import CustomRightArrow from '@/components/custom/CustomRightArrow';
import Box from '@mui/material/Box';
import { AiFillPlayCircle } from "react-icons/ai";
import ImageModal from "./ImageModal";
import { useNavigate } from 'react-router-dom';
import { DropzoneArea } from 'material-ui-dropzone'

const apiUrl = import.meta.env.VITE_BACKEND_API as string;


const ImageGridItem = ({ number, updateStateButton, updateMarket }) => {
    const { user } = useAuthContext()
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
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const navigate = useNavigate()
    const [selectedImageIndex, setSeletedImageIndex] = useState(0);
    const handleImageClick = (index) => {
        setSeletedImageIndex(index);
        setImageModalOpen(true);
    };

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

    useEffect(() => {
        setAllImagesLoaded(true); // Indicate that not all images are loaded yet
        console.log(1)
        setTitle(number.title)
        setDescription(number.description)
        setPrice(number.price)
        setCategory(number.category)
        setCheck(number.is_sold == 1 ? true : false)
    }, [number]);

    useEffect(() => {
        if (user) setLocation(user.country)
    }, [user])

    // Effect to check whether all images have been loaded


    return (
        <div className="relative col-span-1 items-center" >
            {/* <img
                src={number.medias[0] && '/' + number.medias[0].url}
                onLoad={() => { handleImageLoad() }}
                onError={handleImageLoad} // Handle the case where image fails to load as well
                className="w-full h-[180px] rounded-lg"
                alt=""
                style={allImagesLoaded ? {} : { display: 'none' }} // Hide images until they are loaded
                onClick={() => { updateStateButton(number.id); updateMarket(number); }}
            /> */}
            <div className="flex flex-row gap-3 justify-center w-full h-[180px] rounded-lg">

                <Carousel
                    additionalTransfrom={0}
                    arrows={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    centerMode={false}
                    className={`w-full h-auto pb-14`}
                    containerClass="gap-2"
                    dotListClass="custom-dot-list-style"
                    draggable={false}
                    focusOnSelect={false}
                    infinite={false}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    partialVisible
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktopxl: {
                            breakpoint: {
                                max: 3000,
                                min: 2400,
                            },
                            items: 1,
                        },
                        desktoplg: {
                            breakpoint: {
                                max: 2400,
                                min: 1800,
                            },
                            items: 1,
                        },
                        desktop: {
                            breakpoint: {
                                max: 1800,
                                min: 1400,
                            },
                            items: 1,
                        },
                        mobilelg: {
                            breakpoint: {
                                max: 1100,
                                min: 960,
                            },
                            items: 1,
                        },
                        mobilemd: {
                            breakpoint: {
                                max: 960,
                                min: 850,
                            },
                            items: 1,
                        },
                        mobilesm: {
                            breakpoint: {
                                max: 850,
                                min: 650,
                            },
                            items: 1,
                        },
                        mobilexs: {
                            breakpoint: {
                                max: 650,
                                min: 0,
                            },
                            items: 1,
                        },
                        tablet: {
                            breakpoint: {
                                max: 1400,
                                min: 1100,
                            },
                            items: 1,
                        },
                    }}
                    rewind={true}
                    rewindWithAnimation={true}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={true}
                    sliderClass="gap-2 overflow-auto"
                    slidesToSlide={1}
                    swipeable>
                    {number.medias && number.medias.map((media, index) => (
                        <Box
                            key={media.url}
                            component="img"
                            src={'/' + media.url}
                            alt={`Carousel ${index}`}
                            onClick={() => {
                                if (number.user_id == user.id) {
                                    navigate('/mymarketplace/' + number.id)
                                }
                                else {
                                    navigate('/marketplace/' + number.id)
                                }
                            }}

                            sx={{
                                cursor: 'pointer',
                                width: '100%',
                                height: theme => ({
                                    xs: '600px', // default to extra-small and small screens
                                    sm: '192px', // applies to small screens and up
                                    md: '224px', // applies to medium screens and up
                                    lg: '264px', // applies to large screens and up
                                }),
                                borderTopLeftRadius: '20px',
                                borderTopRightRadius: '20px',
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px'
                            }}
                        />
                    ))
                    }
                </Carousel>
                {isImageModalOpen && (
                    <ImageModal
                        isOpen={isImageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                        images={number.medias.map(media => media.url)}
                        initialIndex={selectedImageIndex} // Pass the initial index to the ImageModal
                    />
                )}


            </div>
            <div className='flex flex-row absolute justify-between top-3 left-5 w-full pr-5' >
                {number.is_sold == 1 ? <div className="rounded-sm py-2 px-4 text-white  bg-[#ED1F24] font-poppins font-bold text-xs">Sold</div> : <div></div>}
                {number.user.id === user.id ? <Popover placement="bottom-end">
                    <PopoverHandler>
                        <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                            <img src="/images/home/white_dot.svg" className="w-auto h-auto" alt="" />
                        </div>
                    </PopoverHandler>
                    <PopoverContent>

                        <div className="flex flex-col w-[253px] gap-4 pt-3">
                            <Popover placement="bottom-end">
                                <PopoverHandler>
                                    <div className="flex flex-row items-center gap-3 cursor-pointer">
                                        <img src="/images/home/Edit.png" alt="" />
                                        <div className="font-montserrat font-medium text-base text-black" >Edit Post</div>
                                    </div>
                                </PopoverHandler>
                                <PopoverContent>
                                    <div className="flex flex-col max-w-[400px] min-w-[250px] gap-4 pt-3">
                                        <div className="flex flex-col items-start gap-3 cursor-pointer">
                                            <div className="font-montserrat font-bold text-base text-black" >Edit Title</div>
                                            <input type="text" placeholder='Type' className='border-b border-1 border-lightgray p-3 h-[40px] w-full' onChange={(e) => setTitle(e.target.value)} defaultValue={number.title} />
                                        </div>
                                        <div className="flex flex-col items-start gap-3 cursor-pointer">
                                            <div className="font-montserrat font-bold text-base text-black" >Edit Description</div>
                                            <textarea id='descriptionInput' className='w-full h-full min-w-0 bg-[#F3F3F3] p-3' onChange={(e) => setDescription(e.target.value)} defaultValue={number.description} />
                                        </div>
                                        <div className='border-b border-1 border-gray h-[15px]'></div>
                                        <div className='border-b border-1 border-gray h-[15px]'></div>
                                        <div className='bg-[#F3F3F3] h-[60px] rounded-lg p-5 flex flex-row items-center justify-between'>
                                            <div className="font-montserrat font-bold text-base text-black" >Price</div>
                                            <input type="number" placeholder='$1600' className='ml-3 p-3 h-[40px] w-full text-right text-black bg-transparent font-bold font-montserrat text-base placeholder:text-black' onChange={(e) => setPrice(e.target.value)} defaultValue={number.price} />
                                        </div>
                                        <div className='bg-[#F3F3F3] h-[60px] rounded-lg p-5 flex flex-row items-center justify-between'>
                                            <div className="font-montserrat font-bold text-base text-black mr-3" >Location</div>

                                            <CountryDropdown
                                                value={location}
                                                name="country"
                                                onChange={(val) => {
                                                    setLocation(val)
                                                }}
                                                classes="p-2 h-[42px] bg-secondary placeholder:text-sm rounded-lg border border-black-500 w-full"
                                            />
                                        </div>
                                        <div className='bg-[#F3F3F3] h-[60px] rounded-lg p-5 flex flex-row items-center justify-between'>
                                            <div className="font-montserrat font-bold text-base text-black mr-3" >Categories</div>
                                            <Select className="p-3 rounded-lg bg-[#F0F0F0]" onChange={handleCategory} defaultValue={number.category}>
                                                <Option value="Vehicle">Vehicle</Option>
                                                <Option value='Vehicle'>Vehicle</Option>
                                                <Option value='Vehicle'>Vehicle</Option>
                                            </Select>
                                        </div>
                                        <div className='p-3 flex flex-row items-center justify-between'>
                                            <div className='flex flex-row items-center justify-start'>
                                                <div className="font-montserrat font-bold text-base text-black mr-3" >Mark as sold</div>
                                                {/* <Switch onChange={handleCheck} checked={is_check}></Switch> */}
                                                <Switch onChange={handleCheck} checked={is_check}></Switch>
                                            </div>
                                            <Button variant="contained" startIcon={<EditIcon />} color="success" onClick={() => { handleEdit(number.id) }}>Edit</Button>
                                        </div>
                                    </div>
                                </PopoverContent>

                            </Popover>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                                <img src="/images/home/dustbin.png" alt="" />
                                <div className="font-montserrat font-medium text-base text-black"
                                    onClick={() => {
                                        setShowModal(true);
                                    }}>
                                    Delete Post</div>
                            </div>
                        </div>

                        {showModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black opacity-75"></div>
                                <div className="relative z-10 p-4 bg-white rounded-lg">
                                    <p>Do you really want to delete this post?</p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                            onClick={() => {
                                                setShowModal(false);
                                            }}
                                        >
                                            No
                                        </button>
                                        <button
                                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                            onClick={() => {
                                                setShowModal(false);
                                                handleDelete(number.id)
                                            }}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </PopoverContent>

                </Popover> : <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                    <img src="/images/home/white_dot.svg" className="w-auto h-auto" alt="" />
                </div>}

            </div>
            <div className="absolute bottom-3 left-5 flex flex-col gap-3" >
                <div className='flex flex-row gap-3 items-center'>
                    <h3 className="font-popins py-2 px-4 font-bold text-xs  bg-white text-black " style={{ borderRadius: '8px' }}>{number.title}</h3>
                    <div className=" rounded-sm py-2 px-4 top-3 text-[#E8E8E8] right-5 bg-black font-poppins font-medium text-xs">${number.price}</div>
                </div>
                <label className="w-fit font-poppins py-2 px-4 font-normal text-xs text-black " style={{ borderRadius: '5px' }}>{number.description.length >= 20 ? number.description.slice(0, 20) + '...' : number.description}</label>
            </div>
        </div>
    );
};

export default ImageGridItem;
