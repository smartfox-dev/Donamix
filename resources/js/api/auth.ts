import { LoginUser, RegisterUser } from '@/actions/auth';
import axios, { AxiosError } from 'axios';

import CONSTANTS from '@/config/constants';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
console.log(apiUrl);

export const validateUsername = async (username: string) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/uservalidate`, {
      type: 'username',
      username,
    });

    const { message } = res.data;
    if (message === CONSTANTS.SUCCESS) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Error in validating username:', err);
    return false;
  }
};

export const validateEmail = async (email: string) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/uservalidate`, {
      type: 'email',
      email,
    });

    const { message } = res.data;
    if (message === CONSTANTS.SUCCESS) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Error in validating email:', err);
    return false;
  }
};

export const register = async (data: RegisterUser) => {
  try {
    // const isValidUsername = await validateUsername(data.username);
    // const isValidEmail = await validateEmail(data.email);

      const res = await axios.post(`${apiUrl}/auth/register`, {
        ...data,
        birthday: {
          yy: new Date().getFullYear(),
          mm: new Date().getMonth(),
          dd: new Date().getDate(),
        },
        status: 'Single',
        description: 'I love Donamix.',
      });

      const { message, status } = res.data;

      if (message === CONSTANTS.SUCCESS) {
        return {
          code: CONSTANTS.SUCCESS,
          message: 'Successfully Registered!',
        };
      } else {
        return {
          code: CONSTANTS.FAILED,
          message: status,
        };
      }

  } catch (err) {


    if(err.response.status == "422"){
      return {
        code: CONSTANTS.FAILED,
        errors: err.response.data.errors,
        message: 'Register Failed!',
      };
    }

    console.log('Error while registering:', err);
    return {
      code: CONSTANTS.FAILED,
      message: 'Register Failed!',
    };
  }
};

export const login = async (data: LoginUser) => {
  return new Promise<{ code: string; token?: string; data: Object; message: string }>(
    (resolve, reject) => {
      axios
        .post(`${apiUrl}/auth/login`, data)
        .then((res) => {
          if (res.data.message === CONSTANTS.SUCCESS) {
            resolve({
              code: CONSTANTS.SUCCESS,
              token: res.data.token,
              message: 'Successfully Logged In!',
            });
          } else {
            console.log('Failed:', res);
            resolve({
              code: CONSTANTS.FAILED,
              message: res.data.token,
            });
          }
        })
        .catch((err: AxiosError) => {

          if(err.response.status == 401){
            resolve({
              code: CONSTANTS.FAILED,
              message:
                err.response && typeof err.response.status === 'string'
                  ? err.response.status
                  : err.response.data.message,
            });
          }else if(err.response.status == 422){

            resolve({
              code: CONSTANTS.FAILED,
              token: err.response.data.errors,
              message:'Fields are required!',
            });
            
          }

        })
        .finally(() => {
          reject({
            code: CONSTANTS.FAILED,
            message: 'Failed with unknown error.',
          });
        });
    }
  );
};

export const thirdPartyLogin = async (data: {
  type: string;
  accesstoken: string;
}) => {
  return new Promise<{ code: string; token?: string; message: string }>(
    (resolve, reject) => {
      axios
        .post(`${apiUrl}/auth/thirdlogin`, data)
        .then((res) => {
          if (res.data.message === CONSTANTS.SUCCESS) {
            resolve({
              code: CONSTANTS.SUCCESS,
              token: res.data.token,
              message: 'Successfully Logged In!',
            });
          } else {
            console.log(res);
            resolve({
              code: CONSTANTS.FAILED,
              message: res.data.status,
            });
          }
        })
        .catch((err: AxiosError) => {
          console.log('Error while logging in:', err);
          resolve({
            code: CONSTANTS.FAILED,
            message:
              err.response && typeof err.response.status === 'string'
                ? err.response.status
                : 'Failed with unknown error.',
          });
        })
        .finally(() => {
          reject({
            code: CONSTANTS.FAILED,
            message: 'Failed with unknown error.',
          });
        });
    }
  );
};

export const resendOtp = async (email: string) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
      .post(`${apiUrl}/auth/resendOtp`, { email })
      .then((res) => {
        resolve({
          code: res.data.message,
          message: 'Code Sended successfully!',
        });
      })
      .catch((err: AxiosError) => {
        console.log('Error while generating otp:', err);
        if (err.response && typeof err.response.status === 'string') {
          resolve({
            code: CONSTANTS.FAILED,
            message: err.response.status
          });
        }
      })
      .finally(() => {
        reject({
          code: CONSTANTS.FAILED,
          message: 'Failed with unknown error.',
        });
      });
  });
};

export const verifyOtp = async (data: { email: string; token: string }) => {
  return new Promise<{ code: string; token?: string; message: string }>((resolve, reject) => {
    axios
      .post(`${apiUrl}/auth/verifyotp`, data)
      .then((res) => {
          resolve({
          code: res.data.message,
          token: res.data.token,
          message: res.data.message=="failed"?'Invalid Verification Code':'Verified successfully!'
        });
      })
      .catch((err: AxiosError) => {
        console.log('Error while verifying otp:', err);
        if (err.response && typeof err.response.status === 'string') {
          resolve({
            code: CONSTANTS.FAILED,
            message: err.response.status
          });
        }
      })
      .finally(() => {
        reject({
          code: CONSTANTS.FAILED,
          message: 'Failed with unknown error.',
        });
      });
  });
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${apiUrl}/auth/getinfo`);

    if (res.data.message === CONSTANTS.SUCCESS) {
      return {
        code: CONSTANTS.SUCCESS,
        data: res.data.user,
      };
    } else {
      return {
        code: CONSTANTS.FAILED,
        message: res.data.status,
      };
    }
  } catch (err) {
    console.log('Error while getting user info:', err);
    return {
      code: CONSTANTS.FAILED,
      message: err,
    };
  }
};
