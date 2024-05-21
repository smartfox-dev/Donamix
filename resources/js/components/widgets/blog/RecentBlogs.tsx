import React from 'react';
import 'react-multi-carousel/lib/styles.css';

import { useEffect, useState } from 'react';

import { Blog } from '@/lib/validation/blog';
import BlogCard from './BlogCard';
import CONSTANTS from '@/config/constants';
import Carousel from 'react-multi-carousel';
import { Spinner } from '@material-tailwind/react';
import { cn } from '@/lib/utils';
import { getBlogsByRange } from '@/api/blog';

// import 'react-alice-carousel/lib/alice-carousel.css';

// import AliceCarousel from 'react-alice-carousel';

// import { Carousel } from '@material-tailwind/react';

// import { BiDotsVerticalRounded } from 'react-icons/bi';
// import { Button } from '@/components/ui/button';

interface IRecentBlogsProps {
  className?: string;
}

const RecentBlogs: React.FC<IRecentBlogsProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogsByRange({ total_count: -1, from: 0, count: 10 })
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          if (res.data) {
            const temp = res.data;
            setBlogs(temp);
          }
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.warn('Error while loading blogs', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading === true) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white rounded-t-[26px] p-4 lg:recent-blog-lg xl:recent-blog-xl 2xl:recent-blog-2xl mx-auto',
        className
      )}
    >
      <div className="flex justify-between gap-3 mx-auto">
        <h4 className="text-black text-xl font-medium">Recent Blogs</h4>

        {/* <Button size="icon" variant="ghost">
          <BiDotsVerticalRounded />
        </Button> */}
      </div>

      <div className="mt-4 thumbs">
        {blogs && blogs.length > 0 ? (
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className="w-full mt-3"
            containerClass="gap-2"
            dotListClass=""
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
                items: 5,
              },
              desktoplg: {
                breakpoint: {
                  max: 2400,
                  min: 1800,
                },
                items: 4,
              },
              desktop: {
                breakpoint: {
                  max: 1800,
                  min: 1400,
                },
                items: 3,
              },
              mobilelg: {
                breakpoint: {
                  max: 1100,
                  min: 960,
                },
                items: 1,
              },
              mobilemd: {
                breakpoint: {
                  max: 960,
                  min: 850,
                },
                items: 3,
              },
              mobilesm: {
                breakpoint: {
                  max: 850,
                  min: 650,
                },
                items: 2,
              },
              mobilexs: {
                breakpoint: {
                  max: 650,
                  min: 0,
                },
                items: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1400,
                  min: 1100,
                },
                items: 2,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass="gap-2 overflow-auto"
            slidesToSlide={1}
            swipeable
          >
            {blogs.map((blog, i) => (
              <BlogCard
                key={`recent-blog-${i}`}
                className="h-[200px]"
                item={blog}
              ></BlogCard>
            ))}
          </Carousel>
        ) : (
          // <AliceCarousel
          // responsive={{
          //   0: {items: 1},
          //   670:{items:2},
          //   960: {items: 1},
          //   1170: {items: 2},
          //   1700: {items: 3}
          // }}
          //   items={blogs.map((blog, i) => (
          //     <BlogCard
          //       key={`blog-${i}`}
          //       item={blog}
          //       className="h-[250px]"
          //     />
          //   ))}
          // />
          <h4 className="w-full text-center text-gray-800 text-xl">
            No blogs
          </h4>
        )}
      </div>
    </div>
  );
};

export default RecentBlogs;
