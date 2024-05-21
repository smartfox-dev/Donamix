import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function CustomCarousel({showDots, n, children}) {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      className={`w-full ${n}`}
      containerClass="gap-2"
      dotListClass="custom-dot-list-style"
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
          items: 7,
        },
        desktoplg: {
          breakpoint: {
            max: 2400,
            min: 1800,
          },
          items: 5,
        },
        desktop: {
          breakpoint: {
            max: 1800,
            min: 1400,
          },
          items: 4,
        },
        mobilelg: {
          breakpoint: {
            max: 1100,
            min: 960,
          },
          items: 3,
        },
        mobilemd: {
          breakpoint: {
            max: 960,
            min: 850,
          },
          items: 4,
        },
        mobilesm: {
          breakpoint: {
            max: 850,
            min: 650,
          },
          items: 3,
        },
        mobilexs: {
          breakpoint: {
            max: 650,
            min: 0,
          },
          items: 2,
        },
        tablet: {
          breakpoint: {
            max: 1400,
            min: 1100,
          },
          items: 4,
        },
      }}
      rewind={true}
      rewindWithAnimation={true}
      rtl={false}
      shouldResetAutoplay
      showDots= {showDots}
      sliderClass="gap-2 overflow-auto"
      slidesToSlide={1}
      swipeable
    >{children}</Carousel>
  )
}