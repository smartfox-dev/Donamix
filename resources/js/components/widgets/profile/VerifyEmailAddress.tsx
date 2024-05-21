import React from 'react';
import { generateOtp, verifyOtp } from '@/api/auth';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import { Input } from '@/components/ui/input';
import { loginSuccess } from '@/actions/auth';
import { toast } from 'react-hot-toast';

const VerifyEmailAddress = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(['', '', '', '']);
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams) {
      const t = searchParams.get('email') as string;
      if (t !== email) setEmail(t);
    }
  }, [searchParams]);

  useEffect(() => {
    // if (email) {
    //   generateOtp(email)
    //     .then((res) => {
    //       if (res.code === CONSTANTS.SUCCESS) {
    //         toast.success(res.message);
    //       } else {
    //         toast.error(res.message);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  }, [email]);


  const resendCode = () => {
    
  }

  const onSubmit = () => {
    verifyOtp({ email: email, token: input.join('') })
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          loginSuccess(res.token!);
          navigate('/');
          toast.success(res.message);
        } else {
          console.log("123", res)
          toast.error(res.message)
        }
      })
      .catch((err) => {
        console.log('Verify email Error:', err);
      });
  };

  const onDigitChange = (index: number, value: string) => {
    setInput((prev) => prev.map((val, i) => (i === index ? value : val)));
  };

  return (
    <div className="w-screen h-full bg-dashboard-background">
      <div className="flex flex-col items-center justify-center h-full px-5 py-10">
        <img
          src="/images/donamix_logo.png"
          className="object-contain invert"
          width={331}
          height={100}
        />
        <h2 className=" text-[26px] font-semibold font-poppins mt-8">Verify Your Email Address</h2>
        <div className="flex flex-col gap-10 w-full px-52 py-10">
          <div className="flex flex-col gap-7 w-full h-auto p-10 bg-white rounded-3xl items-center">
            <img src="/images/verifyemail/verifyemail.png" alt=""/>
            <h3 className="font-balrow font-bold text-base">Dear [User],</h3>
            <p className="font-balrow font-medium text-base">Welcome to Donamix! Please use the below mentioned 4-Digit code to verify your email.</p>
            <div className="flex items-center justify-center gap-5">
              <Input
                ref={ref1}
                name="digit1"
                value={input[0]}
                maxLength={1}
                onChange={(e) => {
                  onDigitChange(0, e.currentTarget.value);
                  if (e.currentTarget.value !== '' && ref2.current) {
                    ref2.current.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (CONSTANTS.NODIGITS.includes(e.key)) e.preventDefault();
                }}
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-2xl text-center font-bold text-[30px]"
              />
              <p className="text-2xl font-normal text-[#BCBCBC]">-</p>
              <Input
                ref={ref2}
                name="digit2"
                value={input[1]}
                maxLength={1}
                onChange={(e) => {
                  onDigitChange(1, e.currentTarget.value);
                  if (e.currentTarget.value !== '' && ref3.current) {
                    ref3.current.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (CONSTANTS.NODIGITS.includes(e.key)) e.preventDefault();
                }}
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-2xl text-center font-bold text-[30px]"
              />
              <p className="text-2xl font-normal text-[#BCBCBC]">-</p>
              <Input
                ref={ref3}
                name="digit3"
                value={input[2]}
                maxLength={1}
                onChange={(e) => {
                  onDigitChange(2, e.currentTarget.value);
                  if (e.currentTarget.value !== '' && ref4.current) {
                    ref4.current.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (CONSTANTS.NODIGITS.includes(e.key)) e.preventDefault();
                }}
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-2xl text-center font-bold text-[30px]"
              />
              <p className="text-2xl font-normal text-[#BCBCBC]">-</p>
              <Input
                ref={ref4}
                name="digit4"
                value={input[3]}
                maxLength={1}
                onChange={(e) => {
                  onDigitChange(3, e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                  if (CONSTANTS.NODIGITS.includes(e.key)) e.preventDefault();
                }}
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-2xl text-center font-bold text-[30px]"
              />
            </div>
            <div className="flex flex-col items-center mt-10">
              <p className="font-balrow font-semibold text-base">You can now access Donamix online or on any device by going to</p>
              <div><a className="hover:text-[#2375E2] font-balrow font-normal" href="http://donamix.com">http://donamix.com</a></div>
            </div>
          </div>
          <div className="flex flex-col gap-7 w-full h-auto p-10 bg-white rounded-3xl items-center">
            <h3 className="font-balrow font-bold text-3xl">Get the Donamix app!</h3>
            <p className="text-center font-balrow font-semibold text-base">Get the most of Donamix by installing our mobile app. You can log in by<br/> using your existing emails address and password.</p>
            <div className="flex flex-row gap-6">
              <img src="/images/verifyemail/googleplay.png" alt="" />
              <img src="/images/verifyemail/appstore.png" alt="" />
            </div>
          </div>
          <div className="flex flex-row gap-5 justify-center">
            <div className="w-[54px] h-[54px] border border-[#6D6E71] rounded-xl py-[14px] px-[20px]">
              <img src="/images/verifyemail/facebook.png" className="" alt=""/>
            </div>
            <div className="w-[54px] h-[54px] border border-[#6D6E71] rounded-xl py-[16px] px-[12px]">
              <img src="/images/verifyemail/twitter.png" className="" alt=""/>
            </div>
            <div className="w-[54px] h-[54px] border border-[#6D6E71] rounded-xl py-[10px] px-[12px]">
              <img src="/images/verifyemail/linkedin1.png" className="" alt=""/>
            </div>
            <div className="w-[54px] h-[54px] border border-[#6D6E71] rounded-xl py-[16px] px-[12px]">
              <img src="/images/verifyemail/youtube.png" className="" alt=""/>
            </div>
            <div className="w-[54px] h-[54px] border border-[#6D6E71] rounded-xl py-[12px] px-[12px]">
              <img src="/images/verifyemail/instagram.png" className="" alt=""/>
            </div>
            <div className="w-[54px] h-[54px] border border-[#6D6E71] rounded-xl py-[12px] px-[12px]">
              <img src="/images/verifyemail/tiktok.png" className="" alt=""/>
            </div>
          </div>
        </div>      
      </div>
    </div>
  );
};

export default VerifyEmailAddress;
