import React, { useEffect, useState } from 'react'
import CustomCarousel from '@/components/custom/CustomCarousel';
import Button from '@/components/common/Button';
import BirthdayMemberItem, {
    BirthdayMember,
} from '@/components/common/BirthdayMemberItem';
import Carousel from 'react-multi-carousel';
import MyLeftArrow from '@/components/custom/MyLeftArrow';
import MyRightArrow from '@/components/custom/MyRightArrow';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';

import { FaMapMarkerAlt } from "react-icons/fa";
import { nearbyMember, nearbyUpdatedMember } from '@/api/users';
import { useAuthContext } from '@/context/AuthContext';
import { RiContactsBookLine } from 'react-icons/ri';

export default function Nearby() {

    const [nearbyMembers, setMembers] = useState([])
    const [nearbyUpdatedMembers, setUpdatedMembers] = useState([])
    const [nearbyUpdatedFiveMembers, setUpdatedFiveMembers] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const {user} = useAuthContext();

    const loading = () => {
        setLoading(true)
    }

    const load = () => {
        nearbyMember()
            .then((res: any) => {
                setMembers(res);
                setUpdatedFiveMembers(res.slice(0, 5));
            })
            .catch((err) => {console.log(err)})
        nearbyUpdatedMember()
            .then((res: any) => {
                setUpdatedMembers(res);
            })
            .catch((err) => {console.log(err)})
    }

    useEffect(() => {
        load();
    }, [])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDs-0kCpaWs6MLA3beRKO690-NdIL_ubn0',
    });

    const geocodeLocation = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: `${user.city}, ${user.country}` }, (results, status) => {
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
    }, [user]);

    return (
        <div className="flex-1 bg-dashboard-background w-full mainBody">
            <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                        mapContainerClassName="map-container"
                        center={center}
                        zoom={10}
                    />
                )}
                <div className="bg-white rounded-t-3xl mt-6 p-12 flex flex-col gap-6">
                    <div className=" font-montserrat font-bold text-[22px]">People</div>
                    <div className="flex flex-col gap-10">
                        {isLoading ? nearbyMembers.map((item, i) => (
                            <div className="rounded-[9px] flex flex-wrap align-center items-center gap-7 px-[13px] justify-between">
                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex items-center align-center gap-1'>
                                        <img src={item.avatar} className='rounded-full w-[60px] h-[60px] bg-contain bg-no-repeat mr-2' />
                                        <div>
                                            <p className="text-black font-poppins font-medium text-xl">{item.name}</p>
                                            <div className="flex flex-row items-center gap-3">
                                                <FaMapMarkerAlt className="scale-150 text-[#D5D5D5]" />
                                                <p className="font-poppins font-normal text-lg text-[#6E6E6E]">near {item.city}, {item.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button className="col-span-5 text-white bg-black  sm:col-span-3 whitespace-nowrap py-6 px-10">
                                    Connect
                                </Button>
                            </div>
                        )) : nearbyUpdatedFiveMembers.map((item, i) => (
                            <div className="rounded-[9px] flex flex-wrap align-center items-center gap-7 px-[13px] justify-between">
                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex items-center align-center gap-1'>
                                        <img src={item.avatar} className='rounded-full w-[60px] h-[60px] bg-contain bg-no-repeat mr-2' />
                                        <div>
                                            <p className="text-black font-poppins font-medium text-xl">{item.name}</p>
                                            <div className="flex flex-row items-center gap-3">
                                                <FaMapMarkerAlt className="scale-150 text-[#D5D5D5]" />
                                                <p className="font-poppins font-normal text-lg text-[#6E6E6E]">near {item.city}, {item.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button className="col-span-5 text-white bg-black  sm:col-span-3 whitespace-nowrap py-6 px-10">
                                    Connect
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        {nearbyMembers.length >= 6 && <Button
                            className="mt-3 rounded-full"
                            onClick={loading}
                        >
                            Load More
                        </Button>}

                    </div>
                </div>
                <div className="rounded-t-3xl bg-white flex flex-col py-6 pl-4">
                    <p className="font-sans font-bold text-xl text-black">Updated Profile</p>
                    <div className="flex flex-row gap-6 overflow-hidden px-4">
                        <Carousel
                            additionalTransfrom={0}
                            arrows={true}
                            autoPlay={true}
                            autoPlaySpeed={5000}
                            centerMode={false}
                            className="w-[96%] pt-6"
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
                                    items: 7,
                                },
                                desktoplg: {
                                    breakpoint: {
                                        max: 2400,
                                        min: 1800,
                                    },
                                    items: 5,
                                },
                                desktop: {
                                    breakpoint: {
                                        max: 1800,
                                        min: 1400,
                                    },
                                    items: 4,
                                },
                                mobilelg: {
                                    breakpoint: {
                                        max: 1100,
                                        min: 960,
                                    },
                                    items: 3,
                                },
                                mobilemd: {
                                    breakpoint: {
                                        max: 960,
                                        min: 850,
                                    },
                                    items: 4,
                                },
                                mobilesm: {
                                    breakpoint: {
                                        max: 850,
                                        min: 650,
                                    },
                                    items: 3,
                                },
                                mobilexs: {
                                    breakpoint: {
                                        max: 650,
                                        min: 0,
                                    },
                                    items: 2,
                                },
                                tablet: {
                                    breakpoint: {
                                        max: 1400,
                                        min: 1100,
                                    },
                                    items: 4,
                                },
                            }}
                            rewind={true}
                            rewindWithAnimation={true}
                            rtl={false}
                            shouldResetAutoplay
                            showDots={false}
                            sliderClass="gap-2 overflow-auto"
                            slidesToSlide={1.04}
                            swipeable
                            customLeftArrow={<MyLeftArrow onClick={() => { }} />}
                            customRightArrow={<MyRightArrow onClick={() => { }} />}
                        >

                            {nearbyUpdatedMembers.map((item, i) => (
                                <BirthdayMemberItem key={`birthday-member-${i}`} item={item} bgColor={"bg-[#F2F2F2]"} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}
