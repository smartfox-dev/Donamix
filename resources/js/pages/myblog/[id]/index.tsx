import React from 'react';
import { BiEdit, BiShareAlt, BiTrash } from 'react-icons/bi';
import { deleteBlog, getBlogById, getBlogByName } from '@/api/blog';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Blog } from '@/lib/validation/blog';
import { BsFillEyeFill } from 'react-icons/bs';
import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import RecentBlogs from '@/components/widgets/blog/RecentBlogs';
import SharePopup from '@/components/custom/blog/SharePopup';
import { Spinner } from '@material-tailwind/react';
import { TiArrowForward } from 'react-icons/ti';
import { formatDate } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import { useBlogContext } from '@/context/BlogContext';

// import CommentBox from '@/components/widgets/blog/CommentBox';

const MyBlogDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { categories } = useBlogContext();
  const { user } = useAuthContext();
  const [item, setItem] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      getBlogByName(params.id)
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            if (res.data) setItem(res.data);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.warn('Error while loading blog by id:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [params]);

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  if (isLoading || !item)
    return (
      <div className="items-center justify-center flex w-full h-[300px]">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full p-3 md:p-5">
      <div
        className="h-[370px] rounded-t-2xl relative flex flex-col justify-end bg-cover bg-center"
        style={{ backgroundImage: `url(${item.banner})` }}
      >
        <div className="absolute px-3 py-3 font-sans text-sm font-bold bg-white rounded-lg right-4 top-4">
        {item.category.title}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/0 via-black/80 to-black"></div>
        <div className="absolute bottom-0 left-0 flex items-center justify-between w-full px-4 py-2">
          <div className="flex items-center gap-5 lg:gap-10">
          <p className="text-gray-300 font-poppins text-sm leading-6">
                {`Posted by ${item.user?.username}`}
              </p>
            <div className="flex items-center text-lg text-gray-300 font-poppins">
              {formatDate(item.createdAt, 'MMM DD, YYYY')}
            </div>
            <div className="flex items-center gap-1 text-gray-300">
              <BiShareAlt />
              {item.shares}
              <span className="hidden sm:block">shares</span>
            </div>
            <div className="flex items-center gap-1 text-gray-300">
              <BsFillEyeFill />
              {item.views}
              <span className="hidden sm:block">views</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {item.user_id === user?._id && (
              <div className="flex items-center gap-2">
                <Button
                  className="p-2 text-2xl text-white rounded-full bg-white/20"
                  onClick={() => {
                    navigate(`/myblog/${item.ititle}/edit`);
                  }}
                >
                  <BiEdit />
                </Button>
                <Button
                  className="p-2 text-2xl text-white rounded-full bg-white/20"
                  onClick={() => {
                    setShowModal(true);
                    // deleteBlog(item._id!)
                    //   .then((res) => {
                    //     if (res.code === CONSTANTS.SUCCESS) {
                    //       navigate('/blog');
                    //       toast.success(res.message);
                    //     } else {
                    //       toast.error(res.message);
                    //     }
                    //   })
                    //   .catch((err) => {
                    //     console.log('Delete Error:', err);
                    //   });
                  }}
                >
                  <BiTrash />
                </Button>
              </div>
            )}
            <SharePopup link={window.location.href} blogId={params.id}>
              <Button className="p-2 text-2xl text-white rounded-full bg-white/20">
                <TiArrowForward />
              </Button>
            </SharePopup>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-end w-full p-8 h-1/2 bg-gradient-to-b from-black/0 via-black/80 to-black"> */}
      <h2 className="text-black font-poppins text-[30px] leading-[35px] font-bold mt-5">
        {item.title}
      </h2>
      {/* </div> */}
      <div className="mt-5">
        <div
          dangerouslySetInnerHTML={{
            __html: item.body,
          }}
        ></div>
      </div>

      <RecentBlogs className="mt-10" />
      {/* <div className='mt-5'>
        <CommentBox blog={item} />
      </div> */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="relative z-10 p-4 bg-white rounded-lg">
            <p>Do you really want to delete this blog?</p>
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
                  deleteBlog(item._id!)
                    .then((res) => {
                      if (res.code === CONSTANTS.SUCCESS) {
                        navigate('/myblog');
                        toast.success(res.message);
                      } else {
                        toast.error(res.message);
                      }
                    })
                    .catch((err) => {
                      console.log('Delete Error:', err);
                    });
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default MyBlogDetail;
