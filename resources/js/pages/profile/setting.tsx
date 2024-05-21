import React from 'react';
import { FaCircleUser, FaGraduationCap } from 'react-icons/fa6';
import { MdBlock, MdFavorite, MdInfo } from 'react-icons/md';
import { User, userValidator } from '@/lib/validation/user';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import About from '@/components/widgets/profile/About';
import AccountSettings from '@/components/widgets/profile/AccountSettings';
import Albums from '@/components/widgets/profile/Albums1';
// import NewAlbums from '@/components/widgets/profile/NewAlbums';
// import Albums1 from '@/components/widgets/profile/Albums1'
import Avatar from '@/components/common/Avatar';
import BasicInformation from '@/components/widgets/profile/BasicInformation';
import BlockedUsers from '@/components/widgets/profile/BlockedUsers';

import Friends from '@/components/widgets/profile/Friends';
import Timeline from '@/components/widgets/profile/Timeline';
import { BiSolidPhotoAlbum } from 'react-icons/bi';
import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import ChangePassword from '@/components/widgets/profile/ChangePassword';
import EducationAndWork from '@/components/widgets/profile/EducationAndWork';
import FileUpload from '@/components/common/FileUpload';
import { HiLockClosed } from 'react-icons/hi';
import Interests from '@/components/widgets/profile/Interests';
import { IoMdInformationCircle } from 'react-icons/io';
import { Spinner } from '@material-tailwind/react';
import UpdateProfilePicture from '@/components/widgets/profile/UpdateProfilePicture';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { updateUser } from '@/api/users';
import { useAuthContext } from '@/context/AuthContext';
import { DivideCircleIcon } from 'lucide-react';
import { BiSolidEdit } from 'react-icons/bi';
import { PiNutFill } from 'react-icons/pi';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";


const options = [
    {
        value: 'info',
        icon: <IoMdInformationCircle />,
        title: 'Basic Information',
    },
    {
        value: 'education',
        icon: <FaGraduationCap />,
        title: 'Education and Work',
    },
    {
        value: 'interests',
        icon: <MdFavorite />,
        title: 'My Interests',
    },
    {
        value: 'album',
        icon: <BiSolidPhotoAlbum />,
        title: 'My Album',
    },
    {
        value: 'settings',
        icon: <PiNutFill />,
        title: 'Account Settings',
    },
    {
        value: 'change-password',
        icon: <HiLockClosed />,
        title: 'Change Password',
    },
    {
        value: 'profile-picture',
        icon: <FaCircleUser />,
        title: 'Update Profile Picture',
    },
    {
        value: 'blocked-user',
        icon: <MdBlock />,
        title: 'Blocked Members',
    },
    // {
    //   value: 'friends',
    //   icon: <MdInfo />,
    //   title: 'Friends',
    // },
    // {
    //   value: 'about',
    //   icon: <MdInfo />,
    //   title: 'About',
    // },
    // {
    //   value: 'myalbum',
    //   icon: <MdInfo />,
    //   title: 'Album',
    // },
    // {
    //   value: 'timeline',
    //   icon: <MdInfo />,
    //   title: 'Album',
    // },
];

const pages = [
    {
        value: 'timeline',
        title: 'Timeline',
    },
    {
        value: 'about',
        title: 'About',
    },
    {
        value: 'albums',
        title: 'Albums',
    },
    {
        value: 'friends',
        title: 'Friends',
    },
];

interface IProfileEditProps { }

