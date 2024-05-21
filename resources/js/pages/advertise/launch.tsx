import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube';
import { useAppContext } from '@/context/AppContext';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import CONSTANTS from '@/config/constants';
import 'swiper/css';
import toast from 'react-hot-toast';
import { createAdvertise } from '@/api/advertise';
import { advertiseValidator } from '@/lib/validation/advertise';
import { useAuthContext } from '@/context/AuthContext';
import { Card, CardBody, Input } from '@material-tailwind/react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/common/FileUpload';
import { useNavigate } from 'react-router-dom';
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import MultiSelect from './MultiSelect.jsx'
import CountrySelect from '@/components/common/CountrySelect.jsx'
declare global {
    interface Window {
        aptType: string;
        urls: Array<string>;
    }
}
window.aptType = ' In-feed ads';
window.urls = [];

const adTypes = {
    "Sidebar Ads": { width: 195, height: 389 },
    " In-feed ads": { width: 1195, height: 625 }
};


const conversationNames = [
    "Trends",
    "Travel",
    "Social",
];

const interestsNames = [
    "Cooking",
    "Dance",
    "Photography",
    "Reading",
    "Video Game",
    "Drawing",
    "Gardening",
    "Blog",
    "Writing",
    "Painting",
    "Art",
    "Music",
    "Knitting",
    "Calligraphy",
    "Hiking",
    "Fishing",
    "Pottery",
    "Camping",
    "Yoga",
    "Travel",
    "Swimming",
    "Volunteering",
];

const workNames = [
    'Software development',
    'Project management',
    'Marketing',
    'Sales',
    'Customer service',
    'Finance',
    'Human resources',
    'Operations'
];


