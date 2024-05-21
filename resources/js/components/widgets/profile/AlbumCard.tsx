import React from 'react';
import 'react-multi-carousel/lib/styles.css';

import { Album } from '@/lib/validation/album';
import Carousel from 'react-multi-carousel';
import { IconButton } from "@material-tailwind/react";

// import { Carousel } from '@material-tailwind/react';

// import { BiDotsVerticalRounded } from 'react-icons/bi';
// import { Button } from '@/components/ui/button';

interface IAlbumCardProps {
  item: Album;
}

const AlbumCard: React.FC<IAlbumCardProps> = ({ item }) => {



  return (
    <div className="bg-white rounded-[26px] p-4">
      <div className="flex justify-between gap-3 mx-auto">
        <h4 className="text-base font-medium text-black">{item.title}</h4>

        {/* <Button size="icon" variant="ghost">
          <BiDotsVerticalRounded />
        </Button> */}
      </div>

      {item.images.length > 0 ? (
        <Carousel
          // customRightArrow={<CustomRightArrow />}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="w-full mt-3 p-1 pl-5 justify-start"
          containerClass='w-[50%]'
          dotListClass=""
          draggable={true}
          focusOnSelect={true}
          infinite={false}
          itemClass=""
          keyBoardControl={true}
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
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {item.images.map((img, i) => (
            <div
              key={`album-img-${i}`}
              className="h-[200px] w-4/5 bg-cover bg-center rounded-[5px] border border-gray-10"
              style={{ backgroundImage: `url(${img.image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
            ></div>
          ))}
        </Carousel>
      ) : (
        <h4 className="w-full text-center text-gray-800 text-xl">
          No Images
        </h4>
      )}
    </div>
  );
};

export default AlbumCard;
