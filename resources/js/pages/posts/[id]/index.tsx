import React from 'react';
// import 'react-multi-carousel/lib/u';
import {useState, useEffect, useMemo} from 'react';
import { Post, postValidator } from '@/lib/validation/post';
import { Comment } from '@/lib/validation/comment';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import LeftSidebar from './../../dashboard/layout/LeftSidebar';
import RightSidebar from './../../dashboard/layout/RightSidebar';
import AddPost from '@/components/custom/home/AddPost';
import CustomCarousel from '@/components/custom/CustomCarousel';
import { getPost } from '@/api/post';
import { Spinner } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router-dom';


import PostCard from '@/components/widgets/post/PostCard';


import '../../../App.css';
const LIMIT = 10;

export default function Home() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/profile/userprofile');
  }
  const [sidbarExpanded, setSidebarExpanded] = useState(null)
  const { user } = useAuthContext();
  const [input, setInput] = useState<{
    description: string;

  }>({
    description: '',
  });

  const params = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const load = () => {

    setIsLoading(true);
    getPost(params.id)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          if (res.data) {
            setPost(res.data)
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


  const showSidebar: () => void = () => {
    setSidebarExpanded(true)
  }
  const hideSidebar: () => void = () => {
    setSidebarExpanded(false)
  }


  const removePost = (item : Post) => {
    navigate('/');
  }

  const updatePost = (item : Post) => {
    setPost(item)
  }



  const removePhoto = (photo : any, post : Post) => {
    navigate('/');
  }


  const updateEmoticon = (arg : String, item : Post) => {

        switch (arg) {
          case 'like':
            post.like = post.like + 1
            post.is_like = 1
            break;

          case 'unlike':
            post.like = post.like - 1
            post.is_like = 0
            break;

          case 'heart':
            post.heart = post.heart + 1
            post.is_heart = 1
            break;

          case 'unheart':
            post.heart = post.heart - 1
            post.is_heart = 0
            break;

          case 'clap':
            post.clap = post.clap + 1
            post.is_clap = 1
            break;

          case 'unclap':
            post.clap = post.clap - 1
            post.is_clap = 0
            break;

          case 'laugh':
            post.laugh = post.laugh + 1
            post.is_laugh = 1
            break;

          case 'unlaugh':
            post.laugh = post.laugh - 1
            post.is_laugh = 0
            break;

          default:
            break;
        }

        setPost(post);

  }

  const addComment = (comment : Comment, item : Post) => {
    post.comments.push(comment);
    setPost(post);
  }


  const destroyComment = (comment : Comment, item : Post) => {


      for (let index = 0; index < post.comments.length; index++) {
        const element = post.comments[index];

        if(element.id == comment.id){
          post.comments.splice(index, 1);
        }
      }

      setPost((prev) => ({
        ...prev,
        comments: post.comments
      }));

  }


  const updateComment = (comment : Comment, item : Post) => {

    for (let index = 0; index < post.comments.length; index++) {
      const element = post.comments[index];

      if(element.id == comment.id){
          post.comments[index].description = comment.description
          post.comments[index].is_edited = comment.is_edited
      }
    }

  setPost(post);

  }

  const customArrow = {
    customLeftArrow: <button style={{ position: 'absolute', top: '50%', left: '0' }}>Left</button>,
    customRightArrow: <button style={{ position: 'absolute', top: '50%', right: '0' }}>Right</button>,
  };


  if (isLoading)
  return (
    <div className="items-center justify-center flex w-full h-[300px]">
      <Spinner />
    </div>
  );

  return (
    <div className="relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
      <LeftSidebar onStateChange={showSidebar}/>
      <div className="flex-1 bg-dashboard-background w-full mainBody">
        <div className="mt-10 sm:px-10 px-2 h-full flex flex-col gap-5">
          {/* <Outlet /> */}
          {/* carousel insert here!!! */}
        { post && (
            <PostCard
            key={post && post.id}
            item={post}
            currentUser={user && user}
            removePost={removePost}
            updatePost={updatePost}
            addComment={addComment}
            updateComment={updateComment}
            destroyComment={destroyComment}
            updateEmoticon={updateEmoticon}
            removePhoto={removePhoto}
            profile={true}/>

        )}


        </div>

      </div>
      <RightSidebar />
    </div>

  )
}
