import * as authApi from '@/api/auth';

import CONSTANTS from '@/config/constants';
import axios from 'axios';

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: 'Male' | 'Female';
  country: string;
  city: string;
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('auth_token');
  return token;
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

export const loginSuccess = (token: string) => {
  setAuthToken(token);
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

};

export const loginFail = () => {
  removeAuthToken();
  delete axios.defaults.headers.common['Authorization'];
};

export const login = async (data: LoginUser) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    authApi
      .login(data)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          loginSuccess(res.token!);
          resolve({
            code: CONSTANTS.SUCCESS,
            message: res.message,
          });
        } else {
          loginFail();
          resolve({
            code: CONSTANTS.FAILED,
            message: res.message,
          });
        }
      })
      .catch((err) => {
        console.log('Login Error:', err.message);
        reject({
          code: CONSTANTS.FAILED,
          message: err.message,
        });
      });
  });
};

export const thirdPartyLogin = async ({
  type,
  accesstoken,
}: {
  type: string;
  accesstoken: string;
}) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    authApi
      .thirdPartyLogin({
        type,
        accesstoken,
      })
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          loginSuccess(res.token!);
          resolve({
            code:CONSTANTS.SUCCESS,
            message: res.message
          })
        } else {
          loginFail();
          resolve({
            code:CONSTANTS.FAILED,
            message: res.message
          })
        }
      })
      .catch((err) => {
        console.log('Login Error:', err);
        reject({
          code: CONSTANTS.FAILED,
          message: err.message
        })
      });
  });
};

export const logout = async () => {
  removeAuthToken();
  delete axios.defaults.headers.common['Authorization'];
  console.log('Log out');
};
