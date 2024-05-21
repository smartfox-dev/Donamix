import React from 'react';
import { resendOtp, verifyOtp } from '@/api/auth';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import { Input } from '@/components/ui/input';
import { loginSuccess } from '@/actions/auth';
import { toast } from 'react-hot-toast';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(['', '', '', '']);
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (searchParams) {
      const t = searchParams.get('email') as string;
      if (t !== email) setEmail(t);
    }
  }, [searchParams]);

  useEffect(() => {
    resendCode()
  }, [email]);


  const resendCode = () => {

    setMinutes(2);
    setSeconds(59);
    
    resendOtp(email)
    .then((res) => {
      if (res.code === CONSTANTS.SUCCESS) {
      } else {
        toast.error(res.message)
      }
    })
    .catch((err) => {
      console.log('Verify email Error:', err);
    });

  }

  const onSubmit = () => {
    verifyOtp({ email: email, token: input.join('') })
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          loginSuccess(res.token!);
          navigate('/');
          toast.success(res.message);
        } else {
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
    <div className="w-screen h-screen bg-dashboard-background">
      <div className="flex flex-col items-center justify-center h-full px-5">
        <img
          src="/images/donamix_logo.png"
          className="object-contain invert"
          width={331}
          height={100}
        />
        <h2 className=" text-[42px] font-bold font-poppins mt-8">Enter Your Code</h2>
        <p className="text-[#404040] font-poppins text-2xl text-center mt-5">
          Please enter the 4-digit code you received via email to confirm your
          account.
        </p>

        <div className="flex items-center justify-center gap-5 mt-[50px]">
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

        <p className="text-[30px] text-black font-bold mt-[50px]">
        {seconds > 0 || minutes > 0 ? (
            <p>
             {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p>Didn't recieve code?</p>
          )}
        </p>
        <Button 
        className="text-[#007BFF] font-semibold mt-5 text-xl"
        disabled={seconds > 0 || minutes > 0}
            style={{
              color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630"
            }}
        onClick={resendCode}>
          Resend Code
        </Button>

        <Button className="px-[100px] py-[30px] mt-14 text-[25px] rounded-full font-bold" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