const ProfileSetting: React.FC<IProfileEditProps> = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [tab, setTab] = useState<string>('settings');
    const { user, reload } = useAuthContext();
    const [coverPhoto, setCoverPhoto] = useState<string | null | undefined>(null);
    const [isSavingCoverPhoto, setIsSavingCoverPhoto] = useState<boolean>(false);

    // useEffect(() => {
    //   reload();
    // }, [])

    useEffect(() => {
        if (user && user.banner) {
            setCoverPhoto(user.banner);
        }
    }, [user]);

    useEffect(() => {
        if (params) {
            const page = params.get('page') as string;
            setTab(page || 'settings');

        }
    }, [params]);


    const changeLink = (page: string) => {
        setTab(page);
        navigate('?page=' + page, { replace: true });
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner color="blue" />
            </div>
        );
    }

    const SaveAvatar = (avatar: string) => {
        // setIsSaving(true);
        const newUser: User = userValidator.parse({
            ...user,
            avatar: avatar,
        });

        updateUser(user.id, newUser)
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    reload();
                    console.log(res);
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => {

            });
    };

    return (
        <div className="flex flex-col">
            <div
                className={cn(
                    'relative w-full h-[300px] overflow-visible',
                    coverPhoto ? `bg-cover bg-center` : ''
                )}
                style={{
                    backgroundImage: coverPhoto ? `url(${coverPhoto})` : '',
                    backgroundColor: coverPhoto ? '' : 'black',
                }}
            >
                <FileUpload
                    onSuccess={({ url }: { url: string }) => {
                        setCoverPhoto(url);
                        console.log(user, url);

                        if (!user) return;
                        setIsSavingCoverPhoto(true);
                        console.log(url);

                        const newUser: User = userValidator.parse({
                            ...user,
                            banner: url,
                        });

                        updateUser(user._id, newUser)
                            .then((res) => {
                                if (res.code === CONSTANTS.SUCCESS) {
                                    reload();
                                    console.log(res);
                                    toast.success(res.message);
                                } else {
                                    toast.error(res.message);
                                }
                            })
                            .catch((err) => {
                                console.warn(err);
                            })
                            .finally(() => {
                                setIsSavingCoverPhoto(false);
                            });
                    }}
                >
                    <div
                        className="absolute font-medium text-black bg-secondary p-3 rounded curosr-pointer hover:cursor-pointer inline-block top-4 right-4 sm:bottom-4 sm:top-auto"
                    // disabled={isSavingCoverPhoto}
                    >
                        Edit Cover Photo
                    </div>
                </FileUpload>
            </div>
            <div className="w-full relative z-0 mb-10 h-auto">
                <Tabs value={tab} orientation="vertical" className=" flex flex-row min-h-[700px]">
                    <div className="flex-col w-[50px] lg:w-[380px] bg-white ">
                        <div className="absolute flex flex-col items-center -translate-y-[120%] translate-x-[50%] lg:-translate-y-1/3 lg:translate-x-[50%]">
                            <div>
                                <FileUpload
                                    onSuccess={({ url }: { url: string }) => {
                                        SaveAvatar(url);
                                    }}
                                    className=""
                                >
                                    <div className="w-[170px] h-[170px] hover:scale-110 hover:translate-y-[-5%] transition-transform duration-300 ease-out">

                                        <Avatar
                                            className="w-full h-full text-[40px] font-bold border-white border-4 p-0 !important"
                                            user={user}
                                        ></Avatar>
                                        <img src='/images/avatarhover.png' className='absolute top-0 w-[170px] h-[170px] bg-contain bg-no-repeat opacity-0 hover:opacity-50 transition-opacity duration-500 ease-out' />

                                    </div>
                                </FileUpload>
                            </div>
                            <div className=" flex-col items-center hidden gap-1 lg:flex">
                                <h4 className="text-black font-inter text-[21px] font-bold mt-4">
                                    {user?.name}
                                </h4>
                                <h5 className="text-[#818181] font-medium text-lg font-inter">
                                    {user?.username}
                                </h5>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 absolute lg:top-[180px] top-[30px]">
                            <TabsHeader
                                className="w-[50px] lg:w-[380px] bg-transparent"
                                indicatorProps={{
                                    className: 'hidden',
                                }}
                            >
                                {options.map((option, i) => (
                                    <Tab
                                        key={`profile-option-${i}`}
                                        value={option.value}
                                        className="justify-start lg:px-8"
                                        onClick={() => {
                                            changeLink(option.value);
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                'flex items-center h-[62px] gap-2 font-poppins text-xl font-medium',
                                                tab === option.value ? 'opacity-100' : 'opacity-60'
                                            )}
                                        >
                                            <span className="text-[25px]">{option.icon}</span>
                                            <span className="hidden lg:block">{option.title}</span>
                                        </div>
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </div>
                    </div>

                    <div className="flex-1 py-5">
                        <div className="flex-col max-w-[100%] lg:px-[100px] sm:px-[40px] px-[10px]">
                            <TabsHeader className="flex sm:flex-row flex-col bg-transparent border-b border-[#C9C9C9] rounded-none">
                                {pages.map((val, i) => (
                                    <Tab
                                        key={`profile-page-${i}`}
                                        value={val.value}
                                        onClick={() => {
                                            setTab(val.value);
                                            // setPage(val.value);
                                        }}
                                        className={cn(
                                            'font-semibold',
                                            tab === val.value ? 'text-black' : 'text-[#818181]'
                                        )}
                                    >
                                        {val.title}
                                    </Tab>
                                ))}
                            </TabsHeader>

                            <TabsBody className="min-h-[700px]">
                                <TabPanel value="info">
                                    <BasicInformation />
                                </TabPanel>
                                <TabPanel value="education">
                                    <EducationAndWork />
                                </TabPanel>
                                <TabPanel value="interests" className="">
                                    <Interests />
                                </TabPanel>
                                <TabPanel
                                    value="album" className="">
                                    <Albums />
                                </TabPanel>
                                <TabPanel value="settings" className="">
                                    <AccountSettings />
                                </TabPanel>
                                <TabPanel value="change-password" className="">
                                    <ChangePassword />
                                </TabPanel>
                                <TabPanel value="profile-picture" className="">
                                    <UpdateProfilePicture />
                                </TabPanel>
                                <TabPanel value="blocked-user" className="">
                                    <BlockedUsers />
                                </TabPanel>
                                <TabPanel value="timeline" className="">
                                    <Timeline />
                                </TabPanel>
                                <TabPanel value="about" className="">
                                    <About />
                                </TabPanel>
                                <TabPanel value="albums" className="">
                                    <Albums />
                                </TabPanel>
                                <TabPanel value="friends" className="">
                                    <Friends />
                                </TabPanel>
                            </TabsBody>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default ProfileSetting;
