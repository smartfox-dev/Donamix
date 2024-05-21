import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import CustomLeftArrow from '@/components/custom/CustomLeftArrow';
import CustomRightArrow from '@/components/custom/CustomRightArrow';

import MuiButton from '@/components/common/Button';
import Switch from 'react-switch'
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Button from '@mui/material/Button';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import { Select, Option } from "@material-tailwind/react";
import { deleteMarket, report, edit, getDetail } from '@/api/market';
import toast from 'react-hot-toast';
import { FaArrowLeftLong } from "react-icons/fa6";
import EditIcon from '@mui/icons-material/Edit';
import { useAuthContext } from '@/context/AuthContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';

export default function MyMarketDetail() {
    const [comments, setComments] = useState('');
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [is_check, setCheck] = useState(false)
    const params = useParams();
    const [market, setMarket] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuthContext();
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const navigate = useNavigate();
    const host = window.location.href.split('mymarketplace')[0]
    console.log(host)
    const updateStateButton = (val) => {
        // console.log(val, "---------------------");
        // selectButton(val);
    }
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDs-0kCpaWs6MLA3beRKO690-NdIL_ubn0',
    });

    const geocodeLocation = () => {
        const geocoder = new window.google.maps.Geocoder();
        if(market)
        geocoder.geocode({ address: `${market.location}` }, (results, status) => {
            if (status === 'OK') {
                setCenter({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                });
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    useEffect(() => {
        if (window.google && window.google.maps) {
            geocodeLocation();
        }
        // Adding geocodeLocation to dependency array might cause infinite loops if not handled properly
        // It's better to leave it out and ensure geocodeLocation is called only when Google Maps script is loaded and city or country changes
    }, [market]);

    const handleReport = (id: any, user_id:any) => {
        report({
            'user_id': user.id,
            'market_id': id,
            'member_id': user_id
        })
            .then((res) => {
                toast.success('Success!')
            })
            .catch((err) => { toast.error('Failed!') })
    }

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
        if(market){
            if (market && market.is_sold == 1) {
                setCheck(true)
            }
            else { setCheck(false) }
            setTitle(market.title)
            setDescription(market.description)
            setPrice(market.price)
            setCategory(market.category)
        }
    }, [market])

    useEffect(() => {
        if (user) {
            setLocation(user.country)
        }

        if(params.id) {
            getDetail({
                'id': parseInt(params.id)
            }).then((res) => {
                setMarket(res)
                console.log(res)
            })
            .catch((err) => toast.error('Failed Market!'))
        }

    }, [params.id])

    return (
        <div className="flex lg:max-w-[60vw] md:max-w-[100vw] sm:max-w-[100vw] max-w-[100vw] flex-col w-full gap-6 p-5">
            <MuiButton className="lg:h-[60px]  font-sans font-bold text-lg" onClick={() => navigate('/mymarketplace')}><FaArrowLeftLong className=" scale-150" /></MuiButton>
            <div  className="relative col-span-1 items-center">
                {market && market.medias && <Carousel
                    additionalTransfrom={0}
                    arrows={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    centerMode={false}
                    className="w-full"
                    // containerClass="gap-2"
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
                    swipeable
                    customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                    customRightArrow={<CustomRightArrow onClick={() => { }} />}
                >
                    {market && market.medias !== null && market.medias.map((media, index) => (
                        <img src={host + media.url} className="w-full h-full rounded-t-2xl" alt="" key={index}/>
                    ))}
                </Carousel>}

                {is_check ? <div className="absolute rounded-sm py-2 sm:px-8 px-4 sm:top-7 top-3 text-white sm:left-7 left-5 bg-[#ED1F24] font-poppins font-bold sm:text-lg text-xs">Sold</div> : <div></div>}
                <Popover placement="bottom-end">
                    <PopoverHandler>
                        <div className="absolute w-8 h-8 sm:top-7 top-3 text-white sm:right-7 right-5 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
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
                                            <input type="text" placeholder='Type' className='border-b border-1 border-lightgray p-3 h-[40px] w-full' defaultValue={market && market.title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div className="flex flex-col items-start gap-3 cursor-pointer">
                                            <div className="font-montserrat font-bold text-base text-black" >Edit Description</div>
                                            <input type="text" placeholder='Type' className='border-b border-1 border-lightgray p-3 h-[40px] w-full' defaultValue={market && market.description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                        <div className='border-b border-1 border-gray h-[15px]'></div>
                                        <div className='border-b border-1 border-gray h-[15px]'></div>
                                        <div className='bg-[#F3F3F3] h-[60px] rounded-lg p-5 flex flex-row items-center justify-between'>
                                            <div className="font-montserrat font-bold text-base text-black" >Price</div>
                                            <input type="number" placeholder='$1600' className='ml-3 p-3 h-[40px] w-full text-right text-black bg-transparent font-bold font-montserrat text-base placeholder:text-black' defaultValue={market && market.price} onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                        <div className='bg-[#F3F3F3] h-[60px] rounded-lg p-5 flex flex-row items-center justify-between'>
                                            <div className="font-montserrat font-bold text-base text-black mr-3" >Location</div>

                                            <input type="text" placeholder='Type' className='ml-3 p-3 h-[40px] w-full text-right text-black bg-transparent font-bold font-montserrat text-base placeholder:text-black' defaultValue={market && market.location} onChange={(e) => setLocation(e.target.value)} />
                                        </div>
                                        <div className='bg-[#F3F3F3] h-[60px] rounded-lg p-5 flex flex-row items-center justify-between'>
                                            <div className="font-montserrat font-bold text-base text-black mr-3" >Categories</div>
                                            <Select className="p-3 rounded-lg bg-[#F0F0F0]" onChange={handleCategory} value={category}>
                                                <Option value="Vehicle">Vehicle</Option>
                                                <Option value='Vehicle'>Vehicle</Option>
                                                <Option value='Vehicle'>Vehicle</Option>
                                            </Select>
                                        </div>
                                        <div className='p-3 flex flex-row items-center justify-between'>
                                            <div className='flex flex-row items-center justify-start'>
                                                <div className="font-montserrat font-bold text-base text-black mr-3" >Mark as sold</div>
                                                <Switch onChange={handleCheck} checked={is_check}></Switch>
                                            </div>
                                            <Button variant="contained" startIcon={<EditIcon />} color="success" onClick={() => { handleEdit(market.id) }}>Edit</Button>
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
                                                handleDelete(market.id)
                                            }}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </PopoverContent>

                </Popover>
                <div className="absolute sm:bottom-7 bottom-3 sm:left-7 left-5 flex flex-col gap-3 ">
                    <div className='flex flex-row gap-3 items-center'>
                        <h3 className="font-popins py-2 sm:px-8 px-4 font-bold sm:text-base text-xs bg-white text-black " style={{borderRadius: '8px'}}>{market && market.title}</h3>
                        <div className="rounded-sm py-2 sm:px-8 px-4 sm:top-7 top-3 text-[#E8E8E8] sm:right-7 right-5 bg-black font-poppins font-medium sm:text-base text-xs">${market && market.price}</div>
                    </div>
                    <label className="w-fit font-poppins sm:px-8 px-4 font-normal sm:text-base text-xs text-black " style={{borderRadius: '5px'}}>{market && market.condition}</label>
                </div>
            </div>
            <div>
                <h3 className="font-poppins font-bold text-base">Details</h3>
                <p className='font-sans font-normal text-base'>{market && market.description}</p>
            </div>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={10}
                />
            )
            }
            {/* <MuiButton className="rounded-b-none lg:h-[80px]  font-sans font-bold text-lg">Message Seller</MuiButton>
            <div className="w-full h-[333px] flex flex-col gap-3 bg-white p-5 rounded-t-2xl">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-3 items-center">
                        <Avatar className='w-[50px] h-[50px]'>
                            <AvatarImage src={market && market.user && market.user.avatar} alt="" />
                            <AvatarFallback>
                            </AvatarFallback>
                        </Avatar>
                        <h3 className="font-montserrat font-bold text-sm">{market && market.user && market.user.name}</h3>
                    </div>
                </div>
                <textarea className="my-textarea" placeholder='Add Comments' style={{ width: '100%', height: '185px', backgroundColor: '#E9E9E9', borderRadius: '10px', padding: '10px' }} onChange={(e) => setComments(e.target.value)}></textarea>
                <p className="font-montserrat font-bold text-sm text-[#FB0000] flex justify-end cursor-pointer" onClick={() => handleReport(market.id, market.user_id)}>Report Post</p>
            </div> */}
        </div>
    )
}
