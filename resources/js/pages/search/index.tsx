import React from 'react';
import LeftSidebar from '../dashboard/layout/LeftSidebar';
import RightSidebar from '../dashboard/layout/RightSidebar';
import CustomCarousel from '@/components/custom/CustomCarousel';
import Button from '@/components/common/Button';
import { useEffect, useState } from 'react';
import { getAll, getUpdated, getPost, getSearchName, getPostByUser } from '@/api/users';
import { useAppContext } from '@/context/AppContext';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { Spinner } from '@material-tailwind/react';
import { getBirthdayMembers } from '@/api/home';
import BirthdayMemberItem, {
    BirthdayMember,
} from '@/components/common/BirthdayMemberItem';
import { useAuthContext } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { setPriority } from 'os';
import { useNavigate } from 'react-router-dom';

export default function Search() {

    const [birthdayMembers, setUsers] = useState([]);
    const [birthdayUsers, setBirthday] = useState<BirthdayMember[]>([]);
    const [fivebirthdayMembers, setFiveUsers] = useState([]);
    const [updateds, setUpdated] = useState([]);
    const [posts, setPost] = useState([]);
    const [fiveposts, setFivePost] = useState([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    const [isPeople, setPeople] = useState(false)
    const [isPost, setLoadingPost] = useState(false)

    const navigate = useNavigate()
    const handlePost = () => {
        setPeople(true)
    }

    const handleLoadingPost = () => {
        setLoadingPost(true)
    }

    const getResult = () => {
        if (location.search != '') {
            const key = location.search.split('=')[1]
            getSearchName({ 'name': key })
                .then((res: any) => {
                    if (res.code === CONSTANTS.SUCCESS) {
                        setUsers(res.data);
                        setFiveUsers(res.data.slice(0, 5));
                        setLoading(false);
                    }
                    else {
                        toast.error('Failed!');
                    }
                })
                .catch((err) => {
                    console.warn('Error while loading upgrade titles', err);
                })
                .finally(() => {
                    setLoading(false);
                });
            getPostByUser({ 'key': key })
                .then((res: any) => {
                    setPost(res);
                    setFivePost(res.slice(0, 5));
                    setLoading(false);
                })
                .catch((err) => {
                    console.warn('Error while loading upgrade titles', err);
                })
                .finally(() => {
                    setLoading(false);
                });

        }
    }

    const load = () => {
        setLoading(true);

        getBirthdayMembers()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        setBirthday(res.data)
                    }
                }
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })
            .finally(() => {

            });
        getAll()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    setUsers(res.data);
                    setFiveUsers(res.data.slice(0, 5));
                    setLoading(false);
                }
                else {
                    toast.error('Failed!');
                }
            })
            .catch((err) => {
                console.warn('Error while loading upgrade titles', err);
            })
            .finally(() => {
                setLoading(false);
            });



        getUpdated()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    console.log(res.data)
                    setUpdated(res.data);
                    setLoading(false);
                }
                else {
                    toast.error('Failed!');
                }
            })
            .catch((err) => {
                console.warn('Error while loading upgrade titles', err);
            })
            .finally(() => {
                setLoading(false);
            });

        getPost()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    setPost(res.data);
                    setFivePost(res.data.slice(0, 5));
                    setLoading(false);
                }
                else {
                    toast.error('Failed!');
                }
            })
            .catch((err) => {
                console.warn('Error while loading upgrade titles', err);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    useEffect(() => {
        load()

    }, []);

    useEffect(() => {
        getResult();
    }, [location])


    if (isLoading)
        return (
            <div className="items-center justify-center flex w-full h-[300px]">
                <Spinner />
            </div>
        );

    return (
        <div className="flex-1 bg-dashboard-background w-full mainBody">
            <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
                <div className="rounded-t-full">
                    <img src="/images/home/home.png" className="w-full h-auto" alt="" />
                </div>
                {birthdayUsers.length > 0 && (
                    <div>
                        <div className="font-bold font-[Open Sans] text-lg">Birthday Celebration</div>
                        <div className="flex flex-row gap-6 overflow-hidden">
                            <CustomCarousel showDots={true} n={"pb-10"}>
                                {birthdayUsers.map((item, i) => (
                                    <BirthdayMemberItem key={`birthday-member-${i}`} item={item} />
                                ))}
                            </CustomCarousel>

                        </div>
                    </div>
                )

                }
                <div className="rounded-t-3xl bg-black flex flex-col py-6 pl-4">
                    {/* <div className="flex flex-row"> */}
                    <p className="font-sans font-bold text-xl text-[#FFFFFF]">Upcoming Birthdays</p>
                    <div className="flex flex-row gap-6 overflow-hidden p-4">
                        <CustomCarousel showDots={false} n={"pb-0"}>
                            {birthdayMembers.map((item, i) => (
                                <BirthdayMemberItem key={`birthday-member-${i}`} item={item} />
                            ))}
                        </CustomCarousel>
                    </div>
                    {/* </div> */}
                </div>
                <div className="bg-white rounded-t-3xl mt-6 p-12 flex flex-col gap-6">
                    <div className=" font-montserrat font-bold text-[22px]">People</div>
                    <div className="flex flex-col gap-10">
                        {isPeople ? birthdayMembers.map((item, i) => (
                            <div className="rounded-[9px] flex align-center items-center gap-7 px-[13px] justify-between" key={i}>
                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex items-center align-center gap-1'>
                                        <img src={item.avatar} className='rounded-full w-[60px] h-[60px] bg-contain bg-no-repeat mr-2' />
                                        <div>
                                            <p className="text-black font-poppins font-medium text-xl">{item.name}</p>
                                            <p className="font-poppins font-normal text-lg">{item.status}, {item.gender}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="col-span-5 text-white bg-black  sm:col-span-3 whitespace-nowrap py-6 px-10">
                                    Connect
                                </Button>
                            </div>
                        )) : fivebirthdayMembers.map((item, i) => (
                            <div className="rounded-[9px] flex align-center items-center gap-7 px-[13px] justify-between" key={i}>
                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex items-center align-center gap-1'>
                                        <img src={item.avatar} className='rounded-full w-[60px] h-[60px] bg-contain bg-no-repeat mr-2' />
                                        <div>
                                            <p className="text-black font-poppins font-medium text-xl">{item.name}</p>
                                            <p className="font-poppins font-normal text-lg">{item.status}, {item.gender}</p>
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
                        {birthdayMembers.length >= 6 && <Button
                            className="mt-3 rounded-full"
                            onClick={handlePost}
                        >
                            Load More
                        </Button>}

                    </div>
                </div>
                <div className="rounded-t-3xl bg-white flex flex-col py-6 pl-4">
                    {/* <div className="flex flex-row"> */}
                    <p className="font-sans font-bold text-xl text-black">Updated Profile</p>
                    <div className="flex flex-row gap-6 overflow-hidden p-4">
                        <CustomCarousel showDots={false} n={"pb-0"}>
                            {updateds.length != 0 && updateds.map((item, i) => (
                                <BirthdayMemberItem key={`birthday-member-${i}`} item={item} />
                            ))}
                        </CustomCarousel>
                    </div>
                    {/* </div> */}
                </div>
                <div className="rounded-t-3xl bg-white flex flex-col p-10">
                    <p className="font-sans font-bold text-xl text-black mb-10">Blogs</p>
                    <div className="flex flex-col gap-5">
                        {isPost ? posts.map((post, i) =>
                            <div className="flex flex-row gap-8 items-center" key={i} onClick={() => navigate('/blog' + post.slug)}>
                                <img src={post.banner} className='w-20 h-20 rounded-xl' alt="" />
                                <p className="font-sans font-bold text-xl">{post.title}</p>
                            </div>
                        ) : fiveposts.map((post, i) =>
                            <div className="flex flex-row gap-8 items-center" key={i}>
                                <img src={post.banner} className='w-20 h-20 rounded-xl' alt="" />
                                <p className="font-sans font-bold text-xl">{post.title}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        {posts.length >= 6 && <Button
                            className="mt-3 rounded-full"
                            onClick={handleLoadingPost}
                        >
                            Load More
                        </Button>}

                    </div>

                </div>

            </div>
        </div>
    )
}
