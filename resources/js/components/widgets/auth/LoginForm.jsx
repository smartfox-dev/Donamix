import { login, thirdPartyLogin } from '@/actions/auth';

import AppleLogin from 'react-apple-login';
import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useState } from 'react';
// import { LinkedIn } from 'react-linkedin-login-oauth2';

// import { type LoginUser } from '@/actions/auth';

const appleId = import.meta.env.VITE_APPLE_OAUTH_APP_ID;

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      setLoading(true);
      thirdPartyLogin({
        type: 'google',
        accesstoken: res.access_token,
      })
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            navigate('/');
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log('Login Error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    onError: () => {
      console.log('Failed');
    },
  });

  const facebookLogin = (res) => {
    if (res.accessToken) {
      setLoading(true);
      console.log(res)
      thirdPartyLogin({
        type: 'facebook',
        accesstoken: res.accessToken,
      })
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            navigate('/');
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log('Login Error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const appleLogin = (res) => {
    console.log(res);
    if (res.authorization && res.authorization.id_token) {
      setLoading(true);
      thirdPartyLogin({
        type: 'apple',
        accesstoken: res.id_token,
      })
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            navigate('/');
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log('Login Error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(input)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          navigate('/');
          toast.success(res.message);
        } else {
          if (res.message === 'Email Not Verified...') {
            navigate(`/verifyemail?email=${input.email}`);
          } else {
            toast.error(res.message);
            console.log(res)
            // setErrors(res.errors);
          }
        }
      })
      .catch((err) => {
        console.log('Login Error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const responseLinkedin = (response) => {
    console.log(response)
  }

  const { linkedInLogin } = useLinkedIn({
    clientId: '77jxx0v9fk4l1l',
    redirectUri: 'https://donamix.org/linkedin/callback',
    // redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    scope: 'r_liteprofile r_emailaddress',
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex flex-col gap-4 mt-6 md:gap-6">
      <div className="flex gap-4">
        <Button
          className="flex items-center justify-center flex-1 text-black rounded-lg bg-secondary lg:gap-4"
          onClick={googleLogin}
        >
          <img src="/images/google.svg" width={26} height={26} />

        </Button>
        <div className="flex-1 lg:flex-none">
          <FacebookLogin
            appId={import.meta.env.VITE_FACEBOOK_OAUTH_APP_ID || ''}
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,email"
            callback={facebookLogin}
            redirectUri='https://donamix.org/facebook/callback'
            render={(renderProps) => (
              <Button
                className="w-full rounded-lg bg-secondary"
                onClick={() => {
                  renderProps.onClick();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 44 44"
                  fill="none"
                >
                  <ellipse
                    cx="22.246"
                    cy="20.5099"
                    rx="19.0312"
                    ry="19.0312"
                    fill="url(#paint0_linear_476_11147)"
                  />
                  <path
                    d="M29.3334 28.0704L30.1788 22.6989H24.8903V19.2147C24.8903 17.7448 25.6277 16.3112 27.9964 16.3112H30.4023V11.7382C30.4023 11.7382 28.2198 11.3752 26.1342 11.3752C21.7769 11.3752 18.9315 13.9484 18.9315 18.605V22.6989H14.0898V28.0704H18.9315V41.0564C19.9035 41.2052 20.8979 41.2814 21.9109 41.2814C22.9239 41.2814 23.9183 41.2052 24.8903 41.0564V28.0704H29.3334Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_476_11147"
                      x1="22.246"
                      y1="1.47876"
                      x2="22.246"
                      y2="39.4282"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#18ACFE" />
                      <stop offset="1" stopColor="#0163E0" />
                    </linearGradient>
                  </defs>
                </svg>
              </Button>
            )}
          />
          {/* <Button
            className="flex items-center justify-center flex-1 text-black rounded-lg bg-secondary lg:gap-4"
            onClick={linkedInLogin}
          >
            <img src="/images/google.svg" width={26} height={26} />

          </Button> */}
        </div>
        <div className="flex-1 lg:flex-none">
          <AppleLogin
            clientId={appleId}
            redirectURI={import.meta.env.VITE_APPLE_OAUTH_REDIRECT_URI}
            usePopup={true}
            callback={appleLogin} // Catch the response
            scope="email name"
            responseMode="query"
            render={(renderProps) => (
              <Button
                className="w-full rounded-lg bg-secondary"
                onClick={() => renderProps.onClick()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 45 45"
                  fill="none"
                >
                  <path
                    d="M41.7762 21.4999C41.7762 31.6429 33.2598 39.8749 22.7451 39.8749C12.2303 39.8749 3.71387 31.6429 3.71387 21.4999C3.71387 11.3478 12.2303 3.125 22.7451 3.125C33.2598 3.125 41.7762 11.3478 41.7762 21.4999Z"
                    fill="#283544"
                  />
                  <path
                    d="M31.6654 16.8503C31.5616 16.9088 29.0894 18.1432 29.0894 20.8803C29.2059 24.0017 32.2092 25.0964 32.2607 25.0964C32.2092 25.1549 31.8073 26.5876 30.6168 28.0894C29.672 29.3831 28.6233 30.6874 27.0309 30.6874C25.5162 30.6874 24.9724 29.8252 23.2246 29.8252C21.3477 29.8252 20.8166 30.6874 19.3796 30.6874C17.7871 30.6874 16.6608 29.3132 15.6645 28.0317C14.3701 26.3543 13.27 23.7221 13.2311 21.1948C13.205 19.8555 13.4903 18.539 14.2148 17.4208C15.2373 15.8597 17.0627 14.8 19.0562 14.765C20.5836 14.7187 21.9429 15.7085 22.8751 15.7085C23.7684 15.7085 25.4385 14.765 27.3281 14.765C28.1437 14.7658 30.3187 14.9869 31.6654 16.8503ZM22.7459 14.4976C22.474 13.2746 23.2246 12.0515 23.9237 11.2714C24.817 10.3279 26.2279 9.6875 27.4446 9.6875C27.5223 10.9105 27.03 12.11 26.1502 12.9836C25.3608 13.9271 24.0014 14.6374 22.7459 14.4976Z"
                    fill="white"
                  />
                </svg>
              </Button>
            )}
          />
        </div>
      </div>

      <form>
        <div>
          <div>
            <label htmlFor="email">Email address</label>
            <Input
              id="email"
              name="email"
              placeholder="Username or email address"
              value={input.email}
              onChange={onInputChange}
              className="mt-2 bg-secondary placeholder:text-sm"
            />
            {errors.email && 
            (<div className="text-base text-red-600 mt-4">{errors.email}</div>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="password">Enter your Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={input.password}
              onChange={onInputChange}
              className="mt-2 bg-secondary placeholder:text-sm"
            />
            {errors.password && 
            (<div className="text-base text-red-600 mt-4">{errors.password}</div>
            )}
          </div>
        </div>

        <div className="mt-2 text-xs text-right">
          <a href="#">Forgot Password</a>
        </div>

        <Button
          type="submit"
          className="w-full mt-4 font-normal"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Sign in
        </Button>
      </form>
    </div>
  );
}
