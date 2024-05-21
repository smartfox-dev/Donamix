import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsBriefcaseFill } from 'react-icons/bs';
import Button from '@/components/common/Button';
import { Chip } from '@material-tailwind/react';
import { FaGraduationCap } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useAuthContext } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { blockedMember, unblock } from '@/api/users';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';

interface IBlockedUsersProps { }

const BlockedUsers: React.FC<IBlockedUsersProps> = ({ }) => {
    const { user } = useAuthContext();
    // const dropdownRef = useRef(null);
    const [isLoading, setLoading] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    const [blocks, setBlock] = useState([])

    const load = () => {
        blockedMember()
            .then((res: any) => {
                console.log('Success');
                console.log(res);
                setBlock(res);
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        load()
    }, [])

    const handleUnblock = (id: Number) => {
        unblock({'id': id})
            .then((res) => {
                if(res.message == CONSTANTS.SUCCESS) {
                    toast.success('Unblock Success!');
                    blockedMember()
                        .then((res: any) => {
                            console.log('Success');
                            console.log(res);
                            setBlock(res);
                        })
            .catch((err) => console.log(err))
                }
            })
            .catch((err) => {console.log(err)})
    }

    return (
        <div>
            <h3 className="text-xl font-semibold text-black font-poppins">Blocked Members</h3>

            <section className="flex flex-col gap-6 bg-white rounded-[9px] mt-6 sm:p-12 p-4">
                {isLoading ? blocks.map((block: any, i: any) => (
                    <div className="flex sm:flex-row flex-col rounded-[9px] align-center items-center gap-7 px-[13px] justify-between" key={i}>
                        <div className='col-span-6 md:col-span-3'>
                            <div className='flex items-center align-center gap-1'>
                                <img src={block.avatar} className='rounded-full w-[60px] h-[60px] bg-contain bg-no-repeat mr-2' />
                                <div>
                                    <p className="text-black font-bold">{block.name}</p>
                                    <p>{block.status}, {block.gender}</p>
                                </div>
                            </div>
                        </div>
                        <Button className="col-span-5 text-white bg-black  sm:col-span-3 whitespace-nowrap" onClick={(e) => {handleUnblock(block.id)}}>
                            Unblock
                        </Button>
                    </div>
                )) : blocks.slice(0, 5).map((block: any, i: any) => (
                    <div className="flex sm:flex-row flex-col rounded-[9px] align-center items-center gap-7 px-[13px] justify-between" key={i}>
                        <div className='col-span-6 md:col-span-3'>
                            <div className='flex items-center align-center gap-1'>
                                <img src={block.avatar} className='rounded-full w-[60px] h-[60px] bg-contain bg-no-repeat mr-2' />
                                <div>
                                    <p className="text-black font-bold">{block.name}</p>
                                    <p>{block.status}, {block.gender}</p>
                                </div>
                            </div>
                        </div>
                        <Button className="col-span-5 text-white bg-black  sm:col-span-3 whitespace-nowrap" onClick={(e) => {handleUnblock(block.id)}}>
                            Unblock
                        </Button>
                    </div>
                ))}
            </section>
            <div className="flex justify-center">
                {blocks.length >= 6 && <Button
                    className="mt-3 rounded-full"
                    onClick={() => {setLoading(true)}}
                >
                    Load More
                </Button>}
            </div>


        </div>
    );
};

export default BlockedUsers;
