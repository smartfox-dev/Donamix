import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsBriefcaseFill } from 'react-icons/bs';
import { Button, buttonVariants, ButtonProps } from '@/components/ui/button';
import { Chip } from '@material-tailwind/react';
import { FaGraduationCap } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useAuthContext } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../profile/layout/LeftSidebar';
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/custom/home/Footer';
import { cn } from '@/lib/utils';
import FileUpload from '@/components/common/FileUpload';
import { createPost, getPosts } from '@/api/post';
import { Post, postValidator } from '@/lib/validation/post';
import ProfileCard from '@/components/widgets/profile/ProfileCard';
import { Comment } from '@/lib/validation/comment';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { sendReport } from '@/api/users';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import PostCard from '@/components/widgets/post/PostCard';

interface IUserProfileProps { }

const Report: React.FC<IUserProfileProps> = ({ }) => {
    const { user } = useAuthContext();
    const params = useParams();
    // const dropdownRef = useRef(null);
    const modalRef = useRef(null);
    const [isPerspective, setisPerspective] = useState<boolean>(false);
    const [showPhotos, setShowPhotos] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [from, setFrom] = useState<number>(0);
    const [description, setDescription] = useState('');

    console.log('ssss')

    const [isMenuOpen, setIsMenuOpen] = useState<number>(0);
    const handleMenuClick = () => {
        setIsMenuOpen(isMenuOpen > 0 ? 0 : 1);
        console.log("MenuClick");
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(0);
    };

    const handleOutsideClick = (event: any) => {
        console.log('123', event, event.type, isMenuOpen, event.type == 'click' && isMenuOpen == 2)
        if (event.type == 'click' && isMenuOpen == 2) {
            setIsMenuOpen(0);
        }
        if (event.type == 'click' && isMenuOpen == 1) {
            setIsMenuOpen(2);
        }

    };

    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false)
    const onAddPost = (is_perspective: boolean, is_photo: boolean) => {
        setisPerspective(is_perspective)
        setShowPhotos(is_photo)
        setIsAddPostOpen(true);
    }
    const onCloseAddPost = () => {
        setIsAddPostOpen(false);
    }

    const removePost = (post: Post) => {
        let filteredArray = posts.filter(item => item !== post)
        setPosts(filteredArray);
    }

    const updatePost = (post: Post) => {
        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    return post;
                } else {
                    return item;
                }
            })
        )
    }

    const handleClose = () => {
        setDescription('');
    }


    const updateEmoticon = (arg: String, post: Post) => {
        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    switch (arg) {
                        case 'like':
                            item.like = item.like + 1
                            item.is_like = 1
                            break;

                        case 'unlike':
                            item.like = item.like - 1
                            item.is_like = 0
                            break;

                        case 'heart':
                            item.heart = item.heart + 1
                            item.is_heart = 1
                            break;

                        case 'unheart':
                            item.heart = item.heart - 1
                            item.is_heart = 0
                            break;

                        case 'clap':
                            item.clap = item.clap + 1
                            item.is_clap = 1
                            break;

                        case 'unclap':
                            item.clap = item.clap - 1
                            item.is_clap = 0
                            break;

                        case 'laugh':
                            item.laugh = item.laugh + 1
                            item.is_laugh = 1
                            break;

                        case 'unlaugh':
                            item.laugh = item.laugh - 1
                            item.is_laugh = 0
                            break;

                        default:
                            break;
                    }
                    return item;
                } else {
                    return item;
                }
            }));
    }

    const addComment = (comment: Comment, post: Post) => {
        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    item.comments.push(comment);
                    return item;
                } else {
                    return item;
                }
            }));
    }


    const destroyComment = (comment: Comment, post: Post) => {

        setPosts(
            posts.map((item) => {

                if (item.id == post.id) {

                    for (let index = 0; index < item.comments.length; index++) {
                        const element = item.comments[index];

                        if (element.id == comment.id) {
                            item.comments.splice(index, 1);
                        }
                    }

                    return item;
                } else {
                    return item;
                }
            }));

    }
    const removePhoto = (photo: any, post: Post) => {

        setPosts(
            posts.map((item) => {

                if (item.id == post.id) {

                    item.medias = item.medias.filter((media) => media.url != photo.url)

                    return item;
                } else {
                    return item;
                }
            }));

    }


    const updateComment = (comment: Comment, post: Post) => {

        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {

                    for (let index = 0; index < item.comments.length; index++) {
                        const element = item.comments[index];
                        if (element.id == comment.id) {
                            item.comments[index].description = comment.description
                            item.comments[index].is_edited = comment.is_edited
                        }
                    }

                    return item;
                } else {
                    return item;
                }
            }));

    }

    const handleReport = () => {
        sendReport({
            'user_id': user.id,
            'member_id': parseInt(params.id),
            'description' : description
        })
        .then((res) => {
            console.log(res)
            if(res.message == CONSTANTS.SUCCESS) {
                toast.success('Report Success!')
            }
        }).catch((err) => {
            toast.error('Failed!')
        })
    }

    useEffect(() => {
        getPosts()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        const temp = res.data;
                        if (from === 0) setPosts(temp);
                        else setPosts((prev) => [...prev, ...temp]);
                        setFrom(from + temp.length);
                    }
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })
            .finally(() => {
            });
    }, [])

    useEffect(() => {

        console.log("isMenuOpen", isMenuOpen)
        document.body.addEventListener("click", handleOutsideClick);

        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    })
    const [coverPhoto, setCoverPhoto] = useState<string | null | undefined>(null);

    // const handleClickOutside = (event: any) => {
    //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //     setIsMenuOpen(false);
    //   }
    // };

    // useEffect(() => {
    //   window.addEventListener('click', handleClickOutside);
    //   return () => {
    //     window.removeEventListener('click', handleClickOutside);
    //   };
    // }, []);

    return (
        <div className="">
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
                {/* <FileUpload
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
        </FileUpload> */}
            </div>
            <div className="flex flex-row">
                <LeftSidebar onStateChange={true} userid={params.id} username={''} />
                <div className="flex-1 xl:p-20 xl:pr-40 sm:p-10 p-4 w-0">
                    <div className="flex flex-col w-full gap-5">
                        <h3 className="text-2xl font-bold text-black font-poppins">Report User</h3>
                        <p className="text-[#7D7D7D] font-medium font-sans text-base">

                            {user && user.description
                                ? user.description
                                : `At Donamix, we prioritize the well-being and comfort of our users. If you come across any behavior that violates our community guidelines or makes you feel uncomfortable, please report the user. Together, we can maintain a safe and positive environment for everyone to enjoy. Your feedback matters!`}
                        </p>

                        <div className="flex flex-col w-full rounded-t-3xl p-8 bg-white gap-5 shadow-2xl">
                            <h3 className=' font-inter font-bold text-2xl'>Report</h3>
                            <p className=' font-sans font-normal text-xl text-[#6D6D6D]'>Please briefly explain why are you reporting this user?</p>
                            <textarea className="w-full h-[150px] bg-[#F8F8F8] rounded-xl p-5" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                            <div className="flex flex-row gap-4 justify-end">
                                <Button variant="secondary" className="p-6" onClick={handleClose}>Close</Button>
                                <Button variant="default" className="p-6" onClick={handleReport}>Report</Button>
                            </div>

                        </div>
                        <section className="w-full p-6 mt-6 bg-white rounded-lg">
                            <h5 className="text-base font-bold">
                                Received Gifts <b className='font-poppins'>23</b>
                            </h5>
                            <div className='grid grid-cols-12 gap-4 mt-4'>
                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <img src='/images/gifts/1.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                                        <h6 className='text-base font-semibold'>
                                            Child
                                        </h6>
                                        <div className='flex gap-1'>
                                            <img src='/images/money.svg' width={16} height={16} />
                                            <p className='text-xs text-[#545454'>12</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <img src='/images/gifts/2.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                                        <h6 className='text-base font-semibold'>
                                            Crown
                                        </h6>
                                        <div className='flex gap-1'>
                                            <img src='/images/money.svg' width={16} height={16} />
                                            <p className='text-xs text-[#545454'>124</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <img src='/images/gifts/3.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                                        <h6 className='text-base font-semibold'>
                                            Cake
                                        </h6>
                                        <div className='flex gap-1'>
                                            <img src='/images/money.svg' width={16} height={16} />
                                            <p className='text-xs text-[#545454'>102</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-6 md:col-span-3'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <img src='/images/gifts/4.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                                        <h6 className='text-base font-semibold'>
                                            Orange
                                        </h6>
                                        <div className='flex gap-1'>
                                            <img src='/images/money.svg' width={16} height={16} />
                                            <p className='text-xs text-[#545454'>16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {posts.map((post: Post, i:number) => (
                            <PostCard
                                key={`post-${i}`}
                                item={post}
                                currentUser={user}
                                removePost={removePost}
                                updatePost={updatePost}
                                addComment={addComment}
                                updateComment={updateComment}
                                destroyComment={destroyComment}
                                updateEmoticon={updateEmoticon}
                                removePhoto={removePhoto}
                                profile={false}                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
