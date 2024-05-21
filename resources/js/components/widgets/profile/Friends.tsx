import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsBriefcaseFill } from 'react-icons/bs';
import Button from '@/components/common/Button';
import { Chip } from '@material-tailwind/react';
import { FaGraduationCap } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useAuthContext } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { getFriends, unFriend } from '@/api/users';
import axios from 'axios';
import CONSTANTS from '@/config/constants';
import toast from 'react-hot-toast';

interface IFriendsProps { }

const Friends: React.FC<IFriendsProps> = ({ }) => {
    const { user } = useAuthContext();
    const [friends, setFriends] = useState([])
    const [isLoading, setLoading] = useState(false)
    // const dropdownRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    const load = () => {
        getFriends()
            .then((res) => {
                if(res.code == CONSTANTS.SUCCESS) {
                    setFriends(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
                console.error('Failed Load!')
            })
    }

    const handleUnfriend = (id) => {
        unFriend({'id': id})
            .then((res: any) => {
                if(res.code === CONSTANTS.SUCCESS) {
                    toast.success('Success!')
                    setFriends(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        load()
    }, []);

    return (
        <div>
            <h3 className="text-xl font-semibold text-black font-poppins">Friends</h3>

            <section className="bg-white rounded-[9px] mt-6 sm:p-4 md:px-12 px-4 py-4 flex flex-col gap-6">
                {isLoading ? friends.map((friend, i) => (
                    <div className="rounded-[9px] flex sm:flex-row flex-col align-center items-center gap-7 px-[13px] justify-between">
                        <div className='col-span-6 md:col-span-3'>
                            <div className='flex items-center align-center gap-1'>
                                <img src={friend.avatar} className='rounded-full w-[60px] h-[60px] bg-contain bg-no-repeat mr-2' />
                                <div>
                                    <p className="text-black font-bold">{friend.name}</p>
                                    <p>{friend.statue}, {friend.gender}</p>
                                </div>
                            </div>
                        </div>
                        <Button className="col-span-5 text-white bg-black  sm:col-span-3 whitespace-nowrap" onClick={() => handleUnfriend(friend.id)}>
                            UnFriend
                        </Button>
                    </div>
                )) : friends.slice(0, 5).map((friend, i) => (
                    <div className="rounded-[9px] flex sm:flex-row flex-col align-center items-center gap-7 px-[13px] justify-between">
                        <div className='col-span-6 md:col-span-3'>
                            <div className='flex items-center align-center gap-1'>
                                <img src='/images/users/4.jpg' className='rounded-full w-[60px] h-[60px] bg-contain bg-no-repeat mr-2' />
                                <div>
                                    <p className="text-black font-bold">{friend.name}</p>
                                    <p>{friend.statue}, {friend.gender}</p>
                                </div>
                            </div>
                        </div>
                        <Button className="col-span-5 text-white bg-black  sm:col-span-3 whitespace-nowrap" onClick={() => handleUnfriend(friend.id)}>
                            UnFriend
                        </Button>
                    </div>
                ))}

            </section>
            <div className="flex justify-center">
                {friends.length >= 6 && <Button
                    className="mt-3 rounded-full"
                    onClick={() => setLoading(true)}
                >
                    Load More
                </Button>}
            </div>


        </div>
    );
};

export default Friends;