export default function Launch() {
    const { setIsLeftSidebarOpen } = useAppContext();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [selectedConversationNames, setSelectedConversationNames] = useState([]);
    const [selectedInterestNames, setSelectedInterestNames] = useState([]);
    const [selectedWorkNames, setSelectedWorkNames] = useState([]);
    const onConversationChange = (selectedList) => {
        setSelectedConversationNames(selectedList);
        console.log("===conversationList:", selectedList)
        let temp = JSON.stringify(selectedList);
        setInput((prev) => ({
            ...prev,
            'conversation': temp,
        }));
    }
    const onInterestChange = (seletedList) => {
        setSelectedInterestNames(seletedList);
        let temp = JSON.stringify(seletedList);
        setInput((prev) => ({
            ...prev,
            'interest': temp,
        }))
    }
    const onWorkChange = (seletedList) => {
        setSelectedWorkNames(seletedList);
        let temp = JSON.stringify(seletedList);
        setInput((prev) => ({
            ...prev,
            'work': temp,
        }))
    }
    const [input, setInput] = useState<{
        user_id: number;
        urls: string;
        conversation: string;
        ads_type: string;
        site_url: string;
        button: string;
        description: string;
        country: string;
        age_from: number;
        age_to: number;
        gender: string;
        interest: string;
        work: string;
        price: number;
        expires: number;
    }>({
        user_id: 0,
        urls: '',
        ads_type: ' In-feed ads',
        conversation: '',
        site_url: '',
        button: 'Apply Now',
        description: '',
        country: '',
        age_from: 18,
        age_to: 65,
        gender: 'Male',
        interest: '',
        work: '',
        price: 448,
        expires: 1,
    })
    const [imageType, setImageType] = useState('Carousel In-feed ads')

    useEffect(() => {
        return () => setIsLeftSidebarOpen(true);
    }, []);

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget;
        setInput((prev) => ({
            ...prev,
            [name]: (name === 'age_from' || name === 'age_to') ? parseInt(value, 10) : value,
        }))
    }
    const handleAdType = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
        window.urls = [];
        input.urls = '';
        window.aptType = value;
        console.log("=====aptType:", window.aptType)
        if (value == 'Video Ads') {
            setImageType('Video')
        }
        else if (value == 'Sidebar Ads') {
            setImageType('Banner Image')
        }
        else if (value == ' In-feed ads') {
            setImageType("Carousel In-feed ads")
        }
    }
    const onUploadFile = ({ url, width, height, duration }) => {
        console.log("------url:", url, width, height, duration)
        if (window.aptType == " In-feed ads") {
            const imageSize = adTypes[window.aptType];
            if (imageSize && (Math.abs(Number(width) - imageSize.width) > 25 || Math.abs(Number(height) - imageSize.height) > 25)) {
                toast.error(`The image size for ${window.aptType} should be ${imageSize.width}x${imageSize.height} pixels.`, { duration: 10000 });
                return;
            }
            console.log("preinputurls:", window.urls)
            if (window.urls.length >= 4) {
                toast.error("You are allowed to upload a maximum of 4 images", { duration: 10000 });
                return;
            }
            window.urls.push(url);
            console.log("newinputurls:", window.urls)
            const newUrlsString = JSON.stringify(window.urls);
            setInput(prev => ({ ...prev, urls: newUrlsString }));
            toast.success(`The image for ${window.aptType} uploaded successfully.'`, { duration: 10000 })
        }
        if (window.aptType == "Sidebar Ads") {
            const imageSize = adTypes[window.aptType];
            if (imageSize && (Math.abs(Number(width) - imageSize.width) > 25 || Math.abs(Number(height) - imageSize.height) > 25)) {
                toast.error(`The image size for ${window.aptType} should be ${imageSize.width}x${imageSize.height} pixels.`, { duration: 10000 });
                return;
            }
            if (window.urls.length >= 1) {
                toast.error("You are allowed to upload only one image", { duration: 10000 });
                return;
            }
            window.urls.push(url);
            const newUrlsString = JSON.stringify(window.urls);
            console.log("newinputurls:", newUrlsString)
            setInput(prev => ({ ...prev, urls: newUrlsString }));
            toast.success(`The image for ${window.aptType} uploaded successfully.'`, { duration: 10000 })
        }
        console.log("====duration:", window.aptType, Number(duration))
        if (window.aptType == "Video Ads") {
            if (Number(duration) > 30) {
                toast.error(`The maximum allowed duration for video ads is 30 seconds.`, { duration: 10000 });
                return;
            }
            if (window.urls.length >= 1) {
                toast.error("You are allowed to upload only one video", { duration: 10000 });
                return;
            }
            window.urls.push(url);
            const newUrlsString = JSON.stringify(window.urls);
            setInput(prev => ({ ...prev, urls: newUrlsString }));
            toast.success(`The video for ${window.aptType} uploaded successfully.'`, { duration: 10000 });
            console.log("====window.urls:", window.urls)
        }
    };

    const handleAdvertise = (expires, price) => {
        if (!user) return;
        setInput((prev) => ({
            ...prev,
            'expires': expires,
            'price': price,
        }))
        setIsSaving(true);
        const newAdvertise = advertiseValidator.parse({
            ...input,
            user_id: user.id,
        })
        console.log("newAdvertise:", newAdvertise)

        createAdvertise(newAdvertise)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    navigate('/')
                    toast.success(res.message);
                } else toast.error(res.message)
            })
            .catch((err) => {
                setErrors(err.errors)
                console.log('----------error')
                console.log("Error while creating a advertise", err.errors)
            })
            .finally(() => {
                console.log('----------finally')
                setIsSaving(false)
            })
    }

    return (
        <>
            <div className='w-full h-full relative flex flex-col gap-5 mb-20 lg:gap-10 p-10'>
                <span className='text-[20px] text-center px-2  xl:px-[210px]'>Advertisements promoting drugs, firearms, or explicit sexual content are not allowed on our platform. Your compliance with these guidelines is crucial for the success of your campaigns and the reputation of our community.</span>
                <div className='flex flex-col md:flex-row rounded-3xl bg-white'>
                    <div className='p-5 flex flex-col items-center gap-6 w-full relative mt-9'>
                        <span className='p-5 bg-[#F4F4F4] text-[black] w-full rounded-lg'>Increase your business visibility by advertising on Donamix today!</span>
                        <div className="w-full mb-5">
                            <h6 className="text-base font-bold text-black px-1 py-2">Type of Campaign</h6>
                            <select className='text-lg text-[black] bg-[#F4F4F4] p-5 rounded-lg w-full' name='ads_type' value={input.ads_type} onChange={handleAdType}>
                                <option className='text-lg text-[black]' value=" In-feed ads" > In-feed ads</option>
                                <option className='text-lg text-[black]' value="Sidebar Ads" >Sidebar Ads</option>
                                <option className='text-lg text-[black]' value="Video Ads" >Video Ads</option>
                            </select>
                        </div>
                        <div className='flex lg:flex-row flex-col w-full justify-between items-center gap-10 mb-5'>
                            <div className='w-full'>
                                <h6 className="text-base font-bold text-black px-1 py-2">Conversation</h6>
                                <MultiSelect names={conversationNames} selectedNames={selectedConversationNames} setSelectedNames={onConversationChange} />
                                {errors?.conversation &&
                                    <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                }
                            </div>
                        </div>
                        <div className='flex lg:flex-row flex-col w-full justify-between items-center gap-10 mb-5'>
                            <div className='w-full'>
                                <h6 className="text-base font-bold text-black px-1 py-2">Place website URL</h6>
                                <input type="text" className='bg-[#F4F4F4] font-inter text-lg text-[black] p-5 rounded-lg w-full' placeholder='https://donamix.org/' name='site_url' value={input.site_url}
                                    onChange={onInputChange} />
                                {errors?.site_url &&
                                    <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                }
                            </div>
                            {window.aptType !== " In-feed ads" &&
                                <div className='w-full'>
                                    <h6 className="text-base font-bold text-black px-1 py-2">Call To Action</h6>
                                    <select className='text-lg text-[black] bg-[#F4F4F4] p-5 rounded-lg w-full' name='button' value={input.button} onChange={onInputChange}>
                                        <option className='text-lg text-[black]' value="Apply Now" >Apply Now</option>
                                        <option className='text-lg text-[black]' value="Show Now" >Show Now</option>
                                        <option className='text-lg text-[black]' value="Learn More" >Learn More</option>
                                        <option className='text-lg text-[black]' value="Get Started" >Get Started</option>
                                        <option className='text-lg text-[black]' value="Try it Today" >Try it Today</option>
                                        <option className='text-lg text-[black]' value="Join Us" >Join Us</option>
                                        <option className='text-lg text-[black]' value="Get Your Free Trial" >Get Your Free Trial</option>
                                        <option className='text-lg text-[black]' value="Book Now" >Book Now</option>
                                        <option className='text-lg text-[black]' value="Download" >Download</option>
                                    </select>
                                    {errors?.button &&
                                        <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                    }
                                </div>
                            }
                        </div>

                        {input.ads_type == ' In-feed ads' &&
                            <div className='w-full mb-5'>
                                <h6 className="text-base font-bold text-black px-1 py-2">Description</h6>
                                <textarea className='bg-[#F4F4F4] rounded-lg w-full h-[150px] p-5' maxLength={320}
                                    name='description'
                                    value={input.description}
                                    onChange={onInputChange}
                                />
                            </div>
                        }
                        <div className='flex flex-col gap-5 justify-between items-center w-full pb-9'>
                            <div className='flex lg:flex-row flex-col justify-between items-center gap-5 w-full mb-6'>
                                <div className='w-full'>
                                    <h6 className="text-base font-bold text-black px-1 py-2">Country</h6>
                                    <CountrySelect
                                        onChange={(event, value) => {
                                            console.log("***---country_value:", value)
                                            setInput((prev) => ({
                                                ...prev,
                                                ['country']: value?.label,
                                            }))
                                        }}
                                    />
                                    {errors?.country &&
                                        <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                    }
                                </div>
                                <div className='w-full'>
                                    <h6 className="text-base font-bold text-black px-1 py-2">Gender</h6>
                                    <select className='text-lg text-[black] bg-[#F4F4F4] p-5 rounded-lg w-full'
                                        name='gender'
                                        value={input.gender}
                                        onChange={onInputChange}
                                    >
                                        <option className='text-lg text-[black]' value="male" >Male</option>
                                        <option className='text-lg text-[black]' value="female" >Female</option>
                                        <option className='text-lg text-[black]' value="both" >Both</option>
                                    </select>
                                    {errors?.gender &&
                                        <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                    }
                                </div>
                            </div>
                            <div className='flex lg:flex-row flex-col justify-between items-center gap-5 w-full'>
                                <h6 className="text-base font-bold text-black px-1 py-2 mt-8">Age:</h6>
                                <div className='flex flex-col w-full'>
                                    <h6 className="text-base font-bold text-black px-1 py-2">From</h6>
                                    <div className='w-full'>
                                        <input type="number" className='bg-[#F4F4F4] font-inter text-lg text-[black] p-5 rounded-lg w-full' placeholder='18' name='age_from' value={input.age_from} onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h6 className="text-base font-bold text-black px-1 py-2">To</h6>
                                    <div className='w-full'>
                                        <input type="number" className='bg-[#F4F4F4] font-inter text-lg text-[black] p-5 rounded-lg w-full' placeholder='18' name='age_to' value={input.age_to} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <h6 className="text-base font-bold text-black px-1 py-2">Interests</h6>
                                <MultiSelect names={interestsNames} selectedNames={selectedInterestNames} setSelectedNames={onInterestChange} />
                                {errors?.interest &&
                                    <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                }
                            </div>
                            <div className='w-full'>
                                <h6 className="text-base font-bold text-black px-1 py-2">Work</h6>
                                <MultiSelect names={workNames} selectedNames={selectedWorkNames} setSelectedNames={onWorkChange} />
                                {errors?.work &&
                                    <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 p-10 w-full'>
                        {imageType.includes("Image") ?
                            <div className="bg-primary mt-2 lg:mt-4 mb-5 rounded-t-3xl items-center justify-center bg-cover bg-center max-w-full w-full block relative">
                                {window.urls && window.urls.length > 0 ? (
                                    <img
                                        src={window.urls[window.urls.length - 1]}
                                        className="z-0 mx-auto"
                                    />
                                ) : (
                                    <div className="z-0 mx-auto h-[450px]" />
                                )}
                                <div className="flex flex-col absolute top-0 bottom-0 left-0 right-0 z-10 items-center justify-center">
                                    <FileUpload onSuccess={onUploadFile}>
                                        <Button variant="secondary" className='text-[20px] p-6'>
                                            Select {imageType}
                                        </Button>
                                    </FileUpload>
                                    <span className='text-white mt-3'>{`Image size: ${adTypes[window.aptType].width} * ${adTypes[window.aptType].height}`}</span>
                                </div>
                                {errors?.urls &&
                                    <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                }
                            </div>
                            :
                            <div className="bg-primary mt-2 lg:mt-4 mb-5 rounded-t-3xl items-center justify-center bg-cover bg-center max-w-full w-full block relative">
                                <video src={window.urls[0]} className="h-[600px] z-0 m-auto" autoPlay loop muted />
                                <div className="flex flex-col absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center">
                                    <FileUpload onSuccess={onUploadFile}>
                                        <Button variant="secondary" className='text-[20px] py-6 px-9'>Select {imageType}</Button>
                                    </FileUpload>
                                    <span className='text-white mt-3'>Maximum duration 30s</span>
                                </div>
                                {errors?.urls &&
                                    <div className="text-base text-red-600 p-2 absolute">This filed is required!</div>
                                }
                            </div>
                        }
                        <span className='font-inter font-bold text-[black] w-full text-center text-lg'>Advertisements are published on a rotating basis on the homepage, in the in-feed section, and on the sidebars of Donamix pages.</span>
                        <span className='text-[30px] text-[black] pt-3 pb-3 pl-6 pr-6 font-bold text-center'>{imageType}</span>
                        <div className='flex lg:flex-row flex-col justify-between items-center w-full'>
                            <div className='group flex flex-col gap-5 justify-center items-center bg-[white] hover:bg-[black] lg:w-[70%] w-full rounded-3xl'>
                                <div className='flex flex-col justify-center items-center bg-[#F4F4F4] group-hover:bg-[gray] rounded-full p-8 m-8'>
                                    <img src="/images/group/coin.svg" alt="" className='w-[80px] h-[80px] ' />
                                </div>
                                <span className='font-inter font-semibold text-2xl group-hover:text-[white]'>1 Month</span>
                                <span className='font-inter font-normal text-lg text-[red]'>Discounted</span>
                                <span className='font-inter font-semibold text-4xl group-hover:text-[white] m-10'>$448</span>
                                <Button className='pt-4 pb-4 pl-10 pr-10 text-lg text-[white] group-hover:text-[black] font-inter font-normal rounded-lg bg-black group-hover:bg-[white] mb-10 h-[60px]' onClick={() => { handleAdvertise(1, 488) }} disabled={isSaving}>Advertise</Button>
                            </div>
                            <div className='group flex flex-col gap-5 justify-center items-center bg-[white] hover:bg-[black] lg:w-[70%] w-full rounded-3xl'>
                                <div className='flex flex-col justify-center items-center bg-[#F4F4F4] group-hover:bg-[gray] rounded-full p-8 m-8'>
                                    <img src="/images/group/coin.svg" alt="" className='w-[80px] h-[80px] ' />
                                </div>
                                <span className='font-inter font-semibold text-2xl group-hover:text-[white]'>3 Month</span>
                                <span className='font-inter font-normal text-lg text-[red]'>Discounted</span>
                                <span className='font-inter font-semibold text-4xl group-hover:text-[white] m-10'>$1344</span>
                                <Button className='pt-4 pb-4 pl-10 pr-10 text-lg text-[white] group-hover:text-[black] font-inter font-normal rounded-lg bg-black group-hover:bg-[white] mb-10 h-[60px]' onClick={() => { handleAdvertise(3, 1344) }} disabled={isSaving}>Advertise</Button>
                            </div>
                            <div className='group flex flex-col gap-5 justify-center items-center bg-[white] hover:bg-[black] lg:w-[70%] w-full rounded-3xl'>
                                <div className='flex flex-col justify-center items-center bg-[#F4F4F4] group-hover:bg-[gray] rounded-full p-8 m-8'>
                                    <img src="/images/group/coin.svg" alt="" className='w-[80px] h-[80px] ' />
                                </div>
                                <span className='font-inter font-semibold text-2xl group-hover:text-[white]'>6 Month</span>
                                <span className='font-inter font-normal text-lg text-[red]'>Discounted</span>
                                <span className='font-inter font-semibold text-4xl group-hover:text-[white] m-10'>$2988</span>
                                <Button className='pt-4 pb-4 pl-10 pr-10 text-lg text-[white] group-hover:text-[black] font-inter font-normal rounded-lg bg-black group-hover:bg-[white] mb-10 h-[60px]' onClick={() => { handleAdvertise(6, 2988) }} disabled={isSaving}>Advertise</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
