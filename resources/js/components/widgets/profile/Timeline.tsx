import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Post, postValidator } from '@/lib/validation/post';
import { Comment } from '@/lib/validation/comment';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { toast } from 'react-hot-toast';
import { BsBriefcaseFill } from 'react-icons/bs';
import Button from '@/components/common/Button';
import { Chip } from '@material-tailwind/react';
import { FaGraduationCap } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useAuthContext } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createPost, getTimePostsByUser } from '@/api/post';
import CONSTANTS, { Option } from '@/config/constants';
import PostCard from '@/components/widgets/post/TimeLinePostCard';
import { FaEarthAmericas } from "react-icons/fa6";
import { MdOutlineReport } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";

import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';
import { BsXSquare } from "react-icons/bs";
import '../../../App.css';


const Timeline: React.FC<IFriendsProps> = ({ }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, reload } = useAuthContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visiblePosts, setVisiblePosts] = useState(4);
  const handleLoadMore = () => {
    setVisiblePosts(prevVisibleGroups => prevVisibleGroups + 4);
  };

  const [input, setInput] = useState<{
    description: string;

  }>({
    description: '',
  });
  const handleOnClick = () => {
    navigate('/profile/userprofile');
  }



  const load = () => {

    setIsLoading(true);
    getTimePostsByUser(user.id)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          if (res.data) {
            const temp = res.data;
            console.log("timeline_data:", temp)
            setPosts(temp)
            setIsLoading(false);
          }

        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.warn('Error while loading blogs', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);



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
    <div className="flex flex-col relative">
      <h3 className="text-xl font-semibold text-black font-poppins">Timeline</h3>
      <div className='flex flex-col flex-1 w-full gap-5'>
        {posts.slice(0, visiblePosts).map((post: Post, i: number) => (
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
          />
        ))
        }
        {posts.length >= visiblePosts ?
          <div className="mt-10 flex justify-center items-center">
            <Button variant='filled' className="rounded-full" onClick={handleLoadMore}>Load More</Button>
          </div>
          :
          <div />
        }
      </div>
    </div>
  );
};

export default Timeline;
