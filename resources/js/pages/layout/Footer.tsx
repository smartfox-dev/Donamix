import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { FiArrowUpRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const gotoAboutus = () => navigate('/aboutus');
  const gotoForum = () => navigate('/forum');
  const gotoMarketplace = () => navigate('/marketplace');
  const gotoDonation = () => navigate('/donation');

  const handleDonation = () => {
    gotoDonation();
  }
  return (
    <div className="w-full bg-white pt-[80px]">
      <div className="relative w-full lg:px-[75px] px-[15px] sm:px-[25px] md:px-[50px]">
        <div className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden">
          <img src="/images/footer_bg.svg" className="w-[120vw] h-auto" />
          <div className="w-full h-full -mt-1 bg-black"></div>
        </div>
        <div className="relative z-10 xl:flex">
          <div className="xl:flex-[4]">
            <div className="pt-[60px] pb-[40px]">
              <img
                src="/images/black_logo.svg"
                width={200}
                height={60}
                className="invert"
              />
            </div>
            <div className="justify-between lg:gap-8 lg:flex">
              <ul className="lg:flex-[2] flex flex-col flex-wrap gap-2 pl-5 md:px-0 text-white list-disc h-[350px] text-[16px]">
                <li className="font-urbanist cursor-pointer" onClick={gotoMarketplace}>Marketplace</li>
                <li className="font-urbanist cursor-pointer" onClick={() => {navigate('/jobs')}}>Jobs</li>
                <li className="font-urbanist cursor-pointer" onClick={handleDonation}>Support us</li>
                <li className="font-urbanist">Events</li>
                <li className="font-urbanist cursor-pointer" onClick={() => {navigate('/chat/admin')}}>Contributors</li>
                <li className="font-urbanist cursor-pointer" onClick={() => navigate('/chat/safety')}>Safety Tips</li>
                <li className="font-urbanist cursor-pointer" onClick={() => navigate('/terms')}>Terms & Conditions</li>
                <li className="font-urbanist cursor-pointer" onClick={() => navigate('/press')}>Press & Media</li>
                <li className="font-urbanist cursor-pointer" onClick={() => navigate('/promote')}>Promote us</li>
                <li className="font-urbanist">Why Contribute?</li>
                <li className="font-urbanist cursor-pointer" onClick={() => navigate('/conduct')}>Community Guidelines</li>
                <li className="font-urbanist cursor-pointer" onClick={() => navigate('/advertise')}>Advertising</li>
                <li className="font-urbanist cursor-pointer" onClick={gotoAboutus}>About us</li>
                <li className="font-urbanist cursor-pointer"  onClick={() => navigate('/sitemap')}>Sitemap</li>
                <li className="font-urbanist cursor-pointer" onClick={() => navigate('/faq')}>Help Center</li>
                <li className="font-urbanist cursor-pointer" onClick={() => {navigate('/blog')}}>Blog</li>
                <li className="font-urbanist cursor-pointer" onClick={() => {navigate('/chatrooms')}}>Chatrooms</li>
                <li className="font-urbanist cursor-pointer" onClick={() => {navigate('/privacy-policy')}}>Privacy Policy</li>
                <li className="font-urbanist cursor-pointer">DJ Application</li>
                <li className="font-urbanist cursor-pointer" onClick={() => {navigate('/upgraded-users')}}>Upgrade Account</li>
                <li className="font-urbanist cursor-pointer">Earn Free Credits</li>
                <li className="font-urbanist cursor-pointer">Suggestions?</li>
              </ul>
              <div className="flex justify-center mt-12 lg:flex-1 lg:mt-0 lg:block lg:pr-5">
                <div className="flex flex-col items-center gap-8 lg:items-start">
                  <h4 className="text-white font-extrabold uppercase text-[30px] font-urbanist">
                    GET IN TOUCH
                  </h4>
                  <Button
                    className="rounded-full text-black font-urbanist text-md font-bold w-[143px] h-[49px]"
                    variant="secondary" onClick={gotoForum}
                  >
                    Ask in Forum
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 xl:flex-[2] xl:m-0">
            <div className="bg-white rounded-[19px] shadow-[0_0_44px_0_rgba(0,0,0,0.15)] p-5">
              <p className="font-sans text-[13px] leading-[30px] text-black">
                Donamix is a global social network that offers a wide variety of unique features aimed at enhancing networking, communication, and user engagement. Our platform is designed to cater to a diverse audience, providing a comprehensive online community experience. Explore the endless possibilities with Donamix! Immerse yourself in a vibrant social network that goes beyond the ordinary. Engage in dynamic chat rooms, showcase your creativity through captivating photos and videos, participate in meaningful discussions in our forums, and discover a plethora of other services. Donamix is a powerhouse of options, offering classifieds, job opportunities, live streaming, blogs, radio, and more. Connect with people from all around the world and forge lasting connections. Donamix is here to meet all your needs, with a diverse range of services just a click away.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-[64px]">
          <div className="relative z-20 w-full lg:h-[110px] flex lg:flex-row flex-col lg:justify-between gap-5">
            <div className="z-20 flex flex-wrap items-center justify-center h-full gap-2 md:gap-5">
              <Button
                variant="ghost"
                className="rounded-full border border-[#A6A6A6] gap-2 text-[#A6A6A6] text-base"
              >
                Work with us
                <FiArrowUpRight />
              </Button>
              <Button
                variant="ghost"
                className="rounded-full border border-[#A6A6A6] gap-2 text-[#A6A6A6] text-base"
              >
                Join the team
                <FiArrowUpRight />
              </Button>
            </div>

            {/* Begin Social Buttons */}
            <div className="z-20 flex items-center justify-center h-full gap-4 md:gap-8">
              <Button
                variant="outline"
                size="icon"
                className="w-[54px] h-[54px] rounded-full text-black text-xl"
              >
                <FaTiktok />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-[54px] h-[54px] rounded-full text-black text-xl"
              >
                <FaYoutube />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-[54px] h-[54px] rounded-full text-black text-xl"
              >
                <FaFacebookF />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-[54px] h-[54px] rounded-full text-black text-xl"
              >
                <FaInstagram />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-[54px] h-[54px] rounded-full text-black text-xl"
              >
                <FaTwitter />
              </Button>
            </div>
            {/* End Social Buttons */}
          </div>

          <div className="xl:absolute relative z-0 w-full h-[110px] xl:bottom-0 xl:left-0 flex items-center justify-center">
            <p className="text-base leading-[26px] text-white">
              &copy; {new Date().getFullYear()} Donamix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
